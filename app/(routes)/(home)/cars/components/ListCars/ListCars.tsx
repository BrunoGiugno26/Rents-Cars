"use client";

import { Button } from "@/components/ui/button";
import { CircleGaugeIcon, Fuel, Gem, Heart, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth } from "@clerk/nextjs";
import { Car } from "@prisma/client";
import Link from "next/link";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import { ListCarsProps } from "./ListCars.types";
import { SkeletonCars } from "@/components/Shared/SkeletonCars";

export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { userId } = useAuth();
  const { addLoveItem, lovedItems, removedLovedItem } = useLovedCars();

  if (!cars) {
    return <SkeletonCars/>
  }

  return (
    <>
      {cars.length === 0 && <p>No vehicles found with these filters</p>}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 lg:grid-cols-4">
        {cars.map((car: Car) => {
          const {
            priceDay,
            photo,
            name,
            type,
            transmission,
            people,
            engine,
            cv,
            id,
          } = car;
          const likedCar = lovedItems.some((item) => item.id === car.id);

          const handleLoveClick = () => {
            if (likedCar) {
              removedLovedItem(car.id);
            } else {
              addLoveItem(car);
            }
          };

          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
              <div className="relative w-full h-48 bg-white">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  className="object-contain rounded-sm"
                />
              </div>
              <div className="p-3 flex flex-col">
                <div className="mb-4">
                  <p className="text-xl min-h-16 lg:min-h-fit font-semibold">
                    {name}
                  </p>
                  <p className="text-lg font-light ml-auto">{priceDay}$ /Day</p>
                </div>
                <hr />
                <div className="grid grid-cols-2">
                  <p className="flex items-center">
                    <Gem className=" w-4 h-4 mr-2" strokeWidth={1} />
                    {type}
                  </p>
                  <p className="flex items-center">
                    <Wrench className=" w-4 h-4 mr-2" strokeWidth={1} />
                    {transmission}
                  </p>
                  <p className="flex items-center">
                    <Users className=" w-4 h-4 mr-2" strokeWidth={1} />
                    {people}
                  </p>
                  <p className="flex items-center">
                    <Fuel className=" w-4 h-4 mr-2" strokeWidth={1} />
                    {engine}
                  </p>
                  <p className="flex items-center">
                    <CircleGaugeIcon
                      className=" w-4 h-4 mr-2"
                      strokeWidth={1}
                    />
                    {cv}
                  </p>
                </div>

                {userId ? (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <ModalAddReservation car={car} />
                    <Button
                      variant="ghost"
                      className="p-0 h-auto w-auto"
                      onClick={handleLoveClick}
                    >
                      <Heart
                        className={`w-7 h-7 mt-2 ml-4 cursor-pointer transition-colors duration-200 
                          ${likedCar ? 'fill-black' : 'text-gray-400 hover:text-red-500'}
                        `}
                        strokeWidth={1.5}
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">
                        Please register for make a reservation
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
