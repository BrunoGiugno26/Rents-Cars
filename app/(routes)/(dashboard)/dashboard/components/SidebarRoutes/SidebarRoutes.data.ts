import { Calendar, Car, FolderKanban, Heart, Wrench,HomeIcon } from "lucide-react"

export const dataGeneralSlidebar = [
    {
        icon:HomeIcon,
        label:"Home",
        href:"/"
    },
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