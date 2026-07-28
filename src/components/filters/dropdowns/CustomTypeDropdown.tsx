import { useState, useRef, useEffect } from "react";
import { typeData } from "../../../utils/typeIcons";
import { selectStyles } from "../filterStyles";

interface CustomTypeDropdownProps {
  value: string | null;
  onChange: (val: string | null) => void;
  placeholder: string;
  options: string[];
}

export default function CustomTypeDropdown({ value, onChange, placeholder, options }: CustomTypeDropdownProps) {
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

  const selectedTypeInfo = value ? typeData[value] : null;

  return (
    <div className="relative w-full sm:w-auto" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={selectStyles}
      >
        <div className="flex items-center gap-2 capitalize min-w-0">
          {value && selectedTypeInfo ? (
            <>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-white/20 shadow-sm shrink-0 ${selectedTypeInfo.colorClass}`}>
                <img src={selectedTypeInfo.icon} alt={value} className="w-3.5 h-3.5 object-contain drop-shadow-sm" />
              </div>
              <span className="truncate">{value}</span>
            </>
          ) : (
            <span className="truncate">{placeholder}</span>
          )}
        </div>
        <span className="text-xs ml-2 shrink-0">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full min-w-45 sm:min-w-40 bg-white border-2 border-[#2c2c2a] rounded-2xl mt-2 max-h-60 overflow-y-auto shadow-[0_2px_0_#2c2c2a] p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full left-0">
          <li
            onClick={() => { onChange(null); setIsOpen(false); }}
            className="px-4 py-2.5 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer transition-colors"
          >
            {placeholder}
          </li>
          {options.map((type) => {
            const optionInfo = typeData[type];
            return (
              <li
                key={type}
                onClick={() => { onChange(type); setIsOpen(false); }}
                className="px-3 py-2 text-[#2c2c2a] font-medium hover:bg-[#f5f5f5] rounded-xl cursor-pointer capitalize transition-colors flex items-center gap-3"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border border-black/10 shadow-sm shrink-0 ${optionInfo.colorClass}`}>
                  <img src={optionInfo.icon} alt={type} className="w-4 h-4 object-contain drop-shadow-sm" />
                </div>
                {type}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}