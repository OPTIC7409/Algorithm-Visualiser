import { useState, useEffect } from "react";

interface DualPivotQuickSortProps {
  data: number[];
}

const DualPivotQuickSort: React.FC<DualPivotQuickSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    dualPivotQuickSortAnimation([...data], 0, data.length - 1);
  }, [data]);

  const dualPivotQuickSortAnimation = async (arr: number[], low: number, high: number) => {
    const startTime = performance.now();

    await dualPivotQuickSort(arr, low, high);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  };

  const dualPivotQuickSort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const [pivot1, pivot2] = await partition(arr, low, high);

      await dualPivotQuickSort(arr, low, pivot1 - 1);
      await dualPivotQuickSort(arr, pivot1 + 1, pivot2 - 1);
      await dualPivotQuickSort(arr, pivot2 + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    if (arr[low] > arr[high]) {
      [arr[low], arr[high]] = [arr[high], arr[low]];
    }
    let pivot1 = arr[low];
    let pivot2 = arr[high];

    let i = low + 1;
    let lt = low + 1;
    let gt = high - 1;

    while (i <= gt) {
      if (arr[i] < pivot1) {
        [arr[i], arr[lt]] = [arr[lt], arr[i]];
        lt++;
        i++;
        setSortedData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      } else if (arr[i] > pivot2) {
        [arr[i], arr[gt]] = [arr[gt], arr[i]];
        gt--;
        setSortedData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      } else {
        i++;
      }
    }
    lt--;
    gt++;

    [arr[low], arr[lt]] = [arr[lt], arr[low]];
    [arr[high], arr[gt]] = [arr[gt], arr[high]];

    setSortedData([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 50));

    return [lt, gt];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {sortedData.map((value, index) => (
          <div
            key={index}
            style={{ height: `${value * 3}px` }}
            className="w-4 bg-blue-500"
          ></div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Time taken: {timeTaken.toFixed(2)} ms
      </p>
    </div>
  );
};

export default DualPivotQuickSort;
