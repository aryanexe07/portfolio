import { fetchGithubData } from "@/lib/github";

function CounterDisplay({ label, value }: { label: string, value: number | string }) {
  // Using generic static representation for server side, in a fully client dynamic app
  // these could be animated up via GSAP, but Next RSC renders the final HTML value directly.
  return (
    <div className="flex flex-col gap-1 p-5 rounded-2xl bg-white/40 border border-mid-blue/20 backdrop-blur-md shadow-sm">
      <span className="text-[11px] uppercase tracking-wider text-muted font-medium">{label}</span>
      <span className="font-mono text-3xl text-navy font-bold">{value}</span>
    </div>
  );
}

export async function GitHub({ username = "aryaniitian" }: { username?: string }) {
  // Hardcoded based on "https://api.github.com/users/aryaniitian" prompt request
  const stats = await fetchGithubData(username);

  return (
    <section id="github" className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-24 mb-10 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-soft-blue/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-14">
        <h2 className="font-fraunces font-medium text-[clamp(28px,3vw,38px)] text-navy leading-[1.1] mb-2">
          Building in <span className="italic text-accent-blue font-light">public.</span>
        </h2>
        <p className="text-muted text-[14px]">
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
          <h3 className="text-[13px] uppercase tracking-widest text-muted font-medium mb-1">Recent Open Source</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.pinned.map(repo => (
              <a 
                key={repo.id} 
                href={repo.html_url}
                target="_blank"
                rel="noreferrer" 
                className="magnetic block p-5 rounded-xl bg-white/60 border border-mid-blue/30 shadow-sm transition-all hover:-translate-y-1 hover:border-accent-blue hover:shadow-md cursor-none group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-[15px] text-navy font-mono truncate mr-4">{repo.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: repo.language === 'TypeScript' ? '#3178c6' : repo.language === 'Python' ? '#3572A5' : repo.language === 'Vue' ? '#41b883' : '#628ECB' }} />
                    <span className="flex items-center gap-0.5 ml-1">★ {repo.stargazers_count}</span>
                  </div>
                </div>
                <p className="text-[12px] text-muted line-clamp-2 min-h-[36px]">{repo.description || "No description provided."}</p>
              </a>
            ))}
            {stats.pinned.length === 0 && (
              <div className="col-span-2 p-8 text-center text-muted border border-dashed border-mid-blue/40 rounded-xl">
                Could not fetch GitHub activity. Check API limits.
              </div>
            )}
          </div>
        </div>

        {/* Contribution Graph Mock */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[13px] uppercase tracking-widest text-muted font-medium mb-1">Activity Grid</h3>
          <div className="flex-grow rounded-xl bg-white/40 border border-mid-blue/20 p-5 flex items-center justify-center">
            <div className="grid grid-cols-10 grid-rows-5 gap-1.5 opacity-80 mix-blend-multiply">
              {stats.contributionGraphDays.map((val, i) => {
                const color = val === 0 ? '#F0F3FA' : 
                              val === 1 ? '#D5DEEF' : 
                              val === 2 ? '#B1C9EF' : 
                              val === 3 ? '#628ECB' : '#395886';
                return (
                  <div 
                    key={i} 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] transition-colors duration-500 hover:border-navy"
                    style={{ backgroundColor: color, border: val === 0 ? '1px solid rgba(177,201,239,0.3)' : 'none' }}
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
