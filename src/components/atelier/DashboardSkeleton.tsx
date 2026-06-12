export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div>
        <div className="h-8 w-48 bg-charcoal-200 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-charcoal-100 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-charcoal-100 p-6 h-32" />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-charcoal-100 h-64" />
    </div>
  );
}
