import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Clock,
  Sparkles,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CheckoutForm, PaymentMethod } from '../types';
import { CAMBODIA_PROVINCES, PHNOM_PENH_KHANS } from '../data/products';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    formatPrice,
    placeOrder,
    setIsCartOpen,
  } = useStore();

  const [form, setForm] = useState<CheckoutForm>({
    fullName: 'Sokha Meng',
    phoneNumber: '012 889 977',
    email: 'sokha.meng@example.com',
    deliveryAddress: 'Street 310, Building 45, BKK1',
    cityProvince: 'Phnom Penh',
    districtKhan: 'Khan Boeng Keng Kang (BKK)',
    notes: 'Please call before delivery. Room 3B.',
    paymentMethod: 'aba',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQrSimulation, setShowQrSimulation] = useState(false);
  const [qrTimer, setQrTimer] = useState(600); // 10 minutes

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // If customer selected digital KHQR / ABA / ACLEDA / Wing / Bakong, show the QR modal first
    if (form.paymentMethod !== 'cod') {
      setShowQrSimulation(true);
      return;
    }

    // Cash on delivery: place immediately
    setIsSubmitting(true);
    try {
      await placeOrder(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmQrPayment = async () => {
    setIsSubmitting(true);
    setShowQrSimulation(false);
    try {
      await placeOrder(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentOptions: {
    id: PaymentMethod;
    name: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    colorClass: string;
  }[] = [
    {
      id: 'aba',
      name: 'ABA PAY (KHQR)',
      description: 'Instant scan with ABA Mobile app or any KHQR banking app',
      badge: 'Most Popular',
      icon: <QrCode className="w-5 h-5 text-cyan-400" />,
      colorClass: 'border-cyan-500/40 bg-cyan-950/20',
    },
    {
      id: 'bakong',
      name: 'Bakong KHQR',
      description: 'National Bank of Cambodia universal cross-bank QR',
      badge: 'Official KHQR',
      icon: <QrCode className="w-5 h-5 text-red-400" />,
      colorClass: 'border-red-500/40 bg-red-950/20',
    },
    {
      id: 'acleda',
      name: 'ACLEDA Mobile',
      description: 'Pay quickly using ACLEDA Mobile or ACLEDA KHQR',
      badge: 'Local Bank',
      icon: <QrCode className="w-5 h-5 text-blue-400" />,
      colorClass: 'border-blue-500/40 bg-blue-950/20',
    },
    {
      id: 'wing',
      name: 'Wing Bank',
      description: 'Pay with Wing App, Wing Account, or Wing KHQR',
      badge: 'Fast Transfer',
      icon: <QrCode className="w-5 h-5 text-lime-400" />,
      colorClass: 'border-lime-500/40 bg-lime-950/20',
    },
    {
      id: 'qr',
      name: 'Universal QR Payment',
      description: 'Scan with Canadia, Sathapana, Chip Mong or any bank',
      badge: 'All Banks',
      icon: <QrCode className="w-5 h-5 text-purple-400" />,
      colorClass: 'border-purple-500/40 bg-purple-950/20',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery (COD)',
      description: 'Pay cash to the courier upon receiving your parcel in Phnom Penh & provinces',
      badge: 'Pay Later',
      icon: <Banknote className="w-5 h-5 text-emerald-400" />,
      colorClass: 'border-emerald-500/40 bg-emerald-950/20',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div
        id="checkout-dialog"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Cart</span>
            </button>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Secure Checkout</h2>
            </div>
          </div>

          <button
            id="close-checkout-modal-btn"
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Customer & Delivery Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer Info Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>Customer Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="checkout-fullname-input"
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Meng Sokha"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        id="checkout-phone-input"
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="012 345 678"
                        className="w-full pl-8.5 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="checkout-email-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-8.5 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Delivery Address (Cambodia)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      City / Province <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="checkout-province-select"
                      name="cityProvince"
                      value={form.cityProvince}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {CAMBODIA_PROVINCES.map((prov) => (
                        <option key={prov} value={prov} className="bg-slate-900">
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.cityProvince === 'Phnom Penh' && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">District / Khan</label>
                      <select
                        id="checkout-khan-select"
                        name="districtKhan"
                        value={form.districtKhan}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        {PHNOM_PENH_KHANS.map((khan) => (
                          <option key={khan} value={khan} className="bg-slate-900">
                            {khan}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Street Address / House No. / Building <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="checkout-address-input"
                    type="text"
                    name="deliveryAddress"
                    value={form.deliveryAddress}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Street 310, Building 45, BKK1"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Delivery Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={form.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave with building security, call 5 mins ahead"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <CreditCard className="w-4 h-4 text-cyan-400" />
                    <span>Select Payment Method</span>
                  </div>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    Cambodia Banking & KHQR
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {paymentOptions.map((opt) => {
                    const isSelected = form.paymentMethod === opt.id;
                    return (
                      <label
                        key={opt.id}
                        id={`payment-option-${opt.id}`}
                        className={`relative p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? `${opt.colorClass} border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/40`
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            {opt.icon}
                            <span className="text-xs font-bold text-white">{opt.name}</span>
                          </div>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={opt.id}
                            checked={isSelected}
                            onChange={() => setForm((prev) => ({ ...prev, paymentMethod: opt.id }))}
                            className="text-cyan-500 focus:ring-cyan-500"
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                          {opt.description}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                            {opt.badge}
                          </span>
                          {isSelected && (
                            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 sticky top-6">
                <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800">
                  Order Summary ({cart.length} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor.hex}`}
                      className="flex items-center gap-3 text-xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">{item.product.name}</p>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} • {item.selectedColor.name}
                        </p>
                      </div>
                      <span className="font-bold text-cyan-400">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financials */}
                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-400">
                      <span>Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Fee</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-400 font-bold">FREE Delivery</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>Total Price</span>
                    <div className="text-right">
                      <span className="text-cyan-400 block">{formatPrice(grandTotal)}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        All taxes and delivery fees included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  id="place-order-submit-btn"
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Processing Order...'
                      : form.paymentMethod === 'cod'
                      ? 'Place Order (Cash on Delivery)'
                      : `Pay ${formatPrice(grandTotal)} with ${form.paymentMethod.toUpperCase()}`}
                  </span>
                </button>

                <div className="text-[11px] text-slate-400 space-y-1 text-center pt-2">
                  <p className="flex items-center justify-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Genuine Guarantee & 7-Day Free Replacement
                  </p>
                  <p>Orders in Phnom Penh are dispatched within 2 hours of payment.</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Interactive KHQR Simulation Modal for ABA / Bakong / ACLEDA / Wing */}
      {showQrSimulation && (
        <div className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setShowQrSimulation(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header branding */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-red-950/80 text-red-400 border border-red-800/40 px-2 py-0.5 rounded-full">
                KHQR CAMBODIA
              </span>
              <h3 className="text-lg font-extrabold text-white">
                Scan to Pay with {form.paymentMethod.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-400">
                Scan with ABA, ACLEDA, Wing, Bakong, or any mobile banking app
              </p>
            </div>

            {/* Generated QR Card Mockup */}
            <div className="bg-white p-5 rounded-2xl shadow-xl inline-block mx-auto border-4 border-slate-950">
              {/* KHQR Header ribbon */}
              <div className="bg-red-600 text-white text-[10px] font-black uppercase py-1 px-3 rounded-md mb-3 tracking-wider flex items-center justify-between">
                <span>KHQR</span>
                <span>NEXUSGEAR</span>
              </div>

              {/* Graphic QR Code Representation */}
              <div className="w-48 h-48 bg-slate-900 p-2 rounded-xl flex items-center justify-center relative">
                {/* SVG QR Code Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                  {/* Dense tech QR dots pattern */}
                  <rect x="40" y="5" width="8" height="8" />
                  <rect x="55" y="5" width="8" height="8" />
                  <rect x="40" y="20" width="8" height="8" />
                  <rect x="55" y="20" width="8" height="8" />
                  <rect x="5" y="40" width="8" height="8" />
                  <rect x="20" y="40" width="8" height="8" />
                  <rect x="35" y="40" width="12" height="12" />
                  <rect x="55" y="40" width="8" height="8" />
                  <rect x="75" y="40" width="15" height="10" />
                  <rect x="5" y="55" width="8" height="8" />
                  <rect x="20" y="55" width="8" height="8" />
                  <rect x="40" y="60" width="8" height="8" />
                  <rect x="60" y="60" width="12" height="12" />
                  <rect x="80" y="60" width="8" height="8" />
                  <rect x="40" y="80" width="8" height="8" />
                  <rect x="60" y="80" width="8" height="8" />
                  <rect x="80" y="80" width="15" height="15" />
                </svg>

                {/* Center logo badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="text-[10px] font-black text-white">NXG</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 text-center text-slate-900 font-mono text-xs font-bold">
                {formatPrice(grandTotal)}
              </div>
            </div>

            {/* Merchant Details */}
            <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Merchant:</span>
                <span className="font-bold text-white">NEXUSGEAR TECH CO., LTD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-cyan-400">{formatPrice(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Currency:</span>
                <span className="font-bold text-white">USD / KHR (Auto-converted)</span>
              </div>
            </div>

            {/* Confirm simulation action */}
            <div className="space-y-2 pt-2">
              <button
                id="simulate-qr-payment-btn"
                type="button"
                onClick={handleConfirmQrPayment}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Successful Payment</span>
              </button>
              <p className="text-[10px] text-slate-400">
                In production, KHQR webhook automatically verifies the transaction within 2 seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
