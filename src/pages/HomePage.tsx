import { Hero } from '../components/Hero';
import { ProductFeed } from '../components/ProductFeed';
import { CreatorSpotlight } from '../components/CreatorSpotlight';
import { HowItWorks } from '../components/HowItWorks';
import { Community } from '../components/Community';

export function HomePage() {
  return (
    <>
      <Hero />
      <ProductFeed />
      <CreatorSpotlight />
      <HowItWorks />
      <Community />
    </>
  );
}
