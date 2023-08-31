import {motion} from 'framer-motion';

interface StatusChipProps {
    status: string;
}

interface colorMap {
    [key: string]: string;
}

const statusColorMap:colorMap = {
    'Nuevo': 'bg-yellow-400',
    'Confirmado': 'bg-green-400',
    'Rechazado': 'bg-red-400',
    'Entregado': 'bg-blue-400',

}

export default function StatusChip(props: StatusChipProps) {
    const {status} = props
    return(
        <span className={`px-2 py-1 rounded-full text-white ${statusColorMap[status]} `}>
            {status}
        </span>
    )
}

