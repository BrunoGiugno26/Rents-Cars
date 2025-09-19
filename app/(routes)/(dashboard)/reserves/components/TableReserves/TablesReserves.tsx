import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableReservesProps } from "./TableReserves.types";
import { formatPrice } from "@/lib/formatPrice";

export function TablesReserves(props: TableReservesProps) {
  const { orders } = props;

  const totalAmount = orders.reduce((acc, booking) => {
    return acc + parseFloat(booking.totalAmount);
  }, 0);
  return (
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-light text-slate-600">Car</TableHead>
          <TableHead className="font-light text-slate-600">
            Date Start
          </TableHead>
          <TableHead className="font-light text-slate-600">Date End</TableHead>
          <TableHead className="font-light text-slate-600">Status</TableHead>
          <TableHead className="font-light text-slate-600 text-right">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow className=" hover:bg-slate-50 rounded-lg" key={order.id}>
            <TableCell className="font-medium">{order.carName}</TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(order.orderEndDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <span
                className="
                    px-1 py-1 rounded-full text-xs font-semibold
                    bg-green-600 text-slate-100 border
                "
              >
                {order.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(Number(order.totalAmount))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className=" hover:bg-slate-50 rounded-lg">
        <TableRow>
          <TableCell className="font-bold" colSpan={4}>
            Total
          </TableCell>
          <TableCell className="text-right font-bold">
            {formatPrice(totalAmount)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
