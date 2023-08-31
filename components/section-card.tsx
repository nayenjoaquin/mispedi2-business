import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface SectionCardProps {
    section: {
        name: string,
        ref: string,
        icon: any
    }
}

export default function SectionCard(props: SectionCardProps){
    const {section} = props

    return(
        <Link href={section.ref}>
            <div className="flex flex-col justify-center gap-2.5 items-center bg-main-400 aspect-square rounded-xl transition-all hover:bg-main-500 cursor-pointer text-white p-5 ">
                <FontAwesomeIcon icon={section.icon} className="text-7xl"/>
                <h1 className="text-2xl font-normal">{section.name}</h1>
            </div>
        </Link>
    )
}