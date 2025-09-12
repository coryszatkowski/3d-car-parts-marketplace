import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MessageCircle, Users, Wrench } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Community() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Join the Garage</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Connect with thousands of car enthusiasts, share your builds, and get help from the community.
            </p>

            {/* Community Links */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <MessageCircle className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Forums</h4>
                  <p className="text-sm text-muted-foreground">Get help with builds and troubleshooting</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Discord</h4>
                  <p className="text-sm text-muted-foreground">Real-time chat with the community</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <Wrench className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">Build Logs</h4>
                  <p className="text-sm text-muted-foreground">Document and share your projects</p>
                </div>
              </div>
            </div>

            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Sign up to start modding your ride
            </Button>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1675034743126-0f250a5fee51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtb2RpZmljYXRpb24lMjBnYXJhZ2UlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTc2MDc3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Car modification garage workshop"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-lg font-semibold">Active Community</h4>
                <p className="text-sm opacity-90">15k+ builders sharing knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}