import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

export default function HowToContact() {
    return (
        <>
            <div className="section-container py-10 ">
                <div className="relative">
                    <img
                        className="w-full h-[620px] md:h-[400px] rounded-2xl "
                        src="/images/contact"
                        alt="About"
                    />
                   <div className="absolute inset-0 flex flex-col rounded-2xl items-center justify-center text-center bg-black/60 text-white p-6" aria-hidden="true" >
            <h2 className=" max-w-3xl mb-4 ">
              Comprehensive Selection of Clothing and Accessories for Top
              Powersports Brands
            </h2>
            <p className="max-w-lg md:max-w-3xl mb-6">
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