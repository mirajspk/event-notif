import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select.jsx';
import { Button } from './button.jsx'; // Assuming you have a Button component from shadcn/ui
import { Popover, PopoverTrigger, PopoverContent } from './popover.jsx'; // Assuming you have a Popover component from shadcn/ui
import { Clock } from 'lucide-react'; // For the time icon

const TimePicker = ({ onTimeChange, disabled, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAmPm, setSelectedAmPm] = useState('');

  // Generate time options with 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour}:${minute === 0 ? '00' : minute}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const amPmOptions = ['AM', 'PM'];

  // Handle time selection
  const handleTimeChange = (value) => {
    setSelectedTime(value);
    if (selectedAmPm) {
      onTimeChange(`${value} ${selectedAmPm}`); // Pass the selected time and AM/PM to the parent
      setIsOpen(false); // Close the popup
    }
  };

  // Handle AM/PM selection
  const handleAmPmChange = (value) => {
    setSelectedAmPm(value);
    if (selectedTime) {
      onTimeChange(`${selectedTime} ${value}`); // Pass the selected time and AM/PM to the parent
      setIsOpen(false); // Close the popup
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 w-full ${className}`} // Ensure full width
          disabled={disabled}
        >
          <Clock className="h-4 w-4 text-muted-foreground" /> {/* Time icon */}
          <span className="flex-1 text-left ml-1">
            {selectedTime && selectedAmPm ? `${selectedTime} ${selectedAmPm}` : <span className='text-muted-foreground'>Pick a time</span>}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-4"> {/* Match the width of the trigger */}
        <div className="flex gap-2"> {/* Side-by-side selects */}
          {/* Time Select */}
          <Select onValueChange={handleTimeChange} value={selectedTime}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="1:00" /> {/* Default placeholder */}
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time, index) => (
                <SelectItem key={index} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* AM/PM Select */}
          <Select onValueChange={handleAmPmChange} value={selectedAmPm}>
            <SelectTrigger className="w-[100px]"> {/* Fixed width for AM/PM select */}
              <SelectValue placeholder="AM" /> {/* Default placeholder */}
            </SelectTrigger>
            <SelectContent>
              {amPmOptions.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;
