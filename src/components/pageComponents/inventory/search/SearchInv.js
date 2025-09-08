import { useEffect, useRef, useState } from "react";

export default function SearchInventory() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      const response = await fetch(
        `https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f?search=${query}`
      );
      const data = await response.json();
      setResults(data);
      setLoading(false);
    };

    fetchInventoryItems();
  }, [query]);

  console.log("Results:", results);
  return (
    <div>
      <h1>Search Inventory</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
