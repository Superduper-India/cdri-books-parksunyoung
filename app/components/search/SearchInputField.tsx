import Image from "next/image";

import { INPUT_CLASSNAME } from "@/lib/constant";

interface SearchInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export default function SearchInputField({
  value,
  onChange,
  onFocus,
  placeholder = "검색어를 입력하세요",
}: SearchInputFieldProps) {
  return (
    <div className="relative">
      <div className="-translate-y-1/2 absolute top-1/2 left-4">
        <Image
          src="/search_Icon.svg"
          alt="검색 아이콘"
          width={30}
          height={30}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`bg-gray px-12.5 py-4 ${INPUT_CLASSNAME}`}
      />
    </div>
  );
}
