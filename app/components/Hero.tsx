"use client";
import { ReactNode } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Hero = ({
  children,
  className = "", // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}: HeroProps) => {
  const handleSignOut = async () => {
    const res = await fetch("/api/signout", { method: "POST" });
    console.log("status", res.status);
    if (res.ok) {
      window.location.href = "/signin";
    } else {
      const date = new Date();
      const formattedDate = format(date, "EEEE, MMMM do 'at' h:mmaaa");
      toast.error("Error during signout process", {
        description: formattedDate,
      });
    }
  };

  return (
    <section className="relative" id="prompt">
      {/*Overlay*/}
      <div className="w-full dark:bg-black/60 h-screen absolute inset-0 z-0 " />
      <div className="min-h-screen dark:bg-[url('/images/cinema.avif')] bg-[url('/images/cinema-red.avif')] bg-center bg-cover bg-no-repeat absolute inset-0 z-[-1] "></div>
      <div className="relative z-10" {...props}>
        <div className="min-h-screen">
          <NavBar onSignOut={handleSignOut} />
          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;
