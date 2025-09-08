export default function FinancingForm() {
    return (
        <div className="max-w-2xl mx-auto py-8">
            <p className="text-gray-500 text-center mb-6">
                Please note that your information is saved on our server as you enter it!
            </p>
            <form className="space-y-4">
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
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input type="text" name="address" placeholder="Enter street address" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input type="text" name="city" placeholder="Enter your city" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">State</label>
                        <input type="text" name="state" placeholder="Enter your state" className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">ZIP Code</label>
                        <input type="text" name="zip" placeholder="Enter your zip code" className="w-full border rounded px-3 py-2" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Item(s) to Finance <span className="text-red-500">*</span></label>
                    <input type="text" name="items" placeholder="Enter item(s) to finance" className="w-full border rounded px-3 py-2" required />
                </div>
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-2">Get Pre-Approved</button>
                <p className="text-xs text-gray-500 mt-2">
                    By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                </p>
            </form>
        </div>
        );
    }
      