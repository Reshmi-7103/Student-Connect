// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyASvFhURRGdiewm_2u1VwFQ0kp_95yqKys",
  authDomain: "campusconnect-af24c.firebaseapp.com",
  projectId: "campusconnect-af24c",
  storageBucket: "campusconnect-af24c.appspot.com",
  messagingSenderId: "409044770315",
  appId: "1:409044770315:web:d3f0fa827c33b23c14f10e"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
