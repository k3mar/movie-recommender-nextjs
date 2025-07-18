const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-center text-xs mt-5 space-y-2 text-black dark:text-white relative z-10">
      <div className="w-4/5">
        <p className="text-wrap">
          This product uses the{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block align-middle"
            title="TMDb"
            aria-label="The Movie Database"
          >
            <img
              src="/images/tmdb.svg"
              alt="TMDb"
              className="h-3 w-auto mx-1 inline"
            />
          </a>
          API but is not endorsed or certified by TMDb.
        </p>
        <p>
          AI by{" "}
          <a
            href="https://openai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className=" space-x-1 hover:underline"
          >
            <span>OpenAI</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
