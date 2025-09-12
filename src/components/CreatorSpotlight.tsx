import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const creators = [
  {
    id: 1,
    name: "TorqueFab",
    specialty: "BMW/Subaru Mods",
    avatar: "https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followers: "2.4k",
    parts: 127
  },
  {
    id: 2,
    name: "CarbonCraft",
    specialty: "Toyota/Ford",
    avatar: "https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followers: "1.8k",
    parts: 89
  },
  {
    id: 3,
    name: "BoxerMods",
    specialty: "Subaru Specialists",
    avatar: "https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followers: "3.1k",
    parts: 156
  },
  {
    id: 4,
    name: "VTEClab",
    specialty: "Honda/Acura",
    avatar: "https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    followers: "1.9k",
    parts: 203
  }
];

export function CreatorSpotlight() {
  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Top Creators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow the best 3D designers and fabricators in the automotive community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <Card key={creator.id} className="bg-card border-border text-center hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="text-lg">{creator.name[0]}</AvatarFallback>
                </Avatar>
                
                <h3 className="text-lg font-semibold text-foreground mb-1">{creator.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{creator.specialty}</p>
                
                <div className="flex justify-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">{creator.followers}</span> followers
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{creator.parts}</span> parts
                  </div>
                </div>
                
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                  Follow
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" className="border-border text-foreground hover:bg-accent">
            View All Creators
          </Button>
        </div>
      </div>
    </section>
  );
}