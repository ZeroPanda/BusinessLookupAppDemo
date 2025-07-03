'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, Map as LeafletMap } from 'leaflet';
import React, { useEffect, useState } from 'react';

interface Business {
  id: number;
  name: string;
  coords: LatLngExpression;
}

interface ExploreMapProps {
  businesses: Business[];
  selectedBusiness: Business | null;
}

export const ExploreMap = ({ businesses, selectedBusiness }: ExploreMapProps) => {
  const defaultPosition: LatLngExpression = [37.7749, -122.4194];
  const defaultZoom = 13;
  const [map, setMap] = useState<LeafletMap | null>(null);

  // This effect handles flying to the selected business.
  useEffect(() => {
    if (map && selectedBusiness) {
      map.flyTo(selectedBusiness.coords, 15);
    }
  }, [selectedBusiness, map]);
  
  // This effect handles cleaning up the map instance when the component unmounts.
  useEffect(() => {
    return () => {
      map?.remove();
    };
  }, [map]);


  return (
    <MapContainer
      center={defaultPosition}
      zoom={defaultZoom}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {businesses.map((biz) => (
        <Marker key={biz.id} position={biz.coords}>
          <Popup>{biz.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
