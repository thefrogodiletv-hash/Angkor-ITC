import React from 'react';
import { Star, ShoppingCart, Heart, Zap, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, addToCart, buyNow, formatPrice, wishlist, toggleWishlist } = useStore();

  const isSaved = wishlist.includes(product.id);
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md">
              -{product.discountPercent || Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md">
              FEATURED
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition z-10 ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View overlay prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-slate-900/90 text-cyan-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-xl flex items-center gap-1.5 backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>

        {/* Available Color Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-900/80 backdrop-blur px-1.5 py-1 rounded-full border border-slate-800">
            {product.colors.map((c) => (
              <span
                key={c.hex}
                className="w-2.5 h-2.5 rounded-full border border-slate-700 shadow-sm"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="uppercase font-semibold tracking-wider text-cyan-400">
              {product.categoryName}
            </span>
            {/* Star Rating & Count */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white text-xs">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => openProductModal(product)}
            className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Stock Box */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>

            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
              In Stock
            </span>
          </div>

          {/* Action Buttons: Add to Cart and Buy Now */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`product-add-cart-${product.id}`}
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-full py-2.5 px-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add to Cart</span>
            </button>

            <button
              id={`product-buy-now-${product.id}`}
              type="button"
              onClick={() => buyNow(product, 1)}
              className="w-full py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
