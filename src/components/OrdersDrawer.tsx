import React from 'react';
import { X, Package, Clock, Truck, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersDrawer: React.FC<OrdersDrawerProps> = ({ isOpen, onClose }) => {
  const { orders, formatPrice, setActiveView } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          id="orders-drawer"
          className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">My Orders & Tracking</h2>
              <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                {orders.length}
              </span>
            </div>

            <button
              id="close-orders-drawer-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Orders list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">No past orders yet</h3>
                <p className="text-xs text-slate-400 mb-4">
                  When you place an order with NexusGear, track its delivery here.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setActiveView('products');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-cyan-400 font-mono">
                        {ord.orderNumber}
                      </span>
                      <p className="text-[11px] text-slate-400">
                        {new Date(ord.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      In Processing
                    </span>
                  </div>

                  {/* Items summary */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 truncate max-w-[200px]">
                          {it.quantity}x {it.product.name}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {formatPrice(it.product.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Paid via <strong className="text-white uppercase">{ord.paymentMethod}</strong>
                    </span>
                    <span className="text-sm font-extrabold text-cyan-400">
                      {formatPrice(ord.total)}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 italic">
                    📍 Destination: {ord.customer.deliveryAddress}, {ord.customer.cityProvince}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-950 text-center">
            <p className="text-xs text-slate-400">
              Need assistance with an order? Contact our Telegram support at{' '}
              <span className="text-cyan-400 font-bold">@NexusTech_Support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
