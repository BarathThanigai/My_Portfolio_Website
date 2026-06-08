export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">

      <div className="text-center max-w-3xl">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Full Stack Developer
        </h1>

        <p className="mt-5 text-gray-600 dark:text-gray-300 text-lg">
          I build scalable web applications using React, Node.js, and modern UI systems.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Projects
          </button>

          <button className="px-6 py-2 border rounded-md border-gray-300 dark:border-white/20">
            Download Resume
          </button>
        </div>

      </div>

    </section>
  );
}