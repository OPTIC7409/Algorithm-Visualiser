import { useState, useEffect } from "react";

interface QuickSortProps {
  data: number[];
}

const QuickSort: React.FC<QuickSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    quickSortAnimation([...data], 0, data.length - 1);
  }, [data]);

  const quickSortAnimation = async (arr: number[], low: number, high: number) => {
    const startTime = performance.now();

    await quickSort(arr, low, high);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  };

  const quickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setSortedData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSortedData([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 100));

    return i + 1;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {sortedData.map((value, index) => (
          <div
            key={index}
            style={{ height: `${value * 3}px` }}
            className="w-4 bg-green-500"
          ></div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Time taken: {timeTaken.toFixed(2)} ms
      </p>
    </div>
  );
};

export default QuickSort;
