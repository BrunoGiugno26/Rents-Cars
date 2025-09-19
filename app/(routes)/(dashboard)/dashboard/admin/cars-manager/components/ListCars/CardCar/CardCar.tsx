"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fuel, GaugeCircle, Gem, Trash, Upload, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CardCarProps } from "./CardCar.types";
import { ButtonEditCar } from "./ButtonEditCar";
import axios from "axios";

export function CardCar(props: CardCarProps) {
  const { car } = props;
  const router = useRouter()

  const deleteCar = async() => {
    try{
      await axios.delete(`/api/car/${car.id}`)
      toast.success("Car Deleted 🫡|❌|🫡",{
        description:"Car Deleted Succsesfully"
      })
      router.refresh();
    }catch (error){
      toast.error("Something Went Wrong",{
        description:"Please Try Again"
      })
    }
  }

  const handlerPublishCar = async(publish:boolean) =>{
    try{
      await axios.patch(`/api/car/${car.id}`,{isPublish:publish})
      if(publish){

        toast.success("Car Published 👌👌",{
          description:"Car Published Successfully",
          className: "font-bold text-base px-6 py-4 min-w-[300px]",
        style: { fontSize: "1rem" }
        })
      } else {
        toast.error("Car Unpublish ⚠️",{
          description:"Car Unpublish Succesfully",
          className: "font-bold text-base px-6 py-4 min-w-[300px]",
        style: { fontSize: "1rem" }
        })
      }
      router.refresh();
    }catch(error){
      toast.error("Something Went Wrong",{
        description:"Please Try Again",
        className: "font-bold text-base px-6 py-4 min-w-[300px]",
        style: { fontSize: "1rem" }
      })
    }
  }
  return (
    <div className="relative pt-8 bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden">
      {/* Banner de estado */}
      {car.isPublish ? (
        <p className="absolute top-0 right-0 w-full p-1 text-center text-white bg-green-400 z-10">
          Published
        </p>
      ) : (
        <p className="absolute top-0 left-0 right-0 w-full p-1 text-center text-white bg-red-400 z-10">
          Not Published
        </p>
      )}

      {/* Contenedor de la imagen con relación de aspecto fija */}
      <div className="relative w-full aspect-video bg-white">
        <Image
          src={car.photo}
          alt={car.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="p-4">

        <h3 className="text-lg font-semibold">{car.name}</h3>
        <p className="mt-1">{car.priceDay}$/ Dia</p> 
      </div>

      <div className="grid md:grid-cols-2 gap-x-4 px-4">
        <p className="flex items-center">
          <Gem className="h-4 w-4 mr-2" strokeWidth={1} />
          {car.type}
        </p>
        <p className="flex items-center">
          <Wrench className="h-4 w-4 mr-2" strokeWidth={1} />
          {car.transmission}
        </p>
        <p className="flex items-center">
          <Users className="h-4 w-4 mr-2" strokeWidth={1} />
          {car.people}
        </p>
        <p className="flex items-center">
          <Fuel className="h-4 w-4 mr-2" strokeWidth={1} />
          {car.engine}
        </p>
        <p className="flex items-center">
          <GaugeCircle className="h-4 w-4 mr-2" strokeWidth={1} />
          {car.cv} CV
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-4 p-4">
        {/* Añadido mt-4, p-4 y flex-col gap-2 */}
        <Button variant="outline" onClick={deleteCar} className="hover:bg-slate-100">
          Delete
          <Trash className="w-4 h-4 ml-2" />
        </Button>
        <ButtonEditCar carData = {car}/>
        {car.isPublish ? (
          <Button
            className="bg-black text-white hover:bg-slate-300 w-full mt-3"
            variant="outline"
            onClick={() => handlerPublishCar(false)}
          >
            Unpublish
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button className="bg-black text-white hover:bg-slate-300 w-full mt-3"
            onClick={() => handlerPublishCar(true)}>Publish
            <Upload className="w-4 h-4 ml-2"/>
            </Button>
        )}
      </div>
    </div>
  );
}
