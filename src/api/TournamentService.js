import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
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
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // Si el documento existe, accede a la propiedad "riders"
        const riders = doc.data().riders;
        console.log(riders);
      } else {
        console.log("El documento no existe");
      }
    })
    .catch((error) => {
      console.log("Error al obtener el documento:", error);
    });
};

export const deleteRiderFirebase = async (tournamentId, riderId) => {
  try {
    const tournamentsRef = doc(db, "tournaments", tournamentId);

    const tournamentsSnapshot = await getDoc(tournamentsRef);
    const tournamentsData = tournamentsSnapshot.data();

    const ridersArray = tournamentsData.riders;

    const riderIndex = ridersArray.findIndex((rider) => rider.id === riderId);

    if (riderIndex !== -1) {
      ridersArray.splice(riderIndex, 1);
      await updateDoc(tournamentsRef, { riders: ridersArray });
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar el rider:", error);
    return false;
  }
};

export const rateRider = async (tournamentId, riderId, lap, rate) => {
  try {
    // Obtén una referencia al documento del torneo
    const tournamentRef = doc(db, "tournaments", tournamentId);
    const tournamentDoc = await getDoc(tournamentRef);

    if (tournamentDoc.exists()) {
      const ridersData = tournamentDoc.data().riders;

      const riderIndex = ridersData.findIndex((rider) => rider.id === riderId);

      if (riderIndex !== -1) {
        const riderScore = ridersData[riderIndex].score[0];
        const updatedScore = {
          firstScore: riderScore.firstScore,
          secondScore: riderScore.secondScore,
          tirthScore: riderScore.tirthScore,
          finalScore: riderScore.finalScore,
        };

        console.log("updatedScore", updatedScore);

        switch (parseInt(lap)) {
          case 1:
            updatedScore.firstScore = parseFloat(rate);
            break;
          case 2:
            updatedScore.secondScore = parseFloat(rate);
            console.log("secondScore");

            break;
          case 3:
            updatedScore.tirthScore = parseFloat(rate);
            console.log("tirthScore");
            break;
          default:
        }

        updatedScore.finalScore =
          updatedScore.firstScore +
          updatedScore.secondScore +
          updatedScore.tirthScore;

        // Actualiza el puntaje del rider en el documento del torneo
        ridersData[riderIndex].score[0] = updatedScore;

        // Actualiza el documento del torneo con el rider modificado
        await updateDoc(tournamentRef, { riders: ridersData });
      } else {
        console.log("Rider no encontrado en el torneo");
        return null; // Puedes manejar la lógica si el rider no se encuentra
      }
    } else {
      console.log("Torneo no encontrado");
      return null; // Puedes manejar la lógica si el torneo no se encuentra
    }
  } catch (error) {
    console.error("Error al obtener el puntaje del rider:", error);
    return null; // Puedes manejar la lógica en caso de error
  }
};
