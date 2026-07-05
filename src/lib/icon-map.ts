import {
  Users, UserCircle, SearchCode, Ship, Calendar, Globe, Plane, Truck, Anchor, Warehouse,
  TrendingUp, Heart, Award, Target, ShieldCheck, FileText, MapPin, FileCheck, PackageCheck,
  Droplet, Boxes, type LucideIcon,
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Users, UserCircle, SearchCode, Ship, Calendar, Globe, Plane, Truck, Anchor, Warehouse,
  TrendingUp, Heart, Award, Target, ShieldCheck, FileText, MapPin, FileCheck, PackageCheck,
  Droplet, Boxes,
};

export function getIcon(name: string | undefined, fallback: LucideIcon = Warehouse): LucideIcon {
  if (!name) return fallback;
  return ICON_MAP[name] || fallback;
}
