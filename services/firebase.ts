
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyARHM3wd4NoF5k2mUgohqLEC3Wh_dg8XCY",
  authDomain: "siteatitudecaxias.firebaseapp.com",
  projectId: "siteatitudecaxias",
  storageBucket: "siteatitudecaxias.firebasestorage.app",
  messagingSenderId: "613924106472",
  appId: "1:613924106472:web:14573f9005dd1c7bd4995d",
  measurementId: "G-DTC7RHCZ55"
};

let db: any;
let storage: any;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (e) {
  console.error("Erro ao inicializar Firebase:", e);
}

export const subscribeToData = (collectionName: string, callback: (data: any[]) => void) => {
  if (!db) return () => {};
  try {
    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    });
  } catch (e) {
    return () => {};
  }
};

export const saveData = async (collectionName: string, data: any, id?: string) => {
  if (!db) return;
  try {
    if (id) {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, data, { merge: true });
    } else {
      await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Date.now()
      });
    }
  } catch (e) {
    console.error("Erro ao salvar:", e);
  }
};

// Deletar Dados do Firestore e opcionalmente o arquivo do Storage
export const deleteData = async (collectionName: string, id: string, imageUrl?: string) => {
  if (!db) return;
  try {
    if(window.confirm("Esta ação é permanente. Deseja mesmo excluir este item?")) {
      // Se houver uma URL de imagem, tentamos deletar do Storage também
      if (imageUrl && imageUrl.includes("firebasestorage")) {
        try {
          const fileRef = ref(storage, imageUrl);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn("Arquivo no storage não encontrado ou já deletado.");
        }
      }
      await deleteDoc(doc(db, collectionName, id));
      return true;
    }
  } catch (e) {
    console.error("Erro ao deletar:", e);
  }
  return false;
};

// Deletar apenas arquivo do Storage
export const deleteFile = async (url: string) => {
  if (!storage || !url) return;
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
    return true;
  } catch (e) {
    return false;
  }
};

export const uploadImage = async (file: File, path: string = 'uploads'): Promise<string> => {
  if (!storage) return "";
  try {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (e) {
    return "";
  }
};
