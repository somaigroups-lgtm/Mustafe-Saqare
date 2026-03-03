export interface Prompt {
  id: number;
  title: string;
  prompt: string;
  image_url: string;
  creator: string;
  loves: number;
  views: number;
  category: string;
  created_at: string;
  price?: number;
  is_premium: number; // 0 or 1
}
