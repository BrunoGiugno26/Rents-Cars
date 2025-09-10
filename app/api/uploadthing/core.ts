import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  console.log("👉 Clerk userId en handleAuth:", userId);

  // Si no hay un usuario autenticado, devolvemos un objeto vacío
  // en lugar de arrojar un error. Esto permite que el webhook pase.
  if (!userId) {
    return {};
  }
  return { userId };
};

export const ourFileRouter = {
  photo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
