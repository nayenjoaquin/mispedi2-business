import { useProducts } from "@/hooks/useProducts";
import { ProductType } from "@/types";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MyProductItemProps {
    product: ProductType;
}

export const MyProductItem = (props: MyProductItemProps) => {
    const {product} = props;
    const {deleteProduct} = useProducts();

    const router = useRouter();
        return(
            <li onClick={e=>{
                router.push(`/products/${product.id}`)
            }} key={product.id} className="flex w-full rounded-md items-center justify-between transition-all hover:shadow-xl hover:-translate-y-1 px-5 cursor-pointer">
                <div className="flex items-center gap-2.5">
                    <Image src={product.images[0]} className="aspect-square object-cover rounded" alt="product img" width={50} height={50} />
                    <p className="w-full line-clamp-1 text-ellipsis">{product.name}</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <p className="">${product.price}</p>
                </div>
            </li>
        )
}