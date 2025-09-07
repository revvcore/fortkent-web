export default function Testimonial({ text, name, role }) {
  return (
    <div className="max-w-3xl mx-auto border border-slate-800 text-center p-6  bg-slate-900 hover:bg-slate-800 hover:-translate-y-3 duration-300">
      <p className="text-gray-400 leading-relaxed mb-12">{text}</p>
      <div className="space-y-1">
        <h3 className="text-white text-3xl ">{name}</h3>
        <p className="text-cyan-400 ">{role}</p>
      </div>
    </div>
  );
}