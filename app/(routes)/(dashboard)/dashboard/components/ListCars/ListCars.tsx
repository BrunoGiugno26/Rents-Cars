"use client"
import { Car } from "@prisma/client";
import { ListCarsProps } from "./ListCars.types";
import Image from "next/image";
import { Fuel, GaugeCircle, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { useLovedCars } from "@/hooks/use-loved-cars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { addLoveItem,lovedItems,removedLovedItem } = useLovedCars()
  
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {cars.map((car: Car) => {
        const {
          priceDay,
          photo,
          cv,
          engine,
          id,
          people,
          name,
          transmission,
          type,
        } = car;

        const likedCar = lovedItems.some((item) => item.id === car.id);

        return (
          <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
            {/* Contenedor de la imagen con relación de aspecto fija */}
            <div className="relative w-full aspect-video bg-white">
              <Image
                src={photo}
                alt={name}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="p-3">
              <div className="flex flex-col mb-3 gap-x-4 min-h-[50px]">
                <p className="text-xl font-semibold">{name}</p>
                <p className="">{priceDay}$ /dia</p>
              </div>
              <p className="flex items-center">
                <Gem className="h-4 w-4 mr-2" strokeWidth={1} /> {type}
              </p>
              <p className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" strokeWidth={1} /> {transmission}
              </p>
              <p className="flex items-center">
                <Users className="h-4 w-4 mr-2" strokeWidth={1} /> {people}
              </p>
              <p className="flex items-center">
                <Fuel className="h-4 w-4 mr-2" strokeWidth={1} /> {engine}
              </p>
              <p className="flex items-center">
                <GaugeCircle className="h-4 w-4 mr-2" strokeWidth={1} /> {cv} CV
              </p>

              <div className="flex items-center justify-center gap-x-3 mt-6">
                <ModalAddReservation car={car}/>
                <Heart className={`mt-2 cursor-pointer ${likedCar && "fill-black"}`} 
                onClick={ likedCar ? () => removedLovedItem(car.id) : () => addLoveItem(car)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
