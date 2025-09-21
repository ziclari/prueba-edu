export default function Button({ title, type = "primary", onClick }) {
  const base =
    "mt-8 px-6 py-3 rounded-full font-bold text-lg transition cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-white border-2 border-primary hover:bg-primary/90",
    secondary:
      "bg-white text-primary border-2 border-primary hover:bg-white/80",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[type] || variants.primary}`}
    >
      {title}
    </button>
  );
}
