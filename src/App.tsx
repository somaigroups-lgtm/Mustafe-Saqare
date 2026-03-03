import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Heart, 
  Copy, 
  Eye, 
  X, 
  Share2, 
  Menu as MenuIcon,
  ChevronRight,
  Github,
  Twitter,
  Instagram,
  Check,
  Lock,
  ShoppingBag,
  Sparkles,
  Upload,
  Plus,
  Image as ImageIcon,
  Video,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Prompt } from './types';

const Navbar = ({ onSearch, onScrollTo, onUploadClick, isAdmin }: { onSearch: (val: string) => void, onScrollTo: (id: string) => void, onUploadClick: () => void, isAdmin: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onScrollTo('hero')}>
            <div className="w-10 h-10 bg-black border-2 border-gold flex items-center justify-center rounded-lg group-hover:bg-gold transition-colors duration-300">
              <span className="text-gold group-hover:text-black font-serif font-bold text-xl">M</span>
            </div>
            <span className="hidden md:block font-serif font-bold text-xl tracking-tight">Mustafe Saqare</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/60">
            <button onClick={() => onScrollTo('hero')} className="hover:text-gold transition-colors">Home</button>
            <button onClick={() => onScrollTo('gallery')} className="hover:text-gold transition-colors">Prompts</button>
            <button onClick={() => onScrollTo('footer')} className="hover:text-gold transition-colors">About</button>
            <button onClick={() => onScrollTo('contact')} className="hover:text-gold transition-colors">Contact</button>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search prompts..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                onSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <button 
              onClick={onUploadClick}
              className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gold-light transition-colors shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Upload</span>
            </button>
          )}
          <button className="sm:hidden text-white/60 hover:text-white">
            <Search className="w-5 h-5" />
          </button>
          <button className="lg:hidden text-white/60 hover:text-white">
            <MenuIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={() => onScrollTo('gallery')}
            className="hidden md:block bg-gold text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gold-light transition-colors"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  return (
    <section id="hero" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#050505] z-10" />
        <img 
          src="https://picsum.photos/seed/ai-art/1920/1080?blur=10" 
          className="w-full h-full object-cover scale-110 animate-pulse-slow"
          alt="Hero Background"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4">Mustafe Saqare | Prompt Gallery</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight">
            Discover, Create, and <br />
            <span className="italic text-gold">Share</span> Powerful Prompts
          </h1>
          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            A curated collection of high-quality AI prompts designed to push the boundaries of creativity and imagination.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onScrollTo('gallery')}
              className="w-full sm:w-auto bg-gold text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all transform hover:scale-105"
            >
              Start Exploring
            </button>
            <button 
              onClick={() => onScrollTo('gallery')}
              className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Gallery
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => onScrollTo('gallery')}>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
};


const PromptCard: React.FC<{ prompt: Prompt, onClick: (p: Prompt) => void | Promise<void> }> = ({ prompt, onClick }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [loves, setLoves] = useState(prompt.loves);
  const [isCopied, setIsCopied] = useState(false);

  const handleLove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoved) return;
    try {
      const res = await fetch(`/api/prompts/${prompt.id}/love`, { method: 'POST' });
      const data = await res.json();
      setLoves(data.loves);
      setIsLoved(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (prompt.is_premium) return;
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className={`group relative bg-[#111] rounded-2xl overflow-hidden cursor-pointer border ${prompt.is_premium ? 'border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/5'} hover:border-gold/30 transition-all duration-500`}
      onClick={() => onClick(prompt)}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={prompt.image_url} 
          alt={prompt.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {prompt.is_premium === 1 && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-gold text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              PREMIUM
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute top-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {prompt.is_premium === 0 ? (
          <button 
            onClick={handleCopy}
            className="p-2 glass rounded-full hover:bg-gold hover:text-black transition-colors"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        ) : (
          <div className="p-2 glass rounded-full text-gold">
            <Lock className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Prompt</p>
            {prompt.is_premium === 1 && (
              <p className="text-gold font-bold text-sm">${prompt.price}</p>
            )}
          </div>
          <p className={`text-sm line-clamp-2 font-medium group-hover:text-gold transition-colors ${prompt.is_premium ? 'blur-[2px] select-none' : ''}`}>
            {prompt.prompt}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-gold text-[10px] font-bold">MS</span>
            </div>
            <span className="text-xs text-white/60">{prompt.creator}</span>
          </div>
          
          <div className="flex items-center gap-4 text-white/40">
            <button 
              onClick={handleLove}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${isLoved ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-4 h-4 ${isLoved ? 'fill-current' : ''}`} />
              <span className="text-xs">{loves}</span>
            </button>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{prompt.views}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Modal = ({ prompt, onClose }: { prompt: Prompt, onClose: () => void }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });

  const handleCopy = () => {
    if (prompt.is_premium && !isUnlocked) return;
    navigator.clipboard.writeText(prompt.prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchasing(true);
    
    // Simulate automated payment processing
    setTimeout(() => {
      setIsPurchasing(false);
      setPaymentStep('success');
      setIsUnlocked(true);
    }, 3000);
  };

  const handleBuyNow = () => {
    setPaymentStep('payment');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="lg:w-1/2 aspect-square lg:aspect-auto relative">
          <img 
            src={prompt.image_url} 
            alt={prompt.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {prompt.is_premium === 1 && !isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="text-center p-8">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <p className="text-2xl font-serif font-bold text-white mb-2">Premium Content</p>
                <p className="text-white/60">Purchase to unlock the full high-resolution prompt.</p>
              </div>
            </div>
          )}
          {isUnlocked && (
            <div className="absolute top-6 left-6 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              PROMPT UNLOCKED
            </div>
          )}
        </div>

        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col">
          {paymentStep === 'payment' ? (
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <button onClick={() => setPaymentStep('details')} className="text-gold text-sm font-bold flex items-center gap-2 mb-4 hover:underline">
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Details
                </button>
                <h2 className="text-3xl font-serif font-bold mb-2">MasterCard Payment</h2>
                <p className="text-white/40">Securely transfer funds to: <span className="text-gold font-mono">5291 8234 5738 1491</span></p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6 flex-1">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Cardholder Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="MUSTAFE SAQARE"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors font-mono"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
                        maxLength={19}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">MC</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors font-mono"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">CVV</label>
                      <input 
                        required
                        type="password" 
                        placeholder="***"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors font-mono"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit"
                    disabled={isPurchasing}
                    className="w-full bg-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isPurchasing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Processing Secure Payment...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        Pay ${prompt.price} Now
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-white/20 mt-4 uppercase tracking-widest">
                    Encrypted & Secure Transaction
                  </p>
                </div>
              </form>
            </div>
          ) : paymentStep === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <Check className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4">Payment Successful!</h2>
              <p className="text-white/60 mb-10 max-w-sm">
                Your payment has been confirmed. The premium prompt has been automatically unlocked for you below.
              </p>
              <button 
                onClick={() => setPaymentStep('details')}
                className="bg-gold text-black px-10 py-4 rounded-full font-bold hover:bg-gold-light transition-colors"
              >
                View Unlocked Prompt
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">{prompt.category}</span>
                  {prompt.is_premium === 1 && (
                    <span className="bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full">PREMIUM</span>
                  )}
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{prompt.title}</h2>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">MS</span>
                  </div>
                  <span className="text-white/60">Created by <span className="text-white font-medium">{prompt.creator}</span></span>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/40 text-xs uppercase tracking-widest">Full Prompt</span>
                    {(prompt.is_premium === 0 || isUnlocked) && (
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-bold"
                      >
                        {isCopied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy Prompt</>}
                      </button>
                    )}
                  </div>
                  <p className={`text-lg font-light leading-relaxed italic ${prompt.is_premium && !isUnlocked ? 'blur-md select-none' : ''}`}>
                    "{prompt.prompt}"
                  </p>
                  {prompt.is_premium === 1 && !isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-gold/30">
                        <Lock className="w-4 h-4 text-gold" />
                        <span className="text-gold text-sm font-bold">LOCKED</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <Heart className="w-5 h-5 text-red-500 mb-1" />
                    <span className="text-xl font-bold">{prompt.loves}</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Loves</span>
                  </div>
                  <div className="glass rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <Eye className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-xl font-bold">{prompt.views}</span>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Views</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-xs uppercase tracking-widest">Share</span>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(prompt.is_premium && !isUnlocked ? 'Check out this premium prompt!' : prompt.prompt)}`, '_blank')}
                      className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
                      className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleCopy}
                      className="p-2 glass rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {prompt.is_premium === 1 && !isUnlocked ? (
                  <button 
                    onClick={handleBuyNow}
                    className="bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold-light transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Buy Now for ${prompt.price}
                  </button>
                ) : (
                  <button 
                    onClick={handleCopy}
                    className="bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-gold-light transition-colors"
                  >
                    {isCopied ? 'Copied!' : 'Use this Prompt'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const UploadModal = ({ onClose, onUploadSuccess }: { onClose: () => void, onUploadSuccess: (p: Prompt) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    category: 'Futuristic',
    image_url: '',
    price: '0',
    is_premium: false
  });
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          is_premium: formData.is_premium ? 1 : 0
        })
      });
      const data = await res.json();
      if (res.ok) {
        onUploadSuccess(data);
        setStep('success');
      } else {
        alert(data.error || "Failed to upload prompt");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="md:w-2/5 bg-gold p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-[15vw] font-serif font-bold text-black/5 select-none whitespace-nowrap">
            UPLOAD
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <Upload className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-black mb-4 leading-tight">Share Your <br />Creativity</h2>
            <p className="text-black/60 font-medium">Upload your best AI prompts and join our elite community of creators.</p>
          </div>
          <div className="relative z-10 pt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <p className="text-black font-bold text-sm">Sell Premium Prompts</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-black" />
              </div>
              <p className="text-black font-bold text-sm">High-Res Previews</p>
            </div>
          </div>
        </div>

        <div className="md:w-3/5 p-8 sm:p-12 max-h-[80vh] overflow-y-auto">
          {step === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <Check className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4 text-white">Upload Successful!</h2>
              <p className="text-white/60 mb-10 max-w-sm">
                Your prompt has been added to the gallery and is now visible to the community.
              </p>
              <button 
                onClick={onClose}
                className="bg-gold text-black px-10 py-4 rounded-full font-bold hover:bg-gold-light transition-colors"
              >
                Back to Gallery
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Prompt Title</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Cyber Samurai at Night"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">The Prompt</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe the prompt in detail..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white resize-none"
                    value={formData.prompt}
                    onChange={(e) => setFormData({...formData, prompt: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Category</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {['Futuristic', 'Nature', 'Abstract', 'Fantasy', 'Sci-Fi', 'Portrait', 'Architecture'].map(cat => (
                      <option key={cat} value={cat} className="bg-[#0a0a0a]">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Image URL</label>
                  <input 
                    required
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 pt-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${formData.is_premium ? 'bg-gold text-black' : 'bg-white/10 text-white/40'}`}>
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Premium Prompt</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">Enable for sale</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, is_premium: !formData.is_premium})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${formData.is_premium ? 'bg-gold' : 'bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_premium ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                {formData.is_premium && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="col-span-1 sm:col-span-2"
                  >
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Price (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="19.99"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-gold transition-colors text-white font-mono"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl"
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Uploading to Gallery...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Publish Prompt
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Have a Question? <br /><span className="italic text-gold">Contact Us</span></h2>
          <p className="text-white/40 text-lg mb-12 max-w-md font-light">
            Whether you're looking for a custom prompt, need support with a purchase, or just want to say hello, we're here to help.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Twitter className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Twitter</p>
                <p className="text-white font-medium">@MustafeSaqare</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Instagram</p>
                <p className="text-white font-medium">@MustafeSaqare_AI</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10">
          <form action="https://formspree.io/f/xykdqbor" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Full Name</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Subject</label>
              <input 
                required
                type="text" 
                name="subject"
                placeholder="How can we help?"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">Message</label>
              <textarea 
                required
                name="message"
                rows={5}
                placeholder="Your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-gold transition-colors text-white resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-light transition-all shadow-xl"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  return (
    <footer id="footer" className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onScrollTo('hero')}>
              <div className="w-10 h-10 bg-black border-2 border-gold flex items-center justify-center rounded-lg">
                <span className="text-gold font-serif font-bold text-xl">M</span>
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight">Mustafe Saqare</span>
            </div>
            <p className="text-white/40 max-w-md mb-8 font-light leading-relaxed">
              Empowering creators with the most powerful AI prompts. Join our community and start building the future of digital art today.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-gold hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-gold hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-gold hover:text-black transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold">Quick Links</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><button onClick={() => onScrollTo('hero')} className="hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => onScrollTo('gallery')} className="hover:text-gold transition-colors">Prompts</button></li>
              <li><button onClick={() => onScrollTo('footer')} className="hover:text-gold transition-colors">About Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-gold">Support</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><button onClick={() => onScrollTo('contact')} className="hover:text-gold transition-colors">Contact</button></li>
              <li><button className="hover:text-gold transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-gold transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-gold transition-colors">FAQ</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-white/20 text-xs uppercase tracking-[0.2em]">
          <p>© 2024 Mustafe Saqare. All rights reserved.</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">Cookie Policy</button>
            <button className="hover:text-white transition-colors">Legal Notice</button>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Hidden admin access: append ?admin=true to the URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const fetchPrompts = useCallback(async (query = '', category = 'All') => {
    setLoading(true);
    try {
      const searchParam = query ? `search=${query}` : '';
      const categoryParam = category !== 'All' ? `category=${category}` : '';
      const res = await fetch(`/api/prompts?${searchParam}&${categoryParam}`);
      const data = await res.json();
      setPrompts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts(searchQuery, activeCategory);
  }, [fetchPrompts, searchQuery, activeCategory]);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };

  const handlePromptClick = async (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    try {
      await fetch(`/api/prompts/${prompt.id}/view`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSuccess = (newPrompt: Prompt) => {
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onSearch={handleSearch} 
        onScrollTo={scrollToSection} 
        onUploadClick={() => setIsUploadModalOpen(true)} 
        isAdmin={isAdmin}
      />
      
      <main className="flex-grow">
        <Hero onScrollTo={scrollToSection} />
        
        <section id="gallery" className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Prompt Feed</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Latest Creations</h2>
            </div>
            <div className="flex items-center gap-4">
              {['All', 'Premium', 'Futuristic', 'Nature', 'Abstract', 'Fantasy', 'Sci-Fi'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`${activeCategory === cat ? 'text-gold border-b-2 border-gold' : 'text-white/40 hover:text-white'} pb-1 text-sm font-bold uppercase tracking-widest transition-all`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : prompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {prompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  prompt={prompt} 
                  onClick={handlePromptClick} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/40 text-xl font-light">No prompts found matching your search.</p>
              <button 
                onClick={() => handleSearch('')}
                className="mt-6 text-gold hover:underline font-bold"
              >
                Clear search
              </button>
            </div>
          )}
        </section>

        <ContactSection />

        <section className="bg-gold py-24 px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 text-[20vw] font-serif font-bold text-black/5 select-none whitespace-nowrap">
            MUSTAFE SAQARE
          </div>
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-6">Ready to create your own masterpiece?</h2>
              <p className="text-black/70 text-lg mb-8">
                Join our community of AI artists and start sharing your unique prompts with the world. Get inspired and push the boundaries of what's possible.
              </p>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl"
              >
                Get Started Now
              </button>
            </div>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-black/20 p-4">
                <div className="w-full h-full rounded-full border-4 border-black/10 p-4">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-gold font-serif font-bold text-7xl">M</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-black px-4 py-2 rounded-full font-bold text-xs shadow-lg transform rotate-12">
                JOIN 5,000+ ARTISTS
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onScrollTo={scrollToSection} />

      <AnimatePresence>
        {selectedPrompt && (
          <Modal 
            prompt={selectedPrompt} 
            onClose={() => setSelectedPrompt(null)} 
          />
        )}
        {isUploadModalOpen && (
          <UploadModal 
            onClose={() => setIsUploadModalOpen(false)} 
            onUploadSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
