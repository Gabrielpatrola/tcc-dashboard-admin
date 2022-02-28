import { auth, db } from '../services/firebase'
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore'

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

  async function register(email, password) {
    const usersDbRef = collection(db, 'users')
    let originalUser = auth.currentUser

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((item) => {
        addDoc(usersDbRef, {
          created: serverTimestamp(),
          name: item.user.displayName,
          email: item.user.email,
          emailVerified: item.user.emailVerified,
          uid: item.user.uid,
          provider: item.user.providerId,
        })
      })
      .then(() => {
        return auth.updateCurrentUser(originalUser)
      })
      .catch((error) => console.log(error))
  }

  return {
    getUsers,
    register,
  }
}
