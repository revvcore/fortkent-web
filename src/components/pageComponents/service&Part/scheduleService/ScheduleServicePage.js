import Promo from "@/components/commonComponents/Promo";
import ScheduleApointment from "./ScheduleApointment";
import AppointmentForm from "./AppointmentForm";

export default function ScheduleServicePage(){
    return(
        <>
        <Promo title="Schedule a Service Appointment" />
        <ScheduleApointment/>
        
        <AppointmentForm/>
        </>
    )
}