import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500">
                BytebaseTech
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Crafting innovative web experiences that empower communities through technology.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://x.com/SsemakulaAdam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ssemakula-adam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/AdamUzDel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:adamssemakula@gmail.com.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              {/* <li>
                <Link href="#products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li> */}
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">BytebaseTech</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.bytebasetech.com/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://www.bytebasetech.com/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="https://www.bytebasetech.com/quote" className="text-muted-foreground hover:text-primary transition-colors">
                  Request Quote
                </a>
              </li>
              <li>
                <a href="https://www.bytebasetech.com/web-design-uganda" className="text-muted-foreground hover:text-primary transition-colors">
                  Web Design in Uganda
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Adam Ssemakula. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
