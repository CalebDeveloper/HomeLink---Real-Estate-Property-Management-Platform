'use client';
import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image"; // Importing Next.js Image component

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const fetchedProperties = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(fetchedProperties);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg shadow p-4 flex flex-col"
          >
            {property.imageUrl && (
              <Image
                src={property.imageUrl}
                alt={property.title}
                width={500} // Set your desired width
                height={300} // Set your desired height
                className="w-full h-40 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600 mb-2">{property.description}</p>
            <p className="text-green-600 font-bold mb-2">
              KES {property.price.toLocaleString()}
            </p>
            <p className="text-gray-500">{property.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
