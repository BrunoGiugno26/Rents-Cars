import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function FirstBlock() {
  return (
    <div className="bg-white text-black min-h-screen flex items-center justify-center p-4 lg:p-10">
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-10">
        <Reveal className="p-6 lg:pl-40" position="left">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <span className="text-cyan-700 block">Premium</span>
            Rentals Cars in Argentina
          </h1>

          <p className="mt-6 text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 text-gray-500">
            Don't deny yourself the pleasure of driving the best premium cars
            from around the world, here and now!
          </p>
          <Link href={"/cars"}>
            <Button className="mt-6 px-8 py-3 bg-cyan-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-brand-blue/90 transition-all duration-300 hover:bg-cyan-500 w-full max-w-xs mx-auto lg:mx-0">
              Our Cars
            </Button>
          </Link>
        </Reveal>

        <Reveal className=" flex justify-end" position="right">
          <Image
            src="https://ik.imagekit.io/fefgntjox/Rents-Cars/R.png?updatedAt=1758671115022"
            alt="Rent cars"
            width={800}
            height={600}
            className="rounded-lg"
            priority
          />
        </Reveal>
      </div>
    </div>
  );
}
