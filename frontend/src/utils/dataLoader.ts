import axios from 'axios';
import Papa from 'papaparse';

// Define types for the tender data
export interface TenderData {
  tenderId: string;
  productCode: string;
  product: string;
  category: string;
  productDescription: string;
  secondaryDescription: string;
  tenderStart: string;
  tenderEnd: string;
  deliveryStart: string;
  deliveryEnd: string;
  caseSize: string;
  unitSize: string;
  origin: string;
  salesPackaging: string;
  storage: string;
  tenderComment: string;
  trait: string;
}

// Categories with metadata
export const categoryMetadata: Record<string, { display: string; trend: string; volatility: string }> = {
  'Drinks': { 
    display: 'Beverages',
    trend: 'increasing',
    volatility: 'medium'
  },
  'Health & Beauty': { 
    display: 'Health & Beauty', 
    trend: 'stable',
    volatility: 'low'
  },
  'Fruits & Vegetables': { 
    display: 'Fresh Produce',
    trend: 'volatile',
    volatility: 'high'
  },
  'Deli & Chilled Meats': { 
    display: 'Deli Counter',
    trend: 'stable',
    volatility: 'medium'
  },
  'Dairy, Eggs & Fridge': { 
    display: 'Dairy Products',
    trend: 'increasing',
    volatility: 'medium'
  },
  'Freezer': { 
    display: 'Frozen Food',
    trend: 'stable',
    volatility: 'low'
  },
  'Pantry': { 
    display: 'Pantry Essentials',
    trend: 'decreasing',
    volatility: 'low'
  }
};

// Load tender data from CSV
export const loadTenderData = async (): Promise<TenderData[]> => {
  try {
    // Load data from the sample data directory
    const response = await axios.get('/sample_data/aldi_tenders.csv');
    const { data } = response;
    
    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true
    });
    
    return parsedData.data as TenderData[];
  } catch (error) {
    console.error('Error loading tender data:', error);
    return [];
  }
};

// Get unique categories from tender data
export const getUniqueCategories = (tenderData: TenderData[]): string[] => {
  const categories = tenderData.map(item => item.category);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
};

// Get products by category
export const getProductsByCategory = (tenderData: TenderData[], categoryName: string): TenderData[] => {
  return tenderData.filter(item => item.category === categoryName);
};

// Get tender by ID
export const getTenderById = (tenderData: TenderData[], tenderId: string): TenderData | undefined => {
  return tenderData.find(item => item.tenderId === tenderId);
};

// Get product price history (simulate based on tender data)
export const getProductPriceHistory = (productCode: string): { date: string; price: number }[] => {
  // In a real application, this would retrieve historical price data
  // For now, we'll generate sample data
  const startDate = new Date(2023, 0, 1);
  const priceData = [];
  
  const basePrice = Math.random() * 50 + 10; // Random base price between 10-60
  
  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);
    
    // Add some variation to the price
    const variation = (Math.random() - 0.5) * 10;
    const price = basePrice + variation;
    
    priceData.push({
      date: currentDate.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return priceData;
};

// Get historical price trends for a category
export const getCategoryPriceTrend = (categoryName: string): { date: string; index: number }[] => {
  // In a real application, this would retrieve historical category price index data
  // For now, we'll generate sample data based on the category metadata
  const startDate = new Date(2023, 0, 1);
  const trendData = [];
  
  const metaData = categoryMetadata[categoryName] || { trend: 'stable', volatility: 'medium' };
  const trendFactor = metaData.trend === 'increasing' ? 0.5 : 
                     metaData.trend === 'decreasing' ? -0.5 : 0;
  const volatilityFactor = metaData.volatility === 'high' ? 3 : 
                          metaData.volatility === 'medium' ? 2 : 1;
  
  let currentIndex = 100;
  
  for (let i = 0; i < 24; i++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + i);
    
    // Apply trend and volatility
    const randomFactor = (Math.random() - 0.5) * volatilityFactor;
    currentIndex += trendFactor + randomFactor;
    
    trendData.push({
      date: currentDate.toISOString().split('T')[0],
      index: parseFloat(currentIndex.toFixed(1))
    });
  }
  
  return trendData;
};

// Get seasonality factors for a product category
export const getSeasonalityFactors = (categoryName: string): { month: string; factor: number }[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let seasonalityPattern: number[] = [];
  
  // Define different seasonality patterns based on category
  switch(categoryName) {
    case 'Fruits & Vegetables':
      // High seasonality - prices lower in summer, higher in winter
      seasonalityPattern = [1.2, 1.15, 1.1, 1.05, 0.95, 0.9, 0.85, 0.9, 0.95, 1.0, 1.1, 1.15];
      break;
    case 'Freezer':
      // Slight seasonality - higher demand in summer
      seasonalityPattern = [0.95, 0.95, 0.97, 1.0, 1.02, 1.05, 1.05, 1.05, 1.02, 1.0, 0.97, 0.95];
      break;
    case 'Drinks':
      // Higher in summer months
      seasonalityPattern = [0.9, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15, 1.15, 1.05, 1.0, 0.95, 0.9];
      break;
    default:
      // Low or no seasonality
      seasonalityPattern = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
      // Add small random variations
      seasonalityPattern = seasonalityPattern.map(v => v + (Math.random() - 0.5) * 0.1);
  }
  
  return months.map((month, index) => ({
    month,
    factor: seasonalityPattern[index]
  }));
};

// Calculate average price for a category
export const getCategoryAveragePrice = (tenderData: TenderData[], categoryName: string): number => {
  const products = getProductsByCategory(tenderData, categoryName);
  
  // In a real application, this would calculate from actual price data
  // For now, we'll generate a reasonable value based on the category
  let basePrice = 0;
  
  switch(categoryName) {
    case 'Drinks':
      basePrice = 2.5;
      break;
    case 'Health & Beauty':
      basePrice = 4.5;
      break;
    case 'Fruits & Vegetables':
      basePrice = 1.8;
      break;
    case 'Deli & Chilled Meats':
      basePrice = 3.2;
      break;
    case 'Dairy, Eggs & Fridge':
      basePrice = 2.0;
      break;
    case 'Freezer':
      basePrice = 3.5;
      break;
    case 'Pantry':
      basePrice = 1.5;
      break;
    default:
      basePrice = 2.0;
  }
  
  // Add some variation based on number of products
  const variation = (Math.random() - 0.5) * 0.5;
  return parseFloat((basePrice + variation).toFixed(2));
};

// Mock price data generation based on tender traits
export const generatePriceData = (tenderData: TenderData, days: number = 180): any[] => {
  const priceData = [];
  const today = new Date();
  
  // Set base price and trend based on trait
  let basePrice = 0;
  let trend: string = 'stable';
  
  switch (tenderData.trait) {
    case 'Premium':
      basePrice = parseFloat((Math.random() * 50 + 100).toFixed(2));
      trend = 'up';
      break;
    case 'Value':
      basePrice = parseFloat((Math.random() * 30 + 40).toFixed(2));
      trend = 'stable';
      break;
    case 'Organic':
      basePrice = parseFloat((Math.random() * 40 + 80).toFixed(2));
      trend = 'up';
      break;
    case 'Imported':
      basePrice = parseFloat((Math.random() * 60 + 70).toFixed(2));
      trend = 'volatile';
      break;
    default:
      basePrice = parseFloat((Math.random() * 40 + 60).toFixed(2));
      trend = 'stable';
  }
  
  // Generate historical price data
  for (let i = days; i >= 0; i -= 10) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    let randomFactor = 0;
    let trendFactor = 0;
    
    if (trend === 'up') {
      trendFactor = (days - i) / days * 0.5;
      randomFactor = Math.random() * 0.1 - 0.05;
    } else if (trend === 'down') {
      trendFactor = -(days - i) / days * 0.3;
      randomFactor = Math.random() * 0.15 - 0.075;
    } else if (trend === 'volatile') {
      trendFactor = Math.sin(i / 20) * 0.2;
      randomFactor = Math.random() * 0.3 - 0.15;
    } else {
      trendFactor = 0;
      randomFactor = Math.random() * 0.05 - 0.025;
    }
    
    const price = basePrice * (1 + trendFactor + randomFactor);
    
    priceData.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      marketAverage: parseFloat((price * (1 + Math.random() * 0.2 - 0.1)).toFixed(2)),
      predictedPrice: i < 30 ? null : parseFloat((price * (1 + (trend === 'up' ? 0.1 : trend === 'down' ? -0.1 : 0) + Math.random() * 0.1 - 0.05)).toFixed(2))
    });
  }
  
  // Add future predictions
  for (let i = 10; i <= 60; i += 10) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    let trendFactor = 0;
    let varianceFactor = Math.random() * 0.05 - 0.025;
    
    if (trend === 'up') {
      trendFactor = (days + i) / days * 0.5;
    } else if (trend === 'down') {
      trendFactor = -(days + i) / days * 0.3;
    } else if (trend === 'volatile') {
      trendFactor = Math.sin((days + i) / 20) * 0.2;
      varianceFactor = Math.random() * 0.2 - 0.1;
    }
    
    // Find the last entry with a non-null price
    const lastPriceEntry = [...priceData].reverse().find(entry => entry.price !== null);
    const lastPrice: number = lastPriceEntry?.price || basePrice;
    const predictedPrice: number = lastPrice * (1 + trendFactor + varianceFactor);
    
    priceData.push({
      date: date.toISOString().split('T')[0],
      price: null,
      marketAverage: null,
      predictedPrice: parseFloat(predictedPrice.toFixed(2))
    });
  }
  
  return priceData;
};

// Generate supplier data based on product trait
export const generateSupplierData = (tenderData: TenderData): any[] => {
  const supplierNames = [
    'Global Foods', 'Premium Imports', 'Organic Farms', 'Value Distributors',
    'Fresh Direct', 'Quality Suppliers', 'National Provisions', 'Farm Fresh',
    'International Goods', 'Eco Produce', 'Prime Selection', 'Standard Suppliers'
  ];
  
  // Shuffle and pick 3-4 suppliers
  const shuffled = [...supplierNames].sort(() => 0.5 - Math.random());
  const selectedSuppliers = shuffled.slice(0, 3 + Math.floor(Math.random() * 2));
  
  const basePriceByTrait = {
    'Premium': parseFloat((Math.random() * 50 + 100).toFixed(2)),
    'Value': parseFloat((Math.random() * 30 + 40).toFixed(2)),
    'Organic': parseFloat((Math.random() * 40 + 80).toFixed(2)),
    'Imported': parseFloat((Math.random() * 60 + 70).toFixed(2))
  };
  
  const basePrice = basePriceByTrait[tenderData.trait as keyof typeof basePriceByTrait] || 
                   parseFloat((Math.random() * 40 + 60).toFixed(2));
  
  return selectedSuppliers.map(supplier => {
    // Vary price by up to 10% from base
    const priceFactor = 1 + (Math.random() * 0.2 - 0.1);
    const price = parseFloat((basePrice * priceFactor).toFixed(2));
    
    // Random delivery times
    const deliveryOptions = ['1-2 weeks', '2-3 weeks', '3-4 weeks', '4-5 weeks'];
    const delivery = deliveryOptions[Math.floor(Math.random() * deliveryOptions.length)];
    
    return {
      name: supplier,
      price,
      delivery
    };
  });
};

// Function to get unique products
export const getUniqueProducts = (tenderData: TenderData[]): string[] => {
  const productsSet = new Set(tenderData.map(item => item.product));
  return Array.from(productsSet);
}; 