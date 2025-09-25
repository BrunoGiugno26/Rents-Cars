import Image from "next/image";
import Link from "next/link";

export function LogoDashboard() {
  return(
    <Link href="/" className="flex items-center h-20 gap-2 border-b cursor-pointer min-h-20 px-6">
    <Image
    src={"https://ik.imagekit.io/fefgntjox/Rents-Cars/untitled-0.png?updatedAt=1758552652106"}
    alt="Logo"
    width={80}
    height={80}
    priority
    />
    <h1 className="text-xl font-bold">BrunoCars</h1>
    </Link>
  )
}
