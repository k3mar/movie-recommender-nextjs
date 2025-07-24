import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function ErrorPage() {
  return (
    <div>
      <Hero>
        <p className="mx-20 text-center mt-20 text-red-700">
          An error has occured!
        </p>
      </Hero>
      <Footer></Footer>
    </div>
  );
}
