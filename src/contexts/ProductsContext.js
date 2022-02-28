import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

export function useProducts() {
  async function getProducts() {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const mappedValues = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      return mappedValues
    } catch (err) {
      // TODO: Handle errors
      console.error('Failed to retrieve data', err)
    }
  }

  function createProduct(name, value, quantity, category, userId) {
    const groceriesColRef = collection(db, 'products')
    return addDoc(groceriesColRef, {
      created: serverTimestamp(),
      createdBy: userId,
      name: name,
      value: value,
      quantity: quantity,
      category: category,
    })
  }

  return {
    createProduct,
    getProducts,
  }
}
