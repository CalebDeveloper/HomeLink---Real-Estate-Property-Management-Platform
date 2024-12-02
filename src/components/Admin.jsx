'use client';
import { useState } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";

export default function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (image) {
      const storageRef = ref(storage, `properties/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error("Error uploading image:", error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const propertyData = { ...formData, imageUrl: downloadURL };
          try {
            await axios.post("/api/properties", propertyData);
            alert("Property added successfully!");
          } catch (err) {
            console.error(err);
            alert("Error adding property");
          }
          setLoading(false);
        }
      );
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Property</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Property Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Short description of the property"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price (KES)</label>
            <input
              type="number"
              placeholder="Price in KES"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Property Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Image Upload</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2 cursor-pointer"
              accept="image/*"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-semibold ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
