import { OrderType } from "@/types";
import StatusChip from "./status-chip";
import { useRouter } from "next/navigation";

interface OrderListProps {
    orders: OrderType[];
}

export default function OrderList(props: OrderListProps) {
    const {orders} = props
    const router = useRouter()
    return(
        <ul className="flex flex-col gap-2.5">
            {orders.map(order => <li onClick={e=>{
                router.push(`/orders/${order.id}`)
            }} key={order.id} className="p-5 flex items-center gap-2.5 xl:gap-5 xl:text-xl justify-between text-md font-medium cursor-pointer transition-all hover:bg-neutral-200">
                <StatusChip status={order.status} />
                <span className="whitespace-nowrap">{order.client}</span>
                <span className="text-sm font-extralight line-clamp-1 w-full">
                    {order.products.map(product => product.product.name+'x'+product.quantity).join(', ')}
                </span>
                <span>${order.total}</span>
                
            </li>)}
        </ul>
    )
}