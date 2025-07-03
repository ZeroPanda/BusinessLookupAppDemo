'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import React, { useEffect } from 'react';

interface Business {
  id: number;
  name: string;
  coords: LatLngExpression;
}

interface ExploreMapProps {
  businesses: Business[];
  selectedBusiness: Business | null;
}

const ChangeView = ({ center, zoom }: { center: LatLngExpression; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export const ExploreMap = ({ businesses, selectedBusiness }: ExploreMapProps) => {
  const defaultPosition: LatLngExpression = [37.7749, -122.4194];
  const defaultZoom = 13;

  return (
    <MapContainer
      center={defaultPosition}
      zoom={defaultZoom}
      scrollWheelZoom={false}
      className="h-full w-full z-0"
    >
      <ChangeView center={selectedBusiness?.coords || defaultPosition} zoom={selectedBusiness ? 15 : defaultZoom} />
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
