import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCarCatalog } from '../../hooks/useCarCatalog';
import { CarCatalog } from '../../lib/carCatalog';

interface CarSelectorProps {
  onSelectionChange?: (selection: any) => void;
  className?: string;
}

export function CarSelector({ onSelectionChange, className = '' }: CarSelectorProps) {
  const { selection, filteredOptions, updateSelection, isValidSelection, displayName } = useCarCatalog();

  const handleSelectionChange = (field: keyof typeof selection, value: string) => {
    // Convert year to number, keep other fields as strings
    const convertedValue = field === 'year' ? parseInt(value, 10) : value;
    updateSelection(field, convertedValue);
    onSelectionChange?.(selection);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Year Selector - Always show all years */}
        <Select
          value={selection.year?.toString() || ''}
          onValueChange={(value) => handleSelectionChange('year', value)}
        >
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {CarCatalog.getAllYears().map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Make Selector */}
        <Select
          value={selection.make || ''}
          onValueChange={(value) => handleSelectionChange('make', value)}
        >
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Make" />
          </SelectTrigger>
          <SelectContent>
            {filteredOptions.makes.map(make => (
              <SelectItem key={make.id} value={make.id}>
                {make.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Model Selector */}
        <Select
          value={selection.model || ''}
          onValueChange={(value) => handleSelectionChange('model', value)}
        >
          <SelectTrigger className="bg-input-background">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            {filteredOptions.models.map(model => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Trim Selector */}
        <Select
          value={selection.trim || ''}
          onValueChange={(value) => handleSelectionChange('trim', value)}
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
      </div>
    </div>
  );
}