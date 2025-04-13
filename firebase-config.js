// Replace these config values with your actual Firebase project values
const firebaseConfig = {
  apiKey: "AIzaSyBveCvCE6i5Yua9CAdB-0xj0kAkj74ymI8",
  authDomain: "mangoinventory-d6148.firebaseapp.com",
  databaseURL: "https://mangoinventory-d6148-default-rtdb.firebaseio.com",
  projectId: "mangoinventory-d6148",
  storageBucket: "mangoinventory-d6148.firebasestorage.app",
  messagingSenderId: "144368855936",
  appId: "1:144368855936:web:5c261619e649a3cfbbaf65",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
