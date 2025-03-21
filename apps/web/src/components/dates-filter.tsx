"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";

type Props = {
  startDate?: string;
  endDate?: string;
  setDates?: (dates: Omit<Props, "setDate">) => void;
};

export const DatesFilter: React.FC<Props> = ({ startDate, endDate, setDates }) => {
  const toDayJs = (date?: string) => {
    if (!date) {
      return;
    }
    return dayjs(date);
  };

  return (
    <div>
      <DatePicker.RangePicker
        defaultValue={[toDayJs(startDate), toDayJs(endDate)]}
        onPickerValueChange={([startDate, endDate], info) => {
          setDates?.({ startDate: startDate.toISOString(), endDate: endDate.toISOString() });
        }}
      />
    </div>
  );
};
