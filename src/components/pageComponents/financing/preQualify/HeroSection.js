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
        <div className="max-w-5xl mx-auto section-container px-2 py-10">
            <h2 className="text-center mb-10 leading-tight">
                You can add in all your parts and accessories, apparel, extended service plan, cycle insurance, and more. You’ll have everything you need, and you only have to make one monthly payment.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
        </div>
    );
}
