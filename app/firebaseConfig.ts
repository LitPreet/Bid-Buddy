// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPlWqEL7ilinpnG3Fc_51-J3qtA1V9L38",
  authDomain: "bidbuddy-83ef1.firebaseapp.com",
  projectId: "bidbuddy-83ef1",
  storageBucket: "bidbuddy-83ef1.appspot.com",
  messagingSenderId: "603898138381",
  appId: "1:603898138381:web:a33547bff9ef4a987f2a44",
  measurementId: "G-L6V8M1M1HD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
const analytics = getAnalytics(app);