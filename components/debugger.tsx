export default function Debugger({data}: any) {
    return (
        <div className="bg-black p-5 bg-opacity-50 absolute bottom-5 left-0 h-[300px] over overflow-scroll max-w-lg rounded">
            <p><pre className="text-white flex-wrap text-xs w-full"> {JSON.stringify(data, null, 2)} </pre></p>
        </div >
    )
}
