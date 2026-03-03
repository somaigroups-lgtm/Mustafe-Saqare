import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import Stripe from "stripe";

const db = new Database("prompts.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    prompt TEXT,
    image_url TEXT,
    creator TEXT,
    loves INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    category TEXT,
    price REAL DEFAULT 0,
    is_premium INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Check if columns exist (for existing databases)
const tableInfo = db.prepare("PRAGMA table_info(prompts)").all() as any[];
if (!tableInfo.find(c => c.name === 'price')) {
  db.exec("ALTER TABLE prompts ADD COLUMN price REAL DEFAULT 0");
}
if (!tableInfo.find(c => c.name === 'is_premium')) {
  db.exec("ALTER TABLE prompts ADD COLUMN is_premium INTEGER DEFAULT 0");
}

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM prompts").get() as { count: number };
if (count.count <= 6) { // Add some premium ones if we only have the base 6
  const premiumPrompts = [
    {
      title: "Masterpiece Landscape",
      prompt: "Ultra-detailed mountain range at dawn, volumetric lighting, 16k resolution, unreal engine 5 render, professional photography.",
      image_url: "https://picsum.photos/seed/masterpiece/800/1000",
      creator: "Mustafe Saqare",
      loves: 540,
      views: 8900,
      category: "Nature",
      price: 19.99,
      is_premium: 1
    },
    {
      title: "Cyber Samurai",
      prompt: "A futuristic samurai in neon armor, rain-slicked streets of Neo-Tokyo, katana glowing with blue energy, cinematic composition.",
      image_url: "https://picsum.photos/seed/samurai/800/1000",
      creator: "Mustafe Saqare",
      loves: 820,
      views: 12400,
      category: "Futuristic",
      price: 24.99,
      is_premium: 1
    },
    {
      title: "Ancient Library",
      prompt: "Infinite library with floating books, rays of light through stained glass, dust motes dancing in the air, magical atmosphere.",
      image_url: "https://picsum.photos/seed/library/800/1000",
      creator: "Mustafe Saqare",
      loves: 430,
      views: 5600,
      category: "Fantasy",
      price: 14.99,
      is_premium: 1
    }
  ];

  const insert = db.prepare("INSERT INTO prompts (title, prompt, image_url, creator, loves, views, category, price, is_premium) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  premiumPrompts.forEach(p => insert.run(p.title, p.prompt, p.image_url, p.creator, p.loves, p.views, p.category, p.price, p.is_premium));
}

let stripe: Stripe | null = null;
const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/prompts", (req, res) => {
    const search = req.query.search as string;
    const category = req.query.category as string;
    let query = "SELECT * FROM prompts";
    const params: any[] = [];

    if (category && category !== 'All') {
      if (category === 'Premium') {
        query += " WHERE is_premium = 1";
      } else {
        query += " WHERE category = ?";
        params.push(category);
      }
    }

    if (search) {
      query += params.length > 0 ? " AND" : " WHERE";
      query += " (title LIKE ? OR prompt LIKE ? OR category LIKE ?)";
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    query += " ORDER BY is_premium DESC, created_at DESC";
    const prompts = db.prepare(query).all(...params);
    res.json(prompts);
  });

  app.post("/api/prompts", (req, res) => {
    const { title, prompt, category, image_url, creator, price, is_premium } = req.body;
    
    if (!title || !prompt || !category || !image_url) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const info = db.prepare(`
        INSERT INTO prompts (title, prompt, category, image_url, creator, price, is_premium, loves, views)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)
      `).run(title, prompt, category, image_url, creator || 'Mustafe Saqare', price || 0, is_premium ? 1 : 0);
      
      const newPrompt = db.prepare("SELECT * FROM prompts WHERE id = ?").get(info.lastInsertRowid);
      res.status(201).json(newPrompt);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create prompt" });
    }
  });

  app.post("/api/prompts/:id/love", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE prompts SET loves = loves + 1 WHERE id = ?").run(id);
    const updated = db.prepare("SELECT loves FROM prompts WHERE id = ?").get() as { loves: number };
    res.json(updated);
  });

  app.post("/api/prompts/:id/view", (req, res) => {
    const { id } = req.params;
    db.prepare("UPDATE prompts SET views = views + 1 WHERE id = ?").run(id);
    res.sendStatus(200);
  });

  // Stripe Checkout
  app.post("/api/create-checkout-session", async (req, res) => {
    const { promptId } = req.body;
    const prompt = db.prepare("SELECT * FROM prompts WHERE id = ?").get() as any;

    if (!prompt || !prompt.is_premium) {
      return res.status(400).json({ error: "Invalid prompt for purchase" });
    }

    const stripeClient = getStripe();
    if (!stripeClient) {
      return res.status(500).json({ error: "Stripe is not configured. Please set STRIPE_SECRET_KEY." });
    }

    try {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: prompt.title,
                description: "Premium AI Prompt",
                images: [prompt.image_url],
              },
              unit_amount: Math.round(prompt.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.APP_URL}/?success=true&id=${promptId}`,
        cancel_url: `${process.env.APP_URL}/?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
