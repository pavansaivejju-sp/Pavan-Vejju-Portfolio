
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-black">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        Pavan Sai
      </h1>

      <p className="mt-3 text-xl text-zinc-600 dark:text-zinc-400">
        Frontend Developer
      </p>

      <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
        5+ years of experience building modern web applications using React,
        TypeScript, JavaScript, Next.js, and Redux.
      </p>

      <a
        href="/about"
        className="mt-6 rounded-full bg-black px-6 py-3 text-white hover:bg-zinc-800"
      >
        Learn More
      </a>
    </main>
  );
}

