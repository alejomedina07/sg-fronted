import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SgTimePickerProps {
  selectedTime: Date;
  onChange: (time: Date) => void;
}

export const SgTimePicker = (props: SgTimePickerProps) => {
  const { selectedTime, onChange } = props;
  const [startDate, setStartDate] = useState(selectedTime);

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onChange(date);
    }
  };

  return (
    <span className="flex-1 !m-3 border rounded border-gray-300 pr-3 p-2">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
    </span>
  );
};
