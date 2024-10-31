import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ listings, minPrice, maxPrice }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.3738, 48.2082], // Centered around Vienna for example
      zoom: 12,
    });

    // Set up bounds to adjust the map view for all markers
    const bounds = new mapboxgl.LngLatBounds();

    listings.forEach((listing) => {
      const { location, rent, title, media } = listing;
      const [longitude, latitude] = location;

      if (rent >= minPrice && rent <= maxPrice) {
        // Create a custom marker element with the price label
        const markerElement = document.createElement('div');
        markerElement.className = 'price-marker';
        markerElement.innerText = `$${rent}`;
        markerElement.style.backgroundColor = '#ff4757'; // Customize the color
        markerElement.style.color = '#fff';
        markerElement.style.padding = '5px';
        markerElement.style.borderRadius = '5px';
        markerElement.style.fontWeight = 'bold';
        markerElement.style.padding = '12px';
        markerElement.style.width='max-content'


        // Use the first image from media array for the popup
        const imageUrl = media && media[0] ? media[0].cdnUrl : '';

        // Add the marker to the map
        new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="text-align: center;">
              <img src="${imageUrl}" alt="${title}" style="width: 100px; height: auto; border-radius: 8px; margin-bottom: 5px;" />
              <h4>${title}</h4>
              <p>Price: $${rent}</p>
            </div>
          `)) // Display title and image in popup
          .addTo(map);

        bounds.extend([longitude, latitude]);
      }
    });

    // Fit the map to the bounds of the markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50 });
    }

    // Cleanup on unmount
    return () => map.remove();
  }, [listings, minPrice, maxPrice]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
