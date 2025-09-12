import Promo from "../../commonComponents/PageHeader";
import HeroSecton from "./HeroSection";
import ScheduleTestRideForm from "./ScheduleTestRideForm";
export default function ScheduleTestRidePage() {
    return (
        <>
        <Promo title="Schedule a Test Ride" />
        <HeroSecton/>
        <ScheduleTestRideForm/>
        </>
    )
}