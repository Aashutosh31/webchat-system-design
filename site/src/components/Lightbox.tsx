import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineXMark, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import type { Shot } from '../data'

interface LightboxProps {
  shots: Shot[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ shots, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      const next = (index + dir + shots.length) % shots.length
      onNavigate(next)
    },
    [index, shots.length, onNavigate],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, go, onClose])

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 sm:right-6 sm:top-6"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 sm:left-6"
          >
            <HiOutlineChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 sm:right-6"
          >
            <HiOutlineChevronRight className="h-6 w-6" />
          </button>

          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl"
          >
            <img
              src={shots[index].src}
              alt={shots[index].caption}
              className="max-h-[78vh] w-full rounded-xl border border-slate-800 object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-slate-300">
              {shots[index].caption}
              <span className="ml-2 text-slate-600">
                {index + 1} / {shots.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
