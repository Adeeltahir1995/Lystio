"use client"
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Header from "@/components/Header";
import ListingCard from "../components/ListingCard";
import { Box } from "@mui/material";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]);
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

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "white",
          color: "black",
        }}
      >
        {/* Map Section - Takes up 60% width */}
        <div style={{ flex: "0 0 58%", height: "100vh" }}>
          <Map
            listings={listings}
            mapMarkers={mapMarkers}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        {/* Listing Panel Section - Takes up 40% width */}
        <div
          style={{
            flex: "0 0 40%",
            padding: "20px", // Outer padding for the listing panel
            overflowY: "auto",
            height: "100vh",
            color: "black",
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

          {/* Grid Layout for Listings */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))",
              gap: 2, // Gap between cards
              mt: 2,
            }}
          >
            {listings.map((listing, index) => (
              <ListingCard key={index} listing={listing} visible={true} />
            ))}
          </Box>
        </div>
      </div>
    </>
  );
}
