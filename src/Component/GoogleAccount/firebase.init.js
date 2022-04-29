import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config.js';

const initializeAuth = () => {
    initializeApp(firebaseConfig);
}

export default initializeAuth;