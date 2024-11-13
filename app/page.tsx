"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import BubbleSort from "./sorting/BubbleSort";
import QuickSort from "./sorting/QuickSort";
import MergeSort from "./sorting/MergeSort";
import InsertionSort from "./sorting/InsertionSort";
import SelectionSort from "./sorting/SelectionSort";
import HeapSort from "./sorting/HeapSort";
import DualPivotQuickSort from "./sorting/DualPivotQuickSort"

export default function Home() {
  const [elementCount, setElementCount] = useState(20);
  const [data, setData] = useState<number[]>([]);

  // Generate random data based on the element count
  const generateData = () => {
    const randomData = Array.from({ length: elementCount }, () =>
      Math.floor(Math.random() * 100)
    );
    setData(randomData);
  };

  useEffect(() => {
    generateData();
  }, [elementCount]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="flex flex-col gap-4 items-center sm:items-start w-full">
          <label className="text-sm font-medium">Number of Elements:</label>
          <input
            type="number"
            value={elementCount}
            onChange={(e) => setElementCount(Number(e.target.value))}
            className="w-full max-w-xs p-2 border border-gray-300 rounded"
            min={5}
            max={100}
          />
          <button
            onClick={generateData}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Generate New Data
          </button>
        </div>

        <Tabs defaultValue="bubble">
          <TabsList>
            <TabsTrigger value="bubble">Bubble Sort</TabsTrigger>
            <TabsTrigger value="quick">Quick Sort</TabsTrigger>
            <TabsTrigger value="merge">Merge Sort</TabsTrigger>
            <TabsTrigger value="insertion">Insertion Sort</TabsTrigger>
            <TabsTrigger value="selection">Selection Sort</TabsTrigger>
            <TabsTrigger value="heap">Heap Sort</TabsTrigger>
            <TabsTrigger value="dualpivot">Dual Pivot Quick Sort</TabsTrigger>
          </TabsList>

          <TabsContent value="bubble">
            <BubbleSort data={data} />
          </TabsContent>
          <TabsContent value="quick">
            <QuickSort data={data} />
          </TabsContent>
          <TabsContent value="merge">
            <MergeSort data={data} />
          </TabsContent>
          <TabsContent value="insertion">
            <InsertionSort data={data} />
          </TabsContent>
          <TabsContent value="selection">
            <SelectionSort data={data} />
          </TabsContent>
          <TabsContent value="heap">
            <HeapSort data={data} />
          </TabsContent>
          <TabsContent value="dualpivot">
            <DualPivotQuickSort data={data} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
