import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../services/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    const usersDbRef = collection(db, 'users')

    return auth.createUserWithEmailAndPassword(email, password).then((item) => {
      console.log(item)
      return addDoc(usersDbRef, {
        created: serverTimestamp(),
        name: item.user.displayName,
        email: item.user.email,
        emailVerified: item.user.emailVerified,
        uid: item.user.uid,
        provider: item.user.providerId,
      })
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
