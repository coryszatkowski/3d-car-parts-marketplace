import { Button } from './ui/button';
import { AuthModal } from './auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Settings, LogOut, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import whiplabLogo from '../assets/whiplab_logo.png';

export function Header() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleMyAccountClick = () => {
    navigate('/my-account');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSignOutClick = () => {
    signOut();
  };


  if (loading) {
    return (
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={whiplabLogo} alt="WhipLab" className="h-12 w-auto" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
        {/* Carbon fiber divider */}
        <div className="h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"></div>
      </header>
    );
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={whiplabLogo} alt="WhipLab" className="h-12 w-auto" />
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
                <div 
                  className="relative h-10 w-10 rounded-full cursor-pointer hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="User menu"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || user.email} />
                    <AvatarFallback>
                      {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50 bg-background border border-border shadow-lg" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleMyAccountClick}>
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  My Parts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOutClick}>
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
      {/* Carbon fiber divider */}
      <div className="h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20"></div>
    </header>
  );
}
