import React, { useState } from 'react';
import {
  Cpu,
  Mail,
  Send,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  QrCode,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { CategoryId } from '../types';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const { setSelectedCategory, setActiveView, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('🎉 Subscribed! You will receive exclusive discounts and new product drops.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Express Cambodia Delivery</h4>
              <p className="text-[11px] text-slate-400">Same-day in Phnom Penh • Fast Provincial Courier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">1-Year Official Warranty</h4>
              <p className="text-[11px] text-slate-400">100% Genuine tech accessories with store seal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Instant KHQR & COD</h4>
              <p className="text-[11px] text-slate-400">ABA, ACLEDA, Wing, Bakong or Cash on Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">7-Day Free Replacement</h4>
              <p className="text-[11px] text-slate-400">Immediate swap for any manufacturing defects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-bold">
                <Cpu className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Nexus<span className="text-cyan-400">Gear</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your premier computer accessories boutique in Cambodia. Supplying esports-grade gaming gear,
              ergonomic vertical mice, mechanical keyboards, multi-port docking stations, and ultra-high-speed cables.
            </p>

            {/* Newsletter */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-white">Get Tech Deals & Discounts</p>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You're on the list for VIP promos!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Accessories Catalog
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-cyan-400 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care & Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation & Help
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home Setup
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('deals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 text-amber-400/90 transition cursor-pointer"
                >
                  Special Deals 🔥
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  About Our Store
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-white transition cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <span className="text-slate-500">Warranty Policy (1-Year)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Location & Payments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Phnom Penh Showroom
            </h4>
            <p className="text-slate-400 leading-relaxed">
              #84 Preah Monivong Blvd, Khan Daun Penh, Phnom Penh, Cambodia
            </p>
            <p className="text-slate-300">
              Hotline: <strong className="text-white">+855 12 889 977</strong>
            </p>
            <p className="text-cyan-400">Telegram: @NexusTech_Support</p>

            {/* Payment Method Badges */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 mb-2">Accepted Payments:</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">
                  ABA PAY
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-blue-400">
                  ACLEDA
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-lime-400">
                  Wing Bank
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-red-400">
                  Bakong
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold text-emerald-400">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 NexusGear Computer Accessories. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy</span>
            <span className="hover:text-slate-300">Terms of Service</span>
            <span className="hover:text-slate-300">Cambodia Courier Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
