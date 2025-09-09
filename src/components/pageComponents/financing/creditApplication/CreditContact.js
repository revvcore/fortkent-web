import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

export default function CreditContact() {
  return (
    <div
      className="relative h-[520px]  md:min-h-[400px] flex items-center justify-center py-12"
      style={{
        backgroundImage: 'url("/images/credit.webp")',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-black/60 absolute inset-0" aria-hidden="true" >
      <div className="section-container  w-full ">
        <div className="  py-12 flex flex-col  items-center justify-center text-center text-white ">
          <h2 className="mb-4">
            You can add in all your parts and accessories, apparel, extended service plan, cycle insurance, and more. You’ll have everything you need, and you only have to make one monthly payment.
          </h2>
          <p className="max-w-3xl mb-6 ">
            And because we finance more ATVs, UTVs, personal watercraft, and snowmobiles than anyone else, we understand your special needs. Only someone who knows how you feel when you hit the starter button understands that hitting the road ASAP is your biggest concern. That’s why we make it easy.
          </p>
          <StyledButton className="bg-red-600 px-6 py-2 rounded-lg">
            Contact Us
          </StyledButton>
        </div>
      </div>

      </div>
    </div>
  );
}