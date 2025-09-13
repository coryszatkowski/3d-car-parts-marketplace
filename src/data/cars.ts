// Car catalog data structure
export interface CarMake {
    id: string;
    name: string;
    country: string;
    models: CarModel[];
  }
  
  export interface CarModel {
    id: string;
    name: string;
    years: number[];
    trims: string[];
    engines: string[];
    popularForModding: boolean;
    category: 'sedan' | 'coupe' | 'hatchback' | 'suv' | 'truck' | 'sports' | 'convertible';
  }
  
  export interface CarSelection {
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
    engine?: string;
  }
  
  // Generate years from 1960 to 2025
  export const CAR_YEARS = Array.from({ length: 66 }, (_, i) => 2025 - i);
  
  // Comprehensive car catalog data
  export const CAR_MAKES: CarMake[] = [
    // Japanese - Complete lineup + modding favorites
    {
      id: 'honda',
      name: 'Honda',
      country: 'Japan',
      models: [
        {
          id: 'civic',
          name: 'Civic',
          years: [1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['DX', 'LX', 'EX', 'Si', 'Type R', 'Sport', 'Touring'],
          engines: ['D16', 'B16', 'B18', 'K20', 'K24', 'L15B7', 'L15CA'],
          popularForModding: true,
          category: 'hatchback'
        },
        {
          id: 'accord',
          name: 'Accord',
          years: [1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LX', 'EX', 'EX-L', 'Sport', 'Touring', 'Hybrid'],
          engines: ['F22B', 'H22A', 'J30A', 'K24A', 'J35A', 'L15B7', 'K20C1'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: 's2000',
          name: 'S2000',
          years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
          trims: ['Base', 'CR'],
          engines: ['F20C', 'F22C'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: 'nsx',
          name: 'NSX',
          years: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2017, 2018, 2019, 2020, 2021, 2022],
          trims: ['Base', 'Targa', 'Type R'],
          engines: ['C30A', 'C32B', 'JNC1'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: 'prelude',
          name: 'Prelude',
          years: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001],
          trims: ['S', 'Si', 'SH', 'Type SH'],
          engines: ['H22A', 'H23A'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'crx',
          name: 'CRX',
          years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991],
          trims: ['Base', 'Si', 'HF'],
          engines: ['EW1', 'D15A', 'D16A'],
          popularForModding: true,
          category: 'hatchback'
        },
        {
          id: 'del-sol',
          name: 'Del Sol',
          years: [1993, 1994, 1995, 1996, 1997],
          trims: ['S', 'Si', 'VTEC'],
          engines: ['D15B', 'D16Z6', 'B16A'],
          popularForModding: true,
          category: 'convertible'
        },
        {
          id: 'fit',
          name: 'Fit',
          years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
          trims: ['Base', 'Sport', 'EX'],
          engines: ['L15A', 'L15B'],
          popularForModding: false,
          category: 'hatchback'
        },
        {
          id: 'insight',
          name: 'Insight',
          years: [2000, 2001, 2002, 2003, 2004, 2005, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
          trims: ['Base', 'EX', 'Touring'],
          engines: ['LDA1', 'LFA1'],
          popularForModding: false,
          category: 'sedan'
        },
        {
          id: 'odyssey',
          name: 'Odyssey',
          years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LX', 'EX', 'EX-L', 'Touring', 'Elite'],
          engines: ['J25A', 'J30A', 'J35A', 'J35Y'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: 'pilot',
          name: 'Pilot',
          years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LX', 'EX', 'EX-L', 'Touring', 'Elite'],
          engines: ['J35A', 'J35Y', 'J35Z'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: 'ridgeline',
          name: 'Ridgeline',
          years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['RT', 'RTS', 'RTL', 'RTL-T', 'RTL-E', 'Black Edition'],
          engines: ['J35A', 'J35Y'],
          popularForModding: false,
          category: 'truck'
        },
        {
          id: 'passport',
          name: 'Passport',
          years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Sport', 'EX-L', 'Touring', 'Elite'],
          engines: ['J35Y'],
          popularForModding: false,
          category: 'suv'
        }
      ]
    },
    {
      id: 'toyota',
      name: 'Toyota',
      country: 'Japan',
      models: [
        {
          id: 'supra',
          name: 'Supra',
          years: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Base', 'Turbo', 'A80', 'A90'],
          engines: ['2JZ-GE', '2JZ-GTE', 'B58B30'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: 'corolla',
          name: 'Corolla',
          years: [1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['L', 'LE', 'XLE', 'SE', 'XSE', 'GR'],
          engines: ['4A-FE', '7A-FE', '1ZZ-FE', '2ZZ-GE', '2ZR-FE', '2ZR-FAE', 'G16E-GTS'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: 'camry',
          name: 'Camry',
          years: [1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['L', 'LE', 'XLE', 'SE', 'XSE', 'TRD'],
          engines: ['2S-FE', '3S-FE', '1MZ-FE', '2AZ-FE', '2GR-FE', '2AR-FE', 'A25A-FKS'],
          popularForModding: false,
          category: 'sedan'
        },
        {
          id: 'mr2',
          name: 'MR2',
          years: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005],
          trims: ['Base', 'T', 'Spyder'],
          engines: ['3S-GE', '3S-GTE', '1ZZ-FE', '2ZZ-GE'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: 'ae86',
          name: 'AE86 Corolla',
          years: [1983, 1984, 1985, 1986, 1987],
          trims: ['SR5', 'GT-S', 'GTS'],
          engines: ['4A-C', '4A-GE', '4A-GEC'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'celica',
          name: 'Celica',
          years: [1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005],
          trims: ['ST', 'GT', 'GT-S', 'All-Trac'],
          engines: ['2T-C', '2T-G', '22R', '22R-E', '3S-GE', '3S-GTE'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'avalon',
          name: 'Avalon',
          years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['XLE', 'XLS', 'Limited', 'Touring'],
          engines: ['1MZ-FE', '2GR-FE', '2AR-FE', 'A25A-FKS'],
          popularForModding: false,
          category: 'sedan'
        },
        {
          id: 'highlander',
          name: 'Highlander',
          years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['L', 'LE', 'XLE', 'Limited', 'Platinum', 'Hybrid'],
          engines: ['2AZ-FE', '2GR-FE', '2AR-FE', 'A25A-FKS', '2GR-FXS'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: 'rav4',
          name: 'RAV4',
          years: [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LE', 'XLE', 'XLE Premium', 'Limited', 'Adventure', 'TRD Off-Road'],
          engines: ['2AZ-FE', '2AR-FE', 'A25A-FKS', '2GR-FE', '2GR-FXS'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: '4runner',
          name: '4Runner',
          years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['SR5', 'TRD Off-Road', 'TRD Pro', 'Limited', 'Platinum'],
          engines: ['22R-E', '3VZ-E', '5VZ-FE', '1GR-FE', '2GR-FE'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: 'tacoma',
          name: 'Tacoma',
          years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['SR', 'SR5', 'TRD Sport', 'TRD Off-Road', 'Limited', 'TRD Pro'],
          engines: ['2RZ-FE', '3RZ-FE', '2TR-FE', '1GR-FE', '2GR-FE'],
          popularForModding: false,
          category: 'truck'
        },
        {
          id: 'tundra',
          name: 'Tundra',
          years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['SR', 'SR5', 'Limited', 'Platinum', 'TRD Pro', 'Capstone'],
          engines: ['2UZ-FE', '3UR-FE', '1UR-FE', '3UR-FE'],
          popularForModding: false,
          category: 'truck'
        },
        {
          id: 'prius',
          name: 'Prius',
          years: [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['One', 'Two', 'Three', 'Four', 'Five', 'Prime'],
          engines: ['1NZ-FXE', '2ZR-FXE', '2ZR-FXE'],
          popularForModding: false,
          category: 'sedan'
        },
        {
          id: 'yaris',
          name: 'Yaris',
          years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
          trims: ['L', 'LE', 'XLE', 'SE'],
          engines: ['1NZ-FE', '2NZ-FE', '2ZR-FE'],
          popularForModding: false,
          category: 'hatchback'
        },
        {
          id: 'c-hr',
          name: 'C-HR',
          years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LE', 'XLE', 'Limited'],
          engines: ['2ZR-FAE'],
          popularForModding: false,
          category: 'suv'
        },
        {
          id: 'gr86',
          name: 'GR86',
          years: [2022, 2023, 2024, 2025],
          trims: ['Base', 'Premium'],
          engines: ['FA24'],
          popularForModding: true,
          category: 'sports'
        }
      ]
    },
    // German - Premium modding scene
    {
      id: 'bmw',
      name: 'BMW',
      country: 'Germany',
      models: [
        {
          id: '3series',
          name: '3 Series',
          years: [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['318i', '320i', '325i', '328i', '330i', '335i', 'M3', 'M340i'],
          engines: ['M42', 'M50', 'M52', 'M54', 'N52', 'N54', 'N55', 'B48', 'B58', 'S55', 'S58'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: 'm3',
          name: 'M3',
          years: [1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['E30', 'E36', 'E46', 'E90/E92/E93', 'F80', 'G80'],
          engines: ['S14', 'S50', 'S52', 'S54', 'S65', 'S55', 'S58'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: '5series',
          name: '5 Series',
          years: [1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['525i', '530i', '535i', '540i', '545i', '550i', 'M5'],
          engines: ['M50', 'M52', 'M54', 'N52', 'N54', 'N55', 'N62', 'S63', 'B48', 'B58'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: '1series',
          name: '1 Series',
          years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['128i', '135i', 'M135i', 'M140i'],
          engines: ['N52', 'N54', 'N55', 'B48', 'B58'],
          popularForModding: true,
          category: 'hatchback'
        }
      ]
    },
    // American - Muscle and performance
    {
      id: 'ford',
      name: 'Ford',
      country: 'USA',
      models: [
        {
          id: 'mustang',
          name: 'Mustang',
          years: [1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['V6', 'GT', 'Cobra', 'Shelby GT500', 'Mach 1', 'Bullitt', 'EcoBoost'],
          engines: ['3.8L V6', '4.6L V8', '5.0L V8', '5.4L V8', '2.3L EcoBoost', '5.2L V8'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'focus',
          name: 'Focus',
          years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
          trims: ['S', 'SE', 'SES', 'ST', 'RS'],
          engines: ['2.0L', '2.3L', 'EcoBoost'],
          popularForModding: true,
          category: 'hatchback'
        },
        {
          id: 'f150',
          name: 'F-150',
          years: [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Raptor', 'Lightning'],
          engines: ['4.9L I6', '5.0L V8', '5.4L V8', '6.2L V8', '3.5L EcoBoost', '2.7L EcoBoost'],
          popularForModding: true,
          category: 'truck'
        }
      ]
    },
    {
      id: 'chevrolet',
      name: 'Chevrolet',
      country: 'USA',
      models: [
        {
          id: 'camaro',
          name: 'Camaro',
          years: [1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['LS', 'LT', 'SS', 'ZL1', '1LE'],
          engines: ['3.4L V6', '3.8L V6', '5.7L V8', '6.2L V8', '6.2L Supercharged'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'corvette',
          name: 'Corvette',
          years: [1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Base', 'Z06', 'ZR1', 'Grand Sport', 'Stingray', 'Z07'],
          engines: ['5.7L V8', '6.2L V8', '7.0L V8', '6.2L Supercharged', 'LT2', 'LT6'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: 'silverado',
          name: 'Silverado',
          years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Work Truck', 'Custom', 'LT', 'LTZ', 'High Country', 'RST'],
          engines: ['4.3L V6', '4.8L V8', '5.3L V8', '6.0L V8', '6.2L V8', '3.0L Duramax'],
          popularForModding: false,
          category: 'truck'
        }
      ]
    },
    // Add more makes as needed...
    {
      id: 'nissan',
      name: 'Nissan',
      country: 'Japan',
      models: [
        {
          id: 'skyline',
          name: 'Skyline GT-R',
          years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002],
          trims: ['R32', 'R33', 'R34'],
          engines: ['RB26DETT'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: '350z',
          name: '350Z',
          years: [2003, 2004, 2005, 2006, 2007, 2008, 2009],
          trims: ['Base', 'Enthusiast', 'Touring', 'Track', 'Nismo'],
          engines: ['VQ35DE', 'VQ35HR'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: '370z',
          name: '370Z',
          years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
          trims: ['Base', 'Sport', 'Touring', 'Nismo'],
          engines: ['VQ37VHR'],
          popularForModding: true,
          category: 'sports'
        },
        {
          id: '240sx',
          name: '240SX',
          years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          trims: ['Base', 'SE', 'LE'],
          engines: ['KA24E', 'KA24DE', 'SR20DE', 'SR20DET'],
          popularForModding: true,
          category: 'coupe'
        },
        {
          id: 'altima',
          name: 'Altima',
          years: [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['S', 'SV', 'SL', 'SR', 'Platinum'],
          engines: ['KA24DE', 'QR25DE', 'VQ35DE', 'VQ35HR', 'MR20DD', 'KR20DDET'],
          popularForModding: false,
          category: 'sedan'
        }
      ]
    },
    {
      id: 'subaru',
      name: 'Subaru',
      country: 'Japan',
      models: [
        {
          id: 'wrx',
          name: 'WRX',
          years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Base', 'Premium', 'Limited', 'STI', 'WRX STI'],
          engines: ['EJ205', 'EJ255', 'EJ257', 'FA20DIT', 'FA24F'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: 'impreza',
          name: 'Impreza',
          years: [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Base', 'Premium', 'Sport', 'Limited'],
          engines: ['EJ18', 'EJ22', 'EJ25', 'FB20', 'FB25'],
          popularForModding: true,
          category: 'sedan'
        },
        {
          id: 'brz',
          name: 'BRZ',
          years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
          trims: ['Base', 'Premium', 'Limited', 'tS'],
          engines: ['FA20', 'FA24'],
          popularForModding: true,
          category: 'sports'
        }
      ]
    },
    {
      id: 'mazda',
      name: 'Mazda',
      country: 'Japan',
      models: [
        {
            id: 'miata',
            name: 'Miata (MX-5)',
            years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['Base', 'Club', 'Grand Touring', 'Sport', 'RF'],
            engines: ['B6ZE', 'BP-ZE', 'BP-Z3', 'MZR', 'Skyactiv-G'],
            popularForModding: true,
            category: 'sports'
          },
          {
            id: 'rx7',
            name: 'RX-7',
            years: [1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002],
            trims: ['Base', 'GXL', 'Turbo', 'Turbo II', 'R1', 'R2', 'Type R', 'Type RS'],
            engines: ['12A', '13B', '13B-REW'],
            popularForModding: true,
            category: 'sports'
          },
          {
            id: 'rx8',
            name: 'RX-8',
            years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
            trims: ['Base', 'Sport', 'Touring', 'Grand Touring', 'R3'],
            engines: ['13B-MSP'],
            popularForModding: true,
            category: 'sports'
          },
          {
            id: 'mazda3',
            name: 'Mazda3',
            years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['i', 's', 'Touring', 'Grand Touring', 'Mazdaspeed3'],
            engines: ['2.0L', '2.3L', '2.5L', 'Skyactiv-G'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'mazda6',
            name: 'Mazda6',
            years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['i', 's', 'Touring', 'Grand Touring', 'Signature'],
            engines: ['2.3L', '2.5L', 'Skyactiv-G', 'Skyactiv-D'],
            popularForModding: false,
            category: 'sedan'
          }
        ]
      },
      // European - Luxury and performance
      {
        id: 'mercedes',
        name: 'Mercedes-Benz',
        country: 'Germany',
        models: [
          {
            id: 'c-class',
            name: 'C-Class',
            years: [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['C180', 'C200', 'C250', 'C300', 'C350', 'C400', 'C450', 'C63', 'AMG'],
            engines: ['M111', 'M112', 'M113', 'M272', 'M276', 'M177', 'M256'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'e-class',
            name: 'E-Class',
            years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['E200', 'E250', 'E300', 'E350', 'E400', 'E450', 'E500', 'E63', 'AMG'],
            engines: ['M111', 'M112', 'M113', 'M272', 'M276', 'M177', 'M256'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 's-class',
            name: 'S-Class',
            years: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['S350', 'S400', 'S450', 'S500', 'S550', 'S600', 'S63', 'S65', 'AMG'],
            engines: ['M112', 'M113', 'M272', 'M276', 'M177', 'M256', 'M279'],
            popularForModding: false,
            category: 'sedan'
          },
          {
            id: 'sl-class',
            name: 'SL-Class',
            years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['SL280', 'SL320', 'SL350', 'SL500', 'SL550', 'SL600', 'SL63', 'SL65', 'AMG'],
            engines: ['M104', 'M112', 'M113', 'M272', 'M276', 'M177', 'M256'],
            popularForModding: true,
            category: 'sports'
          }
        ]
      },
      {
        id: 'audi',
        name: 'Audi',
        country: 'Germany',
        models: [
          {
            id: 'a4',
            name: 'A4',
            years: [1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['1.8T', '2.0T', '2.8L', '3.0L', '3.2L', 'S4', 'RS4'],
            engines: ['1.8T', '2.0T', '2.8L V6', '3.0L V6', '3.2L V6', '4.2L V8'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'a6',
            name: 'A6',
            years: [1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['2.0T', '2.8L', '3.0L', '3.2L', '4.2L', 'S6', 'RS6'],
            engines: ['2.0T', '2.8L V6', '3.0L V6', '3.2L V6', '4.2L V8', '5.2L V10'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'tt',
            name: 'TT',
            years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['1.8T', '2.0T', '3.2L', 'TTS', 'TT RS'],
            engines: ['1.8T', '2.0T', '3.2L V6', '2.5L I5'],
            popularForModding: true,
            category: 'sports'
          },
          {
            id: 'r8',
            name: 'R8',
            years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['4.2L', '5.2L', 'V10', 'V10 Plus', 'V10 Performance'],
            engines: ['4.2L V8', '5.2L V10'],
            popularForModding: true,
            category: 'sports'
          }
        ]
      },
      {
        id: 'volkswagen',
        name: 'Volkswagen',
        country: 'Germany',
        models: [
          {
            id: 'golf',
            name: 'Golf',
            years: [1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['Base', 'S', 'SE', 'SEL', 'GTI', 'R', 'e-Golf'],
            engines: ['1.6L', '1.8L', '2.0L', '1.4T', '1.8T', '2.0T', '2.5L'],
            popularForModding: true,
            category: 'hatchback'
          },
          {
            id: 'jetta',
            name: 'Jetta',
            years: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['S', 'SE', 'SEL', 'GLI', 'Hybrid'],
            engines: ['1.6L', '1.8L', '2.0L', '1.4T', '1.8T', '2.0T', '2.5L'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'passat',
            name: 'Passat',
            years: [1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['S', 'SE', 'SEL', 'R-Line', 'GT'],
            engines: ['1.8L', '2.0L', '1.4T', '1.8T', '2.0T', '2.5L', '3.6L'],
            popularForModding: false,
            category: 'sedan'
          },
          {
            id: 'cc',
            name: 'CC',
            years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
            trims: ['Sport', 'Lux', 'Lux Plus', 'Executive'],
            engines: ['2.0T', '3.6L V6'],
            popularForModding: true,
            category: 'sedan'
          }
        ]
      },
      // Korean - Growing modding scene
      {
        id: 'hyundai',
        name: 'Hyundai',
        country: 'South Korea',
        models: [
          {
            id: 'elantra',
            name: 'Elantra',
            years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['GLS', 'SE', 'SEL', 'Limited', 'N Line', 'N'],
            engines: ['1.6L', '1.8L', '2.0L', '1.6T', '2.0T'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'sonata',
            name: 'Sonata',
            years: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['GLS', 'SE', 'SEL', 'Limited', 'N Line', 'N'],
            engines: ['2.0L', '2.4L', '3.3L', '2.0T', '2.4L GDI'],
            popularForModding: false,
            category: 'sedan'
          },
          {
            id: 'genesis',
            name: 'Genesis',
            years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['3.8L', '4.6L', '5.0L', '3.3T', '3.5T', '5.0L V8'],
            engines: ['3.8L V6', '4.6L V8', '5.0L V8', '3.3T V6', '3.5T V6'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'veloster',
            name: 'Veloster',
            years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
            trims: ['Base', 'Turbo', 'N'],
            engines: ['1.6L', '1.6T', '2.0T'],
            popularForModding: true,
            category: 'hatchback'
          }
        ]
      },
      {
        id: 'kia',
        name: 'Kia',
        country: 'South Korea',
        models: [
          {
            id: 'forte',
            name: 'Forte',
            years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['LX', 'EX', 'SX', 'GT'],
            engines: ['1.6L', '2.0L', '1.6T', '2.0T'],
            popularForModding: true,
            category: 'sedan'
          },
          {
            id: 'optima',
            name: 'Optima',
            years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['LX', 'EX', 'SX', 'GT'],
            engines: ['2.0L', '2.4L', '2.0T', '2.4L GDI'],
            popularForModding: false,
            category: 'sedan'
          },
          {
            id: 'stinger',
            name: 'Stinger',
            years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
            trims: ['2.0T', 'GT', 'GT1', 'GT2'],
            engines: ['2.0T', '3.3T V6'],
            popularForModding: true,
            category: 'sports'
          }
        ]
      }
    ];