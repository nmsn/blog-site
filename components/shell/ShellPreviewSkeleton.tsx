export default function ShellPreviewSkeleton() {
  return (
    <div className="flex h-full w-full justify-center px-6 py-8 text-black md:px-10 md:py-11 dark:text-white">
      <div className="w-full max-w-6xl">
        <div className="pb-8">
          <div className="h-2.5 w-14 bg-black/6 dark:bg-white/6" />
          <div className="mt-4 h-10 w-44 bg-black/7 md:h-14 md:w-56 dark:bg-white/7" />
          <div className="mt-5 h-2.5 w-full max-w-xl bg-black/5 dark:bg-white/5" />
          <div className="mt-3 h-2.5 w-full max-w-lg bg-black/5 dark:bg-white/5" />
        </div>

        <div className="flex flex-1 flex-col gap-8 md:flex-row md:gap-10">
          <aside className="hidden md:block md:w-[220px] md:flex-none">
            <div className="border border-black/8 bg-white/50 px-5 py-5 dark:border-white/10 dark:bg-black/40">
              <div className="h-2.5 w-18 bg-black/6 dark:bg-white/6" />
              <div className="mt-5 space-y-3">
                {[86, 74, 68, 79].map((width, index) => (
                  <div
                    key={index}
                    className="h-7 bg-black/5 dark:bg-white/5"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="border-t border-black/10 py-7 first:border-t-0 first:pt-0 dark:border-white/12"
              >
                <div className="h-2.5 w-20 bg-black/6 dark:bg-white/6" />
                <div className="mt-4 h-7 w-full max-w-xl bg-black/7 dark:bg-white/7" />
                <div className="mt-3 h-2.5 w-full max-w-lg bg-black/5 dark:bg-white/5" />
                <div className="mt-4 flex flex-wrap gap-3">
                  {[14, 11, 9].map((width, tagIndex) => (
                    <div
                      key={`${item}-${tagIndex}`}
                      className="h-4 bg-black/5 dark:bg-white/5"
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
                <div className="mt-5 h-2.5 w-full max-w-2xl bg-black/5 dark:bg-white/5" />
                <div className="mt-3 h-2.5 w-full max-w-xl bg-black/5 dark:bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
