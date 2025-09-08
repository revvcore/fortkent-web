import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

export default function HowToContact() {
    return (
        <>
            <div className="section-container py-12">
                <div className="relative">
                    <img
                        className="w-full h-[300px] rounded-2xl "
                        src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="About"
                    />
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Comprehensive Selection of Clothing and Accessories for Top
              Powersports Brands
            </h1>
            <p className="max-w-3xl mb-6 text-sm md:text-base">
              Fort Kent Powersports carries a complete line of clothing and
              accessories for your Ski-Doo® Snowmobile, Polaris® Snowmobile,
              Sea-Doo® PWC, Evinrude Engines, Can-Am® ATV, Polaris® ATV,
              Can-Am® Spyder, Commander UTV, Polaris® Ranger or Polaris® Razor.
              Many items are in stock, while others are available by special
              order.
            </p>
            <StyledButton className="bg-red-600 px-6 py-2 rounded-lg">
              Contact Us
            </StyledButton>
          </div>
                </div>
            </div>
        </>
    )
}