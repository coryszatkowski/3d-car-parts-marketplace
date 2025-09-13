import { useState, useMemo } from 'react';
import { CarSelection } from '../data/cars';
import { CarCatalog } from '../lib/carCatalog';

export function useCarCatalog() {
  const [selection, setSelection] = useState<CarSelection>({});

  const filteredOptions = useMemo(() => {
    return CarCatalog.getFilteredOptions(selection);
  }, [selection]);

  const updateSelection = (field: keyof CarSelection, value: string | number | undefined) => {
    setSelection(prev => {
      const newSelection = { ...prev, [field]: value };
      
      // Reset dependent fields when parent changes
      if (field === 'year') {
        // When year changes, reset everything else
        newSelection.make = undefined;
        newSelection.model = undefined;
        newSelection.trim = undefined;
        newSelection.engine = undefined;
      } else if (field === 'make') {
        // When make changes, reset model and below
        newSelection.model = undefined;
        newSelection.trim = undefined;
        newSelection.engine = undefined;
      } else if (field === 'model') {
        // When model changes, reset trim and engine
        newSelection.trim = undefined;
        newSelection.engine = undefined;
      } else if (field === 'trim') {
        // When trim changes, reset engine
        newSelection.engine = undefined;
      }
      
      return newSelection;
    });
  };

  const resetSelection = () => {
    setSelection({});
  };

  const isValidSelection = CarCatalog.validateCarSelection(selection);
  const displayName = CarCatalog.getCarDisplayName(selection);

  return {
    selection,
    filteredOptions,
    updateSelection,
    resetSelection,
    isValidSelection,
    displayName
  };
}