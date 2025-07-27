import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
// import { Products } from "@/components/products"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NowBuilding } from "@/components/now-building"
import { FloatingChatbot } from "@/components/floating-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-background">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      {/* <Products /> */}
      <Testimonials />
      <Contact />
      <Footer />
      <NowBuilding />
      <FloatingChatbot />
    </main>
  )
}
