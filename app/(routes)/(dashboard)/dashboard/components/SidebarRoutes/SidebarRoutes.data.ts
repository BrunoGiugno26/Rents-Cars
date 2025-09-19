import { Calendar, Car, FolderKanban, Heart, Wrench } from "lucide-react"

export const dataGeneralSlidebar = [
    {
        icon:Car,
        label:"Cars",
        href:"/dashboard"
    },
    {
        icon:Calendar,
        label:"Cars Reserves",
        href:"/reserves"
    },
    {
        icon:Heart,
        label:"Loved Cars",
        href:"/loved-cars"
    }
]

export const dataAdminSlidebar = [
    {
        icon:Wrench,
        label:"Manage your cars",
        href: "/dashboard/admin/cars-manager",
    },
    {
        icon:FolderKanban,
        label:"All reserves",
        href: "/dashboard/admin/reserves-admin",
    },
];