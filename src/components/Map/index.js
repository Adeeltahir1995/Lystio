import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './index.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ listings, minPrice, maxPrice, onHoverListing }) => {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // To store markers for cleanup

  useEffect(() => {
    // Initialize the Mapbox map instance
    mapInstance.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.3738, 48.2082],
      zoom: 12,
    });

    // Clean up on unmount
    return () => mapInstance.current.remove();
  }, []);

  useEffect(() => {
    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Set bounds to fit all markers within the map
    const bounds = new mapboxgl.LngLatBounds();

    listings.forEach((listing) => {
      const { location, rent, title } = listing;
      const [longitude, latitude] = location;

      if (rent >= minPrice && rent <= maxPrice) {
        const markerElement = document.createElement('div');
        markerElement.className = 'price-marker';
        markerElement.innerText = `$${rent}`;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${title}: $${rent}`))
          .addTo(mapInstance.current);

        // Add to markers array for cleanup later
        markersRef.current.push(marker);

        // Extend bounds to include this marker's location
        bounds.extend([longitude, latitude]);

        // Set up hover event for preview card
        markerElement.addEventListener('mouseenter', () => onHoverListing(listing));
        markerElement.addEventListener('mouseleave', () => onHoverListing(null));
      }
    });

    // Fit map to bounds if there are markers within the range
    if (!bounds.isEmpty()) {
      mapInstance.current.fitBounds(bounds, { padding: 50 });
    }
  }, [listings, minPrice, maxPrice, onHoverListing]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
