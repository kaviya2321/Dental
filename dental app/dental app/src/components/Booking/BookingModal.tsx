import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Camera, 
  X, 
  ChevronRight, 
  AlertCircle,
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/dialog';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/select';
import { Calendar as CalendarUI } from '@/components/calendar';
import { Doctor } from '@/types';
import { Badge } from '@/components/badge';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  onConfirm: (booking: {
    date: Date;
    time: string;
    patientName: string;
    patientAge: string;
    patientMobile: string;
    patientGender: string;
    appointmentType: string;
    imageUrl?: string;
  }) => void;
  initialName?: string;
  initialAge?: string;
  initialGender?: string;
  initialMobile?: string;
}

export const BookingModal = ({ 
  isOpen, 
  onClose, 
  doctor,
  onConfirm,
  initialName,
  initialAge,
  initialGender,
  initialMobile
}: BookingModalProps) => {
  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState(initialName || '');
  const [patientAge, setPatientAge] = useState(initialAge || '');
  const [patientMobile, setPatientMobile] = useState(initialMobile || '');
  const [patientGender, setPatientGender] = useState(initialGender || 'Male');
  const [appointmentType, setAppointmentType] = useState('Consultation');
  const [bookingImage, setBookingImage] = useState<string | undefined>(undefined);

  // Sync state if initial props change (e.g. when modal opens with new data)
  React.useEffect(() => {
    if (isOpen) {
      if (initialName) setPatientName(initialName);
      if (initialAge) setPatientAge(initialAge);
      if (initialMobile) setPatientMobile(initialMobile);
      if (initialGender) setPatientGender(initialGender);
    }
  }, [isOpen, initialName, initialAge, initialMobile, initialGender]);

  const timeSlots = doctor.availableSlots && doctor.availableSlots.length > 0 
    ? doctor.availableSlots 
    : ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookingImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!date || !selectedTime || !patientName || !patientAge || !patientMobile) return;
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (!date) return;
    
    onConfirm({
      date,
      time: selectedTime,
      patientName,
      patientAge,
      patientMobile,
      patientGender,
      appointmentType,
      imageUrl: bookingImage,
    });

    // Reset and close
    setStep('form');
    setPatientName('');
    setPatientAge('');
    setPatientMobile('');
    setPatientGender('Male');
    setAppointmentType('Consultation');
    setSelectedTime('');
    setDate(new Date());
    setBookingImage(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{step === 'form' ? 'Book Appointment' : 'Confirm Details'}</DialogTitle>
          <DialogDescription>
            {step === 'form' 
              ? `Select a date and time for your visit with ${doctor.name}.`
              : 'Please review your appointment details before finalizing.'}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2 max-h-[70vh] overflow-y-auto">
          {step === 'form' ? (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <div className="border rounded-2xl p-2 flex justify-center bg-slate-50">
                  <CalendarUI
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    disabled={(d) => d < new Date() || d.getDay() === 0}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label>Patient Details</Label>
                <Input
                  placeholder="Patient full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="h-11 rounded-2xl bg-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Age"
                    type="number"
                    min="1"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="h-11 rounded-2xl bg-white"
                  />
                  <Select value={patientGender} onValueChange={(v) => setPatientGender(v || 'Male')}>
                    <SelectTrigger className="h-11 rounded-2xl bg-white">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Mobile number"
                  value={patientMobile}
                  onChange={(e) => setPatientMobile(e.target.value)}
                  className="h-11 rounded-2xl bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select value={appointmentType} onValueChange={(v) => setAppointmentType(v || 'Consultation')}>
                  <SelectTrigger className="h-11 rounded-2xl bg-white">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Checkup">Checkup</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Root Canal Review">Root Canal Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      type="button"
                      size="sm"
                      className={`rounded-xl text-[10px] ${selectedTime === time ? 'bg-blue-600' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Referral Image / Photo (Optional)</Label>
                {!bookingImage ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-slate-400 mb-2" />
                        <p className="text-xs text-slate-500">Click to upload photo</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </div>
                ) : (
                  <div className="relative group aspect-video w-full rounded-2xl overflow-hidden border border-slate-200">
                    <img src={bookingImage} alt="Uploaded" className="w-full h-full object-cover" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 rounded-full h-8 w-8 scale-90 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setBookingImage(undefined)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-xl border border-blue-100">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Doctor</p>
                  <p className="font-bold text-slate-900">{doctor.name}</p>
                  <p className="text-xs text-slate-500">{doctor.specialization}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                    <p className="text-xs text-slate-500 font-medium">Date</p>
                  </div>
                  <p className="font-bold text-slate-900">{date ? format(date, 'MMM dd, yyyy') : 'N/A'}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <p className="text-xs text-slate-500 font-medium">Time</p>
                  </div>
                  <p className="font-bold text-slate-900">{selectedTime}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-slate-400" />
                      <p className="text-xs text-slate-500 font-medium">Patient</p>
                    </div>
                    <p className="font-bold text-slate-900">{patientName}</p>
                    <p className="text-xs text-slate-500">{patientAge} yrs • {patientGender}</p>
                  </div>
                  <Badge variant="outline" className="bg-white border-slate-200">
                    {appointmentType}
                  </Badge>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 font-medium mb-1">Contact Details</p>
                  <p className="text-sm font-medium">{patientMobile}</p>
                </div>
              </div>

              {bookingImage && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 font-medium">Attached Referral</p>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200">
                    <img src={bookingImage} alt="Referral" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-[10px]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>Please double check your information. Cancellation is possible up to 24h before the appointment.</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
          {step === 'form' ? (
            <Button 
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 h-12 text-md font-bold shadow-lg shadow-blue-200 group" 
              disabled={!date || !selectedTime || !patientName || !patientAge || !patientMobile}
              onClick={handleNext}
            >
              Continue to Review
              <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline"
                className="flex-1 rounded-xl h-12"
                onClick={() => setStep('form')}
              >
                Go Back
              </Button>
              <Button 
                className="flex-[2] rounded-xl bg-blue-600 hover:bg-blue-700 h-12 text-md font-bold shadow-lg shadow-blue-200"
                onClick={handleConfirm}
              >
                Finalize Booking
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
