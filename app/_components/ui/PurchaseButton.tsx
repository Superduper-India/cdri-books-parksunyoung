import Link from "next/link";

interface PurchaseButtonProps {
  bookUrl: string;
  className: string;
}

export default function PurchaseButton({
  bookUrl,
  className,
}: PurchaseButtonProps) {
  return (
    <Link
      href={bookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full bg-primary text-white ${className}`}
    >
      구매하기
    </Link>
  );
}
