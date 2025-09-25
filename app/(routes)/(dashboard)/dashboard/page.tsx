import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { ListCars } from "./components/ListCars";
import { isAdministrator } from "@/lib/isAdministrator";


export default async function DashboardPage() {
  const {userId} = auth()

  if(!userId){
    return redirect("/")
  }

  const cars = await db.car.findMany({
    where:{
      isPublish:true
    },
    orderBy:{
      created:"desc"
    }
  })

  return (
    <div>
        <div className="flex justify-between">
            <h2 className="text-2xl items-center font-bold p-5">List of cars</h2>
        </div>
        <ListCars cars={cars}/>
    </div>
  );
}
