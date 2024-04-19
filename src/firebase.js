import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { getStorage, ref,  uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJB4HJm_DzEWO4n3Oz6lPJE0bmkwSC4QQ",
    authDomain: "first-958db.firebaseapp.com",
    projectId: "first-958db",
    storageBucket: "first-958db.appspot.com",
    messagingSenderId: "146558440697",
    appId: "1:146558440697:web:ae791ece99b36e8346be28"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const projectsCollection = collection(db, 'projects')

export const uploadImage = async (file) => {

  const storageRef = ref(storage, 'images/' + makeid());
  try {
    if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png"){
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
    }
    else{throw error} 
  } catch (error) {
    // console.error('Error uploading image:', error);
    throw error; 
  }
}

export const deleteImage = async (imageUrl) =>{
  const imageRef = ref(storage, imageUrl)
  await deleteObject(imageRef)
  console.log("Image delete sucs")
}

export const createProject = project => {
   return addDoc(projectsCollection, project)
  }

export const getProject = async id => {
    const projectDocRef = doc(db, 'projects', id)
    const projectDocSnap = await getDoc(projectDocRef)
    return projectDocSnap.exists ? projectDocSnap.data() : null
}

export const updateProject = (id, project) => {
    const projectDocRef = doc(db, 'projects', id)
    return updateDoc(projectDocRef, project)
  }

export const deleteProject = id => {
  const projectDocRef = doc(db, 'projects', id)
    return deleteDoc(projectDocRef)
}

export const getProjects = async () => {
    const projectsCollectionRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsCollectionRef);
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  }

function makeid(length = 20) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

