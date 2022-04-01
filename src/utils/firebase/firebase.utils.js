import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAPHwBG3eWsEvnBxvEcfJ3gwRA-YjyCrQs",
    authDomain: "crwn-db-66b38.firebaseapp.com",
    projectId: "crwn-db-66b38",
    storageBucket: "crwn-db-66b38.appspot.com",
    messagingSenderId: "853556303011",
    appId: "1:853556303011:web:23833ab43501f9ef865b16"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account" 
  });


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,"users", userAuth.uid);
    console.log(userDocRef);
    const userSanpshot = await getDoc(userDocRef);
    console.log(userSanpshot);

    if (!userSanpshot.exists() === true){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, { displayName, email, createdAt});
        }
        catch (error){
            console.log("error creating the user" + error);
        }
    } else {

    }
    
}

