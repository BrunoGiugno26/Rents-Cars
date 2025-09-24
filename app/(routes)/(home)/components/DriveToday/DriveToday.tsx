import { Reveal } from "@/components/Shared/Reveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export function DriveToday() {
  return (
    <div className="p-6 md:my-32 max-w-7xl mx-auto">
      <div className="bg-[url('https://ik.imagekit.io/fefgntjox/Rents-Cars/textured-black-background-vector.jpg?updatedAt=1758550539308')] bg-center bg-norepeat bg-cover rounded-xl p-6 lg:p-32 relative">
        <div className="lg_flex gap-x-6">
          <div>
            <h3 className="text-4xl text-white">Drive your dream car today</h3>
            <p className="text-white text-xl my-5">
              {" "}
              Register and explore the word of premium cars
            </p>
            <Link href={"/sign-in"}>
              <Button className="bg-white hover:bg-slate-200" variant="outline" size="lg">
                Register here
              </Button>
            </Link>
          </div>
          <Reveal className="md:absolute md:-right-32 top-5" position="down">
            <Image
              src={
                "https://ik.imagekit.io/fefgntjox/Rents-Cars/img-17.png?updatedAt=1758551018881"
              }
              alt="Car Drive"
              width={550}
              height={250}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
