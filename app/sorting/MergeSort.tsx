import { useState, useEffect } from "react";

interface MergeSortProps {
  data: number[];
}

const MergeSort: React.FC<MergeSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    mergeSortAnimation([...data]);
  }, [data]);

  const mergeSortAnimation = async (arr: number[]) => {
    const startTime = performance.now();

    await mergeSort(arr, 0, arr.length - 1);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  };

  const mergeSort = async (arr: number[], left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSort(arr, left, middle);
      await mergeSort(arr, middle + 1, right);
      await merge(arr, left, middle, right);
    }
  };

  const merge = async (arr: number[], left: number, middle: number, right: number) => {
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArray.length && j < rightArray.length) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      i++;
      k++;
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      j++;
      k++;
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {sortedData.map((value, index) => (
          <div
            key={index}
            style={{ height: `${value * 3}px` }}
            className="w-4 bg-purple-500"
          ></div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Time taken: {timeTaken.toFixed(2)} ms
      </p>
    </div>
  );
};

export default MergeSort;
