import { useState, useEffect } from "react";

interface SelectionSortProps {
  data: number[];
}

const SelectionSort: React.FC<SelectionSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    selectionSortAnimation([...data]);
  }, [data]);

  const selectionSortAnimation = async (arr: number[]) => {
    const startTime = performance.now();

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setSortedData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
      }
    }

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
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

export default SelectionSort;
