//import React, { useContext, useState } from 'react'
import { collection, getDoc, addDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

/* const ProductsContext = React.createContext()

export function useProducts() {
  return useContext(ProductsContext)
}
 */
// eslint-disable-next-line react/prop-types
export function useProducts() {
  // const [currentUser, setCurrentUser] = useState()
  //const [loading, setLoading] = useState(true)

  /* function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
 */
  function getGroceryList(groceryListId) {
    const groceryDocRef = doc(db, 'groceryLists', groceryListId)
    return getDoc(groceryDocRef)
  }

  function createGroceryList(name, value, quantity, category, userId) {
    const groceriesColRef = collection(db, 'groceryLists')
    return addDoc(groceriesColRef, {
      created: serverTimestamp(),
      createdBy: userId,
      name: name,
      value: value,
      quantity: quantity,
      category: category,
    })
  }
  /*   function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
 */
  /*   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, []) */

  return {
    //  currentUser,
    createGroceryList,
    getGroceryList,
    /*    logout,
    resetPassword, */
    /*    updateEmail,
    updatePassword, */
  }
}
