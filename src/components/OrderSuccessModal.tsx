import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  Download,
  ExternalLink,
  Printer,
  Sparkles,
  Phone,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderSuccessOpen, setIsOrderSuccessOpen, lastPlacedOrder, formatPrice, setActiveView } = useStore();

  if (!isOrderSuccessOpen || !lastPlacedOrder) return null;

  const order = lastPlacedOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleContinueShopping = () => {
    setIsOrderSuccessOpen(false);
    setActiveView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        id="order-success-dialog"
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-left"
      >
        {/* Top Banner Celebration */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 p-6 sm:p-8 text-center border-b border-slate-800 relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/30">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Order Confirmed!</h2>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
            Thank you for shopping with NexusGear Cambodia
          </p>

          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300">
            <span>Order ID:</span>
            <span className="font-bold text-cyan-400">{order.orderNumber}</span>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Dispatch Notice */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
            <Truck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">Estimated Delivery Dispatch</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {order.estimatedDelivery}
              </p>
              <p className="text-[11px] text-slate-400">
                Our courier team will contact <strong>{order.customer.phoneNumber}</strong> prior to drop-off.
              </p>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
            <div>
              <span className="text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
                Recipient
              </span>
              <p className="font-bold text-white">{order.customer.fullName}</p>
              <p className="text-slate-300">{order.customer.phoneNumber}</p>
              <p className="text-slate-400">{order.customer.email}</p>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
                Delivery Destination
              </span>
              <p className="text-slate-200">{order.customer.deliveryAddress}</p>
              <p className="text-slate-400">
                {order.customer.districtKhan ? `${order.customer.districtKhan}, ` : ''}
                {order.customer.cityProvince}
              </p>
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-cyan-400 uppercase">{order.paymentMethod}</span>
                <span className="text-emerald-400 font-bold">({order.paymentStatus})</span>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Purchased Items ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-white truncate max-w-[200px]">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.selectedColor.name} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-cyan-400">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Discount Applied</span>
                <span>-{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Delivery Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
              <span>Grand Total</span>
              <span className="text-cyan-400">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="print-receipt-btn"
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <button
            id="order-success-continue-btn"
            type="button"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
