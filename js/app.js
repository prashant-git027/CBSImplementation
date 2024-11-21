// Configuration and Constants
const BASE_API_URL = 'https://mockapi.example.com';
const PROJECT_NAME = 'Mock Large File';
const MAX_ITEMS = 100;
const VERSION = '1.0.0';

console.log(`Initializing ${PROJECT_NAME} (Version: ${VERSION})`);

// Utilities
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function mockApiCall(endpoint, params = {}) {
  console.log(`Calling Mock API: ${BASE_API_URL}${endpoint}`);
  return {
    success: true,
    endpoint,
    params,
    timestamp: new Date().toISOString(),
  };
}

// Mock Database
const database = {
  users: [],
  products: [],
  orders: [],
};

// Mock Data Generators
function generateUser(id) {
  return {
    id,
    name: `User${id}`,
    email: `user${id}@example.com`,
    createdAt: formatDate(new Date()),
  };
}

function generateProduct(id) {
  return {
    id,
    name: `Product${id}`,
    price: getRandomInt(10, 500),
    stock: getRandomInt(0, 100),
  };
}

function generateOrder(id, userId, productId) {
  return {
    id,
    userId,
    productId,
    quantity: getRandomInt(1, 10),
    createdAt: formatDate(new Date()),
  };
}

// Populate Database
for (let i = 1; i <= MAX_ITEMS; i++) {
  database.users.push(generateUser(i));
  database.products.push(generateProduct(i));
  database.orders.push(generateOrder(i, getRandomInt(1, MAX_ITEMS), getRandomInt(1, MAX_ITEMS)));
}

// Utility Functions
function findUserById(userId) {
  return database.users.find((user) => user.id === userId);
}

function findProductById(productId) {
  return database.products.find((product) => product.id === productId);
}

function findOrdersByUser(userId) {
  return database.orders.filter((order) => order.userId === userId);
}

// Business Logic Functions
async function processUser(userId) {
  const user = findUserById(userId);
  if (!user) throw new Error(`User with ID ${userId} not found.`);
  
  const orders = findOrdersByUser(userId);
  return {
    user,
    orders,
  };
}

async function processProduct(productId) {
  const product = findProductById(productId);
  if (!product) throw new Error(`Product with ID ${productId} not found.`);
  
  const orders = database.orders.filter((order) => order.productId === productId);
  return {
    product,
    orders,
  };
}

// API Simulations
for (let i = 1; i <= 100; i++) {
  eval(`
    async function fetchDataForEntity${i}(id) {
      console.log('Fetching data for Entity ${i}, ID:', id);
      const result = await mockApiCall('/entity${i}', { id });
      return result;
    }
  `);
}

// Repeated Utility Methods
const utils = {};
for (let i = 1; i <= 100; i++) {
  utils[`utilityFunction${i}`] = () => {
    console.log(\`Utility Function \${i} executed.\`);
    return \`Result from Utility \${i}\`;
  };
}

// Repeated Business Logic
for (let i = 1; i <= 100; i++) {
  eval(`
    function calculateMetric${i}(value) {
      return value * ${i};
    }
  `);
}

// Main Execution
(async () => {
  console.log('Starting main execution...');
  
  for (let i = 1; i <= 10; i++) {
    const userId = getRandomInt(1, MAX_ITEMS);
    const productId = getRandomInt(1, MAX_ITEMS);
    
    try {
      const userReport = await processUser(userId);
      const productReport = await processProduct(productId);
      
      console.log('User Report:', userReport);
      console.log('Product Report:', productReport);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  console.log('Executing utility functions...');
  Object.keys(utils).forEach((key) => utils[key]());
  
  console.log('Calculating metrics...');
  for (let i = 1; i <= 10; i++) {
    const metricValue = calculateMetric10(i);
    console.log(`Metric for ${i}:`, metricValue);
  }
  
  console.log('Main execution completed.');
})();
