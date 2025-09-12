import { Button } from "./ui/button";
import { AuthModal } from "./auth/AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User, Settings, LogOut, Package, Heart } from "lucide-react";
import whiplabLogo from "../assets/whiplab_logo.png";

export function Header() {
  const { user, profile, signOut, loading } = useAuth();

  if (loading) {
    return (
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={whiplabLogo} alt="WhipLab" className="h-8 w-auto" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={whiplabLogo} alt="WhipLab" className="h-8 w-auto" />
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

        {/* Auth Section */}
        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || user.email} />
                    <AvatarFallback>
                      {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  My Parts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <AuthModal defaultTab="signin">
                <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                  Sign In
                </Button>
              </AuthModal>
              <AuthModal defaultTab="signup">
                <Button className="bg-secondary hover:bg-secondary/90 text-white">
                  Get Started
                </Button>
              </AuthModal>
            </>
          )}
        </div>
      </div>
    </header>
  );
}