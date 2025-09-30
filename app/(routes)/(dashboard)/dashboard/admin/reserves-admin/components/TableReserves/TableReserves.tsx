// TableReserves.tsx (Vista de Administrador)
"use client"
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

export function TableReserves(props: TableReservesProps) {
  const { orders } = props;

  const totalAmount = orders.reduce((acc, booking) => {
    return acc + parseFloat(booking.totalAmount);
  }, 0);
  
  // 🔑 FUNCIÓN PARA DEFINIR ESTILOS EN BASE AL ESTADO
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-600 text-slate-100"; // Verde
      case "pending":
        return "bg-yellow-500 text-slate-900"; // Amarillo
      case "cancelled":
        return "bg-red-600 text-slate-100"; // Rojo
      default:
        return "bg-gray-400 text-slate-900";
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-light text-slate-600">Order Date</TableHead>
          <TableHead className="font-light text-slate-600">Customer ID</TableHead>
          <TableHead className="font-light text-slate-600">Car</TableHead>
          <TableHead className="font-light text-slate-600">Date Start</TableHead>
          <TableHead className="font-light text-slate-600">Date End</TableHead>
          <TableHead className="font-light text-slate-600">Status</TableHead> {/* 🔑 Nueva Columna de Status */}
          <TableHead className="font-light text-slate-600 text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow className="hover:bg-slate-50 rounded-lg" key={order.id}>
            <TableCell className="font-medium">
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="font-medium max-w[100px] truncate">
              {order.userId}
            </TableCell>
            <TableCell className="font-medium">{order.carName}</TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(order.orderEndDate).toLocaleDateString()}
            </TableCell>
            {/* 🔑 CELDA DE STATUS CON ESTILOS CONDICIONALES */}
            <TableCell>
              <span
                className={`
                  inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full whitespace-nowrap
                  ${getStatusStyles(order.status)}
                `}
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
      <TableFooter className="hover:bg-slate-50 rounded-lg">
        <TableRow>
          <TableCell className="font-bold" colSpan={6}>Total</TableCell> {/* 🔑 Colspan ajustado */}
          <TableCell className="font-bold text-right">
            {formatPrice(totalAmount)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
