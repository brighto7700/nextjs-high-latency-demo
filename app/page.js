import { Suspense } from 'react';

/**
 * SIMULATED LATENCY COMPONENT
 * This represents the "Slow" part of the app (the database).
 * We manually delay it to show off the Skeleton/Suspense.
 */
async function HeavyQuizContent() {
  // Simulate a 2.5 second delay common on 3G networks
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const questions = [
    { id: 1, q: "What is the SI unit of power?", a: "Watt" },
    { id: 2, q: "Which particle has a negative charge?", a: "Electron" },
    { id: 3, q: "Energy of motion is called?", a: "Kinetic Energy" }
  ];

  return (
    <div className="space-y-4">
      {questions.map((item) => (
        <div key={item.id} className="p-5 border border-slate-700 bg-slate-800/40 rounded-xl hover:border-sky-500 transition-colors">
          <p className="font-medium text-lg mb-2">{item.q}</p>
          <div className="flex gap-2">
            <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-400">Physics</span>
            <span className="text-xs bg-sky-500/20 px-2 py-1 rounded text-sky-400 font-bold">JUPEB</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * THE SKELETON
 * This shows instantly, giving the student immediate feedback.
 */
function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-28 bg-slate-800 rounded-xl border border-slate-700/50"></div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto min-h-screen p-6 md:p-12">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Exam Portal Alpha
        </h1>
        <p className="text-slate-400 mt-2">
          This page uses <strong>React Suspense</strong> and <strong>Streaming</strong> to bypass latency.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Available Questions</h2>
        
        {/* The Magic Boundary */}
        <Suspense fallback={<LoadingSkeleton />}>
          <HeavyQuizContent />
        </Suspense>
      </section>

      <footer className="mt-20 text-center text-slate-600 text-sm">
        Built for SitePoint Case Study &bull; Optimized for Low Bandwidth
      </footer>
    </main>
  );
  }
