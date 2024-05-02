import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDIcBc4yQZzrqcdzj7t5ZJIetDI-7pdB94',
  authDomain: 'arisan-yuk-5f57d.firebaseapp.com',
  projectId: 'arisan-yuk-5f57d',
  storageBucket: 'arisan-yuk-5f57d.appspot.com',
  messagingSenderId: '799211087943',
  appId: '1:799211087943:web:adb75bb88995503c63a962',
  measurementId: 'G-FQWRRLXB3T'
}
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export default firebaseApp
