import { Separator } from './ui/separator';
import { Instagram } from 'lucide-react';
import whiplabLogo from '../assets/whiplab_logo.png';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Carbon fiber divider */}
      <div className="h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img src={whiplabLogo} alt="WhipLab" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md">
              The premier marketplace for 3D printable automotive parts. Print it. Mod it. Drive it.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a3.87 3.87 0 0 1-3.87 3.87 3.81 3.81 0 0 1-3.74-3.87 3.81 3.81 0 0 1 3.74-3.87c.21 0 .42.02.62.05V1.69c-.2-.02-.4-.04-.62-.04A5.71 5.71 0 0 0 4.15 7.38 5.71 5.71 0 0 0 9.87 13.1c.21 0 .42-.02.62-.05v3.03c-.2.02-.4.04-.62.04a5.71 5.71 0 0 1-5.72-5.72 5.71 5.71 0 0 1 5.72-5.72c.21 0 .42.02.62.05v-1.21h2.08c0-.21.02-.42.05-.62z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="text-center text-muted-foreground text-sm">
          © 2025 WhipLab. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
