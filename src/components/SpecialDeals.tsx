import React, { useState, useEffect } from 'react';
import { Flame, Clock, ArrowRight, Sparkles, Percent, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const SpecialDeals: React.FC = () => {
  const { openProductModal, addToCart, buyNow, formatPrice, setActiveView, setSelectedCategory } = useStore();

  // Filter only items that have discounts
  const dealProducts = PRODUCTS.filter((p) => p.isSpecialDeal && p.originalPrice).slice(0, 4);

  // Live countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShopAllDeals = () => {
    setActiveView('deals');
    setSelectedCategory('all');
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="special-deals-section" className="py-12 bg-slate-950 border-b border-slate-800/80 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Flash Sale Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 p-5 rounded-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
              <span>LIMITED TIME PROMOTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Special Deals</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Save up to 35% on top-rated gaming gear, audio headsets, and laptop accessories.
            </p>
          </div>

          {/* Flash Timer & CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-white">
                <span className="bg-slate-800 px-2 py-1 rounded text-cyan-300">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-slate-500">:</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-cyan-300">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-slate-500">:</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-cyan-300">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            <button
              id="shop-all-deals-cta-btn"
              type="button"
              onClick={handleShopAllDeals}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>Shop Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Deals Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dealProducts.map((product) => {
            const discountPercent =
              product.discountPercent ||
              (product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0);

            return (
              <div
                key={product.id}
                id={`deal-card-${product.id}`}
                className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-4/3 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Discount Percentage Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                    <Percent className="w-3 h-3 stroke-[3]" />
                    <span>{discountPercent}% OFF</span>
                  </div>

                  {/* Stock tag */}
                  <div className="absolute bottom-2.5 left-3">
                    <span className="text-[11px] font-semibold text-cyan-300 bg-slate-900/90 backdrop-blur px-2 py-0.5 rounded border border-slate-700">
                      {product.stockCount} left in stock
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4.5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {product.categoryName}
                    </span>
                    <h3
                      onClick={() => openProductModal(product)}
                      className="text-sm font-bold text-white group-hover:text-cyan-400 transition cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Pricing Box: Original Price Crossed Out, Discount %, New Price */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-2 font-medium">
                        {product.originalPrice && formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-lg font-extrabold text-cyan-400">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-1.5 py-0.5 rounded">
                      Save {product.originalPrice && formatPrice(product.originalPrice - product.price)}
                    </span>
                  </div>

                  {/* Dual Action Buttons: Add to Cart & Buy Now */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id={`deal-add-cart-${product.id}`}
                      type="button"
                      onClick={() => addToCart(product)}
                      className="w-full py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      id={`deal-buy-now-${product.id}`}
                      type="button"
                      onClick={() => buyNow(product)}
                      className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-cyan-500/20 flex items-center justify-center cursor-pointer"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
