import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DarkModeToggle from "@/components/customized/switch/SwitchDarkMode";
import Summary from "@/components/Summary";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import useDataStore from "@/hooks/useDataStore";
import Link from "next/link";

interface NavBarProps {
  session?: {
    user: {
      email?: string;
    };
  };
  onSignOut: () => void;
}

const NavBar = ({ onSignOut }: NavBarProps) => {
  const session = useDataStore((state) => state.session);

  return (
    <div className="w-full flex items-center">
      <DotLottieReact
        className="hidden sm:block w-20 pt-3"
        src="clapper.lottie"
        loop
        autoplay
      />
      <NavigationMenu
        className="hidden sm:inline-flex pt-5 z-20"
        orientation="vertical"
      >
        <NavigationMenuList className="h-10 md:text-2xl text-base font-bold">
          <NavigationMenuItem>
            <NavigationMenuLink className="active:bg-red-700/50" asChild>
              <Link href="/">
                <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                  MovieRecommender
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="active:bg-red-700/50" asChild>
              <Link href="/about">
                <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                  About
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="sm:hidden pt-5 z-40">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger disableChevron={true}>
              <Menu />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="dark:bg-black/70  bg-blue-700/70 backdrop-blur-2xl pb-6">
              <ul className="grid w-[175px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/">
                      <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                        MovieRecommender
                      </span>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/about">
                      <span className="hover:border-b-4 border-indigo-500/90 pb-0">
                        About
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex pt-5 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex items-center sm:flex-nowrap flex-wrap">
          {session?.user.email && (
            <p className="pl-2 text-xs font-black text-blue-950 dark:text-white">
              <Summary overview={session?.user.email} characterLength={5} />
            </p>
          )}
          <Button
            type="submit"
            onClick={onSignOut}
            className="cursor-pointer hover:bg-blue-500/50 font-black text-blue-950 dark:text-white mx-2 transition-transform transform hover:scale-105 active:scale-95"
          >
            Sign Out
          </Button>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
