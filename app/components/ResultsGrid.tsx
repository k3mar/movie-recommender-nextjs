"use client";
import { useEffect, useState } from "react";
import type { Movie } from "@/models/Movies";
import { Rating } from "@/components/Rating";
import Summary from "@/components/summary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NoImage from "@/assets/no_image.png";
import { AninmatedCard } from "@/components/animated/AnimatedComponents";
import { TMDB_WEBSITE_URL } from "@/lib/constants";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
interface Props {
  movies: Movie[];
}

export const ResultGrid = ({ movies }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  // Track the current slide (1-based index)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [slideCount, setSlideCount] = useState(0);
  const isSingleSlide = slideCount <= 1;

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    };

    setSlideCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap() + 1);

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const renderVideoSlides = (movie: Movie) => {
    if (
      Array.isArray(movie.tmdb_metadata?.videos?.results) &&
      movie.tmdb_metadata?.videos?.results?.length > 0
    )
      return (
        <>
          {movie.tmdb_metadata?.videos?.results?.map((video, idx) => (
            <CarouselItem key={idx}>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            </CarouselItem>
          ))}
        </>
      );
    else
      return (
        <>
          <AspectRatio ratio={16 / 9}>
            <img
              src={
                movie.tmdb_metadata?.backdrop_path
                  ? TMDB_IMAGE_BASE_URL + movie.tmdb_metadata?.backdrop_path
                  : NoImage.src
              }
              alt={
                movie.tmdb_metadata?.backdrop_path
                  ? `${movie.title} backdrop image`
                  : "Placholder for nor movie"
              }
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </>
      );
  };

  return (
    <div className="mt-10">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {movies.map((movie, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <AninmatedCard
                className=" place-self-center max-w-xs xl:max-w-sm min-h-120 sm:h-full p-4 dark:bg-black/60  bg-blue-500/70 backdrop-blur-lg hover:bg-blue-600/30 transition border-2 border-indigo-500/50"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CardTitle>{`${movie.title} (${movie.year})`}</CardTitle>
                {movie.tmdb_metadata?.tagline?.length !== 0 && (
                  <p className="text-xs italic">{`'${movie.tmdb_metadata?.tagline}'`}</p>
                )}

                <AspectRatio ratio={16 / 9}>
                  <img
                    src={
                      movie.tmdb_metadata?.backdrop_path
                        ? TMDB_IMAGE_BASE_URL +
                          movie.tmdb_metadata?.backdrop_path
                        : NoImage.src
                    }
                    alt={
                      movie.tmdb_metadata?.backdrop_path
                        ? `${movie.title} backdrop image`
                        : "Placholder for nor movie"
                    }
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <p>{movie.lead_actors.join(", ")}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs italic">
                    {movie.tmdb_metadata?.genres.reduce(
                      (prev, currGenere) => prev + " " + currGenere.name,
                      ""
                    )}
                  </p>
                  {movie.tmdb_metadata?.vote_average && (
                    <Rating value={movie.tmdb_metadata?.vote_average}></Rating>
                  )}
                </div>
                <CardContent>
                  <CardDescription>
                    <Summary
                      overview={movie.tmdb_metadata?.overview}
                      characterLength={300}
                    ></Summary>
                  </CardDescription>
                </CardContent>
              </AninmatedCard>
            </DialogTrigger>
            <DialogContent className="dark:bg-black bg-blue-500 pl-4 pr-4 border-indigo-600/50">
              <DialogHeader>
                <DialogTitle className="hover:underline">
                  <a
                    href={`${TMDB_WEBSITE_URL}/movie/${movie.tmdb_metadata?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >{`${movie.title} (${movie.year})`}</a>
                </DialogTitle>
                <Carousel
                  setApi={setApi}
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>{renderVideoSlides(movie)}</CarouselContent>
                  <CarouselPrevious
                    disabled={isSingleSlide}
                    className={isSingleSlide ? "hidden" : ""}
                  />
                  <CarouselNext
                    disabled={isSingleSlide}
                    className={isSingleSlide ? "hidden" : ""}
                  />
                  <div className="mt-1 text-right">
                    <span>{`${currentSlide}/${slideCount}`}</span>
                  </div>
                </Carousel>
                <p className=" text-xs sm:text-sm">
                  {movie.lead_actors.join(", ")}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs italic">
                    {movie.tmdb_metadata?.genres.reduce(
                      (prev, currGenere) => prev + " " + currGenere.name,
                      ""
                    )}
                  </p>
                  <a
                    href={`${TMDB_WEBSITE_URL}/movie/${movie.tmdb_metadata?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <img src="/images/tmdb.svg" alt="" className="h-3 w-auto" />
                    <span className="sr-only">View on TMDb</span>
                  </a>
                </div>
                <DialogDescription className="leading-7 [&:not(:first-child)]:mt-6 text-xs sm:text-sm">
                  {movie.tmdb_metadata?.overview}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};
