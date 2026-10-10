import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { TechMarquee } from './components/TechMarquee'
import { Features } from './components/Features'
import { Showcase } from './components/Showcase'
import { Highlights } from './components/Highlights'
import { Mobile } from './components/Mobile'
import { Stack } from './components/Stack'
import { Security } from './components/Security'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Features />
        <Showcase />
        <Highlights />
        <Mobile />
        <Stack />
        <Security />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
