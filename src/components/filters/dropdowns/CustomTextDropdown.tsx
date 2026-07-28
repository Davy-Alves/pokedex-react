import { useState, useRef, useEffect } from "react";
import { selectStyles } from "../filterStyles";

interface CustomTextDropdownProps {
  value: string | null;
  onChange: (val: string | null) => void;
  placeholder: string;
  options: { value: string, label: string }[];
}

export default function CustomTextDropdown({ value, onChange, placeholder, options }: CustomTextDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={selectStyles}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <span className="text-xs ml-2 shrink-0">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full min-w-45 sm:min-w-45 bg-white border-2 border-[#2c2c2a] rounded-2xl mt-2 max-h-60 overflow-y-auto shadow-[0_2px_0_#2c2c2a] p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full left-0">
          <li
            onClick={() => { onChange(null); setIsOpen(false); }}
            className="px-4 py-2.5 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer transition-colors"
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className="px-4 py-2.5 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer transition-colors"
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}