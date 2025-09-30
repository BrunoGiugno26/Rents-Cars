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
import axios from "axios";
import { toast } from "sonner";

export function ModalAddReservation(props: ModalAddReservationProps) {
    const { car } = props
    const [dateSelected, setDateSelected] = useState<[Date | undefined, Date | undefined, number | undefined]>([
        new Date(),
        addDays(new Date(), 5),
        5
    ]);
    const onReserveCar = async (car: Car, dateSelected: DateRange) => {
        const response = await axios.post("/api/checkout",{
            carId: car.id,
            priceDay: car.priceDay,
            startDate: dateSelected.from,
            endDate:dateSelected.to,
            carName: car.name,
        })

        window.location = response.data.url
        toast.success("Car Reserved 👌",)
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
                    <AlertDialogTitle>Select the dates you want to rent the vehicle</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="p-4">
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
