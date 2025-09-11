import { CardCarProps } from "./CardCar.types";

export function CardCar(props:CardCarProps) {
    const {car} = props;
  return <div>{car.name}</div>;
}
