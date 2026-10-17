// Pure query engine for the "Query me" prompt: a tiny SQL subset over data.ts.
import { experience, life, numbers, stack, work } from '../data';

export type Row = Record<string, string | number>;

export const tables: Record<string, { rows: Row[]; section: string }> = {
  work: {
    rows: work.map((w) => ({ name: w.name, year: Number(w.year), kind: w.kind, impact: w.impact })),
    section: 'work',
  },
  path: {
    rows: experience.map((e) => ({ role: e.role, org: e.org, period: e.period, since: Number(e.period.match(/\d{4}/)?.[0]) })),
    section: 'path',
  },
  numbers: {
    rows: numbers.map((n) => ({
      value: n.display ?? `${n.value}${n.suffix ?? ''}`,
      was: n.was ?? '',
      what: n.small,
    })),
    section: 'numbers',
  },
  life: { rows: life.map((l) => ({ caption: l.caption })), section: 'life' },
  stack: { rows: stack.map((s) => ({ tool: s })), section: 'numbers' },
};

export const chips = [
  { label: 'shipped in 2026', q: "select name, impact from work where year = 2026" },
  { label: 'roles by date', q: 'select role, period from path order by since desc' },
  { label: 'the numbers', q: 'select * from numbers' },
  { label: 'photos', q: 'select caption from life limit 6' },
];

export type Result = { cols: string[]; rows: Row[]; section: string } | { error: string };

function unquote(v: string) {
  return v.replace(/^['"]|['"]$/g, '');
}

export function runQuery(sql: string): Result {
  const q = sql.trim().replace(/;$/, '');
  if (/^\s*(drop|delete|update|insert|truncate|alter)\b/i.test(q)) return { error: 'ERROR: this database is read-only. Nice try.' };
  const m = q.match(
    /^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(\w+)\s*(=|!=|>|<|like)\s*('[^']*'|"[^"]*"|[\w.]+))?(?:\s+order\s+by\s+(\w+)(?:\s+(asc|desc))?)?(?:\s+limit\s+(\d+))?$/i,
  );
  if (!m) return { error: 'ERROR: syntax. Try: select * from work limit 3' };
  const [, colsRaw, table, wCol, op, wValRaw, oCol, oDir, lim] = m;
  const t = tables[table.toLowerCase()];
  if (!t) return { error: `ERROR: no such table "${table}". Try work, path, numbers, life, stack.` };
  const all = Object.keys(t.rows[0] ?? {});
  const cols = colsRaw.trim() === '*' ? all : colsRaw.split(',').map((c) => c.trim().toLowerCase());
  const bad = cols.find((c) => !all.includes(c));
  if (bad) return { error: `ERROR: no column "${bad}" in ${table}. Columns: ${all.join(', ')}.` };

  let rows = [...t.rows];
  if (wCol) {
    const col = wCol.toLowerCase();
    if (!all.includes(col)) return { error: `ERROR: no column "${wCol}" in ${table}.` };
    const val = unquote(wValRaw);
    rows = rows.filter((r) => {
      const cell = r[col];
      const num = Number(val);
      switch (op.toLowerCase()) {
        case '=':
          return String(cell).toLowerCase() === val.toLowerCase();
        case '!=':
          return String(cell).toLowerCase() !== val.toLowerCase();
        case '>':
          return Number(cell) > num;
        case '<':
          return Number(cell) < num;
        default:
          return String(cell).toLowerCase().includes(val.replace(/%/g, '').toLowerCase());
      }
    });
  }
  if (oCol) {
    const col = oCol.toLowerCase();
    rows.sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (oDir?.toLowerCase() === 'desc' ? -1 : 1));
  }
  if (lim) rows = rows.slice(0, Number(lim));
  return { cols, rows: rows.map((r) => Object.fromEntries(cols.map((c) => [c, r[c]]))), section: t.section };
}

