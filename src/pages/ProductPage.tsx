import { useNavigate } from 'react-router-dom';
import { ProductPage as ProductPageComponent } from '../components/ProductPage';
import { Button } from '../components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function ProductPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={handleBackClick} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
      <ProductPageComponent onBackClick={handleBackClick} />
    </div>
  );
}
