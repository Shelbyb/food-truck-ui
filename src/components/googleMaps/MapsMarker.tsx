import { memo, useId } from 'react';
import { TruckMarker } from '@/types/general';

// A memo-ized component to render a Google Maps marker for a given food truck on a given map
// I could make this more robust to be used for more than trucks, this is fine for now
export const MapsMarker = memo(({ truck, mapRef }: TruckMarker): JSX.Element => {
  const infoWindow = new window.google.maps.InfoWindow();

  const windowContent = `<div style="text-align: center">${truck.applicant}</div>`
      + `<div>${truck?.dayshours ? truck?.dayshours : ''} </div>`
      + `<div><strong>Food Type: </strong></strong>${truck.fooditems}</div>`;

  // Add the actual maps marker to the map
  const marker = new window.google.maps.Marker({
    position: { lat: parseFloat(truck?.latitude), lng: parseFloat(truck?.longitude) },
    map: mapRef.current,
    title: windowContent,
  });

  // Add a listener to the marker that opens the info box about the food truck
  marker.addListener('click', () => {
    infoWindow.close();
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(marker.getMap(), marker);
  });

  return <div key={useId()} />;
});
