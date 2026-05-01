import React from 'react';
import { Doctor } from '../../types';
import { Card, CardContent } from '../card';
import { Badge } from '../badge';
import { Button } from '../button';
import { Star, Clock, Navigation, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface DentistCardProps {
  doctor: Doctor;
  distance?: string;
  travelTime?: string;
  isSelected?: boolean;
  onClick: () => void;
}

export const DentistCard: React.FC<DentistCardProps> = ({ 
  doctor, 
  distance, 
  travelTime, 
  isSelected,
  onClick 
}) => {
  const handleGetDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${doctor.coordinates.lat},${doctor.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <Card className={`overflow-hidden border-none transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-100' : 'shadow-sm hover:shadow-md'
      }`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
              <img 
                src={doctor.avatar} 
                alt={doctor.name} 
                className="h-full w-full object-cover" 
              />
            </div>
            
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 line-clamp-1">{doctor.name}</h4>
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-none px-1.5 py-0">
                    <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                    {doctor.rating}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">{doctor.specialization}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {doctor.clinicName}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                {distance && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-600">
                    <Navigation className="w-3 h-3" />
                    {distance}
                  </div>
                )}
                {travelTime && (
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                    <Clock className="w-3 h-3" />
                    {travelTime}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
            <div className="text-[10px] text-slate-500">
              <span className="font-medium">Available: </span>
              {doctor.timings}
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="h-8 rounded-full border-blue-100 text-blue-600 hover:bg-blue-50 text-xs px-3"
              onClick={handleGetDirections}
            >
              Get Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
