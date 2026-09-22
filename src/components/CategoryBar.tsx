import React from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { CategoryId } from '../types';
import { Layers } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveView } = useStore();

  const handleCategorySelect = (id: CategoryId) => {
    setSelectedCategory(id);
    setActiveView('products');
    const elem = document.getElementById('products-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-slate-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Browse By Category</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Popular Tech Categories</h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Explore premium peripherals and accessories calibrated for maximum endurance and performance.
          </p>
        </div>

        {/* Categories Grid (8 items + "All Categories" pill) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                type="button"
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative p-3.5 rounded-xl text-center border transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/80 border-slate-800/90 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110 select-none">
                  {cat.emoji}
                </span>
                <span className="text-xs font-bold leading-tight line-clamp-1 group-hover:text-cyan-400 transition">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  {cat.count} items
                </span>

                {isSelected && (
                  <span className="absolute bottom-1 w-6 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
