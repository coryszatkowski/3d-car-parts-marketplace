// Car catalog data structure with year-specific trim and engine mappings
export interface CarMake {
  id: string;
  name: string;
  country: string;
  models: CarModel[];
}

export interface YearSpecificData {
  year: number;
  trims: string[];
  engines: string[];
}

export interface CarModel {
  id: string;
  name: string;
  years: number[];
  // Legacy fields for backward compatibility
  trims: string[];
  engines: string[];
  // New year-specific data - takes priority over legacy fields if present
  yearSpecificData?: YearSpecificData[];
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

// Comprehensive car catalog data - sorted alphabetically starting with numbers
export const CAR_MAKES: CarMake[] = [
  // German - Premium modding scene
  {
    id: 'audi',
    name: 'Audi',
    country: 'Germany',
    models: [
      {
        id: 'a3',
        name: 'A3',
        years: [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['1.6L', '1.8T', '2.0T', 'S3', 'RS3'],
        engines: ['1.6L', '1.8T', '2.0T', '2.5L I5'],
        popularForModding: true,
        category: 'hatchback'
      },
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
        id: 'r8',
        name: 'R8',
        years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['4.2L', '5.2L', 'V10', 'V10 Plus', 'V10 Performance'],
        engines: ['4.2L V8', '5.2L V10'],
        popularForModding: true,
        category: 'sports'
      },
      {
        id: 'tt',
        name: 'TT',
        years: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['1.8T', '2.0T', '3.2L', 'TTS', 'TT RS'],
        engines: ['1.8T', '2.0T', '3.2L V6', '2.5L I5'],
        popularForModding: true,
        category: 'sports'
      }
    ]
  },
  {
    id: 'bmw',
    name: 'BMW',
    country: 'Germany',
    models: [
      {
        id: '1series',
        name: '1 Series',
        years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['116i', '118i', '120i', '125i', '128i', '130i', '135i', 'M135i', 'M140i'],
        engines: ['N45', 'N46', 'N52', 'N54', 'N55', 'B38', 'B48', 'B58'],
        yearSpecificData: [
          // E82/E87/E88 Generation (2004-2013)
          { year: 2004, trims: ['116i', '118i', '120i'], engines: ['N45', 'N46', 'N43'] },
          { year: 2005, trims: ['116i', '118i', '120i', '130i'], engines: ['N45', 'N46', 'N43', 'N52'] },
          { year: 2006, trims: ['116i', '118i', '120i', '130i'], engines: ['N45', 'N46', 'N43', 'N52'] },
          { year: 2007, trims: ['116i', '118i', '120i', '130i', '135i'], engines: ['N45', 'N46', 'N43', 'N52', 'N54'] },
          { year: 2008, trims: ['116i', '118i', '120i', '130i', '135i'], engines: ['N45', 'N46', 'N43', 'N52', 'N54'] },
          { year: 2009, trims: ['116i', '118i', '120i', '130i', '135i'], engines: ['N45', 'N46', 'N43', 'N52', 'N54'] },
          { year: 2010, trims: ['116i', '118i', '120i', '135i'], engines: ['N45', 'N46', 'N43', 'N54'] },
          { year: 2011, trims: ['116i', '118i', '120i', '135i'], engines: ['N45', 'N46', 'N43', 'N54'] },
          { year: 2012, trims: ['116i', '118i', '120i', '125i', '135i'], engines: ['N45', 'N46', 'N43', 'N20', 'N54'] },
          { year: 2013, trims: ['116i', '118i', '120i', '125i', '135i'], engines: ['N45', 'N46', 'N43', 'N20', 'N54'] },
          // F20/F21 Generation (2011-2019)
          { year: 2014, trims: ['116i', '118i', '120i', '125i', '135i', 'M135i'], engines: ['B38', 'B48', 'N20', 'N55'] },
          { year: 2015, trims: ['116i', '118i', '120i', '125i', '135i', 'M135i'], engines: ['B38', 'B48', 'N20', 'N55'] },
          { year: 2016, trims: ['116i', '118i', '120i', '125i', 'M140i'], engines: ['B38', 'B48', 'N20', 'B58'] },
          { year: 2017, trims: ['116i', '118i', '120i', '125i', 'M140i'], engines: ['B38', 'B48', 'N20', 'B58'] },
          { year: 2018, trims: ['116i', '118i', '120i', '125i', 'M140i'], engines: ['B38', 'B48', 'N20', 'B58'] },
          { year: 2019, trims: ['116i', '118i', '120i', '125i', 'M140i'], engines: ['B38', 'B48', 'N20', 'B58'] },
          // F40 Generation (2019+)
          { year: 2020, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] },
          { year: 2021, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] },
          { year: 2022, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] },
          { year: 2023, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] },
          { year: 2024, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] },
          { year: 2025, trims: ['116i', '118i', '120i', 'M135i'], engines: ['B38', 'B48', 'B46'] }
        ],
        popularForModding: true,
        category: 'hatchback'
      },
      {
        id: '2series',
        name: '2 Series',
        years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['218i', '220i', '228i', '230i', 'M235i', 'M240i', 'M2'],
        engines: ['B38', 'B48', 'N20', 'N55', 'B58', 'S55', 'S58'],
        popularForModding: true,
        category: 'coupe'
      },
      {
        id: '3series',
        name: '3 Series',
        years: [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['316i', '318i', '320i', '323i', '325i', '328i', '330i', '335i', '340i', 'M3', 'M340i'],
        engines: ['M10', 'M40', 'M42', 'M43', 'M50', 'M52', 'M54', 'N42', 'N46', 'N52', 'N54', 'N55', 'B46', 'B48', 'B58', 'S50', 'S52', 'S54', 'S65', 'S55', 'S58'],
        popularForModding: true,
        category: 'sedan'
      },
      {
        id: '4series',
        name: '4 Series',
        years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['420i', '428i', '430i', '435i', '440i', 'M4'],
        engines: ['B48', 'N20', 'N26', 'N55', 'B58', 'S55', 'S58'],
        popularForModding: true,
        category: 'coupe'
      },
      {
        id: '5series',
        name: '5 Series',
        years: [1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['518i', '520i', '523i', '525i', '528i', '530i', '535i', '540i', '545i', '550i', 'M5'],
        engines: ['M10', 'M30', 'M50', 'M52', 'M54', 'N52', 'N54', 'N55', 'N62', 'N63', 'B48', 'B58', 'S62', 'S63', 'S68'],
        popularForModding: true,
        category: 'sedan'
      },
      {
        id: 'm3',
        name: 'M3',
        years: [1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['Base', 'Competition', 'CS', 'CSL', 'GTS'],
        engines: ['S14', 'S50', 'S52', 'S54', 'S65', 'S55', 'S58'],
        yearSpecificData: [
          // E30 M3 (1986-1991)
          { year: 1986, trims: ['Base'], engines: ['S14'] },
          { year: 1987, trims: ['Base'], engines: ['S14'] },
          { year: 1988, trims: ['Base'], engines: ['S14'] },
          { year: 1989, trims: ['Base'], engines: ['S14'] },
          { year: 1990, trims: ['Base'], engines: ['S14'] },
          { year: 1991, trims: ['Base'], engines: ['S14'] },
          // E36 M3 (1992-1999)
          { year: 1992, trims: ['Base'], engines: ['S50'] },
          { year: 1993, trims: ['Base'], engines: ['S50'] },
          { year: 1994, trims: ['Base'], engines: ['S50'] },
          { year: 1995, trims: ['Base'], engines: ['S50', 'S52'] },
          { year: 1996, trims: ['Base'], engines: ['S52'] },
          { year: 1997, trims: ['Base'], engines: ['S52'] },
          { year: 1998, trims: ['Base'], engines: ['S52'] },
          { year: 1999, trims: ['Base'], engines: ['S52'] },
          // E46 M3 (2000-2006)
          { year: 2000, trims: ['Base'], engines: ['S54'] },
          { year: 2001, trims: ['Base'], engines: ['S54'] },
          { year: 2002, trims: ['Base'], engines: ['S54'] },
          { year: 2003, trims: ['Base', 'CSL'], engines: ['S54'] },
          { year: 2004, trims: ['Base', 'CSL'], engines: ['S54'] },
          { year: 2005, trims: ['Base'], engines: ['S54'] },
          { year: 2006, trims: ['Base'], engines: ['S54'] },
          // E90/E92/E93 M3 (2007-2013)
          { year: 2007, trims: ['Base'], engines: ['S65'] },
          { year: 2008, trims: ['Base'], engines: ['S65'] },
          { year: 2009, trims: ['Base'], engines: ['S65'] },
          { year: 2010, trims: ['Base'], engines: ['S65'] },
          { year: 2011, trims: ['Base', 'GTS'], engines: ['S65'] },
          { year: 2012, trims: ['Base', 'GTS'], engines: ['S65'] },
          { year: 2013, trims: ['Base', 'GTS'], engines: ['S65'] },
          // F80 M3 (2014-2018)
          { year: 2014, trims: ['Base'], engines: ['S55'] },
          { year: 2015, trims: ['Base'], engines: ['S55'] },
          { year: 2016, trims: ['Base'], engines: ['S55'] },
          { year: 2017, trims: ['Base', 'Competition'], engines: ['S55'] },
          { year: 2018, trims: ['Base', 'Competition'], engines: ['S55'] },
          // G80 M3 (2021+)
          { year: 2021, trims: ['Base', 'Competition'], engines: ['S58'] },
          { year: 2022, trims: ['Base', 'Competition'], engines: ['S58'] },
          { year: 2023, trims: ['Base', 'Competition', 'CS'], engines: ['S58'] },
          { year: 2024, trims: ['Base', 'Competition', 'CS'], engines: ['S58'] },
          { year: 2025, trims: ['Base', 'Competition', 'CS'], engines: ['S58'] }
        ],
        popularForModding: true,
        category: 'sports'
      }
    ]
  },
  // American - Muscle and performance
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
  {
    id: 'ford',
    name: 'Ford',
    country: 'USA',
    models: [
      {
        id: 'f150',
        name: 'F-150',
        years: [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Raptor', 'Lightning'],
        engines: ['4.9L I6', '5.0L V8', '5.4L V8', '6.2L V8', '3.5L EcoBoost', '2.7L EcoBoost'],
        popularForModding: true,
        category: 'truck'
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
        id: 'mustang',
        name: 'Mustang',
        years: [1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['V6', 'GT', 'Cobra', 'Shelby GT500', 'Mach 1', 'Bullitt', 'EcoBoost'],
        engines: ['3.8L V6', '4.6L V8', '5.0L V8', '5.4L V8', '2.3L EcoBoost', '5.2L V8'],
        popularForModding: true,
        category: 'coupe'
      }
    ]
  },
  // Japanese - Complete lineup + modding favorites
  {
    id: 'honda',
    name: 'Honda',
    country: 'Japan',
    models: [
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
        id: 'civic',
        name: 'Civic',
        years: [1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['DX', 'LX', 'EX', 'Si', 'Type R', 'Sport', 'Touring'],
        engines: ['D16', 'B16', 'B18', 'K20', 'K24', 'L15B7', 'L15CA'],
        yearSpecificData: [
          // Type R availability - FK2 generation (2015-2016) Europe only, FK8 (2017-2021) global, FL5 (2022+)
          { year: 2017, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2018, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2019, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2020, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2021, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2022, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2023, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2024, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] },
          { year: 2025, trims: ['DX', 'LX', 'EX', 'Si', 'Sport', 'Touring', 'Type R'], engines: ['L15B7', 'K20C1'] }
        ],
        popularForModding: true,
        category: 'hatchback'
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
        id: 's2000',
        name: 'S2000',
        years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
        trims: ['Base', 'CR'],
        engines: ['F20C', 'F22C'],
        popularForModding: true,
        category: 'sports'
      }
    ]
  },
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
        id: 'stinger',
        name: 'Stinger',
        years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['2.0T', 'GT', 'GT1', 'GT2'],
        engines: ['2.0T', '3.3T V6'],
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
        id: 'mazda3',
        name: 'Mazda3',
        years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['i', 's', 'Touring', 'Grand Touring', 'Mazdaspeed3'],
        engines: ['2.0L', '2.3L', '2.5L', 'Skyactiv-G'],
        popularForModding: true,
        category: 'sedan'
      },
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
      }
    ]
  },
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
      }
    ]
  },
  {
    id: 'nissan',
    name: 'Nissan',
    country: 'Japan',
    models: [
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
        id: 'skyline',
        name: 'Skyline GT-R',
        years: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002],
        trims: ['R32', 'R33', 'R34'],
        engines: ['RB26DETT'],
        popularForModding: true,
        category: 'sports'
      }
    ]
  },
  {
    id: 'subaru',
    name: 'Subaru',
    country: 'Japan',
    models: [
      {
        id: 'brz',
        name: 'BRZ',
        years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['Base', 'Premium', 'Limited', 'tS'],
        engines: ['FA20', 'FA24'],
        popularForModding: true,
        category: 'sports'
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
        id: 'wrx',
        name: 'WRX',
        years: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['Base', 'Premium', 'Limited', 'STI', 'WRX STI'],
        engines: ['EJ205', 'EJ255', 'EJ257', 'FA20DIT', 'FA24F'],
        popularForModding: true,
        category: 'sedan'
      }
    ]
  },
  {
    id: 'toyota',
    name: 'Toyota',
    country: 'Japan',
    models: [
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
        id: 'ae86',
        name: 'AE86 Corolla',
        years: [1983, 1984, 1985, 1986, 1987],
        trims: ['SR5', 'GT-S', 'GTS'],
        engines: ['4A-C', '4A-GE', '4A-GEC'],
        popularForModding: true,
        category: 'coupe'
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
        id: 'corolla',
        name: 'Corolla',
        years: [1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['L', 'LE', 'XLE', 'SE', 'XSE', 'GR'],
        engines: ['4A-FE', '7A-FE', '1ZZ-FE', '2ZZ-GE', '2ZR-FE', '2ZR-FAE', 'G16E-GTS'],
        popularForModding: true,
        category: 'sedan'
      },
      {
        id: 'gr86',
        name: 'GR86',
        years: [2022, 2023, 2024, 2025],
        trims: ['Base', 'Premium'],
        engines: ['FA24'],
        popularForModding: true,
        category: 'sports'
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
        id: 'supra',
        name: 'Supra',
        years: [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
        trims: ['Base', 'Turbo', 'A80', 'A90', '2.0', '3.0', '3.0 Premium'],
        engines: ['M-EU', '5M-GE', '7M-GE', '7M-GTE', '2JZ-GE', '2JZ-GTE', 'B48B20', 'B58B30'],
        yearSpecificData: [
          // A60 Generation (1982-1986)
          { year: 1982, trims: ['Base'], engines: ['M-EU'] },
          { year: 1983, trims: ['Base'], engines: ['M-EU'] },
          { year: 1984, trims: ['Base'], engines: ['M-EU'] },
          { year: 1985, trims: ['Base'], engines: ['M-EU'] },
          { year: 1986, trims: ['Base'], engines: ['M-EU'] },
          // A70 Generation (1986-1993)
          { year: 1987, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          { year: 1988, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          { year: 1989, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          { year: 1990, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          { year: 1991, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          { year: 1992, trims: ['Base', 'Turbo'], engines: ['7M-GE', '7M-GTE'] },
          // A80 Generation (1993-2002)
          { year: 1993, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1994, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1995, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1996, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1997, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1998, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 1999, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 2000, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 2001, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          { year: 2002, trims: ['Base', 'Turbo'], engines: ['2JZ-GE', '2JZ-GTE'] },
          // A90/J29 Generation (2019+)
          { year: 2019, trims: ['2.0', '3.0'], engines: ['B48B20', 'B58B30'] },
          { year: 2020, trims: ['2.0', '3.0'], engines: ['B48B20', 'B58B30'] },
          { year: 2021, trims: ['2.0', '3.0', '3.0 Premium'], engines: ['B48B20', 'B58B30'] },
          { year: 2022, trims: ['2.0', '3.0', '3.0 Premium'], engines: ['B48B20', 'B58B30'] },
          { year: 2023, trims: ['2.0', '3.0', '3.0 Premium'], engines: ['B48B20', 'B58B30'] },
          { year: 2024, trims: ['2.0', '3.0', '3.0 Premium'], engines: ['B48B20', 'B58B30'] },
          { year: 2025, trims: ['2.0', '3.0', '3.0 Premium'], engines: ['B48B20', 'B58B30'] }
        ],
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
      }
    ]
  }
];