// src/components/ModalAddReservation.tsx

"use client"
import { Button } from "@/components/ui/button";
import { ModalAddReservationProps } from "./ModalAddReservation.types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Car } from "@prisma/client";
import { CalendarSelector } from "./CalendarSelector/CalendarSelector";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function ModalAddReservation(props: ModalAddReservationProps) {
    const { car } = props
    const [dateSelected, setDateSelected] = useState<[Date | undefined, Date | undefined, number | undefined]>([
        new Date(),
        addDays(new Date(), 5),
        5
    ]);
    const onReserveCar = async (car: Car, dareSelected: DateRange) => {
        console.log("reserve car")
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"outline"} className="w-full mt-3 bg-black text-white hover:bg-slate-400">
                    Reservar Vehículo
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Selecciona las fechas en las que quieras alquilar el vehículo</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="p-4">
                    {/* Se pasa el precio del auto a CalendarSelector */}
                    <CalendarSelector setDateSelected={setDateSelected} carPriceDay={car.priceDay} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-white bg-black px-4 py-2 border rounded-md">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-white bg-black px-4 py-2 border rounded-md" onClick={() => onReserveCar(car, { from: dateSelected[0], to: dateSelected[1] })}>Reservar vehículo</AlertDialogAction>
                </AlertDialogFooter>
                <AlertDialogDescription />
            </AlertDialogContent>
        </AlertDialog>
    )
}
