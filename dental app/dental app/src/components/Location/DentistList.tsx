import React from 'react';
import { Doctor } from '../../types';
import { DentistCard } from './DentistCard';
import { ScrollArea } from '../scroll-area';

interface DentistListProps {
  doctors: Doctor[];
  distances: Record<string, string>;
  travelTimes: Record<string, string>;
  selectedDoctorId?: string;
  onDoctorSelect: (id: string) => void;
  onViewProfile: (doctor: Doctor) => void;
}

export const DentistList: React.FC<DentistListProps> = ({ 
  doctors, 
  distances, 
  travelTimes,
  selectedDoctorId,
  onDoctorSelect,
  onViewProfile
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="px-5 py-4 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Nearby Clinics</h3>
        <span className="text-xs text-slate-500 font-medium">{doctors.length} results</span>
      </div>
      
      <ScrollArea className="flex-1 px-4 pb-28">
        <div className="space-y-4 pt-1">
          {doctors.map((doc) => (
            <DentistCard 
              key={doc.id}
              doctor={doc}
              distance={distances[doc.id]}
              travelTime={travelTimes[doc.id]}
              isSelected={selectedDoctorId === doc.id}
              onClick={() => {
                onDoctorSelect(doc.id);
                onViewProfile(doc);
              }}
            />
          ))}
          
          {doctors.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-sm font-medium text-slate-600">No dentists found near you.</p>
              <p className="text-xs text-slate-400 mt-1">Try expanding your search area.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
