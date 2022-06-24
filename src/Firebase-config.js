import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtcudL1EhEop29h9OyK44XcIbyRpsdR_U",
  authDomain: "metalink-b6325.firebaseapp.com",
  projectId: "metalink-b6325",
  storageBucket: "metalink-b6325.appspot.com",
  messagingSenderId: "661266202235",
  appId: "1:661266202235:web:14bab683c75706c959ecde"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;