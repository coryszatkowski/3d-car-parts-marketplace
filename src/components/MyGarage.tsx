import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Car, CarInput } from '../lib/supabase';
import { CarSelection } from '../data/cars';
import { CarCatalog } from '../lib/carCatalog';
import { useCarCatalog } from '../hooks/useCarCatalog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Badge } from './ui/badge';
import { 
  Car as CarIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Calendar,
  Palette,
  FileText
} from 'lucide-react';

export function MyGarage() {
  const { cars, addCar, updateCar, deleteCar, setPrimaryCar } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<CarInput>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    trim: '',
    color: '',
    vin: '',
    notes: '',
    is_primary: false,
  });

  // Use the car catalog hook for the quick add selector
  const { selection, filteredOptions, updateSelection, isValidSelection, displayName, resetSelection } = useCarCatalog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCar) {
      await updateCar(editingCar.id, formData);
      setEditingCar(null);
    } else {
      await addCar(formData);
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      trim: car.trim || '',
      color: car.color || '',
      vin: car.vin || '',
      notes: car.notes || '',
      is_primary: car.is_primary,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (carId: string) => {
    await deleteCar(carId);
  };

  const handleSetPrimary = async (carId: string) => {
    await setPrimaryCar(carId);
  };

  const resetForm = () => {
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      trim: '',
      color: '',
      vin: '',
      notes: '',
      is_primary: false,
    });
    setEditingCar(null);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleQuickAdd = async () => {
    if (!isValidSelection || !selection.make || !selection.model || !selection.year) {
      return;
    }

    // Get the make name from the catalog
    const make = CarCatalog.getAllMakes().find(m => m.id === selection.make);
    const model = CarCatalog.getModel(selection.make, selection.model);
    
    if (!make || !model) return;

    const carData: CarInput = {
      make: make.name,
      model: model.name,
      year: selection.year,
      trim: selection.trim || undefined,
      is_primary: cars.length === 0, // Set as primary if it's the first car
    };

    await addCar(carData);
    
    // Reset the car selector
    resetSelection();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CarIcon className="h-6 w-6" />
            My Garage
          </h2>
          <p className="text-muted-foreground">
            Manage your vehicles and set preferences for part recommendations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </DialogTitle>
              <DialogDescription>
                {editingCar 
                  ? 'Update your car information below.' 
                  : 'Add a new car to your garage to get personalized part recommendations.'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make *</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="e.g., Toyota"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Camry"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trim">Trim</Label>
                  <Input
                    id="trim"
                    value={formData.trim}
                    onChange={(e) => setFormData({ ...formData, trim: e.target.value })}
                    placeholder="e.g., LE, XLE, Hybrid"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="e.g., Silver, Black, White"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input
                    id="vin"
                    value={formData.vin}
                    onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                    placeholder="17-character VIN"
                    maxLength={17}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about your car..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_primary"
                  checked={formData.is_primary}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_primary: !!checked })}
                />
                <Label htmlFor="is_primary" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Set as primary car
                </Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCar ? 'Update Car' : 'Add Car'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Add Car Selector */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {cars.length === 0 ? 'Add Your First Car' : 'Add Another Car'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Year Selector */}
              <Select
                value={selection.year?.toString() || ''}
                onValueChange={(value) => updateSelection('year', parseInt(value))}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {filteredOptions.years.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Make Selector */}
              <Select
                value={selection.make || ''}
                onValueChange={(value) => updateSelection('make', value)}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  {filteredOptions.makes.map(make => (
                    <SelectItem key={make.id} value={make.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{make.name}</span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {make.country}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Model Selector */}
              <Select
                value={selection.model || ''}
                onValueChange={(value) => updateSelection('model', value)}
                disabled={!selection.make}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {filteredOptions.models.map(model => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{model.name}</span>
                        {model.popularForModding && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            Mod
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Trim Selector */}
              <Select
                value={selection.trim || ''}
                onValueChange={(value) => updateSelection('trim', value)}
                disabled={!selection.model}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Trim" />
                </SelectTrigger>
                <SelectContent>
                  {filteredOptions.trims.map(trim => (
                    <SelectItem key={trim} value={trim}>
                      {trim}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Engine Selector */}
              <Select
                value={selection.engine || ''}
                onValueChange={(value) => updateSelection('engine', value)}
                disabled={!selection.model}
              >
                <SelectTrigger className="bg-input-background">
                  <SelectValue placeholder="Engine" />
                </SelectTrigger>
                <SelectContent>
                  {filteredOptions.engines.map(engine => (
                    <SelectItem key={engine} value={engine}>
                      {engine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Selection Display */}
            {isValidSelection && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Selected:</p>
                <p className="font-medium">{displayName}</p>
              </div>
            )}

            <Button
              onClick={handleQuickAdd}
              disabled={!isValidSelection}
              className="text-white"
              style={{ backgroundColor: '#0a68b1' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0856a0')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0a68b1')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Car
            </Button>
          </div>
        </CardContent>
      </Card>

      {cars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <Card key={car.id} className={car.is_primary ? 'ring-2 ring-primary' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CarIcon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      {car.year} {car.make} {car.model}
                    </CardTitle>
                  </div>
                  {car.is_primary && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Primary
                    </Badge>
                  )}
                </div>
                {car.trim && (
                  <CardDescription className="text-sm">
                    {car.trim}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  {car.color && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Palette className="h-4 w-4" />
                      <span>{car.color}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                  {car.notes && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4 mt-0.5" />
                      <span className="text-xs">{car.notes}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  {!car.is_primary && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetPrimary(car.id)}
                      className="flex-1"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Set Primary
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(car)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Car from Garage</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this car from your garage? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(car.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove Car
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}