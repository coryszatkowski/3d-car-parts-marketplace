import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductFeed } from "./components/ProductFeed";
import { CreatorSpotlight } from "./components/CreatorSpotlight";
import { HowItWorks } from "./components/HowItWorks";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { ProductPage } from "./components/ProductPage";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');

  // Simple view switching for demo - in a real app you'd use a router
  if (currentView === 'product') {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <ProductPage onBackClick={() => setCurrentView('home')} />
          <Footer />
          <Toaster richColors position="top-right" />
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <ProductFeed onProductClick={() => setCurrentView('product')} />
        <CreatorSpotlight />
        <HowItWorks />
        <Community />
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </AuthProvider>
  );
}