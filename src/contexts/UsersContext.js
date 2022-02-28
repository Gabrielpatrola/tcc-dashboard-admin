import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'

export function useUsers() {
  async function getUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const mappedValues = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      return mappedValues
    } catch (err) {
      // TODO: Handle errors
      console.error('Failed to retrieve data', err)
    }
  }

  return {
    getUsers,
  }
}
