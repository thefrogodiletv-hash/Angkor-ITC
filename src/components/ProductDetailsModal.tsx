import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Heart,
  Plus,
  Minus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';

export const ProductDetailsModal: React.FC = () => {
  const {
    activeProductModal,
    closeProductModal,
    addToCart,
    buyNow,
    formatPrice,
    wishlist,
    toggleWishlist,
    showToast,
  } = useStore();

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // New review form simulation
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [localReviews, setLocalReviews] = useState(product.reviews || []);

  const isSaved = wishlist.includes(product.id);
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      showToast('Please enter your name and review comments');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewerName.trim(),
      rating: reviewerRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewerComment.trim(),
      verifiedBuyer: true,
    };
    setLocalReviews([newRev, ...localReviews]);
    setReviewerName('');
    setReviewerComment('');
    showToast('Thank you! Your verified review has been posted.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={closeProductModal} />

      {/* Modal Dialog Content */}
      <div
        id="product-details-dialog"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close & Wishlist */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/40 px-2.5 py-1 rounded-full">
              {product.categoryName}
            </span>
            {hasDiscount && (
              <span className="text-xs font-black text-rose-300 bg-rose-950/80 border border-rose-800/40 px-2.5 py-1 rounded-full">
                SAVE {product.discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="details-wishlist-toggle"
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-xl border transition ${
                isSaved
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
            </button>
            <button
              id="close-product-modal-btn"
              type="button"
              onClick={closeProductModal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Images Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Primary Large Image */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {/* Image count badge */}
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] text-slate-300 font-mono border border-slate-700">
                  {activeImageIdx + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-18 h-18 rounded-xl overflow-hidden bg-slate-950 border-2 shrink-0 transition cursor-pointer ${
                        activeImageIdx === idx
                          ? 'border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                          : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} thumb ${idx}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Cambodia Express Delivery Assurance Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    <strong>Phnom Penh:</strong> Instant 2-4 hour courier delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    <strong>Warranty:</strong> 1-Year replacement coverage with store seal
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <RotateCcw className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    <strong>Payment:</strong> Cash on Delivery or ABA / Bakong KHQR
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Review counter */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400'
                            : i < product.rating
                            ? 'fill-amber-400/50'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-white">{product.rating}</span>
                  <span className="text-xs text-slate-400">
                    • ({localReviews.length} verified customer reviews)
                  </span>
                </div>
              </div>

              {/* Price & Savings Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-cyan-400">
                      {formatPrice(product.price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(product.originalPrice!)}
                      </span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-xs text-rose-400 font-semibold mt-1">
                      You save {formatPrice(savings)} ({product.discountPercent}% discount)
                    </p>
                  )}
                </div>

                {/* Stock Status Badge */}
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    In Stock ({product.stockCount} units)
                  </span>
                  <span className="block text-[11px] text-slate-400 mt-0.5">Ready to ship</span>
                </div>
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Selected Color:{' '}
                    <span className="text-cyan-400 font-normal">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {product.colors.map((color) => {
                      const isChosen = selectedColor.hex === color.hex;
                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                            isChosen
                              ? 'bg-slate-800 border-cyan-400 text-white shadow-sm shadow-cyan-500/20'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span>{color.name}</span>
                          {isChosen && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-700 bg-slate-950 rounded-xl overflow-hidden">
                    <button
                      id="details-qty-minus-btn"
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      id="details-qty-plus-btn"
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    Subtotal: <strong className="text-white">{formatPrice(product.price * quantity)}</strong>
                  </span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="details-add-to-cart-btn"
                  type="button"
                  onClick={() => addToCart(product, quantity, selectedColor)}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="details-buy-now-btn"
                  type="button"
                  onClick={() => buyNow(product, quantity, selectedColor)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation: Overview, Specifications, Reviews */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex border-b border-slate-800 mb-6 gap-2 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`pb-3 text-sm font-bold transition border-b-2 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview & Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-sm font-bold transition border-b-2 cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Specifications ({product.specs.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold transition border-b-2 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Customer Reviews ({localReviews.length})
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-5 text-slate-300 text-sm leading-relaxed">
                <p>{product.fullDescription}</p>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Key Highlights & Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Technical Specifications Table */}
            {activeTab === 'specs' && (
              <div className="rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody>
                    {product.specs.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}
                      >
                        <td className="py-3 px-4 font-bold text-slate-400 w-1/3 border-b border-slate-800/60">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-200 border-b border-slate-800/60">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Reviews List */}
                <div className="space-y-3">
                  {localReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.author}</span>
                          {rev.verifiedBuyer && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write a Review Form */}
                <form
                  onSubmit={handleAddReview}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>Write a Customer Review</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Sreyleak Chan"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Rating</label>
                      <select
                        value={reviewerRating}
                        onChange={(e) => setReviewerRating(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 - Outstanding)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                        <option value={3}>⭐⭐⭐ (3 - Average)</option>
                        <option value={2}>⭐⭐ (2 - Below Expectations)</option>
                        <option value={1}>⭐ (1 - Disappointed)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Review Comments</label>
                    <textarea
                      rows={3}
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      placeholder="Share your experience regarding build quality, sound, ergonomic feel, or courier delivery..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <button
                    id="submit-customer-review-btn"
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
