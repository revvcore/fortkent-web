export default function FinancingForm() {
    return (
        <div className="max-w-2xl mx-auto section-container  ">
            <p className="text-gray-500 text-center mb-6">
                Please note that your information is saved on our server as you enter it!
            </p>
            <form className="space-y-4 py-10 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="styleLable">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" className="styleInput" required />
                    </div>
                    <div>
                        <label className="styleLable">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" className="styleInput" required />
                    </div>
                    <div>
                        <label className="styleLable">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" className="styleInput" required />
                    </div>
                    <div>
                        <label className="styleLable">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" name="phone" className="styleInput" required />
                    </div>
                    <div>
                        <label className="styleLable">Address</label>
                        <input type="text" name="address" placeholder="Enter street address" className="styleInput" />
                    </div>
                    <div>
                        <label className="styleLable">City</label>
                        <input type="text" name="city" placeholder="Enter your city" className="styleInput" />
                    </div>
                    <div>
                        <label className="styleLable">State</label>
                        <input type="text" name="state" placeholder="Enter your state" className="styleInput" />
                    </div>
                    <div>
                        <label className="styleLable">ZIP Code</label>
                        <input type="text" name="zip" placeholder="Enter your zip code" className="styleInput" />
                    </div>
                </div>
                <div>
                    <label className="styleLable">Item(s) to Finance <span className="text-red-500">*</span></label>
                    <input type="text" name="items" placeholder="Enter item(s) to finance" className="styleInput" required />
                </div>
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-2">Get Pre-Approved</button>
                <p className="text-xs text-gray-500 mt-2">
                    By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                </p>
            </form>
        </div>
        );
    }
      