import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// Array de productos para subir a Firebase
const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y titanio.",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
    category: "Smartphones",
    stock: 15,
    featured: true
  },
  {
    id: 2,
    title: "MacBook Air M2",
    description: "Ultraligera con chip M2, pantalla Liquid Retina de 13.6 pulgadas.",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    category: "Laptops",
    stock: 8,
    featured: false
  },
  {
    id: 3,
    title: "AirPods Pro 2",
    description: "Auriculares con cancelación de ruido adaptativa y audio espacial.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop",
    category: "Audio",
    stock: 25,
    featured: true
  },
  {
    id: 4,
    title: "iPad Pro 12.9",
    description: "Tablet profesional con chip M2 y pantalla Liquid Retina XDR.",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    category: "Tablets",
    stock: 12,
    featured: false
  },
  {
    id: 5,
    title: "Apple Watch Ultra",
    description: "El Apple Watch más resistente con GPS dual y batería de 36 horas.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    category: "Wearables",
    stock: 20,
    featured: true
  },
  {
    id: 6,
    title: "Sony WH-1000XM4",
    description: "Auriculares premium con la mejor cancelación de ruido del mercado.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Audio",
    stock: 18,
    featured: false
  },
  {
    id: 7,
    title: "Samsung Galaxy S24 Ultra",
    description: "Smartphone con S Pen integrado, cámara de 200MP y pantalla AMOLED 6.8\"",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    category: "Smartphones",
    stock: 22,
    featured: true
  },
  {
    id: 8,
    title: "Dell XPS 15",
    description: "Laptop profesional Intel i7, 16GB RAM, RTX 4050 y pantalla 4K OLED.",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    category: "Laptops",
    stock: 10,
    featured: false
  },
  {
    id: 9,
    title: "Bose QuietComfort 45",
    description: "Auriculares con cancelación de ruido líder y hasta 24 horas de batería.",
    price: 329.99,
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=300&fit=crop",
    category: "Audio",
    stock: 30,
    featured: false
  },
  {
    id: 10,
    title: "iPad Air M1",
    description: "Tablet versátil con chip M1, soporte para Apple Pencil y Magic Keyboard.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404f1e1?w=400&h=300&fit=crop",
    category: "Tablets",
    stock: 18,
    featured: true
  },
  {
    id: 11,
    title: "Garmin Fenix 7",
    description: "Reloj deportivo GPS con mapas, monitor cardíaco y batería de 18 días.",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop",
    category: "Wearables",
    stock: 14,
    featured: false
  },
  {
    id: 12,
    title: "Google Pixel 8 Pro",
    description: "Smartphone con IA avanzada, cámara de 50MP y pantalla de 120Hz.",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop",
    category: "Smartphones",
    stock: 16,
    featured: true
  },
  {
    id: 13,
    title: "ASUS ROG Strix G16",
    description: "Laptop gaming con Intel i9, RTX 4070, 32GB RAM y pantalla 240Hz.",
    price: 2299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    category: "Laptops",
    stock: 7,
    featured: true
  },
  {
    id: 14,
    title: "JBL Flip 6",
    description: "Altavoz Bluetooth portátil resistente al agua con sonido potente.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    category: "Audio",
    stock: 40,
    featured: false
  },
  {
    id: 15,
    title: "Samsung Galaxy Tab S9",
    description: "Tablet Android premium con S Pen, pantalla AMOLED y resistencia IP68.",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop",
    category: "Tablets",
    stock: 13,
    featured: false
  },
  {
    id: 16,
    title: "Fitbit Charge 6",
    description: "Pulsera fitness con GPS, monitor de frecuencia cardíaca y 7 días de batería.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    category: "Wearables",
    stock: 35,
    featured: false
  }
];

// Función para subir productos a Firebase
export const UploadProductsToFirebase = async () => {
  try {
    const productsCollection = collection(db, 'products');
    
    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Producto "${product.title}" subido correctamente`);
    }
    
    console.log('¡Todos los productos han sido subidos a Firebase!');
  } catch (error) {
    console.error('Error al subir productos:', error);
  }
};

// Ejecutar esta función UNA SOLA VEZ para subir los productos
// uploadProductsToFirebase();