import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Heart,
  Cpu,
  Flame,
  HelpCircle,
  PhoneCall,
  Info,
  ChevronRight,
  Package,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ActiveView } from '../types';

interface NavbarProps {
  onOpenOrders: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrders, onOpenContact }) => {
  const {
    activeView,
    setActiveView,
    cartCount,
    subtotal,
    setIsCartOpen,
    wishlist,
    currency,
    setCurrency,
    formatPrice,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    openProductModal,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Search filtered items
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === 'deals') {
      setSelectedCategory('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchResult = (product: (typeof PRODUCTS)[0]) => {
    openProductModal(product);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 text-xs text-slate-300 py-1.5 px-4 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Fast Local Delivery:
            </span>
            <span>Same-day dispatch in Phnom Penh & express shipping across all provinces!</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 hidden md:inline">Accepted: ABA, ACLEDA, Wing, Bakong KHQR, COD</span>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded px-2 py-0.5">
              <span className="text-slate-400">Currency:</span>
              <button
                id="currency-usd-btn"
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded font-medium transition ${
                  currency === 'USD' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                id="currency-khr-btn"
                type="button"
                onClick={() => setCurrency('KHR')}
                className={`px-1.5 py-0.5 rounded font-medium transition ${
                  currency === 'KHR' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                KHR (៛)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition duration-300">
              <Cpu className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  Nexus<span className="text-cyan-400">Gear</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.2 rounded">
                  TECH
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">Computer Accessories</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <button
              id="nav-link-home"
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeView === 'home'
                  ? 'bg-blue-600/15 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-products"
              type="button"
              onClick={() => handleNavClick('products')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeView === 'products'
                  ? 'bg-blue-600/15 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Products
            </button>
            <button
              id="nav-link-categories"
              type="button"
              onClick={() => handleNavClick('categories')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeView === 'categories'
                  ? 'bg-blue-600/15 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Categories
            </button>
            <button
              id="nav-link-deals"
              type="button"
              onClick={() => handleNavClick('deals')}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                activeView === 'deals'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              Deals
            </button>
            <button
              id="nav-link-about"
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-lg transition ${
                activeView === 'about'
                  ? 'bg-blue-600/15 text-cyan-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              About Us
            </button>
            <button
              id="nav-link-contact"
              type="button"
              onClick={onOpenContact}
              className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/60 transition"
            >
              Contact
            </button>
          </nav>

          {/* Search bar with instant autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs md:max-w-sm hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="search-products-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                  if (activeView !== 'products' && e.target.value.trim().length > 0) {
                    setActiveView('products');
                  }
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search mouse, keyboard, cable..."
                className="w-full pl-9.5 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown suggestions */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Matching Products
                </div>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSearchResult(item)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition group"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-950"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{item.categoryName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-cyan-400">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="block text-[10px] text-slate-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <button
              id="mobile-search-toggle-btn"
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Orders list button */}
            <button
              id="my-orders-btn"
              type="button"
              onClick={onOpenOrders}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition relative hidden md:flex items-center gap-1.5 text-xs font-medium"
              title="My Orders"
            >
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Orders</span>
            </button>

            {/* Wishlist button */}
            <button
              id="wishlist-btn"
              type="button"
              onClick={() => {
                setActiveView('products');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition relative"
              title="Saved Items"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-400 fill-rose-400/20' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-btn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl transition shadow-md shadow-blue-600/20 group select-none"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-105" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-cyan-400 text-slate-950 text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold leading-none">
                  Cart
                </span>
                <span className="text-xs font-bold leading-tight">{formatPrice(subtotal)}</span>
              </div>
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search expanded field */}
        {searchOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'products') setActiveView('products');
                }}
                placeholder="Search accessories..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2">
          <button
            id="mobile-nav-home"
            type="button"
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'home' ? 'bg-blue-600/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-products"
            type="button"
            onClick={() => handleNavClick('products')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'products' ? 'bg-blue-600/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>Products</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-categories"
            type="button"
            onClick={() => handleNavClick('categories')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'categories' ? 'bg-blue-600/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>Categories</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-deals"
            type="button"
            onClick={() => handleNavClick('deals')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'deals' ? 'bg-amber-500/20 text-amber-300' : 'text-amber-400 hover:bg-amber-500/10'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Special Deals
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-about"
            type="button"
            onClick={() => handleNavClick('about')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeView === 'about' ? 'bg-blue-600/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>About Us</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-contact"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              Contact Us
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            id="mobile-nav-orders"
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrders();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900"
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              Order History & Tracking
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      )}
    </header>
  );
};
