import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app, db } from "./Firebase";
import Cookies from "universal-cookie";

const formattedDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("es-CO", options);
};

export const createNewTournament = async (
  tournamentData,
  setTournamentExists
) => {
  const docRef = await addDoc(collection(db, "tournaments"), {
    uuid: tournamentData.uuid,
    tournamentName: tournamentData.tournamentName,
    location: tournamentData.location,
    tournamentDate: formattedDate(tournamentData.tournamentDate.toDate()),
    modality: tournamentData.modality,
    category: tournamentData.category,
    description: tournamentData.description,
    trackName: tournamentData.trackName,
    modules: tournamentData.jumps,
    riders: tournamentData.riders,
    state: true,
  });

  return docRef.id;
};

export const getTournamentById = async (id) => {
  const docRef = doc(db, "tournaments", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const checkIfTournamentExists = async () => {
  const q = query(collection(db, "tournaments"), where("state", "==", true));
  const querySnapshot = await getDocs(q);
  const exists = querySnapshot.size > 0;
  return exists;
};

export const addCompetitors = async (id, competitorData) => {
  const docRef = doc(db, "tournaments", id);

  const docSnap = await getDoc(docRef);
  const existingData = docSnap.data().riders;

  const updatedData = [...existingData, competitorData];

  try {
    await updateDoc(docRef, {
      riders: updatedData,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getRidersById = async (id) => {
  const docRef = doc(db, "tournaments", id);
  docRef.get().then((doc) => {
    if (doc.exists) {
      // Si el documento existe, accede a la propiedad "riders"
      const riders = doc.data().riders;
      console.log(riders);
    } else {
      console.log('El documento no existe');
    }
  }).catch((error) => {
    console.log('Error al obtener el documento:', error);
  });
};


