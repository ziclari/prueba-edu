import { Icon } from "@iconify/react";

export default function Button({ 
    title, 
    type = "primary", 
    onClick, 
    icon,
    iconPosition = "right",
    textSize='text-lg'
}) {
  const base =
    "font-primary px-6 py-3 rounded-full font-bold transition cursor-pointer inline-flex items-center gap-2";

  const variants = {
    primary:
        "bg-primary text-white border-2 border-primary hover:bg-primary/90",
    secondary:
        "bg-white text-primary border-2 border-primary hover:bg-white/80",
    helper: 
        "text-gray-500 hover:text-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${textSize} ${variants[type] || variants.primary}`}
    >
      {icon && iconPosition==="left" && <Icon icon={icon}/>}
      {title}
      {icon && iconPosition==="right" && <Icon icon={icon}/>}
    </button>
  );
}
