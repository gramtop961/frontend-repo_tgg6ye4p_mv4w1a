import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability (does not block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-4 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          AI Voice Aura Animation • Futuristic • Minimal
        </span>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          AI-Powered Blog Generator
        </h1>
        <p className="max-w-2xl text-lg leading-7 text-gray-600">
          Turn ideas into polished articles in seconds. Choose tone, add keywords, and generate SEO-friendly content instantly.
        </p>
      </div>
    </section>
  );
}
