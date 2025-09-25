import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TablesReserves } from "./components/TableReserves";

export default async function pageReserves() {
  const { userId } = auth();

  if(!userId){
    return redirect("/")
  }

  const orders = await db.order.findMany({
    where:{
        userId:userId
    },
    orderBy:{
        createdAt:"desc"
    }
  })

  return <div className="flex-1">
    <h1 className="mb-6 text-3xl font-semibold">Reserves Page</h1>
    {orders.length === 0 ?(
        <div className="felx flex-col justify-center gap-4">
            <h2 className="text-xl">Don't have orders</h2>
            <p>Place your orders through our website!!</p>
            <Link href={"/cars"}>
            <Button className=" mt-6 bg-black text-white ">
                Cars List
            </Button>
            </Link>
        </div>
    ):(
        <TablesReserves orders ={orders}/>
    )}
  </div>
}
