import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import ListingCard from '../ListingCard'; // Ensure this path is correct

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ listings, minPrice, maxPrice }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.3738, 48.2082],
      zoom: 12,
    });

    const bounds = new mapboxgl.LngLatBounds();
    let markerCount = 0;

    listings.forEach((listing) => {
      const { location, rent } = listing;
      const [longitude, latitude] = location;

      if (rent >= minPrice && rent <= maxPrice) {
        // Create marker element with price label
        const markerElement = document.createElement('div');
        markerElement.className = 'price-marker';
        markerElement.innerText = `$${rent}`;
        markerElement.style.backgroundColor = '#ff4757';
        markerElement.style.color = '#fff';
        markerElement.style.padding = '5px';
        markerElement.style.borderRadius = '5px';
        markerElement.style.fontWeight = 'bold';
        markerElement.style.padding = '12px';
        markerElement.style.width = 'max-content';
        markerElement.style.cursor = 'pointer';

        // Create a container for the popup to render the React component into
        const popupNode = document.createElement('div');

        // Use ReactDOM to render the ListingCard into the popupNode
        const root = createRoot(popupNode);
        root.render(<ListingCard listing={listing} visible={false}/>);

        // Create popup with the ListingCard as content
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
        }).setDOMContent(popupNode); // Use setDOMContent to add the React component

        // Create and add marker to the map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .addTo(map);

        // Show popup on hover
        markerElement.addEventListener('mouseenter', () => {
          marker.setPopup(popup).togglePopup();
        });

        // Hide popup when mouse leaves
        markerElement.addEventListener('mouseleave', () => {
          marker.togglePopup();
        });

        bounds.extend([longitude, latitude]);
        markerCount += 1;
      }
    });

    // Set map view based on marker count
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

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
