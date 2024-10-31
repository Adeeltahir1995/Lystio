"use client";
import { useEffect, useState } from "react";
import Map from "../components/Map";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [paging, setPaging] = useState({
    pageCount: 0,
    page: 0,
    pageSize: 10,
    totalCount: 0,
  });
  const [polygon, setPolygon] = useState(null);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);

  const fetchData = () => {
    const payload = {
      filter: {
        size: [10, 1000],
        rent: [minPrice, maxPrice],
        roomsBed: [0, 99],
        roomsBath: [0, 99],
        type: [1],
        subType: [1],
        condition: [1],
        accessibility: [1],
        rentType: ["rent"],
        floorType: [1],
        heatingType: [1],
        availableNow: true,
        within: polygon,
        bbox: null,
        near: null,
        amenities: null,
      },
      sort: {
        rent: null,
        distance: null,
      },
      paging: {
        pageSize: 10,
        page: paging.page,
      },
    };

    fetch("https://api.lystio.co/tenement/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.res) {
          setListings(data.res);
        }
        if (data.paging) {
          setPaging(data.paging);
        }
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setListings([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice, polygon]);

  const handlePolygonDraw = (polygonData) => {
    setPolygon(polygonData);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Map Section - occupies 50% of the screen width */}
      <div style={{ flex: "1", height: "100vh" }}>
        <Map
          listings={listings}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>

      {/* Listings Panel - occupies 50% of the screen width */}
      <div
        style={{
          flex: "1",
          padding: "10px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <h2>Listing Panel</h2>
        <div>
          <label>Min Price:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            style={{ marginRight: "10px" }}
          />
          <label>Max Price:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        {listings.map((listing, index) => (
          <div
            key={index}
            className="listing-item"
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <h3>{listing.title}</h3>
            <p>{listing.abstract}</p>
            <p>Price: ${listing.rent}</p>
            <p>Size: {listing.size} m²</p>
          </div>
        ))}
        <p>
          Page {paging.page + 1} of {paging.pageCount}
        </p>
      </div>
    </div>
  );
}
