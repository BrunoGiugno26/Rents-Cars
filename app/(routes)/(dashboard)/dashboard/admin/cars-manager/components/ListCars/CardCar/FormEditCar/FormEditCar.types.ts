import { Car } from "@prisma/client"
import { Dispatch, SetStateAction } from "react";

export type FormEditCarProprs = {
    carData: Car;
    setOpenDialog: Dispatch<SetStateAction<boolean>>;
}