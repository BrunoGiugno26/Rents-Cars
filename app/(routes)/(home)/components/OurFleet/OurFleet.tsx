import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  categoryOurFleet,
  dataFirstBlockOutFleet,
  dataSecondBlockOutFleet,
} from "./OurFleet.data";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OurFleet() {
  return (
    <div className="max-w-6xl mx-auto text-center py-12 md:py-40 p-6">
      <h3 className="text-2xl md:text-6xl font-bold">Our Vehicle Feet</h3>
      <p className="text-lg mt-2 lg:mt-5 lg:text-xl text-center w-full mx-auto max-auto max-w-2xl mb-5 lg:mb.10">
        Don't deny yourself pleasure of driving the best premium cars from
        around the world here now the world
      </p>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center justify-center mb-5 max-w-2xl mx-auto">
        {categoryOurFleet.map(({ name, active }) => (
          <div
            key={name}
            className={cn(
              "rounded-sm py-2 px-3 mt-2",
              active ? "bg-black text-white" : "bg-slate-100"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="mb-10 mt-24">
        {/* Aquí la primera cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {dataFirstBlockOutFleet.map(({ url }) => (
            <div key={url} className="relative h-64">
              <Image
                src={url}
                alt="Car"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
        {/* Y aquí la segunda cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          {dataSecondBlockOutFleet.map(({ url }, index) => (
            <div
              key={url}
              className={cn(
                "relative h-64",
                index === 0 && "md:col-span-2 md:row-span-2 md:h-72",
                index === 5 && "md:col-span-2 md:row-span-2 md:h-72"
              )}
            >
              <Image
                src={url}
                alt="Car"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-center">
        <Link href={"/cars"} className="flex items-center justify-center">
          <Button
            asChild
            className="rounded-xl p-6 text-lg bg-cyan-700 text-white hover:bg-cyan-400"
            variant={"outline"}
          >
            <div className="flex items-center">
              Show all models
              <MoveRight className="ml-2" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
