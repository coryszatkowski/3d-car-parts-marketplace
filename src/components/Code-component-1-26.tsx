import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-background to-background/80 py-24 overflow-hidden">
      {/* Carbon fiber texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-primary">Whip</span>
              <span className="text-foreground">Lab</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Print it. Mod it. Drive it.
            </p>

            {/* Car Selector */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Find Parts for Your Ride</h3>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="335i">335i</SelectItem>
                    <SelectItem value="m3">M3</SelectItem>
                    <SelectItem value="supra">Supra</SelectItem>
                    <SelectItem value="civic">Civic</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Trim" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="sport">Sport</SelectItem>
                    <SelectItem value="msport">M-Sport</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="bg-input-background">
                    <SelectValue placeholder="Engine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="n54">N54</SelectItem>
                    <SelectItem value="n55">N55</SelectItem>
                    <SelectItem value="2jz">2JZ-GTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
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