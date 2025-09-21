import { Navbar } from "@/components/Shared/Navbar";
import { FirstBlock } from "./components/FirstBlock";
import { SliderBrands } from "./components/SliderBrands";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <FirstBlock/>
      <SliderBrands/>
    </div>
  );
}
