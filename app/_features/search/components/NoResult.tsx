import Image from "next/image";

export default function NoResult() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
                    <Image
                        src="/book_icon.svg"
                        alt="book icon"
                        width={80}
                        height={80}
                    />
            </div>
            <p className="text-text-secondary font-medium text-lg">
                검색된 결과가 없습니다.
            </p>
        </div>
    );
}
