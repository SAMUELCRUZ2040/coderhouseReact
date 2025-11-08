import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase (obtén esto de Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBkYNPvWG4MMnPgxH8vQuuNrOdTldUNM14",
  authDomain: "coderhousereact-a7c5e.firebaseapp.com",
  projectId: "coderhousereact-a7c5e",
  storageBucket: "coderhousereact-a7c5e.firebasestorage.app",
  messagingSenderId: "834466156913",
  appId: "1:834466156913:web:43ce7b502ffb2e0e36e6d0",
  measurementId: "G-H9J7WHHCGY"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };