import { useState, useEffect } from "react";

interface BubbleSortProps {
  data: number[];
}

const BubbleSort: React.FC<BubbleSortProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState<number[]>([...data]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    setSortedData([...data]);
    bubbleSortAnimation();
  }, [data]);

  const bubbleSortAnimation = async () => {
    const arr = [...data];
    const startTime = performance.now();

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSortedData([...arr]); // Update state for animation
          await new Promise((resolve) => setTimeout(resolve, 100)); // Control animation speed
        }
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

export default BubbleSort;
