import { initializeApp, getApp, getApps } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

export const firebaseApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      })

export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = (): ReturnType<typeof signInWithPopup> => {
  return signInWithPopup(auth, googleAuthProvider)
}
