import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

import mapboxgl from "mapbox-gl";

import ListingCard from "../ListingCard";

import styles from "./index.module.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const createMarkerElement = (rent) => {
  const markerElement = document.createElement("div");
  markerElement.className = styles.priceMarker;
  markerElement.innerText = `€${rent}`;
  return markerElement;
};

const createPopupNode = (listing) => {
  const popupNode = document.createElement("div");
  Object.assign(popupNode.style, {
    position: "absolute",
    transform: "translate(-80%, -70%)",
  });

  const root = createRoot(popupNode);
  root.render(<ListingCard listing={listing} visible={false} />);

  return popupNode;
};

const Map = ({ listings, minPrice, maxPrice }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [16.3738, 48.2082],
      zoom: 12,
    });

    const bounds = new mapboxgl.LngLatBounds();
    let markerCount = 0;

    listings.forEach((listing) => {
      const { location, rent } = listing;
      const [longitude, latitude] = location;

      if (rent >= minPrice && rent <= maxPrice) {
        const markerElement = createMarkerElement(rent);
        const popupNode = createPopupNode(listing);

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
        }).setDOMContent(popupNode);

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .addTo(map);

        markerElement.addEventListener("mouseenter", () => {
          marker.setPopup(popup).togglePopup();
        });

        markerElement.addEventListener("mouseleave", () => {
          marker.togglePopup();
        });

        bounds.extend([longitude, latitude]);
        markerCount += 1;
      }
    });

    if (markerCount > 1) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 13 });
    } else if (markerCount === 1) {
      const singleMarkerPosition = bounds.getCenter();
      map.setCenter(singleMarkerPosition);
      map.setZoom(13);
    } else {
      map.setCenter([16.3738, 48.2082]);
      map.setZoom(12);
    }

    return () => map.remove();
  }, [listings, minPrice, maxPrice]);

  return <div ref={mapContainerRef} className={styles.mapContainer} />;
};

export default Map;
