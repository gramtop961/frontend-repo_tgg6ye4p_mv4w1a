export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} AI Blog Generator. All rights reserved.</p>
        <p>
          Built with care — Spline hero, Tailwind UI.
        </p>
      </div>
    </footer>
  );
}
