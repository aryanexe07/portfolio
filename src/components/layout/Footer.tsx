export function Footer() {
  return (
    <footer className="w-full border-t border-soft-blue/35 py-8 mt-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-14 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center md:text-left">
        {/* Left */}
        <div className="font-mono text-[13px] text-muted">
          <span className="text-accent-blue">{">_"}</span> aryan.exe
        </div>

        {/* Center */}
        <div className="text-[12px] text-muted md:text-center">
          © {new Date().getFullYear()} Aryan. All rights reserved.
        </div>

        {/* Right */}
        <div className="text-[12px] text-muted md:text-right flex items-center justify-center md:justify-end gap-2">
          <span>Built with motion, systems, and too much caffeine.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
