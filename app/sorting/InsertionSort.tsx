import { useState, useEffect } from "react";

interface InsertionSortProps {
  data: number[];
}

const InsertionSort: React.FC<InsertionSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    insertionSortAnimation([...data]);
  }, [data]);

  const insertionSortAnimation = async (arr: number[]) => {
    const startTime = performance.now();

    for (let i = 1; i < arr.length; i++) {
      
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setSortedData([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
      }
      arr[j + 1] = key;
      setSortedData([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 100));
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

export default InsertionSort;
