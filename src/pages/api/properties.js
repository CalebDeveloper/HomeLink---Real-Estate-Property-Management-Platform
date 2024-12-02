import { db } from "../../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const properties = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: "Error fetching properties", error });
    }
  } else if (req.method === "POST") {
    const { title, description, price, location, imageUrl } = req.body;

    try {
      await addDoc(collection(db, "properties"), {
        title,
        description,
        price,
        location,
        imageUrl,
      });
      res.status(200).json({ message: "Property added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding property", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
