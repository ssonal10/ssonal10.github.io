import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, scrollToId } from '../lib/motion';
import { chips, runQuery, type Result } from '../lib/query';

/**
 * "Query me": a tiny SQL prompt over the facts already on the page.
 * Grammar: select cols|* from table [where col (=|!=|>|<|like) value]
 *          [order by col [asc|desc]] [limit n]
 * Press "/" anywhere to focus it. Rows link back to their section.
 */

export function Query() {
  const [sql, setSql] = useState(chips[0].q);
  const [res, setRes] = useState<Result | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const out = useRef<HTMLDivElement>(null);

  // "/" anywhere focuses the prompt
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        scrollToId('contact');
        window.setTimeout(() => input.current?.focus(), 900);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useLayoutEffect(() => {
    if (!out.current || !res) return;
    gsap.from(out.current.querySelectorAll('tr, .q-error'), { opacity: 0, x: -8, duration: 0.4, stagger: 0.03, ease: 'power2.out' });
  }, [res]);

  const run = (q = sql) => {
    setSql(q);
    setRes(runQuery(q));
  };

  return (
    <div className="relative mt-16 max-w-3xl rounded-2xl border border-line bg-[#121210] p-4 font-mono text-[13px] sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="label text-lime">Query me</p>
        <p className="label hidden text-stone sm:block">press / anywhere</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
        className="flex items-center gap-2 border-b border-line pb-3"
      >
        <span className="text-lime">&gt;</span>
        <input
          ref={input}
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          aria-label="SQL query over this site's data"
          className="w-full bg-transparent text-paper outline-none placeholder:text-stone"
          placeholder="select * from work"
        />
        <button type="submit" className="label rounded-full bg-lime px-3 py-1.5 text-ink" data-cursor="run">
          Run
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => run(c.q)}
            className="rounded-full border border-line px-3 py-1 text-[11px] text-paper/80 transition hover:border-lime hover:text-lime"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div ref={out} className="mt-4 overflow-x-auto" aria-live="polite">
        {res && 'error' in res && <p className="q-error rounded-lg bg-[#ff5a4e] px-3 py-2 text-ink">{res.error}</p>}
        {res && !('error' in res) && (
          <>
            <table className="w-full text-left">
              <thead>
                <tr className="text-stone">
                  {res.cols.map((c) => (
                    <th key={c} className="pb-2 pr-4 font-normal">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {res.rows.map((r, i) => (
                  <tr
                    key={i}
                    className="cursor-pointer border-t border-line align-top text-paper/90 hover:text-lime"
                    onClick={() => scrollToId(res.section)}
                    data-cursor="go"
                  >
                    {res.cols.map((c) => (
                      <td key={c} className="py-2 pr-4">
                        {String(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-stone">
              ({res.rows.length} row{res.rows.length === 1 ? '' : 's'}) · computed in your browser.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
