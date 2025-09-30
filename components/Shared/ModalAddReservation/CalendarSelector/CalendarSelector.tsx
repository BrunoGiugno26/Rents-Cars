// src/components/CalendarSelector/CalendarSelector.tsx
"use client";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarSelectorProps } from "./CalendarSelector.types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CalendarSelector(props: CalendarSelectorProps) {
  const { setDateSelected, className, carPriceDay } = props;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  // Estado para controlar el número de meses
  const [numberOfMonths, setNumberOfMonths] = useState(2);

  // Efecto para actualizar el número de meses según el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      // Si la pantalla es menor a 768px (tamaño "md" en Tailwind), muestra solo un mes.
      if (window.innerWidth < 768) {
        setNumberOfMonths(1);
      } else {
        setNumberOfMonths(2);
      }
    };

    // Llama a la función al cargar el componente
    handleResize();
    // Añade el evento para que se actualice al cambiar el tamaño de la ventana
    window.addEventListener("resize", handleResize);
    // Limpia el evento cuando el componente se desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cálculo de los días y actualización del estado en el componente padre
  useEffect(() => {
    const daysBetween =
      date?.from && date?.to
        ? Math.round(
            (date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)
          )
        : 0;
    
    const totalDays = daysBetween + 1;

    setDateSelected([date?.from, date?.to, totalDays]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const daysBetween =
    date?.from && date?.to ? Math.round((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalDays = daysBetween + 1;
  const price = totalDays * Number(carPriceDay);

  return (
    <>
      <div className={cn("grid gap-2", className)}
      translate="no"
      >
        <p className="mt-4 text-lg text-black">
          Dias totales {totalDays}
        </p>
        <p className="mb-4 text-md">
          Precio total: {price} $ (Tax.Includes)
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-auto p-0 z-[99]" 
            align="end"
          >
            <Calendar
              autoFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={numberOfMonths}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
