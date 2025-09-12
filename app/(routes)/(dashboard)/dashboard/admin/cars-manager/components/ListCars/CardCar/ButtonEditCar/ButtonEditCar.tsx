"use client";
import { Button } from "@/components/ui/button";
import { ButtonEditCartProps } from "./ButtonEditCar.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FormEditCar } from "../FormEditCar";

export function ButtonEditCar(props: ButtonEditCartProps) {
  const { carData } = props;
const [openDialog, setopenDialog] = useState(false)
  return(
    <Dialog open ={openDialog} onOpenChange={setopenDialog}>
        <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setopenDialog(true)}>
                Edit
                <Pencil className="w-4 h-4 ml-2"/>
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
            <DialogHeader>
                <DialogDescription>
                    <FormEditCar setOpenDialog ={setopenDialog} carData ={carData}/>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  );
}
