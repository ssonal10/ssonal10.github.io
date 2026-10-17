import { motion } from 'framer-motion';

type Media = { src: string; caption: string; tilt: number };

const photos: Media[] = [
  { src: '/photos/rainier-snow.jpg', caption: 'Naches · Washington', tilt: -2 },
  { src: '/photos/maui-cliff.jpg', caption: 'Kapalua · Maui', tilt: 2 },
  { src: '/photos/nyc-wtc.jpg', caption: 'One World Trade · NYC', tilt: -1.5 },
  { src: '/photos/squamish.jpg', caption: 'Sea to Sky · Squamish', tilt: 1.5 },
  { src: '/photos/nyc-bridge.jpg', caption: 'Brooklyn Bridge · NYC', tilt: -3 },
  { src: '/photos/tulips.jpg', caption: 'Tulip season · 2023', tilt: 2.5 },
  { src: '/photos/kullu.jpg', caption: 'Kullu · India', tilt: -2 },
  { src: '/photos/andaman-sunset.jpg', caption: 'Andaman Sea · India', tilt: 1.5 },
  { src: '/photos/space-needle.jpg', caption: 'Space Needle · Seattle', tilt: -1 },
]

export function PhotoStrip() {
  return (
    <section className="py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <span className="section-label">Postcards</span>
          <h3 className="mt-4 font-display text-3xl italic leading-tight text-slate-100 sm:text-4xl">
            Seattle, and wherever the weekend goes.
          </h3>
        </div>
        <p className="hidden max-w-xs text-sm text-slate-400 md:block">
          Seattle is home. Most weekends end up on a mountain or a coastline.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
            className="glass group relative overflow-hidden rounded-2xl p-2 transition-all"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
            </div>
            <figcaption className="flex items-center justify-between px-2 pt-2.5 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <span className="truncate">{p.caption}</span>
              <span className="ml-2 shrink-0 text-slate-600">0{i + 1}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
