import { useState, useEffect } from "react";

interface HeapSortProps {
  data: number[];
}

const HeapSort: React.FC<HeapSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    heapSortAnimation([...data]);
  }, [data]);

  const heapSortAnimation = async (arr: number[]) => {
    const startTime = performance.now();

    await heapSort(arr);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  };

  const heapSort = async (arr: number[]) => {
    const length = arr.length;

    for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
      await heapify(arr, length, i);
    }

    for (let i = length - 1; i >= 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
      await heapify(arr, i, 0);
    }
  };

  const heapify = async (arr: number[], length: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < length && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < length && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
      await heapify(arr, length, largest);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {sortedData.map((value, index) => (
          <div
            key={index}
            style={{ height: `${value * 3}px` }}
            className="w-4 bg-red-500"
          ></div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Time taken: {timeTaken.toFixed(2)} ms
      </p>
    </div>
  );
};

export default HeapSort;
