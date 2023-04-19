import React, {
  useEffect, useRef, useState,
} from 'react';
import { MapsMarker } from '@/components/googleMaps/MapsMarker';
import { Error } from '@/components/Error';
import { ApiResponse, GoogleMapInDocumentType, Truck } from '@/types/general';

const zoom = 14;

export interface Location {
  lat: number;
  lng: number;
}

export interface CurrentLocation {
  currentPosition: Location;
}

export const GoogleMaps = (): JSX.Element => {
  const mapRef = useRef<GoogleMapInDocumentType | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [currentMap, setMap] = useState<GoogleMapInDocumentType>();
  const [currentUserLocation, setCurrentUserLocation] = useState<CurrentLocation>({ currentPosition: { lat: 37.779, lng: -122.419 } });
  const [foodTrucks, setFoodTrucks] = useState<Truck[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  try {
    navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng };

      // If the location we get from the geolocation service is different, update the user location
      if (lat !== currentUserLocation.currentPosition.lat || lng !== currentUserLocation.currentPosition.lng) {
        setCurrentUserLocation({ currentPosition: pos });
      }
    });
  } catch (e) {
    // This error would need to prompt the user for GPS permissions
    console.error('error getting user location: ', e);
  }

  // No dependencies needed as we're just doing the initial setup
  useEffect(() => {
    // We can only set a DOM object that has already been created
    if (ref?.current) {
      // save our Maps object as a ref since we need it if we want to make any changes to the map, i.e. markers
      mapRef.current = new window.google.maps.Map(ref.current as HTMLElement, {
        center: {
          lat: currentUserLocation.currentPosition.lat,
          lng: currentUserLocation.currentPosition.lng,
        },
        zoom,
      });

      // This bit of code just shows the "you are here" icon and white bubble on the map
      const infoWindow = new window.google.maps.InfoWindow();

      const marker: google.maps.Marker = new window.google.maps.Marker({
        position: mapRef.current?.getCenter(),
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
        },
        draggable: false,
        map: mapRef.current,
      });

      infoWindow.setPosition({
        lat: currentUserLocation.currentPosition.lat,
        lng: currentUserLocation.currentPosition.lng,
      });
      infoWindow.setContent('You are here');
      infoWindow.open({ anchor: marker, map: mapRef.current });

      setMap(mapRef.current);
    }
    // On occasion the client gets the user's location before the map is loaded, so I'm
    // keeping the current user location as a dependency
  }, [currentUserLocation]);

  // Update the map center if the location changes after initial load (actual user location vs initial state)
  useEffect(() => {
    currentMap?.setCenter({
      lat: currentUserLocation.currentPosition.lat,
      lng: currentUserLocation.currentPosition.lng,
    });
    currentMap?.setZoom(7);

    // We update the state to cause a re-render showing the updated location
    setMap(currentMap);
  }, [currentUserLocation]);

  useEffect(() => {
    const fetchTrucks = async () => {
      const response = await fetch('http://localhost:3001/api/trucks', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch((rejected) => {
        // Show an alert on the screen if the API throws an error
        setIsOpen(true);
        console.error('error fetching data from the API: ', rejected);
      });
      const jsonData: ApiResponse = await response?.json();

      setFoodTrucks(jsonData?.data);
    };

    fetchTrucks();
  }, []);
  return (
    <div
      id="__next"
    >
      <Error isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        id="map"
        ref={ref}
      />
      { foodTrucks?.map((truck, index) => (<MapsMarker key={index} truck={truck} mapRef={mapRef} />))}
    </div>
  );
};
