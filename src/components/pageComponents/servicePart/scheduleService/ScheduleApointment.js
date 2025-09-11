import { siteIdentity } from "@/data/siteIdentity";

export default function ScheduleApointment(){
    return(
        <>
        <div className="section-container py-10">
           <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-2">
                <img
                className="rounded-3xl"
                 src="/pricing/financing.jpg"
                alt="Financing Image"
                />
            </div>
            <div className="p-2 place-content-center">
            <h2>Schedule An Appointment At {siteIdentity.siteName}!</h2>
            <p className="text-gray-400 mt-3">Do you need help maintaining the quality of your ATV, UTV, snowmobile, Polaris or personal watercraft?  Let {siteIdentity.siteName} certified service technicians get you on the road today. Whether it be routine maintenance or an unexpected ATV repair, our friendly technicians at {siteIdentity.siteName} are here to help! Get back out on the road as fast as possible and leave us feeling confident that we use the best parts and provide the highest quality assistance in the Fort Kent area. Keep your powersports in pristine condition and get the most out of your investment. We have all the equipment and parts needed to keep your vehicles in tip-top shape!</p>

            </div>
            
           </div>
        </div>
        </>
    )
}