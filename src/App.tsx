import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import TrustLogos from './components/sections/TrustLogos'
import Platform from './components/sections/Platform'
import UseCasesDemo from './components/sections/UseCasesDemo'
import UseCases from './components/sections/UseCases'
import Compare from './components/sections/Compare'
import Pricing from './components/sections/Pricing'
import Security from './components/sections/Security'
import Integrations from './components/sections/Integrations'
import Roadmap from './components/sections/Roadmap'
import Testimonials from './components/sections/Testimonials'
import Faq from './components/sections/Faq'
import ContactForm from './components/sections/ContactForm'
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
        <UseCases />
        <Compare />
        <Pricing />
        <Security />
        <Integrations />
        <Roadmap />
        <Testimonials />
        <Faq />
        <ContactForm />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
