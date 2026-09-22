export type CategoryId =
  | 'all'
  | 'mouse'
  | 'keyboard'
  | 'headsets'
  | 'monitors'
  | 'usb-storage'
  | 'cables-adapters'
  | 'gaming'
  | 'laptop-accessories';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  specs: ProductSpec[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  isSpecialDeal?: boolean;
  isFeatured?: boolean;
  reviews: Review[];
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export type PaymentMethod =
  | 'cod'
  | 'aba'
  | 'acleda'
  | 'wing'
  | 'bakong'
  | 'qr';

export interface CheckoutForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  cityProvince: string;
  districtKhan?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  customer: CheckoutForm;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'pay_on_delivery';
  deliveryStatus: 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
}

export type ActiveView = 'home' | 'products' | 'categories' | 'deals' | 'about' | 'contact';
