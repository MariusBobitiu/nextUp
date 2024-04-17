// import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import Search from "./components/search";
import MoviesContainer from "~/app/components/movies-container";

const Home = () => {

  return (
    <main className="flex w-full min-h-96 h-full overflow-hidden flex-col items-center justify-between p-12 gap-4">
      <Suspense fallback={<Loading />}>
        <div className="size-full">
          <Search />
        </div>
        <MoviesContainer movies={movies} />
      </Suspense>
    </main>
  );
}

export default Home;