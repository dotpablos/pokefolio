import { ArrowLeft, LucideIcon } from "lucide-react";
import { useState } from "react";

const backButtonBaseClassName =
  "p-2 rounded-md bg-black/50 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50";

export const BackButton = ({
  onClick,
  className = "",
  ariaLabel = "Back",
}: {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={className ? `${backButtonBaseClassName} ${className}` : backButtonBaseClassName}
    aria-label={ariaLabel}
  >
    <ArrowLeft className="w-6 h-6" />
  </button>
);

export const LinkButton = ({
  name,
  icon: Icon,
  url,
}: {
  name: string;
  icon: LucideIcon;
  url: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="subtitle box p-3 flex items-center justify-center text-white! hover:bg-[#1a1a1a]! cursor-pointer min-w-24 relative w-full sm:w-auto"
      style={{ minWidth: "6rem" }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {isHovered ? (
          Icon && <Icon className="w-4 h-4 text-white!" />
        ) : (
          <span className="text-center whitespace-nowrap">{name}</span>
        )}
      </span>
      {/* Invisible spacer to maintain width */}
      <span className="invisible whitespace-nowrap">{name}</span>
    </a>
  );
};

export const PixelStyleButton = ({
  text,
  onClick,
  icon: Icon,
}: {
  text?: string;
  onClick: () => void;
  icon?: LucideIcon;
}) => {
  return (
    <button
      className="font-press-start-2p p-3 w-full flex text-sm items-center bg-white text-black justify-center cursor-pointer min-w-24 relative border-3 border-black text-wrap hover:bg-gray-400"
      style={{ width: "fit-content", minWidth: "6rem", borderStyle: "double" }}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text && <span className="text-center whitespace-nowrap">{text}</span>}
    </button>
  );
};
