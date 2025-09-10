import Image from "next/image";
import Link from "next/link";

export function LogoDashboard() {
  return(
    <Link href="/" className="flex items-center h-20 gap-2 border-b cursor-pointer min-h-20 px-6">
    <Image
    src={"https://ik.imagekit.io/fefgntjox/Captura%20de%20pantalla%202025-09-05%20123734.png?updatedAt=1757086702330"}
    alt="Logo"
    width={80}
    height={80}
    priority
    />
    <h1 className="text-xl font-bold">BrunoCars</h1>
    </Link>
  )
}
