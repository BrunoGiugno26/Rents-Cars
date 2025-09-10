"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { FormAddCar } from "../FormAddCar";

export function ButtonAddCar() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpenDialog(true)}>
          Add new car
          <PlusCircle className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="bg-white overflow-y-auto" // Elimina la restricción de altura aquí
      >
        <DialogHeader>
          <DialogTitle>Add a new car</DialogTitle>
          <DialogDescription>
            Complete this form to add a new car to the list
          </DialogDescription>
        </DialogHeader>
        <FormAddCar />
      </DialogContent>
    </Dialog>
  );
}
