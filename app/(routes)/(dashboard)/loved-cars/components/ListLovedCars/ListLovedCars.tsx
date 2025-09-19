"use client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { Car } from "@prisma/client";
import { Fuel, GaugeCircle, Gem, Heart, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { Button } from "@/components/ui/button";

export function ListLovedCars() {
  const { addLoveItem, lovedItems, removedLovedItem } = useLovedCars();

  return (
    <>
      {/* Contenedor principal de la sección */}
      <div className="p-6 md:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 ">
          🖤 Favourite cars 🖤
        </h2>

        {lovedItems.length === 0 ? (
          <p className="text-gray-600 text-lg">
            You don't have any cars yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lovedItems.map((car: Car) => {
              const {
                priceDay,
                photo,
                name,
                transmission,
                people,
                engine,
                cv,
                id,
              } = car;

              const isLoved = lovedItems.some((item) => item.id === car.id);

              const handleLoveClick = () => {
                if (isLoved) {
                  removedLovedItem(car.id);
                } else {
                  addLoveItem(car);
                }
              };

              return (
                <div
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
                  key={id}
                >
                  {/* Contenedor de la imagen */}
                  <div className="relative w-full aspect-video">
                    <Image
                      src={photo}
                      alt={name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Nombre y Precio */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        {name}
                      </h3>
                      <p className="text-xl font-semibold text-gray-900 ml-2 p-2">
                        {priceDay}$
                        <span className="text-sm font-light text-gray-500 ml-1">
                          /Day
                        </span>
                        <hr />
                      </p>
                    </div>

                    {/* Detalles del auto (íconos y texto) */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700 text-sm mb-5 mt-auto">
                      <p className="flex items-center">
                        <Gem className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1} />
                        {car.type}
                      </p>
                      <p className="flex items-center">
                        <Wrench className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1} />
                        {car.transmission}
                      </p>
                      <p className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1} />
                        {car.people} People
                      </p>
                      <p className="flex items-center">
                        <Fuel className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1} />
                        {car.engine}
                      </p>
                      <p className="flex items-center">
                        <GaugeCircle className="w-4 h-4 mr-2 text-gray-500" strokeWidth={1} />
                        {car.cv} CV
                      </p>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <ModalAddReservation car={car} />
                      <Button
                        variant="ghost"
                        className="p-0 h-auto w-auto"
                        onClick={handleLoveClick}
                      >
                        <Heart
                          className={`w-7 h-7 mt-2 ml-4 cursor-pointer transition-colors duration-200 
                            ${isLoved ? 'text-white fill-black' : 'text-gray-400 hover:text-red-500'}
                          `}
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
