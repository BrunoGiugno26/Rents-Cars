import {create} from "zustand"
import {persist,createJSONStorage} from "zustand/middleware"
import { Car } from "@prisma/client"
import { Item } from "@radix-ui/react-select"
import { toast } from "sonner"

interface useLovedCarsType{
    lovedItems : Car[],
    addLoveItem:(data:Car) => void,
    removedLovedItem: (id:string) => void
}

export const useLovedCars = create(
    persist<useLovedCarsType>(
        (set,get) => ({
            lovedItems:[],
            addLoveItem:(data:Car) =>{
                const currentLovedItems = get().lovedItems;
                const existingItem = currentLovedItems.find((Item) => Item.id === data.id)
            

            if(existingItem){
                return toast.error("This Car found in your list❤️")
            }

            set({
                lovedItems:[...get().lovedItems,data]
            })
            
            toast.success("Car added Successfully 🚗")
        },

        removedLovedItem:(id:string) => {
            set({
                lovedItems:[...get().lovedItems.filter((item) => item.id !== id)]
            })
            toast.success("Car Deleted Of List")
        }
    }),
    {
        name:"loved-products-storage",
        storage:createJSONStorage(() => localStorage)
    }
    )
)