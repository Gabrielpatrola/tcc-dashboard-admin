import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'

export function useOrders() {
  async function getOrders() {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'))
      const mappedValues = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })

      const normalizedOrders = await Promise.all(
        mappedValues.map(async (item) => {
          const q = query(collection(db, 'users'), where('uid', '==', item.user_uid))

          const querySnapshotUser = await getDocs(q)

          const email = querySnapshotUser.docs.map((item) => {
            return item.get('email')
          })

          return { ...item, email: email[0] }
        }),
      )

      return normalizedOrders
    } catch (err) {
      // TODO: Handle errors
      console.error('Failed to retrieve data', err)
    }
  }

  /*   function createProduct(name, value, quantity, category, userId) {
    const groceriesColRef = collection(db, 'products')
    return addDoc(groceriesColRef, {
      created: serverTimestamp(),
      createdBy: userId,
      name: name,
      value: value,
      quantity: quantity,
      category: category,
    })
  } */

  return {
    /*  createProduct, */
    getOrders,
  }
}
