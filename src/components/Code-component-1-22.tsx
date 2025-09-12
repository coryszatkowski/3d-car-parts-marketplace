import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">WhipLab</div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Browse Cars
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Creators
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Sell Files
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-border text-foreground hover:bg-accent">
            Sign In
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}