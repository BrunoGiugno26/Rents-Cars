// En tu archivo ButtonEditCar.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { FormEditCar } from "../FormEditCar";
import { ButtonEditCartProps } from "./ButtonEditCar.types";

export function ButtonEditCar(props: ButtonEditCartProps) {
  const { carData } = props;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenDialog(true)}>
          Edit
          <Pencil className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      {/* CORRECCIÓN 1: Quita el 'overflow-y-auto' de aquí */}
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Edit Car</DialogTitle>
          <DialogDescription>
            Complete this form to edit the car.
          </DialogDescription>
        </DialogHeader>
        {/*
          CORRECCIÓN 2 (Opcional): Si necesitas scroll, envuelve el formulario
          en un div con la clase de desplazamiento.
          <div className="overflow-y-auto h-[400px]">
            <FormEditCar setOpenDialog={setOpenDialog} carData={carData} />
          </div>
        */}
        <FormEditCar setOpenDialog={setOpenDialog} carData={carData} />
      </DialogContent>
    </Dialog>
  );
}
