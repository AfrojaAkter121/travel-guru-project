import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Helper component to update map center
function RecenterMap({ lat, lng }) {
  const map = useMap();
  map.setView([lat, lng], 13);
  return null;
}

const SearchableMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState({
    name: "Cox's Bazar",
    lat: 21.4272,
    lng: 92.0058,
  });

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const loc = data[0];
        setLocation({
          name: loc.display_name,
          lat: parseFloat(loc.lat),
          lng: parseFloat(loc.lon),
        });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search a location..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 bg-white rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={location.lat} lng={location.lng} />
        <Marker position={[location.lat, location.lng]}>
          <Popup>{location.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SearchableMap;
