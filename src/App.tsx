import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { SpecialDeals } from './components/SpecialDeals';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrdersDrawer } from './components/OrdersDrawer';
import { AboutUs } from './components/AboutUs';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { CheckCircle2, X } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, toastMessage } = useStore();
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-slate-900 border border-cyan-500/60 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center gap-2.5 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        onOpenOrders={() => setOrdersOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Content Areas based on Active View */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <CategoryBar />
            <SpecialDeals />
            <ProductGrid />
          </>
        )}

        {activeView === 'products' && (
          <>
            <CategoryBar />
            <ProductGrid />
          </>
        )}

        {activeView === 'categories' && (
          <>
            <CategoryBar />
            <ProductGrid />
          </>
        )}

        {activeView === 'deals' && (
          <>
            <SpecialDeals />
            <ProductGrid />
          </>
        )}

        {activeView === 'about' && <AboutUs />}
      </main>

      {/* Modals and Drawers */}
      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrdersDrawer isOpen={ordersOpen} onClose={() => setOrdersOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
