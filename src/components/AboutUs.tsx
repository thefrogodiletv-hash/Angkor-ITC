import React from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Users,
  Award,
  Cpu,
  MapPin,
  Clock,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutUs: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="py-12 bg-slate-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner for About Us */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>About NexusGear</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Cambodia's Dedicated Destination for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
              High-End Computer Accessories
            </span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Founded with a passion for gaming ergonomics and professional workstation productivity,
            NexusGear supplies genuine tech peripherals, mechanical switches, 4K displays, and audio hardware
            backed by local warranty and rapid nationwide delivery.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800/90 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">100% Genuine Guaranteed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every gaming mouse, mechanical keyboard, and USB-C dock is sourced straight from certified manufacturers
              with official serial numbers and a 1-Year direct replacement warranty.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800/90 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Lightning Courier Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based in Phnom Penh, orders placed before 4:00 PM are delivered to your door within 2-4 hours.
              Provinces receive parcels within 1-2 days via trusted courier partners.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800/90 shadow-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Local KHQR & COD Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convenient payments with ABA PAY, Bakong KHQR, ACLEDA, Wing, or Cash on Delivery so you can inspect
              the package before releasing payment.
            </p>
          </div>
        </div>

        {/* Physical Showroom & Service Center Section */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Visit Our Tech Lounge
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Phnom Penh Showroom & Testing Center
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the actuation force of mechanical keyboard switches, test ergonomic vertical mice in your
              own hand, and test 7.1 surround sound audio headsets before taking them home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Central Store:</strong>
                  #84 Preah Monivong Blvd, Khan Daun Penh, Phnom Penh, Cambodia
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Opening Hours:</strong>
                  Monday – Sunday: 8:00 AM – 8:30 PM
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setActiveView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg cursor-pointer"
              >
                Browse Our Accessories
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80"
                alt="NexusGear Phnom Penh Store Showroom"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
