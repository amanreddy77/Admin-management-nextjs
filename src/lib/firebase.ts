import firebase from 'firebase/app';
import 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the Firebase storage service
const storage = firebase.storage();

export const uploadImage = async (file: File) => {
  // Create a storage reference
  const storageRef = storage.ref();
  // Create a reference to 'images/fileName'
  const imageRef = storageRef.child(`images/${file.name}`);
  // Upload the file to Firebase storage
  await imageRef.put(file);
  // Get the file's download URL
  const url = await imageRef.getDownloadURL();
  return url;
};
