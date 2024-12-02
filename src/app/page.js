'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Admin from "@/components/Admin";
import PropertyList from "@/components/PropertyList";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const res = await axios.get("/api/properties");
      setProperties(res.data);
    }

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Available Properties</h1>
      <div>
        {properties.map((property) => (
          <div key={property.id} className="property-item">
            <img src={property.imageUrl} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <p>Location: {property.location}</p>
          </div>
        ))}
      </div>
      <Admin/>
      <PropertyList/>
    </div>
  );
}
