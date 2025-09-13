import { CAR_MAKES, CAR_YEARS, CarMake, CarModel, CarSelection } from '../data/cars';

export class CarCatalog {
  /**
   * Get all available car makes
   */
  static getAllMakes(): CarMake[] {
    return CAR_MAKES;
  }

  /**
   * Get all available years
   */
  static getAllYears(): number[] {
    return CAR_YEARS;
  }

  /**
   * Get models for a specific make
   */
  static getModelsByMake(makeId: string): CarModel[] {
    const make = CAR_MAKES.find(m => m.id === makeId);
    return make ? make.models : [];
  }

  /**
   * Get years available for a specific model
   */
  static getYearsByModel(makeId: string, modelId: string): number[] {
    const model = this.getModel(makeId, modelId);
    return model ? model.years : [];
  }

  /**
   * Get trims for a specific model
   */
  static getTrimsByModel(makeId: string, modelId: string): string[] {
    const model = this.getModel(makeId, modelId);
    return model ? model.trims : [];
  }

  /**
   * Get engines for a specific model
   */
  static getEnginesByModel(makeId: string, modelId: string): string[] {
    const model = this.getModel(makeId, modelId);
    return model ? model.engines : [];
  }

  /**
   * Get makes available for a specific year
   */
  static getMakesByYear(year: number): CarMake[] {
    return CAR_MAKES.filter(make => 
      make.models.some(model => model.years.includes(year))
    ).map(make => ({
      ...make,
      models: make.models.filter(model => model.years.includes(year))
    }));
  }

  /**
   * Get models available for a specific year
   */
  static getModelsByYear(year: number): CarModel[] {
    return CAR_MAKES.flatMap(make => 
      make.models.filter(model => model.years.includes(year))
    );
  }

  /**
   * Get models available for a specific year and make
   */
  static getModelsByYearAndMake(year: number, makeId: string): CarModel[] {
    const make = CAR_MAKES.find(m => m.id === makeId);
    if (!make) return [];
    
    return make.models.filter(model => model.years.includes(year));
  }

  /**
   * Get a specific model
   */
  static getModel(makeId: string, modelId: string): CarModel | undefined {
    const make = CAR_MAKES.find(m => m.id === makeId);
    return make?.models.find(model => model.id === modelId);
  }

  /**
   * Get all models that are popular for modding
   */
  static getPopularModdingCars(): CarModel[] {
    return CAR_MAKES.flatMap(make => 
      make.models.filter(model => model.popularForModding)
    );
  }

  /**
   * Search cars by make, model, or year
   */
  static searchCars(query: string): CarModel[] {
    const lowercaseQuery = query.toLowerCase();
    return CAR_MAKES.flatMap(make => 
      make.models.filter(model => 
        make.name.toLowerCase().includes(lowercaseQuery) ||
        model.name.toLowerCase().includes(lowercaseQuery) ||
        model.years.some(year => year.toString().includes(lowercaseQuery))
      )
    );
  }

  /**
   * Validate a car selection
   */
  static validateCarSelection(selection: CarSelection): boolean {
    if (!selection.make || !selection.model) return false;
    
    const model = this.getModel(selection.make, selection.model);
    if (!model) return false;

    if (selection.year && !model.years.includes(selection.year)) return false;
    if (selection.trim && !model.trims.includes(selection.trim)) return false;
    if (selection.engine && !model.engines.includes(selection.engine)) return false;

    return true;
  }

  /**
   * Get display name for a car selection
   */
  static getCarDisplayName(selection: CarSelection): string {
    if (!selection.make || !selection.model) return 'Select a car';
    
    const make = CAR_MAKES.find(m => m.id === selection.make);
    const model = this.getModel(selection.make, selection.model);
    
    if (!make || !model) return 'Select a car';
    
    let name = `${make.name} ${model.name}`;
    if (selection.year) name += ` ${selection.year}`;
    if (selection.trim) name += ` ${selection.trim}`;
    if (selection.engine) name += ` ${selection.engine}`;
    
    return name;
  }

  /**
   * Get filtered options based on current selection
   * Now supports year-first filtering
   */
  static getFilteredOptions(selection: CarSelection) {
    // If year is selected first, filter everything by year
    if (selection.year && !selection.make && !selection.model) {
      const makes = this.getMakesByYear(selection.year);
      const models = this.getModelsByYear(selection.year);
      return { 
        makes, 
        models, 
        years: [selection.year], 
        trims: [], 
        engines: [] 
      };
    }
    
    // If year and make are selected, filter models by both
    if (selection.year && selection.make && !selection.model) {
      const makes = this.getMakesByYear(selection.year);
      const models = this.getModelsByYearAndMake(selection.year, selection.make);
      return { 
        makes, 
        models, 
        years: [selection.year], 
        trims: [], 
        engines: [] 
      };
    }
    
    // If year, make, and model are selected, get trims and engines
    if (selection.year && selection.make && selection.model) {
      const makes = this.getMakesByYear(selection.year);
      const models = this.getModelsByYearAndMake(selection.year, selection.make);
      const trims = this.getTrimsByModel(selection.make, selection.model);
      const engines = this.getEnginesByModel(selection.make, selection.model);
      return { 
        makes, 
        models, 
        years: [selection.year], 
        trims, 
        engines 
      };
    }
    
    // Fallback to original logic for backward compatibility
    const makes = this.getAllMakes();
    const models = selection.make ? this.getModelsByMake(selection.make) : [];
    const years = selection.make && selection.model ? 
      this.getYearsByModel(selection.make, selection.model) : [];
    const trims = selection.make && selection.model ? 
      this.getTrimsByModel(selection.make, selection.model) : [];
    const engines = selection.make && selection.model ? 
      this.getEnginesByModel(selection.make, selection.model) : [];

    return { makes, models, years, trims, engines };
  }
}