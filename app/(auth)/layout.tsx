import Image from 'next/image';
import React from 'react';

export default function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-2 h-screen items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-full'>
        {children}
      </div>

      <div className='hidden lg:flex lg:bg-[#0f1d3f] h-full justify-center items-center flex-col'>
        <Image 
          className='border-r-black rounded-2xl'
          src={"https://ik.imagekit.io/fefgntjox/Rents-Cars/Gemini_Generated_Image_y006asy006asy006.png?updatedAt=1758376712045"}
          alt='LogoGiugnoCars'
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
