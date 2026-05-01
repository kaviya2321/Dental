import React, { useState, useEffect } from 'react';
import { Doctor } from '../../types';
import { MapComponent } from './MapComponent';
import { DentistList } from './DentistList';
import { AlertCircle, MapPin, Navigation } from 'lucide-react';
import { Button } from '../button';
import { motion, AnimatePresence } from 'motion/react';

interface LocationFeatureProps {
  doctors: Doctor[];
  onBack: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const LocationFeature: React.FC<LocationFeatureProps> = ({ doctors, onBack, onSelectDoctor }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();
  const [distances, setDistances] = useState<Record<string, string>>({});
  const [travelTimes, setTravelTimes] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  const requestLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(coords);
        setIsLocating(false);
        calculateDistances(coords);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Please enable location access to find nearby dentists.');
        } else {
          setLocationError('Unable to retrieve your location');
        }
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const calculateDistances = (origin: { lat: number; lng: number }) => {
    if (!apiKey || !window.google) return;

    const service = new google.maps.DistanceMatrixService();
    const destinations = doctors.map(d => d.coordinates);

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: destinations,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response) {
          const results = response.rows[0].elements;
          const newDistances: Record<string, string> = {};
          const newTravelTimes: Record<string, string> = {};

          results.forEach((result, index) => {
            if (result.status === 'OK') {
              const docId = doctors[index].id;
              newDistances[docId] = result.distance.text;
              newTravelTimes[docId] = result.duration.text;
            }
          });

          setDistances(newDistances);
          setTravelTimes(newTravelTimes);
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Map Section - Top 40% */}
      <div className="relative h-[40%] w-full overflow-hidden shadow-md z-10">
        <MapComponent 
          apiKey={apiKey}
          userLocation={userLocation}
          doctors={doctors}
          selectedDoctorId={selectedDoctorId}
          onDoctorSelect={setSelectedDoctorId}
        />
        
        {/* Permission Overlay */}
        <AnimatePresence>
          {locationError && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-100/90 p-6 text-center backdrop-blur-sm"
            >
              <AlertCircle className="mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 font-bold text-slate-900">Location Access Required</h3>
              <p className="mb-6 text-sm text-slate-500">{locationError}</p>
              <Button 
                className="rounded-full bg-blue-600 px-8"
                onClick={requestLocation}
                disabled={isLocating}
              >
                {isLocating ? 'Locating...' : 'Enable Location'}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button Overlay */}
        <Button 
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 z-30 rounded-full shadow-lg bg-white/90 backdrop-blur-md"
          onClick={onBack}
        >
          <Navigation className="h-4 w-4 rotate-270" />
        </Button>
      </div>

      {/* List Section - Bottom 60% */}
      <div className="flex-1 overflow-hidden">
        <DentistList 
          doctors={doctors}
          distances={distances}
          travelTimes={travelTimes}
          selectedDoctorId={selectedDoctorId}
          onDoctorSelect={setSelectedDoctorId}
          onViewProfile={onSelectDoctor}
        />
      </div>
    </div>
  );
};
