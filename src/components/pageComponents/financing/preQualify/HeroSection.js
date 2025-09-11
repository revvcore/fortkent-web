import { Check, CheckCircle } from "lucide-react";

export default function HeroSection() {
    const creditOptions = [
        {
            title: "Good Credit?",
            desc: "Great! We'll get you the lowest rate available.",
        },
        {
            title: "Bad Credit?",
            desc: "No problem, we understand. Let us help.",
        },
        {
            title: "No Credit?",
            desc: "Everybody has to start somewhere. We'd love you to start with us.",
        },
        {
            title: "Past Bankruptcy?",
            desc: "Hey, nobody's perfect. We'll help get you back on the road.",
        },
    ];

    return (
    <div className="w-full mx-auto px-0 py-10">
            <h2 className="text-center max-w-5xl mx-auto mb-10 leading-tight">
                You can add in all your parts and accessories, apparel, extended service plan, cycle insurance, and more. You’ll have everything you need, and you only have to make one monthly payment.
            </h2>
            <div className="grid grid-cols-1 max-w-5xl mx-auto md:grid-cols-2 gap-10">
                {creditOptions.map((opt, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-400 mb-3">
                            <Check className="w-8 h-8 text-white" />
                        </span>
                        <div className="font-bold text-2xl italic mb-1">{opt.title}</div>
                        <div className="text-gray-500 text-base">{opt.desc}</div>
                    </div>
                ))}
            </div>
            <div className="w-full mt-12">
                <iframe
                    src="https://app.revvable.com/dealers/73dd450c-72b1-4ec0-9b1d-3fc735e90b94/credit-app"
                    title="Credit Application"
                    height="900"
                    className="w-full min-h-[600px] border-none"
                    style={{ minHeight: 600 }}
                    allowFullScreen
                />
            </div>
        </div>
    );
}
