import React from 'react';
import { 
  Home, ShoppingCart, Car, Zap, Activity, 
  Utensils, ShoppingBag, Smartphone, BookOpen, 
  Wallet, TrendingUp, Package, Circle
} from 'lucide-react';

const iconMap = {
  rent: Home,
  food: ShoppingCart,
  trans: Car,
  bills: Zap,
  health: Activity,
  dining: Utensils,
  shop: ShoppingBag,
  subs: Smartphone,
  edu: BookOpen,
  save: Wallet,
  inv: TrendingUp,
  other: Package
};

export default function Icon({ name, size = 18, className = "" }) {
  const LucideIcon = iconMap[name] || Circle;
  return <LucideIcon size={size} className={className} strokeWidth={2} />;
}
