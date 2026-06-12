import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
}

export default function StatCard({ label, value, icon: Icon, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-sm hover:shadow-md hover:border-gold-200 transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-charcoal-500 mb-2">{label}</p>
          <p className="text-3xl font-serif text-charcoal-900 truncate">{value}</p>
          {sub && <p className="text-xs text-gold-600 mt-2 font-medium">{sub}</p>}
        </div>
        <div className="p-3 bg-gradient-to-br from-gold-50 to-gold-100 rounded-xl border border-gold-200/50 flex-shrink-0">
          <Icon className="w-5 h-5 text-gold-600" />
        </div>
      </div>
    </div>
  );
}
