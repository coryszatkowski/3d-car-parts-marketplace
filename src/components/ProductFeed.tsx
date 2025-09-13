import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    title: 'E90 335i Lip Mount Bracket',
    price: 12,
    image:
      'https://images.unsplash.com/photo-1655103955676-c9fbc4b65525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZWQlMjBjYXIlMjB0dXJibyUyMGludGFrZSUyMG1hbmlmb2xkJTIwYXV0b21vdGl2ZSUyMHBhcnR8ZW58MXx8fHwxNzU3NjA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    seller: {
      name: 'TorqueFab',
      avatar:
        'https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    fitment: ['2010 BMW 335i M-Sport'],
  },
  {
    id: 2,
    title: 'Supra A90 Splitter Extension',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1675809421636-a44c4484925d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcG9pbGVyJTIwd2luZyUyMGF1dG9tb3RpdmUlMjBtb2RpZmljYXRpb258ZW58MXx8fHwxNzU3NjA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    seller: {
      name: 'CarbonCraft',
      avatar:
        'https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    fitment: ['2020+ Toyota Supra A90'],
  },
  {
    id: 3,
    title: 'STI Hood Scoop Vent',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1655103955676-c9fbc4b65525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMHByaW50ZWQlMjBjYXIlMjB0dXJibyUyMGludGFrZSUyMG1hbmlmb2xkJTIwYXV0b21vdGl2ZSUyMHBhcnR8ZW58MXx8fHwxNzU3NjA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    seller: {
      name: 'BoxerMods',
      avatar:
        'https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    fitment: ['2015+ Subaru WRX STI'],
  },
  {
    id: 4,
    title: 'Civic Type R Diffuser',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1675809421636-a44c4484925d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzcG9pbGVyJTIwd2luZyUyMGF1dG9tb3RpdmUlMjBtb2RpZmljYXRpb258ZW58MXx8fHwxNzU3NjA3NzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    seller: {
      name: 'VTEClab',
      avatar:
        'https://images.unsplash.com/photo-1586447751596-6c2050a0d335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwbWVjaGFuaWMlMjBlbmdpbmVlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzYwNzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    fitment: ['2017+ Honda Civic Type R'],
  },
];

export function ProductFeed() {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card border border-border rounded-lg p-1">
            <Button variant="default" className="bg-primary text-white">
              New for My Car
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              From Creators I Follow
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-secondary text-white">${product.price}</Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{product.title}</h3>

                  {/* Seller Info */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                      <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{product.seller.name}</span>
                  </div>

                  {/* Fitment Badges */}
                  <div className="flex flex-wrap gap-1">
                    {product.fitment.map((fit, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-accent text-accent-foreground"
                      >
                        {fit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
