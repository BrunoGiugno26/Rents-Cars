import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersCarsProps } from "./FiltersCars.types";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FiltersCars(props: FiltersCarsProps) {
  const { clearFilters, setFilters, filters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="mt-5 mb-8 flex flex-col space-y-2 md:flex-row md:space-y-0 md:gap-5">
      <Select onValueChange={(value) => handleFilter("type", value)} value={filters.type}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type of cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white text-black">
            <SelectLabel className="text-center">Type of Cars</SelectLabel>
            <hr />
            <SelectItem className="hover:bg-slate-100" value="sedan">
              Sedan
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="suv">
              Suv
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="coupe">
              Coupé
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="familiar">
              Familiar
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="luxe">
              Deluxe
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleFilter("transmission", value)} value={filters.transmission}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gear changes" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white text-black">
            <SelectLabel className="text-center">Gear changes</SelectLabel>
            <hr />
            <SelectItem className="hover:bg-slate-100" value="manual">
              Manual
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="automatic">
              Automatic
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleFilter("engine", value)} value={filters.engine}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type of cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white text-black">
            <SelectLabel className="text-center">Type of Power</SelectLabel>
            <hr />
            <SelectItem className="hover:bg-slate-100" value="nafta">
              Nafta
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="diesel">
              Diesel
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="electric">
              Electric
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="hybrid">
              Hibryd
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => handleFilter("people", value)} value={filters.people}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Persons" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="bg-white text-black">
            <SelectLabel className="text-center">Persons</SelectLabel>
            <hr />
            <SelectItem className="hover:bg-slate-100" value="2">
              2
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="4">
              4
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="5">
              5
            </SelectItem>
            <SelectItem className="hover:bg-slate-100" value="7">
              7
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="bg-black text-white hover:bg-slate-400" onClick={clearFilters}>
        Remove filters <Trash className="w-4 h-4 ml-2"/>
      </Button>
    </div>
  );
}
