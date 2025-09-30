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
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
// 🔑 Importamos toast de Sonner
import { toast } from 'sonner'; 
// 🔑 Importamos AlertDialog de shadcn/ui
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; 
import React, { useState } from "react";

export function TablesReserves(props: TableReservesProps) {
    const { orders } = props;
    const router = useRouter(); 
    
    // 🔑 Estado para almacenar el ID de la orden que se quiere cancelar
    const [orderToCancelId, setOrderToCancelId] = useState<string | null>(null);

    const totalAmount = orders.reduce((acc, booking) => {
        return acc + parseFloat(booking.totalAmount);
    }, 0);

    // 🔑 LÓGICA CENTRAL: La función de cancelación se ejecuta SOLO después del AlertDialog
    const handleConfirmCancel = async () => {
        if (!orderToCancelId) return;

        try {
            const response = await fetch(`/api/order-cancel/${orderToCancelId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                // ✅ Notificación de éxito usando Sonner
                toast.success("Reservation successfully cancelled.", {
                    description: `order ${orderToCancelId} has been marked as cancelled.`,
                });
                router.refresh(); 
            } else {
                const errorData = await response.json();
                // ❌ Notificación de error usando Sonner
                toast.error("Error canceling reservation.", {
                    description: errorData.message || 'The order could not be canceled. Please try again.',
                });
            }
        } catch (error) {
            toast.error("Conection error", {
                description: "couldn't communicate with the server",
            });
        } finally {
            setOrderToCancelId(null); // Limpia el ID después de la acción
        }
    };
    
    // Función para iniciar el diálogo
    const initiateCancel = (orderId: string) => {
        setOrderToCancelId(orderId);
    };

    // 🔑 FUNCIÓN PARA DEFINIR ESTILOS EN BASE AL ESTADO (Mantenida)
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-600 text-slate-100";
            case "pending":
                return "bg-yellow-500 text-slate-900";
            case "cancelled":
                return "bg-red-600 text-slate-100";
            default:
                return "bg-gray-400 text-slate-900";
        }
    };

    return (
        <>
            {/* 🔑 1. DIÁLOGO DE ALERTA MODERNO (Se muestra cuando orderToCancelId tiene valor) */}
            <AlertDialog open={!!orderToCancelId} onOpenChange={() => setOrderToCancelId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently cancel your reservation. You will not be able to reverse the order status.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className=" bg-black text-white hover:bg-slate-300">Keep Reserved</AlertDialogCancel>
                        <AlertDialogAction className=" bg-black text-white hover:bg-slate-300" onClick={handleConfirmCancel}>
                            Yes, Cancel Order
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* 🔑 2. TABLA DE RESERVAS */}
            <Table>
                <TableCaption>A list of your recent bookings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-light text-slate-600">Car</TableHead>
                        <TableHead className="font-light text-slate-600">Date Start</TableHead>
                        <TableHead className="font-light text-slate-600">Date End</TableHead>
                        <TableHead className="font-light text-slate-600">Status</TableHead>
                        <TableHead className="font-light text-slate-600 text-right">Amount</TableHead>
                        <TableHead className="font-light text-slate-600 text-center">Action</TableHead>
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
                                    className={`
                                        px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                                        ${getStatusStyles(order.status)}
                                    `}
                                >
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                {formatPrice(Number(order.totalAmount))}
                            </TableCell>
                            <TableCell className="text-center">
                                {/* 🔑 Botón que INICIA el diálogo de confirmación */}
                                {order.status === 'pending' && (
                                    <Button 
                                        variant="destructive"
                                        size="sm"
                                        // 🔑 Llama a initiateCancel para establecer el ID y abrir el diálogo
                                        onClick={() => initiateCancel(order.id)}
                                        className="text-xs h-6 px-3 bg-black text-white hover:bg-slate-400"
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* ... (TableFooter) ... */}
            </Table>
        </>
    );
}
