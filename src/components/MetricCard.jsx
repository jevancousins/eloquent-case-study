import Card from './Card';

export default function MetricCard({ title, value, subtitle, icon: Icon, trend }) {
  const valueStr = String(value);
  const hasDollar = valueStr.startsWith('$');
  const displayValue = hasDollar ? valueStr.slice(1) : valueStr;

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 bg-[#F9F6F0] rounded-lg">
          <Icon className="w-5 h-5 text-[#57288F]" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-[#4CA37D]' : 'text-red-500'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-auto">
        <h3 className="text-xs font-medium text-gray-500 mb-1.5">{title}</h3>
        <div className="flex items-baseline mb-1.5">
          {hasDollar && (
            <span className="text-lg font-semibold text-[#57288F] mr-0.5">$</span>
          )}
          <span className="text-2xl font-bold text-[#57288F]">{displayValue}</span>
        </div>
        {subtitle && <p className="text-xs text-gray-400 leading-relaxed">{subtitle}</p>}
      </div>
    </Card>
  );
}
