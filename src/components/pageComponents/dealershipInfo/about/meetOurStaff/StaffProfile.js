
export default function StaffProfile({
    image,
    title,
    subtitle,
    buttonText = "View Profile",
    profileLink
}) {
    const handleButtonClick = () => {
        if (profileLink) {
            window.open(profileLink, "_blank");
        }
    };
    return (
        <div className="flex flex-col items-center p-4">
            <img
                src={image}
                alt={title}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 mb-2"
            />
            <div className="text-center">
                <div className="font-bold text-xl mt-2 mb-0.5">
                    <span className="italic font-black">{title}</span>
                </div>
                <div className="text-gray-500 font-semibold mb-4">{subtitle}</div>
            </div>
            {profileLink && (
                <button
                    className="w-full border border-gray-300 rounded bg-gray-50 py-2 text-gray-600 hover:bg-gray-100 transition"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}