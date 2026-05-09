import { fetchGithubData } from "@/lib/github";

function CounterDisplay({ label, value }: { label: string, value: number | string }) {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-md shadow-[var(--card-shadow)]">
      <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{label}</span>
      <span className="font-mono text-3xl text-[var(--accent-deep)] font-bold">{value}</span>
    </div>
  );
}

export async function GitHub({ username = "aryaniitian" }: { username?: string }) {
  const stats = await fetchGithubData(username);

  return (
    <section id="github" className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-24 mb-10 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[var(--accent-glow)] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-14">
        <h2 className="font-fraunces font-medium text-[clamp(28px,3vw,38px)] text-[var(--accent-deep)] leading-[1.1] mb-2 transition-colors duration-300">
          Building in <span className="italic text-[var(--accent)] font-light">public.</span>
        </h2>
        <p className="text-[var(--text-muted)] text-[14px] transition-colors duration-300">
          Always iterating, exploring, and contributing to open source.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        <CounterDisplay label="Total Repos" value={stats.totalRepos} />
        <CounterDisplay label="Total Stars" value={stats.totalStars} />
        <CounterDisplay label="Commits Year" value={stats.commitsThisYear} />
        <CounterDisplay label="Top Stack" value={stats.topLanguage} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        {/* Pinned Repos */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-[var(--text-muted)] font-medium mb-1">Recent Open Source</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.pinned.map(repo => (
              <a 
                key={repo.id} 
                href={repo.html_url}
                target="_blank"
                rel="noreferrer" 
                className="magnetic block p-5 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)] transition-all hover:-translate-y-1 hover:border-[var(--card-border-hover)] hover:shadow-[var(--card-shadow-hover)] cursor-none group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-[15px] text-[var(--accent-deep)] font-mono truncate mr-4">{repo.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: repo.language === 'TypeScript' ? '#3178c6' : repo.language === 'Python' ? '#3572A5' : repo.language === 'Vue' ? '#41b883' : 'var(--accent)' }} />
                    <span className="flex items-center gap-0.5 ml-1">★ {repo.stargazers_count}</span>
                  </div>
                </div>
                <p className="text-[12px] text-[var(--text-muted)] line-clamp-2 min-h-[36px]">{repo.description || "No description provided."}</p>
              </a>
            ))}
            {stats.pinned.length === 0 && (
              <div className="col-span-2 p-8 text-center text-[var(--text-muted)] border border-dashed border-[var(--divider)] rounded-xl">
                Could not fetch GitHub activity. Check API limits.
              </div>
            )}
          </div>
        </div>

        {/* Activity Grid */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-[var(--text-muted)] font-medium mb-1">Activity Grid</h3>
          <div className="flex-grow rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] p-5 flex items-center justify-center shadow-[var(--card-shadow)]">
            <div className="grid grid-cols-10 grid-rows-5 gap-1.5">
              {stats.contributionGraphDays.map((val, i) => {
                const color = val === 0 ? 'var(--bg-tertiary)' : 
                              val === 1 ? 'var(--accent-light)' : 
                              val === 2 ? 'var(--accent)' : 
                              val === 3 ? 'var(--accent-deep)' : 'var(--accent-deep)';
                const opacity = val === 0 ? 0.3 : 1;
                return (
                  <div 
                    key={i} 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] transition-all duration-500 hover:border-[var(--accent-deep)] hover:scale-110"
                    style={{ backgroundColor: color, opacity, border: val === 0 ? '1px solid var(--divider)' : 'none' }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
