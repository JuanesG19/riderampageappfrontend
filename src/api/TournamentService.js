import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { app, db } from "./Firebase";
import Cookies from "universal-cookie";

const formattedDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString("es-CO", options);
};

export const createNewTournament = async (tournamentData, setTournamentExists) => {

  const cookies = new Cookies();

  const docRef = await addDoc(collection(db, "tournaments"), {
    uuid: tournamentData.uuid,
    tournamentName: tournamentData.tournamentName,
    location: tournamentData.location,
    tournamentDate: formattedDate(tournamentData.tournamentDate.toDate()),
    modality: tournamentData.modality,
    category: tournamentData.category,
    description: tournamentData.description,
    trackName: tournamentData.trackName,
    modules: tournamentData.modules,
    riders: tournamentData.riders,
    state: true,
  });

  cookies.set("tournamentid", docRef.id);
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
