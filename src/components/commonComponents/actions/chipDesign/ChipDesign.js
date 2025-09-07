export default function ChipDesign({ title, className = "" }) {
    return (
        <div
            className={`w-auto px-5 h-12 justify-items-center place-content-center bg-blue-950 rounded-full transition-colors duration-200 group-hover:bg-blue-500 flex items-center mx-auto ${className}`}>
            <p>{title}</p>
        </div>
    )
}