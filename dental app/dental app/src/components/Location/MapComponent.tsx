import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Doctor } from '../../types';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface MapComponentProps {
  apiKey: string;
  userLocation: { lat: number; lng: number } | null;
  doctors: Doctor[];
  selectedDoctorId?: string;
  onDoctorSelect: (id: string) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  apiKey,
  userLocation,
  doctors,
  selectedDoctorId,
  onDoctorSelect
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Effect to re-center map when user location or selected doctor changes
  React.useEffect(() => {
    if (map) {
      if (selectedDoctorId) {
        const doctor = doctors.find(d => d.id === selectedDoctorId);
        if (doctor) {
          map.panTo(doctor.coordinates);
          map.setZoom(14);
        }
      } else if (userLocation) {
        map.panTo(userLocation);
      }
    }
  }, [map, selectedDoctorId, userLocation, doctors]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: 13.0827, lng: 80.2707 }} // Default to Chennai if no user location
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }}
    >
      {userLocation && (
        <Marker 
          position={userLocation}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: 8
          }}
          title="Your Location"
        />
      )}

      {doctors.map(doctor => (
        <Marker
          key={doctor.id}
          position={doctor.coordinates}
          onClick={() => onDoctorSelect(doctor.id)}
          icon={selectedDoctorId === doctor.id ? undefined : {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }}
        />
      ))}

      {selectedDoctor && (
        <InfoWindow
          position={selectedDoctor.coordinates}
          onCloseClick={() => onDoctorSelect('')}
        >
          <div className="p-1">
            <h4 className="font-bold text-xs">{selectedDoctor.name}</h4>
            <p className="text-[10px] text-slate-500">{selectedDoctor.clinicName}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-slate-100">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
};
