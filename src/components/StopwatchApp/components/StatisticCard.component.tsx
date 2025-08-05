interface StatisticCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  count,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`p-2 ${bgColor} rounded-lg`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
};
