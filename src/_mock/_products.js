import { _mock } from './_mock';
import { _clientsList } from './_clients';

// ----------------------------------------------------------------------

export const WAREHOUSE_PRODUCT_STATUS_OPTIONS = [
  { value: 'activo', label: 'Activo' },
  { value: 'descontinuado', label: 'Descontinuado' },
  { value: 'agotado', label: 'Agotado' },
];

export const WAREHOUSE_PRODUCT_CATEGORY_OPTIONS = [
  { value: 'electronicos', label: 'Electrónicos' },
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'herramientas', label: 'Herramientas' },
  { value: 'cosmeticos', label: 'Cosméticos' },
  { value: 'autopartes', label: 'Autopartes' },
  { value: 'muebles', label: 'Muebles' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'libros', label: 'Libros' },
];

export const TEMPERATURE_OPTIONS = [
  { value: 'ambiente', label: 'Ambiente' },
  { value: 'refrigerado', label: 'Refrigerado' },
  { value: 'congelado', label: 'Congelado' },
];

export const UNIT_OPTIONS = [
  { value: 'piezas', label: 'Piezas' },
  { value: 'cajas', label: 'Cajas' },
  { value: 'pallets', label: 'Pallets' },
  { value: 'kilogramos', label: 'Kilogramos' },
  { value: 'litros', label: 'Litros' },
];

// ----------------------------------------------------------------------

const PRODUCT_NAMES = [
  'iPhone 14 Pro Max', 'Samsung Galaxy S23', 'MacBook Pro M2', 'Dell XPS 13',
  'Nike Air Jordan 1', 'Adidas Ultraboost 22', 'Sony WH-1000XM5', 'AirPods Pro 2',
  'Refrigerador LG 25 pies', 'Lavadora Samsung 20kg', 'Microondas Panasonic',
  'Televisor Samsung 65"', 'PlayStation 5', 'Xbox Series X', 'Nintendo Switch',
  'Silla Gamer DXRacer', 'Escritorio Ejecutivo', 'Mesa de Centro Moderna',
  'Perfume Chanel No.5', 'Crema Facial Olay', 'Champú Head & Shoulders',
  'Aceite Motor Mobil 1', 'Batería Bosch 12V', 'Llantas Michelin 225/60R16',
  'Proteína Whey Gold', 'Suplemento Creatina', 'Vitamina C 1000mg',
  'Café Nescafé 200g', 'Azúcar Mascabado 1kg', 'Arroz Integral 5kg',
  'Pasta Dental Colgate', 'Jabón Dove 100g', 'Detergente Ariel 3kg',
  'Camiseta Nike Dri-FIT', 'Pantalón Levi\'s 501', 'Zapatos Converse Chuck',
  'Tablet iPad Air 5', 'Mouse Logitech MX', 'Teclado Mecánico Corsair',
  'Monitor LG 27" 4K', 'Impresora HP LaserJet', 'Router TP-Link AC1200',
];

const DESCRIPTIONS = [
  'Smartphone premium',
  'Portátil para trabajo',
  'Pantalla HD profesional',
  'Teclado mecánico RGB',
  'Zapatillas deportivas',
  'Auriculares inalámbricos',
  'Electrodoméstico eficiente',
  'Consola de videojuegos',
  'Mueble moderno',
  'Producto cosmético',
  'Repuesto vehicular',
  'Suplemento nutricional',
  'Alimento orgánico',
  'Camiseta de algodón',
  'Tablet multitáctil',
  'Accesorio gaming',
  'Monitor 4K',
  'Impresora láser',
  'Router inalámbrico',
  'Producto de calidad',
];

const WAREHOUSE_LOCATIONS = [
  'A1-01-01', 'A1-01-02', 'A1-02-01', 'A1-02-02', 'A1-03-01',
  'B2-01-01', 'B2-01-02', 'B2-02-01', 'B2-02-02', 'B2-03-01',
  'C3-01-01', 'C3-01-02', 'C3-02-01', 'C3-02-02', 'C3-03-01',
  'D4-01-01', 'D4-01-02', 'D4-02-01', 'D4-02-02', 'D4-03-01',
];

// ----------------------------------------------------------------------

export const _productsList = PRODUCT_NAMES.map((name, index) => {
  const categoryKeys = WAREHOUSE_PRODUCT_CATEGORY_OPTIONS.map(option => option.value);
  const statusKeys = WAREHOUSE_PRODUCT_STATUS_OPTIONS.map(option => option.value);
  const unitKeys = UNIT_OPTIONS.map(option => option.value);
  const inventoryTypes = ['in stock', 'low stock', 'out of stock'];
  
  return {
    id: _mock.id(index),
    productId: `PRD-${String(index + 1000).padStart(4, '0')}`,
    name,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    category: categoryKeys[index % categoryKeys.length],
    sku: `SKU${String(Math.floor(Math.random() * 900000) + 100000)}`,
    clientId: _clientsList[index % _clientsList.length].id, // Referencia a cliente
    clientName: _clientsList[index % _clientsList.length].company, // Nombre del cliente propietario
    // Dimensiones en cm
    length: Math.floor(Math.random() * 50) + 10,
    width: Math.floor(Math.random() * 50) + 10,
    height: Math.floor(Math.random() * 50) + 10,
    weight: Math.floor(Math.random() * 2000) + 100, // gramos
    unit: unitKeys[index % unitKeys.length],
    currentStock: Math.floor(Math.random() * 1000) + 1,
    minStock: Math.floor(Math.random() * 50) + 10,
    maxStock: Math.floor(Math.random() * 500) + 200,
    warehouseLocation: WAREHOUSE_LOCATIONS[index % WAREHOUSE_LOCATIONS.length],
    status: statusKeys[index % statusKeys.length],
    inventoryType: inventoryTypes[index % inventoryTypes.length], // Para compatibilidad con vista client
    entryDate: _mock.time(index),
    lastUpdated: _mock.time(index + 5),
    createdAt: _mock.time(index),
  };
});