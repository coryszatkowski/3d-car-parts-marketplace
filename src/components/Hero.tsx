import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CarSelector } from './car/CarSelector';

export function Hero() {
  const handleCarSelection = (selection: any) => {
    console.log('Car selected:', selection);
    // TODO: Navigate to parts page or show results
  };

  return (
    <section className="relative bg-gradient-to-b from-background to-background/80 py-24 overflow-hidden">
      {/* Carbon fiber texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              <span className="text-foreground">Whip</span>
              <span style={{ color: '#0a68b1' }}>Lab</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Print it. Mod it. Drive it.</p>

            {/* Car Selector */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Find Parts for Your Ride
              </h3>
              <CarSelector onSelectionChange={handleCarSelection} />
              
              <Button
                className="w-full text-white mt-4"
                style={{ backgroundColor: '#0a68b1' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0856a0')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0a68b1')}
              >
                Find Parts
              </Button>
            </div>
          </div>

          {/* Right side - 3D Part Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655103955676-c9fbc4b65525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZWQlMjBjYXIlMjB0dXJibyUyMGludGFrZSUyMG1hbmlmb2xkJTIwYXV0b21vdGl2ZSUyMHBhcnR8ZW58MXx8fHwxNzU3NjA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="3D printed turbo intake manifold"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay"></div>
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur rounded-lg px-3 py-2">
                <p className="text-sm text-foreground">E90 335i Turbo Intake</p>
                <p className="text-xs text-muted-foreground">Ready to print</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
