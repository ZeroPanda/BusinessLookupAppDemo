'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
import * as React from 'react';
import Map, { Marker, Popup, MapRef } from 'react-map-gl/maplibre';

interface Business {
  id: number;
  name: string;
  coords: [number, number]; // [longitude, latitude]
}

interface ExploreMapProps {
  businesses: Business[];
  selectedBusiness: Business | null;
}

const MAP_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 22
    },
  ],
};


export const ExploreMap = ({ businesses, selectedBusiness }: ExploreMapProps) => {
  const mapRef = React.useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = React.useState<Business | null>(null);
  
  const initialViewState = {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
  };
  
  React.useEffect(() => {
    if (selectedBusiness) {
      mapRef.current?.flyTo({
        center: selectedBusiness.coords,
        zoom: 14,
        duration: 1500,
      });
    }
  }, [selectedBusiness]);

  const markers = React.useMemo(() => businesses.map(biz => (
    <Marker
        key={`marker-${biz.id}`}
        longitude={biz.coords[0]}
        latitude={biz.coords[1]}
        anchor="bottom"
        onClick={e => {
            e.originalEvent.stopPropagation();
            setPopupInfo(biz);
        }}
    >
        <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md cursor-pointer" />
    </Marker>
  )), [businesses]);

  return (
    <Map
        ref={mapRef}
        initialViewState={initialViewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE as any}
        attributionControl={true}
    >
        {markers}

        {popupInfo && (
            <Popup
                anchor="top"
                longitude={Number(popupInfo.coords[0])}
                latitude={Number(popupInfo.coords[1])}
                onClose={() => setPopupInfo(null)}
            >
                <div>{popupInfo.name}</div>
            </Popup>
        )}
    </Map>
  );
};
