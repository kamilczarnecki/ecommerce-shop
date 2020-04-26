import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const fbConfig =  {
    apiKey: "AIzaSyAqRXEt6m0H_L9hx271CG7fswQd4NYHHok",
    authDomain: "clothing-shop-react-1ef22.firebaseapp.com",
    databaseURL: "https://clothing-shop-react-1ef22.firebaseio.com",
    projectId: "clothing-shop-react-1ef22",
    storageBucket: "clothing-shop-react-1ef22.appspot.com",
    messagingSenderId: "753626003532",
    appId: "1:753626003532:web:c063ce72adeff09ca6dce9",
    measurementId: "G-NDJ14T36NK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = (firestore.doc(`users/${userAuth.uid}`));

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(fbConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;