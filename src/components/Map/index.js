import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import ListingCard from '../ListingCard';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ listings, minPrice, maxPrice }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [16.3738, 48.2082],
      zoom: 12,
    });

    const bounds = new mapboxgl.LngLatBounds();
    let markerCount = 0;

    listings.forEach((listing) => {
      const { location, rent } = listing;
      const [longitude, latitude] = location;

      if (rent >= minPrice && rent <= maxPrice) {
        const markerElement = document.createElement('div');
        markerElement.className = 'price-marker';
        markerElement.innerText = `€${rent}`;
        
        markerElement.style.width = '76px';
        markerElement.style.height = '35px';
        markerElement.style.borderRadius = '22.5px 0px 0px 0px';
        markerElement.style.opacity = '1';  
        markerElement.style.backgroundColor = '#ffffff'; 
        markerElement.style.color = '#000000';
        markerElement.style.fontFamily = 'Alliance No.1';
        markerElement.style.fontSize = '15px';
        markerElement.style.fontWeight = '500';
        markerElement.style.lineHeight = '22.5px';
        markerElement.style.textAlign = 'left';
        markerElement.style.display = 'flex';
        markerElement.style.alignItems = 'center';
        markerElement.style.justifyContent = 'center';
        markerElement.style.cursor = 'pointer';
        markerElement.style.position = 'relative';

        const popupNode = document.createElement('div');
        popupNode.style.position = 'absolute';
        popupNode.style.transform = 'translate(-80%, -70%)';

        const root = createRoot(popupNode);
        root.render(<ListingCard listing={listing} visible={false} />);

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false,
        }).setDOMContent(popupNode);

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([longitude, latitude])
          .addTo(map);

        markerElement.addEventListener('mouseenter', () => {
          marker.setPopup(popup).togglePopup();
        });

        markerElement.addEventListener('mouseleave', () => {
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

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Map;
