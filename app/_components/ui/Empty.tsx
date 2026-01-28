import Image from "next/image";

interface EmptyProps {
  message?: string;
}

export default function Empty({
  message = "검색된 결과가 없습니다.",
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <Image src="/book_icon.svg" alt="book icon" width={80} height={80} />
      </div>
      <p className="font-medium text-lg text-text-secondary">{message}</p>
    </div>
  );
}
