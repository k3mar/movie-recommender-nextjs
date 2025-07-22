"use client";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PromptInput from "./prompt-input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import useDataStore from "@/lib/dataStore";
import Summary from "./summary";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import DarkModeToggle from "./customized/switch/switch-dark-mode";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Hero({ className = "", ...props }: Props) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 1000; // adjust for when to fully fade
      const newOpacity = Math.max(1 - scrollTop / maxScroll, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const session = useDataStore((state) => state.session);

  const handleSignOut = async () => {
    const res = await fetch("/api/signout", { method: "POST" });
    window.location.href = "/signin";
    // handle response
  };

  return (
    <section className="relative" id="prompt">
      {/*Overlay*/}
      <div className="w-full dark:bg-black/60 h-screen absolute inset-0 z-0 " />
      <div className="min-h-screen dark:bg-[url('/images/cinema.avif')] bg-[url('/images/cinema-red.avif')] bg-center bg-cover bg-no-repeat absolute inset-0 z-[-1] "></div>
      <div className="relative z-10" {...props}>
        <div className="min-h-screen">
          <div className="w-full flex  items-center ">
            <DotLottieReact
              className="hidden sm:block w-20 pt-3"
              src="clapper.lottie"
              loop
              autoplay
            />
            <NavigationMenu
              className="hidden sm:inline-flex pt-5 z-20 "
              orientation="vertical"
            >
              <NavigationMenuList className="h-10  md:text-2xl text-base font-bold">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="active:bg-red-700/50 "
                    href="https://github.com/k3mar/movie-recommender"
                  >
                    <span className="hover:border-b-4 border-indigo-500/90 pb-0 ">
                      MovieRecommender
                    </span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className=" active:bg-red-700/50 "
                    href="https://www.google.com"
                  >
                    <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                      About
                    </span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className=" sm:hidden  pt-5 z-40 ">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger disableChevron={true}>
                    <Menu />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-black/70 backdrop-blur-2xl pb-6">
                    <ul className="grid w-[175px] gap-4 ">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#">
                            <span className="hover:border-b-4 border-indigo-500/90 pb-0 ">
                              MovieRecommender
                            </span>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a href="#">
                            <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                              About
                            </span>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex  pt-5 items-center ">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex  items-center sm:flex-nowrap flex-wrap  ">
                {session?.user.email && (
                  <p className="pl-2 text-xs font-black  text-blue-950 dark:text-white">
                    <Summary
                      overview={session?.user.email}
                      characterLength={5}
                    ></Summary>
                  </p>
                )}
                <Button
                  type="submit"
                  onClick={handleSignOut}
                  className="cursor-pointer hover:bg-blue-500/50 font-black text-blue-950 dark:text-white"
                >
                  Sign Out
                </Button>
                <DarkModeToggle />
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <motion.h1 className="inline-block text-2xl font-josefin font-extrabold tracking-tight text-balance">
              What's your mood?
            </motion.h1>
          </div>
          <div className="flex justify-center max-h-screen">
            <motion.div
              className="content  relative z-30 text-center text-white mt-6 mr-5 ml-5  rounded-3xl p-5 shadow-lg shadow-cyan-500/50 w-[50vh]  bg-[url('/images/movies.avif')] bg-cover bg-center mb-2 h-[70vh]"
              style={{ opacity }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              {/*overlay*/}
              <div className="absolute  inset-0 dark:bg-black/75 z-30 rounded-3xl" />
              <div className="relative  z-40 h-full  flex flex-col justify-around">
                <div>
                  <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">
                    Find the perfect movie to match it.
                  </p>
                </div>
                <PromptInput></PromptInput>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
