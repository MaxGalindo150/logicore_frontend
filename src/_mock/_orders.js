import { _mock } from './_mock';
import { _clientsList } from './_clients';
import { _productsList } from './_products';

// ----------------------------------------------------------------------

export const WAREHOUSE_ORDER_STATUS_OPTIONS = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en-proceso', label: 'En Proceso' },
  { value: 'en-transito', label: 'En Tránsito' },
  { value: 'completada', label: 'Completada' },
  { value: 'cancelada', label: 'Cancelada' },
];

// Generar productos para órdenes usando productos existentes
const generateOrderItems = (index) => {
  const numberOfItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
  const selectedProducts = [];
  
  for (let i = 0; i < numberOfItems; i++) {
    const productIndex = (index + i) % _productsList.length;
    const product = _productsList[productIndex];
    const quantity = Math.floor(Math.random() * 5) + 1; // 1-5 quantity
    
    selectedProducts.push({
      id: `${product.id}-order-${index}`,
      name: product.name,
      sku: product.sku,
      quantity,
      price: Math.floor(Math.random() * 1000) + 100, // $100-$1100
      coverUrl: null, // LogiCore no usa imágenes de productos
      productId: product.id,
      warehouseLocation: product.warehouseLocation,
    });
  }
  
  return selectedProducts;
};

export const _ordersList = [...Array(30)].map((_, index) => {
  const client = _clientsList[index % _clientsList.length];
  
  const items = generateOrderItems(index);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calcular peso total basado en productos existentes
  const totalWeight = items.reduce((acc, item) => {
    const product = _productsList.find(p => p.id === item.productId);
    const weightInKg = product ? (product.weight / 1000) * item.quantity : Math.random() * 5 + 1; // Convert g to kg
    return acc + weightInKg;
  }, 0);
  
  // Información logística (sin precios)
  const shipping = Math.floor(Math.random() * 100) + 50;
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = Math.floor(subtotal * 0.16);
  const discount = Math.floor(Math.random() * 50);
  const totalAmount = subtotal + shipping + taxes - discount;
  
  const statusOptions = ['pendiente', 'en-proceso', 'en-transito', 'completada', 'cancelada'];
  const status = statusOptions[index % statusOptions.length];
  
  // Timeline basado en el estado
  const timeline = [];
  const baseTime = _mock.time(index);
  
  timeline.push({ title: 'Orden creada', time: baseTime });
  
  if (['en-proceso', 'en-transito', 'completada'].includes(status)) {
    timeline.push({ title: 'Productos preparados', time: _mock.time(index + 1) });
  }
  
  if (['en-transito', 'completada'].includes(status)) {
    timeline.push({ title: 'En camino al destino', time: _mock.time(index + 2) });
  }
  
  if (status === 'completada') {
    timeline.push({ title: 'Entrega completada', time: _mock.time(index + 3) });
  }
  
  if (status === 'cancelada') {
    timeline.push({ title: 'Orden cancelada', time: _mock.time(index + 1) });
  }
  
  return {
    id: _mock.id(index),
    orderNumber: `ORD-${String(index + 2000).padStart(4, '0')}`,
    createdAt: baseTime,
    status,
    
    // Cliente (referencia existente)
    customer: {
      id: client.id,
      name: client.company, // Usamos el nombre de la empresa
      email: client.email,
      avatarUrl: null, // No usamos avatares
      company: client.company,
      phoneNumber: client.phoneNumber,
    },
    
    // Items de la orden
    items,
    totalQuantity,
    totalWeight: Math.round(totalWeight * 100) / 100, // Redondear a 2 decimales
    
    // Información financiera (mantener para compatibilidad)
    subtotal,
    shipping,
    taxes,
    discount,
    totalAmount,
    
    // Información logística
    destination: `${client.city}, ${client.state}`,
    volume: Math.round(totalWeight * 0.001 * 100) / 100, // Estimación volumen en m³
    
    // Dirección de entrega (del cliente)
    shippingAddress: {
      fullAddress: `${client.address}, ${client.city}, ${client.state}`,
      phoneNumber: client.phoneNumber,
      contactPerson: client.name,
    },
    
    // Información de envío
    delivery: {
      shipBy: ['DHL', 'FedEx', 'UPS', 'Estafeta', 'Paquetexpress'][index % 5],
      speedy: ['Estándar', 'Express', 'Urgente'][index % 3],
      trackingNumber: `TRK${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
    },
    
    // Método de pago
    payment: {
      method: ['Transferencia', 'Crédito 30 días', 'Crédito 60 días', 'Contado'][index % 4],
      status: status === 'completada' ? 'Pagado' : 'Pendiente',
    },
    
    // Historial y timeline
    history: {
      orderTime: baseTime,
      paymentTime: status === 'completada' ? _mock.time(index + 2) : null,
      deliveryTime: status === 'completada' ? _mock.time(index + 3) : null,
      completionTime: status === 'completada' ? _mock.time(index + 4) : null,
      timeline: timeline.reverse(), // Mostrar más reciente primero
    },
    
    // Notas internas
    notes: index % 3 === 0 ? `Orden especial para ${client.company}` : null,
  };
});

// Export para compatibilidad con componentes existentes
export const _orders = _ordersList;
export const ORDER_STATUS_OPTIONS = WAREHOUSE_ORDER_STATUS_OPTIONS;