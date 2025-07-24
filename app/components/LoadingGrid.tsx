"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  cardCount: number;
}

export const LoadingGrid = ({ cardCount }: Props) => {
  const arr = Array(cardCount).fill(0);
  return (
    <>
      <div className="mr-auto ml-auto max-w-200 mt-5 mb-10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {arr.map((_, index) => (
          <Card
            key={index}
            className="place-self-center max-w-xs xl:max-w-sm min-h-120 sm:h-full p-4 dark:bg-black/60  bg-blue-500/70 backdrop-blur-lg hover:bg-blue-600/30 transition border-2 border-indigo-500/50"
          >
            <CardTitle>
              <Skeleton className="h-4 w-60" />
            </CardTitle>
            <AspectRatio ratio={16 / 9}>
              <Skeleton className="w-full h-full object-cover" />
            </AspectRatio>
            <Skeleton className="h-4 w-50" />
            <CardContent>
              <CardDescription>
                <Skeleton className="h-4 w-72 sm:w-85" />
                <Skeleton className="h-4 w-72 sm:w-85" />
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
