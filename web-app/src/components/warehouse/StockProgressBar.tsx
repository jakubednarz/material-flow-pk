import React from "react";

type Props = {
  currentStock: number;
  minStock: number;
  isLowStock: boolean;
};

const StockProgressBar: React.FC<Props> = ({
  currentStock,
  minStock,
  isLowStock,
}) => {
  const percentage = (currentStock / minStock) * 100;
  const progressColor = isLowStock ? "bg-red-500" : "bg-green-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
      <div
        className={`${progressColor} h-4 rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};

export default StockProgressBar;
