import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
const database = getDatabase(app);

export async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('>>> user', user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const result = await signOut(auth);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log('+++ admins', admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(','),
  });
}

// export async function getProducts() {
//   return get(ref(database, 'products')) //
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return Object.values(snapshot.val()); //👍👍👍👍👍 Object.values는 array를 return
//       }
//       return [];
//     });
// }

export async function getProducts() {
  try {
    const snapshot = await get(ref(database, 'products'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCart(userId) {
  try {
    const snapshot = await get(ref(database, `carts/${userId}`));
    const items = snapshot.val() || {};
    return Object.values(items);
  } catch (error) {
    console.error(error);
    throw error;
  }
  // return get(ref(database, `carts/${userId}`)) //
  //   .then((snapshot) => {
  //     const items = snapshot.val() || {};
  //     return Object.values(items);
  //   });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
