import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import './index.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ listings, minPrice = 100, maxPrice = 5000, onPolygonDraw }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.3738, 48.2082], // Centered on Vienna
      zoom: 11,
    });

    // Add Mapbox Draw for polygon drawing
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    map.addControl(draw);

    // Handle polygon drawing events
    map.on('draw.create', (e) => {
      const polygon = e.features[0].geometry.coordinates;
      onPolygonDraw(polygon);
    });
    map.on('draw.delete', () => {
      onPolygonDraw(null);
    });

    // Define map bounds to fit all price markers
    const bounds = new mapboxgl.LngLatBounds();

    // Filter listings by price range and add markers
    listings.forEach((listing) => {
      const { rent, location, title } = listing;

      // Check if the listing falls within the specified price range
      if (rent >= minPrice && rent <= maxPrice && location && location.length === 2) {
        const [longitude, latitude] = location;
        bounds.extend([longitude, latitude]);

        // Create a custom marker element with the price label
        const markerElement = document.createElement('div');
        markerElement.className = 'price-marker';
        markerElement.style.backgroundColor = '#ff4757'; // Customize the color
        markerElement.style.color = '#fff';
        markerElement.style.padding = '5px';
        markerElement.style.borderRadius = '5px';
        markerElement.style.fontWeight = 'bold';
        markerElement.innerText = `$${rent}`;

        // Add marker to the map
        new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="text-align: center;">
                <h4>${title}</h4>
                <p>Price: $${rent}</p>
              </div>
            `)
          ) // Attach a popup for additional details
          .addTo(map);
      }
    });

    // Fit the map to the markers within the bounds
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }

    // Cleanup map on component unmount
    return () => map.remove();
  }, [listings, minPrice, maxPrice, onPolygonDraw]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
