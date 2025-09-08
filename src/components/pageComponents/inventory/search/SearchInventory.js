import React, { useState, useRef, useEffect } from "react";

const SearchInventory = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);

  // Debounced search and API filter using query param
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowPopup(false);
      return;
    }
    setLoading(true);

    const searchQuery = encodeURIComponent(query.trim());

    const handler = setTimeout(() => {
      fetch(
        `https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f?search=${searchQuery}`
      )
        .then((res) => res.json())
        .then((data) => {
          const items = data.results || [];
          setResults(items.slice(0, 5)); // Show top 5 results
          setShowPopup(items.length > 0);
        })
        .catch(() => {
          setResults([]);
          setShowPopup(false);
        })
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (item) => {
    // You can customize the fields here according to your display needs
    setQuery(
      [
        item.year,
        item.make,
        item.model,
        item.stockNumber,
        item.vin,
        item.color,
        item.trim,
        item.class,
        item.name,
      ]
        .filter(Boolean)
        .join(" - ")
    );
    setShowPopup(false);
    // Optionally handle selection
  };

  // Hide popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", width: 300 }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by year, make, model, stock #, VIN, color, trim, class..."
        style={{ width: "100%", padding: "8px" }}
        onFocus={() => results.length > 0 && setShowPopup(true)}
        autoComplete="off"
      />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            background: "#fff",
            zIndex: 1000,
            padding: "8px",
          }}
        >
          Loading...
        </div>
      )}
      {showPopup && results.length > 0 && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {results.map((item) => (
            <div
              key={item._id}
              onClick={() => handleResultClick(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {[
                item.year,
                item.make,
                item.model,
                item.stockNumber,
                item.vin,
                item.color,
                item.trim,
                item.class,
                item.name,
              ]
                .filter(Boolean)
                .join(" - ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInventory;
