import { useMemo } from 'react';
import { TrendingUp, DollarSign, CircleAlert } from 'lucide-react';
import MetricCard from './MetricCard';
import { useApp } from '../context/AppContext';
import { computeMetrics } from '../utils/stats';

export default function Sidebar() {
  const { users, transactions } = useApp();
  const metrics = useMemo(() => computeMetrics(users, transactions), [users, transactions]);

  const cards = [
    {
      title: 'Avg Customer LTV',
      value: `$${metrics.avgCustomerLTV.toLocaleString()}`,
      subtitle: 'Average lifetime value per customer',
      icon: DollarSign,
    },
    {
      title: 'Enterprise Revenue',
      value: `${metrics.enterpriseShare}%`,
      subtitle: 'Share of total transaction volume',
      icon: TrendingUp,
    },
    {
      title: 'Churn Risk (High Value)',
      value: metrics.atRiskCount,
      subtitle: 'Enterprise/SME > 60 days',
      icon: CircleAlert,
    },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] lg:w-[300px] bg-[#F9F6F0] border-r border-gray-200 flex-col z-40">
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-[#F9F6F0] rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-[#57288F]" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Key Metrics</h2>
          </div>
          <div className="flex flex-col gap-4">
            {cards.map((m) => (
              <MetricCard key={m.title} {...m} />
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile metrics */}
      <div className="md:hidden p-4 pb-0">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-[#F9F6F0] rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="w-4 h-4 text-[#57288F]" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Key Metrics</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {cards.map((m) => (
            <div key={m.title} className="min-w-[260px] snap-start">
              <MetricCard {...m} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
