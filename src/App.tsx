import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import TrustLogos from './components/sections/TrustLogos'
import Platform from './components/sections/Platform'
import UseCasesDemo from './components/sections/UseCasesDemo'
import Compare from './components/sections/Compare'
import Security from './components/sections/Security'
import Roadmap from './components/sections/Roadmap'
import Faq from './components/sections/Faq'
import FinalCta from './components/sections/FinalCta'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustLogos />
        <Platform />
        <UseCasesDemo />
        <Compare />
        <Security />
        <Roadmap />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
