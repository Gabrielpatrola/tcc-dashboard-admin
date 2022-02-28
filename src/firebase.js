import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFirestore, collection, getDoc, addDoc, doc, serverTimestamp } from 'firebase/firestore'

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const auth = app.auth()
export const db = getFirestore(app)

export const createGroceryList = (userName, userId) => {
  const groceriesColRef = collection(db, 'groceryLists')
  return addDoc(groceriesColRef, {
    created: serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName,
      },
    ],
  })
}

export const getGroceryList = (groceryListId) => {
  const groceryDocRef = doc(db, 'groceryLists', groceryListId)
  return getDoc(groceryDocRef)
}

//export default app
