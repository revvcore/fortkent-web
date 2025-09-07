export default function HeaderSection({ heading, title }) {
    return (
        <div className="text-center my-8">
            <h1 className=" mb-2">{heading}</h1>
            <p className="text-gray-500 text-lg">
                {title}
            </p>
        </div>
    )
}