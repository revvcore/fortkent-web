import { salesServiceHours } from "@/data/footerInfo";

export default function ContactForm(){
    return(
        <>
        <div className="section-container ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Contact Form */}
            <div>
              <h2 className="font-bold text-2xl mb-1 italic">We Look Forward to Hearing from You!</h2>
              <p className="text-gray-600 mb-4 text-sm">
                Please note that your information is saved on our server as you enter it.
              </p>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" name="lastName" className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" className="w-full border rounded px-3 py-2" required />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Select Inquiry department</label>
                  <select name="department" className="w-full border rounded px-3 py-2">
                    <option>General Inquiry</option>
                    <option>Sales</option>
                    <option>Service</option>
                    <option>Parts</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea name="message" className="w-full border rounded px-3 py-2 min-h-[100px]" />
                </div>
                <button className="bg-red-600 text-white px-6 py-2 rounded mt-2">Send Message</button>
                <p className="text-xs text-gray-500 mt-2">
                  By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                </p>
              </form>
            </div>
            {/* Right: Map and Info Card */}
            <div>
              <div className="rounded overflow-hidden mb-4">
                {/* Google Map iframe */}
              </div>
              <div className="bg-gray-200 rounded-xl p-0 border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gray-300 px-6 py-4">
                  <h3 className="font-semibold text-center text-lg">Hours</h3>
                </div>
                <div className="hover:bg-gray-300">
                  {salesServiceHours.map((item, idx) => (
                    <div
                      key={item.day}
                      className={`flex justify-between px-6 py-3  text-[15px] ${item.highlight ? "bg-gray-300 " : ""} ${item.closed ? "" : "border-b border-gray-200 "}`}
                    >
                      <span>{item.day === "Mon-Fri" ? "Monday - Friday" : item.day === "Sat" ? "Saturday" : "Sunday"}</span>
                      <span className={item.closed ? "text-red-600 font-semibold hover:bg-gray-300" : ""}>{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-300 px-6 py-4  border-gray-200">
                  <h4 className="font-semibold text-center">Address</h4>
                  <p className="text-sm text-center mt-1">Fort Kent Powersports 377 Caribou Rd, Fort Kent, ME 04743</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}