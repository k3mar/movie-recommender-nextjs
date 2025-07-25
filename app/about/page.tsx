import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div>
      <Hero>
        <section className="mt-5 w-fit mx-auto dark:bg-black/40 bg-slate-500/40 p-5 rounded-3xl  backdrop-blur-lg ">
          <h1 className="text-center mb-5 text-xl font-bold">
            🎬 MovieRecommender - Mood-Based Movie Recommender
          </h1>
          <p>
            <strong>Description:</strong> A web app that recommends movies based
            on your current mood using OpenAI&apos;s language model, enriched
            with TMDB metadata.
          </p>

          <h2 className="mt-2">🧱 Tech Stack</h2>
          <ul>
            <li>
              <strong>Frontend:</strong> Next.js (App Router), TypeScript,
              Tailwind CSS, shadcn/ui
            </li>
            <li>
              <strong>State Management:</strong> Zustand
            </li>
            <li>
              <strong>API Integration:</strong> OpenAI, TMDB
            </li>
            <li>
              <strong>Auth & DB:</strong> Supabase
            </li>
            <li>
              <strong>Data Fetching:</strong> React Query
            </li>
            <li>
              <strong>CI/CD:</strong> GitHub Actions (Docker build & push to
              ECR)
            </li>
          </ul>

          <h2 className="mt-2">🚀 Features</h2>
          <ul>
            <li>Input-based movie mood recommendation</li>
            <li>Supabase user authentication</li>
            <li>Dark mode toggle</li>
            <li>Loading animations with Framer Motion</li>
          </ul>

          <h2 className="mt-2">🛠️ Deployment</h2>
          <ul>
            <li>Dockerized frontend and backend</li>
            <li>
              Environment variables managed via runtime injection in containers
            </li>
          </ul>
          <h2 className="mt-2">🔗 External APIs</h2>
          <ul>
            <li>
              <a href="https://openai.com">OpenAI</a> – GPT-4 for mood
              interpretation
            </li>
            <li>
              <a href="https://www.themoviedb.org/">TMDB</a> – Movie metadata
              and posters
            </li>
          </ul>
        </section>
      </Hero>
    </div>
  );
}
