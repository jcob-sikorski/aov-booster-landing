import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  Gift, 
  Check, 
  Menu, 
  X, 
  Zap, 
  Package, 
  Plus, 
  Star, 
  RefreshCw, 
  ShoppingBag, 
  Settings,        
  Globe,                 
  Image as ImageIcon, 
  Type,                   
  LayoutTemplate, 
  PenTool,                 
  CheckCircle2,        
  ChevronDown, 
  Circle, 
  Megaphone, 
  Store,        
  User,        
  MoreHorizontal, 
  HelpCircle, 
  MousePointer2, 
  Linkedin, 
  Youtube,
  ShoppingCart,
  Loader2,
  Sparkles
} from 'lucide-react';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" }
  }
};

// --- NEW: Smart Add To Cart Button Component ---
const SmartAddToCartButton = ({ price, text = "Add To Cart", className = "" }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleClick = () => {
    if (status !== 'idle') return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 800);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={`relative w-full overflow-hidden rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-300 group ${className} 
        ${status === 'success' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20'}`}
    >
      {/* Shimmer Effect (Only in idle) */}
      {status === 'idle' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
      )}

      <div className="relative z-20 flex items-center justify-center gap-3 py-3.5 px-6">
        <AnimatePresence mode="wait">
          {status === 'loading' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          ) : status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Added!</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                <span>{text}</span>
              </div>
              {price && (
                <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-mono ml-4 group-hover:bg-white/20 transition-colors">
                  {price}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.button>
  );
};

// --- Helper Components ---

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all";
    
  const variants = {
    primary: "bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800",
    accent: "bg-orange-600 text-white rounded-full shadow-lg shadow-orange-200 hover:bg-orange-700",
    secondary: "bg-white text-slate-900 border border-slate-200 rounded-full hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 rounded-full hover:bg-slate-100",
    white: "bg-white text-indigo-600 rounded-full font-semibold shadow-md hover:bg-slate-50",
    dark: "bg-slate-900 text-white rounded-full shadow-md hover:bg-black"
  };

  return (
    <motion.button 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
      {Icon && <Icon className="ml-2 w-4 h-4" />}
    </motion.button>
  );
};

// --- HERO VISUALS (Grid) ---

const BundleCardBase = ({ children, className = "" }) => (
  <motion.div 
    variants={fadeInUp}
    className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-4 w-full ${className}`}
  >
    {children}
  </motion.div>
);

// Variant 1: The "Classic" Radio Selector
const CardVolumeSelector = () => (
  <BundleCardBase>
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 opacity-70">
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border border-slate-300 bg-white"></div>
            <div>
                <div className="text-xs font-bold text-slate-900">One T-Shirt</div>
                <div className="text-[10px] text-slate-500">Standard price</div>
            </div>
        </div>
        <div className="text-xs font-bold text-slate-900">€40.00</div>
      </div>
      {/* Active State: Indigo Border */}
      <div className="relative p-3 rounded-lg border-2 border-indigo-600 bg-white shadow-sm">
        <div className="absolute -top-2.5 right-2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          MOST POPULAR
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[5px] border-indigo-600 bg-white"></div>
                <div>
                    <div className="text-sm font-bold text-slate-900">Two T-shirts</div>
                    <div className="text-[10px] font-bold text-emerald-600">You save €15,00</div>
                </div>
            </div>
            <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">€65.00</div>
                  <div className="text-[10px] text-slate-400 line-through">€80.00</div>
            </div>
        </div>
        <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-slate-50 rounded border border-slate-200 px-2 py-1.5 text-[10px] font-medium text-slate-600 flex justify-between items-center">
               Large <ChevronDown size={10} />
            </div>
             <div className="flex-1 bg-slate-50 rounded border border-slate-200 px-2 py-1.5 text-[10px] font-medium text-slate-600 flex justify-between items-center">
               V-neck <ChevronDown size={10} />
            </div>
        </div>
      </div>
    </div>
  </BundleCardBase>
);

// Variant 2: The Grid Pricing
const CardGridPricing = () => (
    <BundleCardBase>
        <div className="grid grid-cols-2 gap-2">
            {[
                { l: 'Buy 1', p: '€10,00', d: null },
                { l: 'Buy 2', p: '€18,00', d: '-10%' },
                { l: 'Buy 3', p: '€25,50', d: '-15%' },
                { l: 'Buy 4', p: '€32,00', d: '-20%' },
                { l: 'Buy 5', p: '€37,50', d: '-25%' },
                { l: 'Buy 6', p: '€42,00', d: '-30%' },
            ].map((item, i) => (
                <div key={i} className={`p-2 rounded border flex flex-col items-center justify-center text-center ${item.d === '-30%' ? 'bg-indigo-50 border-indigo-600 ring-1 ring-indigo-600' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-slate-700">{item.l}</span>
                        {item.d && <span className={`text-[9px] px-1 rounded font-bold ${item.d === '-30%' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{item.d}</span>}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{item.p}</span>
                </div>
            ))}
        </div>
    </BundleCardBase>
);

// Variant 3: Checkbox Upsell
const CardGiftWrap = () => (
    <BundleCardBase className="!p-3">
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center"></div>
            <div className="w-10 h-10 bg-emerald-50 rounded border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Gift size={20} />
            </div>
            <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">Add gift wrap</div>
                <div className="text-[10px] text-slate-500">Hand wrapped as a gift</div>
            </div>
             <div className="text-xs font-bold text-slate-900">€2.99</div>
        </div>
    </BundleCardBase>
);

// Variant 4: Complete the Bundle
const CardBundleUpsell = () => (
    <BundleCardBase>
         <div className="flex items-center justify-between pb-3 border-b border-slate-50 mb-3 opacity-60">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-5 h-5 opacity-50" alt="tshirt"/>
                </div>
                <div>
                      <div className="text-xs font-bold text-slate-900">T-shirt</div>
                      <div className="text-[10px] text-slate-500">Standard</div>
                </div>
             </div>
             <div className="text-xs font-bold text-slate-900">€50.00</div>
         </div>
         {/* Active Bundle Box */}
         <div className="border border-indigo-600 rounded-lg p-3 bg-indigo-50/50 relative">
             <div className="flex items-start gap-3">
                 <div className="mt-0.5 w-4 h-4 rounded-full border-[4px] border-indigo-600 bg-white shrink-0"></div>
                 <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-slate-900">Complete bundle</span>
                        <span className="text-sm font-bold text-slate-900">€75.00</span>
                     </div>
                      <div className="text-[10px] text-emerald-600 font-bold mb-3">Save €25.00!</div>
                      <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center">
                             <img src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-6 h-6" alt="tshirt"/>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-bold">+</div>
                          <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center">
                             <img src="https://cdn-icons-png.flaticon.com/512/599/599388.png" className="w-6 h-6 opacity-80" alt="shorts"/>
                          </div>
                      </div>
                 </div>
             </div>
         </div>
    </BundleCardBase>
);

// Variant 5: BOGO
const CardBogo = () => (
    <BundleCardBase>
        <div className="space-y-2">
            {/* Active State: Changed from Black to Light Blue (Indigo) */}
            <div className="bg-indigo-50 border border-indigo-600 text-slate-900 p-3 rounded-lg flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-3">
                     {/* Radio Button: Matching the BundleUpsell style (Indigo ring, white center) */}
                     <div className="w-4 h-4 rounded-full border-[4px] border-indigo-600 bg-white"></div>
                     <div>
                         <div className="text-xs font-bold text-slate-900">Buy 1, get 1 free</div>
                         <div className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded w-fit mt-0.5 font-bold">SAVE 50%</div>
                     </div>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">€20,00</div>
                    {/* Strikethrough color updated for light background */}
                    <div className="text-[10px] text-slate-400 line-through">€40,00</div>
                 </div>
            </div>

            {/* Inactive State (Unchanged) */}
            <div className="p-3 rounded-lg border border-slate-100 flex items-center justify-between opacity-60">
                 <div className="flex items-center gap-3">
                     <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                     <div>
                         <div className="text-xs font-bold text-slate-900">Buy 2, get 3 free</div>
                         <div className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded w-fit mt-0.5">SAVE 60%</div>
                     </div>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">€40,00</div>
                 </div>
            </div>
            
            <div className="mt-2 bg-emerald-50 text-emerald-700 text-[10px] font-bold p-2 text-center rounded border border-emerald-100">
                + FREE 50pcs sticker pack included!
            </div>
        </div>
    </BundleCardBase>
);

// Variant 6: Pill Selector
const CardPillSelector = () => (
    <BundleCardBase>
        <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg">
                <div className="w-8 h-10 bg-slate-200 rounded-sm rotate-3"></div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">1 pack</span>
                        <span className="text-[9px] bg-slate-100 font-bold px-1.5 rounded">SAVE 18$</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Standard price</div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">€29.00</div>
                    <div className="text-[10px] text-slate-400 line-through">€47.00</div>
                </div>
            </div>
            <div className="relative flex items-center gap-3 p-2 border-2 border-slate-900 rounded-lg bg-slate-50 overflow-hidden">
                <div className="absolute -right-8 top-4 bg-orange-500 text-white text-[9px] font-bold px-8 py-0.5 rotate-45 shadow-sm">
                   POPULAR
                </div>
                <div className="flex -space-x-4">
                      <div className="w-8 h-10 bg-indigo-200 rounded-sm rotate-[-6deg] shadow-sm z-10 border border-white"></div>
                      <div className="w-8 h-10 bg-indigo-200 rounded-sm rotate-[12deg] shadow-sm border border-white"></div>
                </div>
                <div className="flex-1 pl-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">2 pack</span>
                        <span className="text-[9px] bg-white border border-slate-200 font-bold px-1.5 rounded">SAVE 45$</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">You save 15%</div>
                </div>
                <div className="text-right pr-6">
                    <div className="text-sm font-bold text-slate-900">€49.00</div>
                    <div className="text-[10px] text-slate-400 line-through">€94.00</div>
                </div>
            </div>
            <div className="pt-2">
                <div className="text-[10px] font-bold text-slate-400 mb-1">Size, Color</div>
                <div className="flex gap-2">
                    <div className="flex-1 bg-white border border-slate-200 rounded h-8 flex items-center px-2 text-[10px]">
                        Medium <ChevronDown className="ml-auto w-3 h-3 text-slate-400"/>
                    </div>
                    <div className="flex gap-1 items-center bg-white border border-slate-200 rounded px-2 h-8">
                        <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </BundleCardBase>
);

const HeroBundleVisuals = () => (
  <motion.div 
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    className="flex w-full h-full p-4 lg:p-0 relative items-start justify-center overflow-hidden"
  >
    {/* Background Decorative Element */}
    <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
    >
       <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]"></div>
    </motion.div>

    {/* The Masonry Grid */}
    <motion.div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl transform scale-90 md:scale-95 origin-center items-start"
    >
       
       {/* Left Column - HIDDEN ON MOBILE */}
       <div className="hidden md:flex flex-col gap-6">
           <CardVolumeSelector />
           {/* Inner wrapper for spacing between GiftWrap and GridPricing */}
           <div className="hidden md:flex flex-col gap-6">
                <CardGiftWrap />
                <CardGridPricing />
           </div>
       </div>

       {/* Right Column */}
       <div className="flex flex-col gap-6">
           {/* Bundle Upsell - HIDDEN ON MOBILE */}
           <div className="hidden md:block">
               <CardBundleUpsell />
           </div>

           {/* Pill Selector - VISIBLE ON MOBILE (This is the "Last Widget") */}
           <CardPillSelector />
           
           <div className="hidden md:block">
                <CardBogo />
           </div>
       </div>
    </motion.div>
  </motion.div>
);

// --- Feature Preview Components (The Dynamic Right Column) ---

const PreviewContainer = ({ children }) => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-[20px] shadow-xl border border-slate-100 p-4 md:p-6 w-full max-w-full md:max-w-[400px] mx-auto font-sans"
    >
        {children}
        {/* NEW: Smart Add To Cart Button Implementation */}
        <div className="mt-5">
           <SmartAddToCartButton text="Add To Cart" price="€59.50" />
        </div>
    </motion.div>
);

// 1. Quantity Breaks Preview
export const QuantityBreaksPreview = memo(() => (
    <PreviewContainer>
        <div className="space-y-3">
            {/* Single Item - Inactive */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-transparent">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" 
                            className="w-9 h-9 brightness-0 opacity-90" 
                            alt="shirt" 
                        />
                    </div>
                    <div>
                        <div className="font-bold text-slate-900 text-base">Single</div>
                        <div className="text-xs text-slate-500 font-medium">Standard price</div>
                    </div>
                </div>
                <div className="font-bold text-slate-900 text-base">€35.00</div>
            </div>

            {/* Selected Item (Duo) - Active */}
            <motion.div 
                layoutId="active-selection"
                className="relative p-4 rounded-xl bg-white border-2 border-slate-900 shadow-sm z-10"
            >
                {/* Badge */}
                <div className="absolute -top-3 -right-2 transform rotate-3 z-20">
                    <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md border-[1.5px] border-white">
                        Most Popular <Star size={8} fill="currentColor" className="text-white" />
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center relative">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" 
                                className="w-9 h-9 brightness-0" 
                                alt="shirt" 
                            />
                            {/* Shadow duplication for effect */}
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" 
                                className="w-9 h-9 brightness-0 absolute -right-2 top-1 opacity-30 -z-10" 
                                alt="shirt-shadow" 
                            />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900 text-lg">Duo</div>
                            <div className="text-xs text-emerald-600 font-bold">You save 15%</div>
                        </div>
                    </div>
                    <div className="text-right leading-tight">
                        <div className="font-bold text-slate-900 text-lg">€59.50</div>
                        <div className="text-xs text-slate-400 line-through decoration-slate-400">€70.00</div>
                    </div>
                </div>
                 
                {/* Selectors */}
                <div className="space-y-2.5 pt-1">
                    {/* Row 1 */}
                    <div className="flex items-center justify-between gap-2">
                         <span className="text-[11px] font-bold text-slate-400 w-4">#1</span>
                         <div className="relative flex-1">
                            <select className="w-full appearance-none bg-white border border-slate-200 rounded-md py-1.5 px-3 text-sm text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer">
                                <option>Medium</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <ChevronDown size={14} />
                            </div>
                         </div>
                         <div className="flex gap-1.5 items-center bg-white border border-slate-200 rounded-md p-1 pl-1.5 pr-1.5 h-[34px]">
                             <div className="w-5 h-5 rounded-full bg-black ring-1 ring-slate-200 cursor-pointer relative flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                             </div>
                             <div className="w-5 h-5 rounded-full bg-[#EF4444] ring-1 ring-slate-200 cursor-pointer hover:opacity-80"></div>
                             <div className="w-5 h-5 rounded-full bg-[#3B82F6] ring-1 ring-slate-200 cursor-pointer hover:opacity-80"></div>
                         </div>
                    </div>
                    {/* Row 2 */}
                    <div className="flex items-center justify-between gap-2">
                         <span className="text-[11px] font-bold text-slate-400 w-4">#2</span>
                         <div className="relative flex-1">
                            <select className="w-full appearance-none bg-white border border-slate-200 rounded-md py-1.5 px-3 text-sm text-slate-700 focus:outline-none focus:border-slate-400 cursor-pointer">
                                <option>Large</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <ChevronDown size={14} />
                            </div>
                         </div>
                         <div className="flex gap-1.5 items-center bg-white border border-slate-200 rounded-md p-1 pl-1.5 pr-1.5 h-[34px]">
                             <div className="w-5 h-5 rounded-full bg-black ring-1 ring-slate-200 cursor-pointer hover:opacity-80"></div>
                             <div className="w-5 h-5 rounded-full bg-[#EF4444] ring-1 ring-slate-200 cursor-pointer relative flex items-center justify-center">
                                 <div className="w-2.5 h-2.5 bg-transparent border-2 border-white rounded-full shadow-sm"></div>
                             </div>
                             <div className="w-5 h-5 rounded-full bg-[#3B82F6] ring-1 ring-slate-200 cursor-pointer hover:opacity-80"></div>
                         </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </PreviewContainer>
));

// 2. BOGO / Tiered Preview
export const BogoPreview = memo(() => (
    <PreviewContainer>
          <div className="space-y-3">
            {[
                { title: 'Buy 1, get 1 free', save: 'SAVE 50%', price: '€20,00', old: '€40,00', active: true },
                { title: 'Buy 2, get 3 free', save: 'SAVE 60%', price: '€40,00', old: '€100,00', active: false },
                { title: 'Buy 3, get 6 free', save: 'SAVE 66%', price: '€60,00', old: '€180,00', active: false },
            ].map((item, i) => (
                <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${item.active ? 'bg-white border-slate-900 border-[1.5px] shadow-sm z-10' : 'bg-slate-50 border-transparent hover:border-slate-300'}`}
                >
                    <div className="flex items-center gap-3">
                         {/* Radio Button */}
                         <div className={`w-5 h-5 rounded-full flex items-center justify-center border bg-white ${item.active ? 'border-slate-900' : 'border-slate-300'}`}>
                            {item.active && <motion.div layoutId="radio-dot" className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
                         </div>
                         <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-[2px] rounded ${item.active ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-600'}`}>{item.save}</span>
                            </div>
                         </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-slate-900 text-base">{item.price}</div>
                        <div className="text-[10px] text-slate-400 line-through">{item.old}</div>
                    </div>
                </motion.div>
            ))}
            
            {/* Free Gift Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-600 p-3 text-center text-xs font-bold text-white rounded-lg shadow-sm flex items-center justify-center gap-1 mt-4"
            >
                 + FREE special gift worth €15,00!
            </motion.div>
         </div>
    </PreviewContainer>
));

// 3. Upsell / Bundle Preview
export const BundleUpsellPreview = memo(() => (
    <PreviewContainer>
        <div className="space-y-4">
            {/* Main Product - Passive */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent">
                <div className="flex items-center gap-3">
                     <div className="w-10 h-10 flex items-center justify-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/3345/3345350.png" className="w-8 h-8 opacity-75" alt="shirt" />
                     </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-base">T-shirt</h4>
                        <div className="text-xs text-slate-500 font-medium">Standard price</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-bold text-slate-900 text-lg">€50.00</div>
                    <div className="text-xs text-slate-400 line-through decoration-slate-400">€65.00</div>
                </div>
            </div>

            {/* The Bundle Box - Active */}
            <div className="p-4 rounded-xl border-[1.5px] border-slate-900 bg-white shadow-sm relative">
                 {/* Header */}
                 <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3">
                         {/* Radio */}
                         <div className="w-5 h-5 rounded-full border-[6px] border-slate-900 bg-white"></div>
                         <div>
                             <div className="font-bold text-slate-900 text-base leading-none mb-1">Complete the bundle</div>
                             <div className="text-[11px] text-emerald-600 font-bold">Save €25.00!</div>
                         </div>
                     </div>
                      <div className="text-right leading-none">
                        <div className="font-bold text-slate-900 text-lg">€75.00</div>
                        <div className="text-[11px] text-slate-400 line-through decoration-slate-400">€100.00</div>
                    </div>
                 </div>

                 {/* Products Grid */}
                 <div className="flex items-start justify-between relative pt-2">
                      {/* Left Item */}
                      <div className="flex flex-col items-center w-[46%] text-center">
                           <div className="w-16 h-16 bg-transparent flex items-center justify-center mb-1">
                                <img src="https://cdn-icons-png.flaticon.com/512/3345/3345350.png" className="w-14 h-14 object-contain" alt="shirt" />
                           </div>
                           <div className="text-xs font-bold text-slate-900 mb-0.5">T-shirt</div>
                           <div className="text-[10px] space-x-1 mb-2">
                                <span className="font-bold text-slate-900">€50.00</span> 
                                <span className="line-through text-slate-400">€65.00</span>
                           </div>
                           <div className="relative w-full">
                                <select className="w-full text-[11px] border border-slate-300 rounded py-1 pl-2 pr-4 bg-white text-left font-medium appearance-none">
                                    <option>Large</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <ChevronDown size={12} />
                                </div>
                           </div>
                      </div>

                      {/* Plus Icon Divider */}
                      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 z-10">
                          <div className="bg-slate-400 rounded-full p-1 text-white border-[3px] border-white shadow-sm">
                              <Plus size={12} strokeWidth={4} />
                          </div>
                      </div>

                      {/* Right Item */}
                      <div className="flex flex-col items-center w-[46%] text-center">
                           <div className="w-16 h-16 bg-transparent flex items-center justify-center mb-1">
                                <img src="https://cdn-icons-png.flaticon.com/512/599/599388.png" className="w-12 h-12 object-contain brightness-0 opacity-80" alt="shorts" />
                           </div>
                           <div className="text-xs font-bold text-slate-900 mb-0.5">Shorts</div>
                           <div className="text-[10px] space-x-1 mb-2">
                                <span className="font-bold text-slate-900">€25.00</span> 
                                <span className="line-through text-slate-400">€35.00</span>
                           </div>
                           <div className="relative w-full">
                                <select className="w-full text-[11px] border border-slate-300 rounded py-1 pl-2 pr-4 bg-white text-left font-medium appearance-none">
                                    <option>Large</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <ChevronDown size={12} />
                                </div>
                           </div>
                      </div>
                 </div>
            </div>
        </div>
    </PreviewContainer>
));

// 4. Volume / Subscription Preview
export const MixMatchPreview = memo(() => (
    <PreviewContainer>
          <div className="space-y-3">
             {/* Standard Option */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors group">
                <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full border border-slate-300 group-hover:border-slate-400"></div>
                     <div>
                        <div className="font-bold text-slate-900 text-base">One-time purchase</div>
                        <div className="text-xs text-slate-500">Standard price</div>
                    </div>
                </div>
                <div className="font-bold text-slate-900 text-lg">€35.00</div>
            </div>

            {/* Subscribe Option */}
            <div className="relative p-4 rounded-xl bg-white border-2 border-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-[6px] border-slate-900 bg-white"></div>
                        <div>
                             <div className="flex items-center gap-2">
                                <div className="font-bold text-slate-900 text-base">Subscribe & Save</div>
                                <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">BEST VALUE</span>
                             </div>
                        </div>
                    </div>
                     <div className="text-right leading-tight">
                        <span className="font-bold text-slate-900 text-xl">€26.25</span>
                        <div className="text-xs text-slate-400 line-through decoration-slate-400">€35.00</div>
                    </div>
                </div>
                 
                <div className="relative mt-2">
                    <select className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-4 text-sm font-medium text-slate-700 focus:outline-none focus:border-slate-900 transition-colors cursor-pointer">
                        <option>Delivery every month - 25% OFF</option>
                        <option>Delivery every 2 months - 20% OFF</option>
                    </select>
                    <div className="absolute right-3 top-3 pointer-events-none">
                        <RefreshCw size={14} className="text-slate-400" />
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <Check size={10} className="text-emerald-600" strokeWidth={4} /> No commitment, cancel anytime.
                </div>
            </div>
         </div>
    </PreviewContainer>
));

// --- SECTION: CUSTOMIZATION VISUALIZER ---
const CustomizationSection = memo(() => {
    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="py-12 md:py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
                    
                    {/* Left Column: Visual Mockup */}
                    <motion.div 
                        variants={fadeInUp}
                        className="w-full lg:w-7/12 relative"
                    >
                        {/* Background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="relative">
                            {/* The Editor Card (Background Layer) */}
                            <motion.div 
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 0.9 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="absolute -left-4 -top-8 w-64 bg-white rounded-xl shadow-lg border border-slate-100 p-4 hidden md:block z-0 transform -rotate-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-slate-400 uppercase">Layout</div>
                                        <div className="h-8 bg-slate-100 rounded flex items-center px-2 text-xs text-slate-500">List View</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase mt-2">Main Color</div>
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-900 ring-2 ring-offset-2 ring-slate-200"></div>
                                            <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                                            <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* The Main Preview Card */}
                            <motion.div 
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-full md:max-w-[420px] mx-auto z-10 overflow-hidden"
                            >
                                <div className="bg-slate-50 border-b border-slate-100 py-3 text-center">
                                    <h4 className="font-extrabold text-sm tracking-widest text-slate-900">BUY MORE = SAVE MORE</h4>
                                </div>

                                <div className="p-4 md:p-5 space-y-4">
                                    {/* Item 1 */}
                                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="flex items-center gap-3">
                                            <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-10 h-10 object-contain" alt="shirt" />
                                            <div>
                                                <div className="font-bold text-slate-900">Single</div>
                                                <div className="text-xs text-slate-500">Standard price</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-slate-900">€35.00</div>
                                    </div>

                                    {/* Item 2 (Active/Selected) */}
                                    <div className="relative bg-white border-2 border-slate-900 rounded-xl p-4 shadow-sm">
                                        <div className="absolute -top-3 -right-2">
                                            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md rotate-3">
                                                Most Popular <Star size={8} fill="currentColor" />
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-10 h-10 object-contain" alt="shirt" />
                                                <div>
                                                    <div className="font-bold text-slate-900">Duo</div>
                                                    <div className="text-xs text-emerald-600 font-bold">You save 15%</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900">€59.50</div>
                                                <div className="text-xs text-slate-400 line-through">€70.00</div>
                                            </div>
                                        </div>

                                        <div className="pl-[52px] space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-4">#1</span>
                                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs flex justify-between items-center text-slate-700">
                                                    Medium <ChevronDown size={12} />
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <div className="w-5 h-5 rounded-full bg-slate-900 ring-1 ring-offset-1 ring-slate-300"></div>
                                                    <div className="w-5 h-5 rounded-full bg-red-500 border border-slate-200 opacity-50"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 w-4">#2</span>
                                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs flex justify-between items-center text-slate-700">
                                                    Large <ChevronDown size={12} />
                                                </div>
                                                <div className="flex gap-1.5">
                                                    <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-200 opacity-50"></div>
                                                    <div className="w-5 h-5 rounded-full bg-red-500 ring-1 ring-offset-1 ring-slate-300"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 3 (Bonus) */}
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700">
                                                <Gift size={16} />
                                            </div>
                                            <div className="text-xs font-bold text-emerald-800">+ Free 50pcs sticker pack!</div>
                                        </div>
                                        <CheckCircle2 size={16} className="text-emerald-600" />
                                    </div>

                                    {/* UPDATED: Smart Add To Cart Button */}
                                    <div className="mt-4">
                                       <SmartAddToCartButton text="Add To Cart" price="€59.50" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        <motion.div 
                            variants={scaleIn}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transform -rotate-3"
                        >
                            <PenTool size={24} />
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight tracking-tight">
                                Looks Native. <br/>Feels Custom. <br/>Zero Code.
                            </h2>
                            
                            <p className="text-lg text-slate-600 leading-relaxed mt-4">
                                Don't ruin your store's aesthetic with ugly widgets. Our editor lets you match your brand's fonts, colors, and style pixel-perfectly. It looks like you hired a developer, but it takes seconds.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
});

// --- SECTION: FREE GIFT WITH BUNDLES ---
const FreeGiftSection = memo(() => {
    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="py-12 md:py-24 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    
                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-5/12 space-y-6">
                        <motion.div 
                            variants={scaleIn}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-400/30"
                        >
                            <Gift size={24} />
                        </motion.div>
                        
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight tracking-tight">
                                The Secret to Higher Conversion? Free Gifts.
                            </h2>
                            
                            <p className="text-lg text-slate-600 leading-relaxed mt-4">
                               People love free stuff. Nudge customers to spend just a little more to unlock a free gift. It’s the easiest way to turn a $40 order into a $60 order.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Mockup */}
                    <motion.div 
                        variants={fadeInUp}
                        className="w-full lg:w-7/12"
                    >
                        <div className="bg-slate-50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 flex items-center justify-center">
                            
                            <div className="bg-white w-full max-w-full md:max-w-[420px] rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                                {/* Header with A/B Test Button */}
                                <div className="p-4 flex items-center justify-between border-b border-slate-100">
                                    <span className="font-bold text-slate-800 text-sm">Preview</span>
                                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                        Run A/B test
                                    </button>
                                </div>

                                <div className="p-4 md:p-6">
                                    <div className="flex items-center justify-between mb-5">
                                         <div className="h-px bg-slate-200 flex-1"></div>
                                         <span className="px-3 font-extrabold text-sm tracking-widest text-slate-900 uppercase">Bundle & Save</span>
                                         <div className="h-px bg-slate-200 flex-1"></div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Option 1 */}
                                        <div className="border border-slate-200 rounded-lg p-4 flex items-start justify-between cursor-pointer hover:border-slate-300 transition-colors">
                                            <div className="flex gap-4">
                                                <Circle size={20} className="text-slate-300 mt-1" />
                                                <div>
                                                    <div className="font-bold text-slate-900 text-lg">Buy 3, get 2 free!</div>
                                                    <div className="text-sm text-slate-500">Limited time offer!</div>
                                                </div>
                                            </div>
                                            <div className="font-bold text-slate-900 text-lg">€35.00</div>
                                        </div>

                                        {/* Option 2 (Active with Gift) */}
                                        <div className="border-2 border-slate-900 rounded-lg p-4 relative bg-white">
                                            {/* Badge */}
                                            <div className="absolute -top-3 -right-2 transform rotate-6">
                                                <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-white/20">
                                                    <span className="flex flex-col items-center leading-none">
                                                        <span>Most</span>
                                                        <span>Popular</span>
                                                    </span>
                                                    <Star size={8} fill="currentColor" />
                                                </div>
                                            </div>

                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex gap-4">
                                                    <div className="mt-1 relative">
                                                        <Circle size={20} className="text-slate-900" />
                                                        <div className="absolute inset-0 m-auto w-3 h-3 bg-slate-900 rounded-full"></div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="font-bold text-slate-900 text-lg">2x Body Wash</div>
                                                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">-15%</span>
                                                        </div>
                                                        <div className="text-sm text-slate-500">€29.75 per bottle</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-slate-900 text-lg">€59.50</div>
                                                    <div className="text-xs text-slate-400 line-through">€70.00</div>
                                                </div>
                                            </div>
                                            
                                            <div className="pl-9 space-y-2 mb-4">
                                                <div className="flex gap-4 text-sm text-slate-500">
                                                    <span>Size, Color</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-xs font-bold text-slate-400 pt-2 w-4">#1</span>
                                                    <select className="flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm outline-none"><option>250 ml</option></select>
                                                    <select className="flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm outline-none"><option>Citrus</option></select>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="text-xs font-bold text-slate-400 pt-2 w-4">#2</span>
                                                    <select className="flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm outline-none"><option>100 ml</option></select>
                                                    <select className="flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 text-sm outline-none"><option>Floral</option></select>
                                                </div>
                                            </div>

                                            {/* THE FREE GIFT TOAST - ANIMATED */}
                                            <motion.div 
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                whileInView={{ scale: 1.0, opacity: 1 }}
                                                transition={{ delay: 0.5, type: "spring" }}
                                                className="bg-orange-600 rounded-lg p-2.5 flex items-center gap-3 shadow-md mx-[-8px] mb-[-8px] relative z-10 translate-y-2 border-4 border-white ring-1 ring-slate-100"
                                            >
                                                <div className="w-10 h-10 bg-white/90 rounded flex items-center justify-center shrink-0 shadow-sm transform -rotate-6 border border-slate-200">
                                                     {/* Jar Icon simulation */}
                                                     <div className="w-6 h-7 border-2 border-slate-900 rounded-sm bg-blue-100 relative">
                                                        <div className="absolute top-0 w-full h-1 bg-slate-900"></div>
                                                     </div>
                                                </div>
                                                <div className="text-white font-bold text-sm leading-tight">
                                                    + FREE Body scrub for silky & shiny skin
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Option 3 */}
                                        <div className="border border-slate-200 rounded-lg p-4 flex items-start justify-between cursor-pointer hover:border-slate-300 transition-colors mt-6">
                                            <div className="flex gap-4">
                                                <Circle size={20} className="text-slate-300 mt-1" />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-bold text-slate-900 text-lg">5x Body Wash</div>
                                                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">-57%</span>
                                                    </div>
                                                    <div className="text-sm text-slate-500">€20.00 per bottle</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-slate-900 text-lg">€100.00</div>
                                                <div className="text-xs text-slate-400 line-through">€175.00</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
});

// --- SECTION: TESTIMONIALS ---
const TestimonialsSection = memo(() => {
    const reviews = [
        {
            text: "Best app out there and fantastic service!",
            author: "Clepers",
            icon: <Store size={20} />,
            color: "bg-orange-50 text-orange-600"
        },
        {
            text: "This is app is the best made me over €20K!, And always great Service from Paulius",
            author: "Máson-Amsterdam",
            icon: <Globe size={20} />,
            color: "bg-indigo-50 text-indigo-600"
        },
        {
            text: "I would highly recommend this app plus their support, Sir Jonas helped me out within a few minutes.",
            author: "PremiumTrends",
            icon: <Type size={20} />,
            color: "bg-slate-100 text-slate-600"
        },
        {
            text: "Amazing App. I was looking so long exactly for this what the App can Do.",
            author: "snusprime",
            icon: <Package size={20} />,
            color: "bg-emerald-50 text-emerald-600"
        }
    ];

    return (
        <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="py-12 md:py-24 bg-slate-50/50 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Area */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <motion.div variants={fadeInUp} className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight tracking-tight mb-4">
                            Loved by 40,000+ Scaling Brands
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            Don't just take our word for it. See why we're rated 5 stars on the Shopify App Store.
                        </p>
                        <Button variant="dark">
                            Explore apps <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </motion.div>

                    {/* Illustration Placeholder */}
                    <div className="hidden md:block relative w-64 h-48">
                        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <motion.div 
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="relative"
                            >
                                <User size={120} strokeWidth={1} className="text-slate-900" />
                                <div className="absolute top-0 -right-8 transform -rotate-12">
                                     <Megaphone size={80} strokeWidth={1.5} className="text-indigo-600 fill-indigo-100" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll / Carousel */}
                <div className="relative -mx-6 px-6 overflow-x-auto pb-8 hide-scrollbar">
                      <motion.div 
                        variants={staggerContainer}
                        className="flex gap-6 w-max"
                      >
                          {reviews.map((review, i) => (
                            <motion.div 
                                key={i} 
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="w-[300px] md:w-[350px] bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
                            >
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[1,2,3,4,5].map(s => (
                                            <Star key={s} size={16} className="text-orange-400 fill-orange-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed mb-6">
                                        "{review.text}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${review.color}`}>
                                        {review.icon}
                                    </div>
                                    <span className="font-bold text-slate-900 text-sm">{review.author}</span>
                                </div>
                            </motion.div>
                        ))}
                      </motion.div>
                </div>

            </div>
            
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.section>
    );
});

// --- SECTION: SETUP VISUALIZER ---
const SetupPreviewSection = memo(() => {
  return (
    <section className="py-12 md:py-24 bg-[#F9FAFB] overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight"
          >
            Launch Your First Bundle Before Your Coffee Cools
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Complex logic, simple setup. Whether you need a simple percentage discount or advanced tier rules, our visual editor makes it effortless.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* Left Column: Text & Features */}
          <div className="w-full lg:w-5/12 space-y-8 lg:sticky lg:top-24 pt-4">
            <motion.div 
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white shadow-xl shadow-slate-200"
            >
              <Settings size={26} strokeWidth={1.5} />
            </motion.div>
            
            <motion.div 
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                viewport={{ once: true }}
                className="space-y-6"
            >
              <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-slate-900 leading-tight">
                No Developers.<br/>No Coding. <br/>Just Sales.
              </motion.h3>
              <motion.p variants={fadeInUp} className="text-slate-600 leading-relaxed text-lg">
                Stop relying on expensive agencies. Take control of your promotions with a drag-and-drop interface designed for merchants, not engineers.
              </motion.p>
              
              <ul className="space-y-4">
                  {[
                      "Real-time visual preview", 
                      "One-click installation",
                      "Smart inventory syncing"
                  ].map((item, i) => (
                      <motion.li variants={fadeInUp} key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                              <Check size={14} strokeWidth={3} />
                          </div>
                          {item}
                      </motion.li>
                  ))}
              </ul>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="pt-6 flex flex-col sm:flex-row gap-4"
            >
                <Button variant="accent">
                    Start 14-Day Trial
                </Button>
                <Button variant="secondary">
                    View Documentation
                </Button>
            </motion.div>
          </div>

          {/* Right Column: Visual Editor Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-7/12 relative perspective-1000"
          >
            
            {/* Abstract Decorative blobs behind */}
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -bottom-8 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></motion.div>

            <div className="relative flex flex-col md:flex-row items-start gap-6">
              
              {/* --- The Editor Card (Left) --- */}
              <div className="flex-1 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden w-full z-10">
                {/* Editor Header */}
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white shadow-md shadow-indigo-200">
                             <LayoutTemplate size={18} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="font-bold text-slate-900 text-sm">Configure Bundle #3</div>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">Editing "Trio Pack"</div>
                        </div>
                    </div>
                    <div className="p-2 hover:bg-slate-50 rounded-full cursor-pointer transition-colors">
                        <MoreHorizontal size={18} className="text-slate-400" />
                    </div>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Inputs Row 1: Qty & Title */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              Qty <HelpCircle size={10} className="text-slate-300" />
                          </label>
                          <input 
                            type="number" 
                            defaultValue="3" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-0 focus:border-transparent outline-none font-bold text-center shadow-sm transition-all" 
                          />
                      </div>
                      <div className="flex-1 space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bundle Title</label>
                          <input 
                            type="text" 
                            defaultValue="Trio Pack" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-0 focus:border-transparent outline-none font-medium placeholder-slate-400 shadow-sm transition-all" 
                          />
                      </div>
                    </div>

                    {/* Inputs Row 2: Discount Logic Group */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                          <span>Discount Logic</span>
                          <span className="text-indigo-600 cursor-pointer hover:underline text-[10px]">Edit rules</span>
                      </label>
                      <div className="relative flex items-center shadow-sm rounded-lg flex-wrap sm:flex-nowrap">
                        <div className="relative w-full sm:w-auto">
                            <select className="w-full sm:w-auto appearance-none bg-indigo-50 border border-indigo-100 rounded-lg sm:rounded-l-lg sm:rounded-r-none pl-3 pr-8 py-2.5 text-indigo-700 text-sm font-bold focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none cursor-pointer hover:bg-indigo-100 transition-colors z-10 relative">
                                <option>Percentage</option>
                                <option>Fixed Amount</option>
                                <option>Fixed Price</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-indigo-400 z-20 pointer-events-none" />
                        </div>
                        <div className="flex flex-1 w-full sm:w-auto mt-2 sm:mt-0">
                            <input 
                                type="text" 
                                defaultValue="25" 
                                className="flex-1 border border-slate-200 sm:border-l-0 px-3 py-2.5 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none z-0 rounded-l-lg sm:rounded-l-none" 
                            />
                            <div className="bg-slate-50 border-y border-r border-slate-200 rounded-r-lg px-4 py-2.5 text-slate-500 text-xs font-bold tracking-wide border-l border-slate-200 sm:border-l-0">
                                % OFF
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs Row 3: Badge Label with Color Dot */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Badge Styling</label>
                      <div className="relative">
                          <input 
                            type="text" 
                            defaultValue="Best Value" 
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 pl-10 text-slate-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none shadow-sm font-medium" 
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-slate-900 border border-slate-200 cursor-pointer hover:scale-110 transition-transform shadow-sm"></div>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-700">Allow variant selection</span>
                          <HelpCircle size={12} className="text-slate-400" />
                      </div>
                      <div className="w-10 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner transition-colors">
                          <motion.div layoutId="toggle" className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Icon Actions - Colorful Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button whileHover={{scale: 1.05}} className="flex flex-col items-center justify-center gap-2 py-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] font-bold text-blue-600 uppercase tracking-wide hover:bg-blue-100 hover:shadow-sm transition-all">
                          <Globe size={18} /> Translation
                      </motion.button>
                      <motion.button whileHover={{scale: 1.05}} className="flex flex-col items-center justify-center gap-2 py-3 bg-pink-50 border border-pink-100 rounded-xl text-[10px] font-bold text-pink-600 uppercase tracking-wide hover:bg-pink-100 hover:shadow-sm transition-all">
                          <ImageIcon size={18} /> Image
                      </motion.button>
                      <motion.button whileHover={{scale: 1.05}} className="flex flex-col items-center justify-center gap-2 py-3 bg-amber-50 border border-amber-100 rounded-xl text-[10px] font-bold text-amber-600 uppercase tracking-wide hover:bg-amber-100 hover:shadow-sm transition-all">
                          <Gift size={18} /> Free Gift
                      </motion.button>
                    </div>
                    
                    <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold py-3.5 rounded-xl hover:from-black hover:to-slate-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm mt-2 group">
                        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" /> Add Another Tier
                    </motion.button>
                </div>
              </div>

              {/* --- Floating Preview Card (Right Side) --- */}
              <motion.div 
                initial={{ opacity: 0, x: -20, rotate: 0 }}
                whileInView={{ opacity: 1, x: 0, rotate: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hidden md:block absolute -right-12 top-24 w-[340px] z-20"
               >
                  {/* Connection Line Visual */}
                  <div className="absolute top-12 -left-8 w-8 h-[2px] border-t-2 border-dashed border-slate-300"></div>
                  <div className="absolute top-[42px] -left-10 bg-white border border-slate-200 text-slate-400 rounded-full p-1 shadow-sm">
                      <MousePointer2 size={12} fill="currentColor" />
                  </div>

                  <div className="bg-white rounded-[20px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] border border-slate-100 p-5 transform hover:rotate-0 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-5">
                         <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Live Preview</span>
                         <div className="text-xs font-bold text-slate-900">Total: €78.75</div>
                      </div>
                      
                      <div className="space-y-3">
                        
                        {/* 1. Single Item (Inactive) */}
                        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 opacity-60 grayscale-[0.5]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 flex items-center justify-center bg-white rounded border border-slate-200">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-6 h-6 object-contain opacity-50" alt="shirt"/>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Single</div>
                                    <div className="text-[10px] text-slate-500">Standard Price</div>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-slate-900">€35.00</div>
                        </div>

                        {/* 2. Duo Item (Inactive) */}
                          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 opacity-60 grayscale-[0.5]">
                            <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 flex items-center justify-center bg-white rounded border border-slate-200">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-6 h-6 object-contain opacity-50" alt="shirt"/>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Duo</div>
                                    <div className="text-[10px] text-slate-500">Save 10%</div>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-slate-900">€63.00</div>
                        </div>

                          {/* 3. Trio Item (ACTIVE - Matches Editor) */}
                        <motion.div 
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="relative p-3 rounded-xl bg-white border-2 border-slate-900 shadow-lg"
                        >
                             <div className="absolute -top-2.5 -right-2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">
                                 Best Value
                             </div>

                             <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg">
                                        <img src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png" className="w-7 h-7 object-contain" alt="shirt"/>
                                    </div>
                                    <div>
                                        <div className="text-base font-bold text-slate-900 leading-tight">Trio Pack</div>
                                        <div className="text-[10px] font-bold text-emerald-600">You save 25%</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-slate-900">€78.75</div>
                                    <div className="text-[10px] text-slate-400 line-through">€105.00</div>
                                </div>
                            </div>
                            
                            {/* Detailed Selectors for Active Item */}
                            <div className="space-y-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-bold text-slate-400 w-3">#1</span>
                                     <div className="flex-1 h-7 bg-white border border-slate-200 rounded flex items-center px-2 justify-between text-[10px] font-medium text-slate-600">
                                        Medium / Black <ChevronDown size={10}/>
                                     </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-bold text-slate-400 w-3">#2</span>
                                     <div className="flex-1 h-7 bg-white border border-slate-200 rounded flex items-center px-2 justify-between text-[10px] font-medium text-slate-600">
                                        Large / White <ChevronDown size={10}/>
                                     </div>
                                </div>
                                 <div className="flex items-center gap-2">
                                     <span className="text-[9px] font-bold text-slate-400 w-3">#3</span>
                                     <div className="flex-1 h-7 bg-white border border-slate-200 rounded flex items-center px-2 justify-between text-[10px] font-medium text-slate-600">
                                        Small / Navy <ChevronDown size={10}/>
                                     </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* NEW: Smart Add To Cart Button */}
                    <div className="mt-4">
                        <SmartAddToCartButton text="Add To Cart" price="€78.75" />
                    </div>
                 </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// --- NEW COMPONENT: FOOTER (Memoized & Redesigned) ---
const Footer = memo(() => {
    // Define links data for cleaner JSX
    const socialLinks = [
        { 
            icon: Linkedin, 
            href: "https://www.linkedin.com/in/jcob-sikorski/", 
            label: "LinkedIn Profile" 
        },
        { 
            icon: Youtube, 
            href: "https://www.youtube.com/@taskleap-ecom", 
            label: "YouTube Channel" 
        }
    ];

    return (
        <footer className="relative bg-white pt-12 md:pt-24 pb-12 overflow-hidden">
             {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                 <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                 <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* 1. BIG CTA CARD */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0F172A] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden mb-16 md:mb-24 shadow-2xl"
                >
                      {/* Abstract Shapes inside CTA */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                         <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
                         <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                      </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-tight">
                            Stop Leaving Money on the Table
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join 40,000+ merchants using TaskLeap to create seamless bundle offers and upsells. Setup takes less than 2 minutes.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_-10px_rgba(249,115,22,0.3)]"
                            >
                                Start 14-Day Free Trial
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                View Live Demo
                            </motion.button>
                        </div>
                        
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-slate-400 font-medium">
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-indigo-400"/> No credit card required</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-indigo-400"/> 24/7 Support</span>
                        </div>
                    </div>
                </motion.div>

                {/* 2. MAIN FOOTER CONTENT */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 border-b border-slate-100 pb-16">
                    
                    {/* Brand Section */}
                    <div className="max-w-md space-y-6">
                        <div className="flex items-center gap-2">
                             {/* UPDATED: LOGO IN FOOTER */}
                             <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-200">
                                <img src="https://ucarecdn.com/52f868d5-f61f-4380-b350-7651ff684aad/-/preview/1000x1000/" alt="TaskLeap Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900">TaskLeap</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">
                            Empowering Shopify merchants with tools to increase average order value and lifetime customer value.
                        </p>
                    </div>

                    {/* Social Icons (UPDATED) */}
                    <div className="flex gap-4">
                        {socialLinks.map((item, i) => (
                            <a 
                                key={i} 
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.label} 
                                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                <item.icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 3. BOTTOM BAR */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 text-center md:text-left">
                    <div>
                        © 2025 TaskLeap LLC All rights reserved.
                    </div>
                    <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
                        <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span>
                        <span className="hover:text-slate-600 transition-colors cursor-pointer">Cookie Settings</span>
                    </div>
                </div>

            </div>
        </footer>
    );
});

// --- NEW: Navbar Component (Isolates Scroll Logic) ---
const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 20) setScrolled(true);
      else setScrolled(false);

      if (currentScroll > 600) setHeroPassed(true);
      else setHeroPassed(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Features', 'Pricing', 'Showcase', 'Blog'];

  return (
    <motion.nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-3' : 'bg-transparent py-5'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* --- Logo Section --- */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            {/* UPDATED: LOGO IN NAVBAR */}
            <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <img src="https://ucarecdn.com/52f868d5-f61f-4380-b350-7651ff684aad/-/preview/1000x1000/" alt="TaskLeap Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TaskLeap Bundles
            </span>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* --- Desktop Actions --- */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors">
              Login
            </button>
            
            <motion.button
              layout
              className={`
                text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md
                ${heroPassed 
                  ? 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700' 
                  : 'bg-slate-900 text-white hover:bg-black' // <--- UPDATED HERE
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </div>

          {/* --- Mobile Hamburger --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu (Dropdown Style) --- */}
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg overflow-hidden"
            >
            <div className="p-4 space-y-2">
                {navLinks.map((item) => (
                <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {item}
                </a>
                ))}
                <div className="pt-4 mt-4 border-t border-slate-100 grid gap-3">
                <button className="w-full py-2.5 text-center font-medium text-slate-600 hover:text-slate-900">
                    Login
                </button>
                <button className="w-full py-2.5 text-center font-medium bg-slate-900 text-white rounded-lg hover:bg-black shadow-sm">
                    Get Started Free
                </button>
                </div>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

// --- NEW: Interactive Features Component (Mobile Optimized Tabs) ---
const InteractiveFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { 
      title: "Volume Discounts", 
      desc: "Sell more units by incentivizing bulk purchases. The more they buy, the more they save.",
      component: <QuantityBreaksPreview />
    },
    { 
      title: "BOGO & Flash Sales", 
      desc: "Clear inventory fast with 'Buy X, Get Y' offers that customers can't resist.",
      component: <BogoPreview />
    },
    { 
      title: "Mix & Match Bundles", 
      desc: "Let customers build their own perfect box. Increase AOV while giving them control.",
      component: <MixMatchPreview />
    },
    { 
      title: "Bought Together", 
      desc: "Amazon-style recommendations. One-click add-ons that instantly boost cart value.",
      component: <BundleUpsellPreview />
    }
  ];

  return (
    // CHANGE IS HERE: Added id="features" and scroll-mt-24
    <section id="features" className="py-12 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 tracking-tight leading-tight">
            Every Bundle Type. <br/> One App.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
          
          {/* Left Column: Navigation Tabs */}
          <div className="w-full lg:w-5/12 flex flex-row lg:flex-col overflow-x-auto gap-4 pb-4 lg:pb-0 hide-scrollbar snap-x">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                onClick={() => setActiveFeature(index)}
                whileTap={{ scale: 0.98 }}
                className={`group p-4 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 border-2 min-w-[280px] lg:min-w-0 snap-center ${
                  activeFeature === index 
                  ? 'bg-indigo-50 border-indigo-600 shadow-lg' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  {activeFeature === index ? (
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-600 flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight size={14} className="text-transparent group-hover:text-indigo-600" />
                    </div>
                  )}
                  <h3 className={`text-lg md:text-xl font-bold ${activeFeature === index ? 'text-slate-900' : 'text-slate-700'}`}>
                    {feature.title}
                  </h3>
                </div>
                <p className={`pl-10 leading-relaxed text-sm md:text-base ${activeFeature === index ? 'text-slate-700' : 'text-slate-500'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Dynamic Preview Area */}
          <div className="w-full lg:w-7/12 lg:sticky lg:top-24">
            <div className="bg-slate-50/50 rounded-[2rem] lg:rounded-[3rem] p-4 sm:p-8 lg:p-16 min-h-[500px] lg:min-h-[600px] flex items-center justify-center relative overflow-hidden border border-slate-100">
              {/* Background Decoration */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"
              />
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full relative z-10"
                >
                  {features[activeFeature].component}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

// --- SECTION: PRICING (Interactive Auto-Scale) ---

// 1. Data Constants (Keep these outside the component)
const AUTO_SCALE_PLAN = {
  name: "AOV Booster (Auto-Scale)",
  handle: "auto-scale",
  amount: 29.99,
  currencyCode: 'USD',
  cappedAmount: 270.00, 
  terms: "Base fee of $29.99/mo. Pricing automatically adjusts based on attributed revenue tiers up to $299/mo.",
};

const TIERS = [
  { name: "Starter", maxRevenue: 5000, price: 29.99 },
  { name: "Basic", maxRevenue: 10000, price: 59.99 },
  { name: "Growth", maxRevenue: 20000, price: 99.00 },
  { name: "Pro", maxRevenue: 30000, price: 149.00 },
  { name: "Scale", maxRevenue: 50000, price: 199.00 },
  { name: "Enterprise", maxRevenue: Infinity, price: 299.00 }
];

const PricingSection = memo(() => {
  const [revenue, setRevenue] = useState(2500); // Default start point
  const [activeTier, setActiveTier] = useState(TIERS[0]);

  // Update tier based on slider logic
  useEffect(() => {
    const foundTier = TIERS.find(t => revenue <= t.maxRevenue) || TIERS[TIERS.length - 1];
    setActiveTier(foundTier);
  }, [revenue]);

  // Utilities for formatting
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  const progressPercent = Math.min(100, (revenue / 55000) * 100); // 55k is slightly over the visual cap for UX

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden" id="pricing">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-slate-50 to-white -z-10"></div>
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                >
                    <Sparkles size={12} /> Fair Pricing Model
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-serif text-slate-900 mb-6"
                >
                    Pay as You Grow. <br/> Capped at $299.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600 leading-relaxed"
                >
                    We charge based on <strong>Attributed Revenue</strong>—money we actually help you make. 
                    <br className="hidden md:block" /> If we don't generate sales, you stay on the base plan.
                </motion.p>
            </div>

            {/* Interactive Calculator Card */}
            <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative z-10"
            >
                <div className="flex flex-col lg:flex-row">
                    
                    {/* LEFT: Controls */}
                    <div className="w-full lg:w-7/12 p-8 md:p-12 lg:border-r border-slate-100">
                        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200/60 mb-8">
                            
                            {/* Revenue Label Display */}
                            <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                        Your Monthly Attributed Revenue
                                    </label>
                                    <div className="flex items-baseline gap-2">
                                        <div className="text-4xl font-bold text-slate-900 tabular-nums">
                                            {formatCurrency(revenue)}
                                        </div>
                                        {revenue >= 50000 && <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded">+ (Capped)</span>}
                                    </div>
                                </div>
                                <div className="text-right hidden sm:block">
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Tier</div>
                                    <div className="text-xl font-bold text-indigo-600">{activeTier.name}</div>
                                </div>
                            </div>

                            {/* The Slider Component */}
                            <div className="relative h-14 flex items-center group">
                                {/* Track Background */}
                                <div className="absolute w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                                        style={{ width: `${progressPercent}%` }}
                                        transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                                    />
                                </div>
                                {/* Native Input (Invisible for Interaction) */}
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="55000" 
                                    step="500"
                                    value={revenue}
                                    onChange={(e) => setRevenue(Number(e.target.value))}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                                />
                                {/* Custom Thumb Handle */}
                                <motion.div 
                                    className="absolute h-8 w-8 bg-white border-[3px] border-indigo-600 rounded-full shadow-lg z-10 pointer-events-none flex items-center justify-center"
                                    style={{ left: `calc(${progressPercent}% - 16px)` }}
                                    transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                                >
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                </motion.div>
                            </div>

                            {/* Scale Markers */}
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide px-1">
                                <span>$0</span>
                                <span>$10k</span>
                                <span>$30k</span>
                                <span>$50k+</span>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block">Full Feature Access</span>
                                    <span className="text-xs text-slate-500 leading-relaxed">No gated features. You get everything from day one.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block">30-Day Guarantee</span>
                                    <span className="text-xs text-slate-500 leading-relaxed">If you don't see ROI, we refund your last payment.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block">Never Overpay</span>
                                    <span className="text-xs text-slate-500 leading-relaxed">Pricing is capped. Make $1M? You still pay $299.</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block">Smart Billing</span>
                                    <span className="text-xs text-slate-500 leading-relaxed">Adjusts automatically at the end of billing cycle.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Price Result */}
                    <div className="w-full lg:w-5/12 bg-slate-900 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                        {/* Abstract background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                        
                        <div className="relative z-10 text-center lg:text-left">
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Estimated Monthly Cost</div>
                            
                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                                <AnimatePresence mode="wait">
                                    <motion.span 
                                        key={activeTier.price}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="text-6xl font-serif font-medium"
                                    >
                                        ${activeTier.price}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-xl text-slate-500 font-medium mt-4">/mo</span>
                            </div>

                            <div className="text-sm text-slate-400 mb-8 border-b border-white/10 pb-8">
                                For revenue between <span className="text-white font-bold">{revenue === 0 ? '$0' : formatCurrency(TIERS[TIERS.indexOf(activeTier)-1]?.maxRevenue || 0)}</span> and <span className="text-white font-bold">{formatCurrency(activeTier.maxRevenue)}</span>
                            </div>

                            {/* --- FIXED BUTTON HERE --- */}
                            <button className="w-full bg-orange-600 hover:bg-indigo-50 text-white hover:text-indigo-700 font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 group">
                                Start 14-Day Free Trial <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </button>
                            
                            <div className="text-center mt-4 text-[10px] text-slate-500">
                                Powered by Shopify Secure Billing
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FAQ Mini Section */}
            <div className="max-w-2xl mx-auto mt-16 space-y-6">
                <div className="text-center mb-8">
                    <h4 className="text-xl font-bold text-slate-900">Common Questions</h4>
                </div>
                <div className="space-y-4">
                    {[
                        { q: "What is 'Attributed Revenue'?", a: "We only count revenue that came directly from a customer interacting with our widgets (bundles, upsells). If they buy organically without clicking our offer, you pay $0 for that order." },
                        { q: "What happens if I exceed $50k revenue?", a: "You hit our Enterprise cap! You will never be charged more than $299/mo, no matter how much you sell." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                            <h5 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                                <HelpCircle size={16} className="text-indigo-500"/> {faq.q}
                            </h5>
                            <p className="text-sm text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
});

// --- Main Application ---

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* 1. NAVBAR (Fixed, triggers pt-24 on main) */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <main className="pt-24">
        <section className="flex flex-col lg:flex-row min-h-[90vh] pt-6 lg:pt-0">
          
          {/* Left Column: Text Content */}
          {/* UPDATED: Removed 'order-2 lg:order-1' so text appears first on mobile naturally */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 lg:py-0 relative z-10">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="max-w-xl mx-auto lg:mx-0"
            >
              
              <motion.h1 
                variants={fadeInUp} 
                className="text-4xl sm:text-6xl lg:text-7xl font-serif text-slate-900 leading-[1.1] mb-6 tracking-tight"
              >
                The Bundle App That <br/>
                <span className="relative inline-block">
                  Pays for Itself
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-2 left-0 h-3 bg-indigo-200/60 -z-10 transform -rotate-1 rounded-sm"
                  ></motion.span>
                </span> on Day 1.
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
                Stop leaving money on the table. Join <span className="font-semibold text-slate-900">40,000+ brands</span> using TaskLeap Bundles to build high-converting bundles, volume discounts, and upsells in under 2 minutes.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button variant="accent" icon={ArrowRight} className="!py-4 !px-8 !text-lg w-full sm:w-auto">
                  Start Free Trial
                </Button>
                <Button variant="ghost" className="!py-4 !px-8 !text-lg underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 w-full sm:w-auto">
                  View Demo Store
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-medium text-slate-500 mb-10">
                <span className="flex items-center gap-1">
                  <Check size={14} className="text-emerald-500" /> No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <Check size={14} className="text-emerald-500" /> Installs in 2 minutes
                </span>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-sm font-medium text-slate-400">TRUSTED BY HIGH-GROWTH BRANDS</p>
                <div className="flex flex-wrap gap-6 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-lg">
                    <Package className="text-indigo-600"/> PackLife
                  </div>
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-lg">
                    <TrendingUp className="text-emerald-600"/> ScaleUp
                  </div>
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-lg">
                    <ShoppingBag className="text-orange-600"/> ShopFlow
                  </div>
                  <div className="flex items-center gap-1 font-bold text-slate-800 text-lg font-serif italic">
                    Vogue.
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column: Illustration & Visuals */}
          {/* UPDATED: Removed 'order-1 lg:order-2' so visuals appear after text on mobile */}
          <div className="w-full lg:w-1/2 bg-indigo-50 relative flex items-center justify-center overflow-hidden min-h-[50vh] lg:min-h-auto border-l border-slate-100">            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <svg width="100%" height="100%">
                 <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="2" cy="2" r="1" fill="#4f46e5" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#dot-pattern)" />
               </svg>
            </div>

            {/* Main Visuals: Bundle Grid */}
            <div className="relative w-full max-w-xl px-4 lg:px-0">
              <HeroBundleVisuals />
            </div>
          </div>

        </section>
      </main>

      {/* 2. STATS SECTION */}
      <section className="bg-slate-900 text-white py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {[
                { label: "Brands Using Our Apps", value: "40,000+" },
                { label: "Extra Revenue Generated", value: "$600M+" },
                { label: "5-Star Reviews", value: "1,400+" }
              ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 px-4 pt-6 md:pt-0 w-full"
                  >
                      <div className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2 tracking-tight drop-shadow-sm">{stat.value}</div>
                      <div className="text-slate-400 text-sm md:text-lg font-medium tracking-wide">{stat.label}</div>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* 3. INTERACTIVE FEATURES SECTION */}
      <InteractiveFeatures />

      {/* 4. CUSTOMIZATION VISUALIZER */}
      <CustomizationSection />

      {/* 5. FREE GIFT WITH BUNDLES */}
      <FreeGiftSection />

      {/* 6. TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 7. PRICING SECTION */}
      <PricingSection />

      {/* 8. SETUP VISUALIZER */}
      <SetupPreviewSection />

      {/* 9. FOOTER SECTION */}
      <Footer />
    </div>
  );
}

// 2. IMPORT PrivacyPolicy and Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy'; // Import the new file

// 3. CREATE the new App component with Routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}