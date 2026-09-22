import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { setActiveView, setSelectedCategory, openProductModal, formatPrice } = useStore();

  const featuredDeal = PRODUCTS[0]; // AeroStrike Pro Wireless Gaming Mouse
  const featuredKeyboard = PRODUCTS[1]; // Vortex 75 Hot-Swappable Mechanical Keyboard

  const handleShopNow = () => {
    setActiveView('products');
    setSelectedCategory('all');
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewDeals = () => {
    setActiveView('deals');
    const elem = document.getElementById('special-deals-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800/80">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle tech grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-inner shadow-cyan-950/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Next-Gen Desk Setup & Esports Peripherals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300 font-normal">Cambodia Official Distributor</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Upgrade Your{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-200 bg-clip-text text-transparent">
                  Computer Setup
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Quality Computer Accessories at Great Prices. Discover high-precision mice, mechanical keyboards,
                spatial audio headsets, multi-port docks, and ergonomic tech tailored for gaming, office, and creative workflows.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-shop-now-btn"
                type="button"
                onClick={handleShopNow}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-view-deals-btn"
                type="button"
                onClick={handleViewDeals}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Explore Special Deals</span>
              </button>
            </div>

            {/* Micro Highlights Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Same-Day Courier</h4>
                  <p className="text-[11px] text-slate-400">Phnom Penh & provinces</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Genuine</h4>
                  <p className="text-[11px] text-slate-400">1-Year official warranty</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-cyan-400 shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Cambodia KHQR</h4>
                  <p className="text-[11px] text-slate-400">ABA, ACLEDA, Wing, COD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-3xl filter blur-2xl -z-10" />

              {/* Main Visual Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 shadow-2xl p-4 sm:p-5 overflow-hidden group">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1200&q=85"
                    alt="Modern computer workstation with dual monitors, keyboard, and mouse"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Hot Sale Badge */}
                  <div className="absolute top-3 left-3 bg-rose-600/90 backdrop-blur text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                    HOT TECH DEALS
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur border border-slate-700 text-slate-200 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">4.9</span>
                    <span className="text-slate-400 text-[10px]">(1,400+ reviews)</span>
                  </div>

                  {/* Card bottom caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                      Featured Workstation
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      Custom Battle Station & Productivity Gear
                    </h3>
                  </div>
                </div>

                {/* Floating Interactive Card 1: AeroStrike Mouse */}
                <div
                  id="hero-floating-card-mouse"
                  onClick={() => openProductModal(featuredDeal)}
                  className="mt-4 p-3 rounded-xl bg-slate-900/95 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex items-center justify-between gap-3 shadow-lg group/item"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredDeal.images[0]}
                      alt={featuredDeal.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded font-bold border border-cyan-800/40">
                          -31% OFF
                        </span>
                        <span className="text-xs font-bold text-white group-hover/item:text-cyan-400 transition truncate max-w-[140px] sm:max-w-[180px]">
                          {featuredDeal.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">58g Esports Wireless Mouse</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-400">
                      {formatPrice(featuredDeal.price)}
                    </div>
                    <div className="text-[10px] text-slate-500 line-through">
                      {featuredDeal.originalPrice && formatPrice(featuredDeal.originalPrice)}
                    </div>
                  </div>
                </div>

                {/* Floating Micro Feature 2: Mechanical Keyboard */}
                <div
                  id="hero-floating-card-keyboard"
                  onClick={() => openProductModal(featuredKeyboard)}
                  className="mt-2.5 p-3 rounded-xl bg-slate-900/95 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex items-center justify-between gap-3 shadow-lg group/item"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredKeyboard.images[0]}
                      alt={featuredKeyboard.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-800/40">
                          BESTSELLER
                        </span>
                        <span className="text-xs font-bold text-white group-hover/item:text-cyan-400 transition truncate max-w-[140px] sm:max-w-[180px]">
                          {featuredKeyboard.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">Gasket Mount 75% Mechanical</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-extrabold text-cyan-400">
                      {formatPrice(featuredKeyboard.price)}
                    </div>
                    <div className="text-[10px] text-slate-500 line-through">
                      {featuredKeyboard.originalPrice && formatPrice(featuredKeyboard.originalPrice)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
