"use client";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Header from "@/components/Header";
import ListingCard from "../components/ListingCard";
import { Box, TextField, Typography } from "@mui/material";
import ListingIcon from "../assets/listing.svg";

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
  const [searchText, setSearchText] = useState("");

  const fetchData = () => {
    const payload = {
      filter: {
        size: [10, 1000],
        rent: [minPrice, maxPrice],
        roomsBed: [0, 99],
        roomsBath: [0, 99],
        title: searchText ? { $regex: searchText, $options: "i" } : undefined,
        type: [1],
        subType: [1],
        condition: [1],
        accessibility: [1],
        rentType: ["rent"],
        floorType: [1],
        heatingType: [1],
        availableNow: true,
        within: polygon,
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
          setMapMarkers(
            data.res.map((item) => ({
              lat: item.latitude,
              lng: item.longitude,
            }))
          );
        }
        if (data.paging) {
          setPaging(data.paging);
        }
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setListings([]);
        setMapMarkers([]);
      });
  };

  // Fetch data when minPrice, maxPrice, polygon, or searchText changes
  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice, polygon, searchText]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update search text state
  };

  return (
    <>
      <Header searchText={searchText} onSearchChange={handleSearchChange} />

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "white",
          color: "black",
        }}
      >
        {/* Map Section - Takes up 58% width */}
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
            padding: "20px",
            overflowY: "auto",
            height: "100vh",
            color: "black",
          }}
        >
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ListingIcon />
              <Typography variant="h5">Listing Around Me</Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                  label="Min Price"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Max Price"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(245px, 1fr))",
              gap: 2,
              mt: 2,
              mb: 2,
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
