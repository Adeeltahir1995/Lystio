"use client";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import Header from "@/components/Header";
import ListingCard from "../components/ListingCard";
import { div, TextField, Typography } from "@mui/material";
import ListingIcon from "../assets/listing.svg";
import { searchAPIPayload } from "@/constants";
import styles from "./index.module.css";

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
    fetch("https://api.lystio.co/tenement/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        searchAPIPayload({
          minPrice,
          maxPrice,
          searchText,
          polygon,
          paging,
        })
      ),
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

  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice, polygon, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Header searchText={searchText} onSearchChange={handleSearchChange} />

      <div className={styles.container}>
        <div className={styles.mapSection}>
          <Map
            listings={listings}
            mapMarkers={mapMarkers}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        <div className={styles.listingSection}>
          <div className={styles.listingContainer}>
            <div className={styles.listingTextContainer}>
              <ListingIcon />
              <Typography variant="h5" className={styles.listingTitle}>Listing Around Me</Typography>
            </div>
            <div>
              <div className={styles.priceRange}>
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
              </div>
            </div>
          </div>

          <div className={styles.gridContainer}>
            {listings.map((listing, index) => (
              <ListingCard key={index} listing={listing} visible={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
