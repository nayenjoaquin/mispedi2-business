import {motion} from 'framer-motion'
interface props {
    label: string;
    onClick: (label:string) => void;
    active?: boolean;
}

export default function BorderBottomNavItem(props: props) {
    const {label, onClick, active} = props
    return(
        <div className='relative'>
            <li onClick={e=>{onClick(label)}} className={`text-xs md:text-xl py-2.5 font-medium cursor-pointer transition-all hover:border-b-2 hover:border-main-500  hover:bg-neutral-100 ${active && "bg-neutral-100"} `}>{label}</li>
            {active && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-main-500 rounded-b-xl"></motion.div>}
        </div>
    )
}