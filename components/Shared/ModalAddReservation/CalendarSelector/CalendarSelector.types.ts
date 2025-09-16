// src/components/CalendarSelector/CalendarSelector.types.ts
import { DateRange } from "react-day-picker";

export type CalendarSelectorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    setDateSelected: React.Dispatch<React.SetStateAction<[Date | undefined, Date | undefined, number | undefined]>>;
    carPriceDay: string;
};