import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from 'lucide-react';
import { CategoryId } from '../types';

export const ProductGrid: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, activeView, setActiveView } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Special deals view filter
      if (activeView === 'deals' && !product.isSpecialDeal) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesFeatures = product.features.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesFeatures) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = a.discountPercent || 0;
        const discB = b.discountPercent || 0;
        return discB - discA;
      }
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, activeView, inStockOnly, searchQuery, sortBy]);

  const activeCategoryTitle =
    selectedCategory === 'all'
      ? activeView === 'deals'
        ? 'Special Deal Accessories'
        : 'All Computer Accessories'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Computer Accessories';

  return (
    <section id="products-section" className="py-12 bg-slate-950 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeCategoryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing {filteredProducts.length} high-performance tech products
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          {/* Controls: In Stock toggle & Sort By */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by Stock Toggle */}
            <label className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 cursor-pointer hover:border-slate-700 transition select-none">
              <input
                id="filter-instock-checkbox"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500/20 bg-slate-950 border-slate-700"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">Sort:</span>
              <select
                id="sort-products-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-slate-900 text-slate-200">Featured</option>
                <option value="price-asc" className="bg-slate-900 text-slate-200">Price: Low to High</option>
                <option value="price-desc" className="bg-slate-900 text-slate-200">Price: High to Low</option>
                <option value="rating" className="bg-slate-900 text-slate-200">Customer Rating</option>
                <option value="discount" className="bg-slate-900 text-slate-200">Biggest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            id="cat-pill-all"
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              if (activeView === 'deals') setActiveView('products');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedCategory === 'all' && activeView !== 'deals'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            All Peripherals
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                if (activeView === 'deals') setActiveView('products');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active Filters Bar if search is active */}
        {searchQuery && (
          <div className="flex items-center gap-2 mb-6 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
            <span className="text-slate-400">Filtering by keyword:</span>
            <span className="font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
              "{searchQuery}"
            </span>
            <button
              id="clear-search-filter-pill-btn"
              type="button"
              onClick={() => setSearchQuery('')}
              className="ml-auto text-slate-400 hover:text-white flex items-center gap-1 text-xs"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/50 border border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No matching products found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              We couldn't find any accessories matching your current category or search criteria.
            </p>
            <button
              id="reset-all-filters-btn"
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                if (activeView === 'deals') setActiveView('products');
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
