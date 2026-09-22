import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="shopping-cart-drawer"
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">Shopping Cart</h2>
              <span className="text-xs font-semibold bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full border border-slate-700">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              id="close-cart-drawer-btn"
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-slate-300 mb-1.5">
                Add <strong className="text-cyan-400">{formatPrice(amountToFreeShipping)}</strong> more for{' '}
                <span className="text-emerald-400 font-bold">FREE Delivery</span> in Cambodia!
              </p>
            ) : (
              <p className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1.5">
                <Check className="w-4 h-4" />
                You unlocked FREE Delivery across Cambodia!
              </p>
            )}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scrollable Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mb-5">
                  Explore our computer accessories catalog to add mice, keyboards, and gear.
                </p>
                <button
                  id="empty-cart-browse-btn"
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.hex}`}
                  id={`cart-item-${item.product.id}`}
                  className="flex gap-3 p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 group"
                >
                  {/* Thumbnail Image */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-900 border border-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info & Quantity Adjuster */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                          {item.product.name}
                        </h4>
                        <button
                          id={`remove-cart-item-${item.product.id}`}
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedColor.hex)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Color label */}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-2 h-2 rounded-full border border-slate-700"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="text-[11px] text-slate-400">{item.selectedColor.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/50">
                      {/* Stepper */}
                      <div className="flex items-center border border-slate-800 rounded-lg bg-slate-900">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor.hex, item.quantity - 1)
                          }
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedColor.hex, item.quantity + 1)
                          }
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-cyan-400">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-slate-500">
                            ({formatPrice(item.product.price)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/90 backdrop-blur space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="cart-coupon-input"
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(null);
                    }}
                    placeholder="Coupon (e.g. TECH10, BAKONG)"
                    className="w-full pl-8.5 pr-2 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white uppercase placeholder:normal-case placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  id="apply-coupon-btn"
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}

              {appliedCoupon && (
                <div className="flex items-center justify-between bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-xl text-xs text-cyan-300">
                  <span className="font-bold">Code '{appliedCoupon}' Applied</span>
                  <button
                    id="remove-coupon-btn"
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-400 hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery</span>
                  <span className="font-semibold text-white">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-cyan-400">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                id="drawer-proceed-checkout-btn"
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                <span>Encrypted checkout • Pay online with KHQR or COD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
