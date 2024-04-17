'use client';

import { Suspense } from "react";
import Loading from "./loading";
import Search from "./components/search";
import MoviesContainer from "~/app/components/movies-container";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
    <main className="flex w-full min-h-96 h-full overflow-hidden flex-col items-center justify-between p-12 gap-4">
      <Suspense fallback={<Loading />}>
        <div className="size-full">
          <Search />
        </div>
        <MoviesContainer />
      </Suspense>
    </main>
    </QueryClientProvider>
  );
}