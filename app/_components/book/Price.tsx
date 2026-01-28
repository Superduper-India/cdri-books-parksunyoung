import type { BookDocument } from "@/app/_types/book";
import { formatPrice } from "@/lib/formatter";

interface PriceProps {
  book: BookDocument;
  isDescription?: boolean;
}

const PRICE_PHRASE_CLASS = "text-[10px] text-text-subtitle";
const PRICE_SPAN_CLASS = "text-lg text-text-primary ml-2";

function formatPriceWithUnit(price: number) {
  return `${formatPrice(price)}원`;
}

export default function Price({ book, isDescription = false }: PriceProps) {
  const hasDiscount = book.sale_price > 0;
  const displayPrice = hasDiscount ? book.sale_price : book.price;

  if (isDescription && hasDiscount) {
    return (
      <div className="mb-7 flex flex-col gap-2 text-right">
        <p className={PRICE_PHRASE_CLASS}>
          원가{" "}
          <span className={`line-through ${PRICE_SPAN_CLASS}`}>
            {formatPriceWithUnit(book.price)}
          </span>
        </p>
        <p className={PRICE_PHRASE_CLASS}>
          할인가{" "}
          <span className={`font-bold ${PRICE_SPAN_CLASS}`}>
            {formatPriceWithUnit(displayPrice)}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 text-right">
      <span className={`truncate font-bold ${PRICE_SPAN_CLASS}`}>
        {formatPriceWithUnit(displayPrice)}
      </span>
    </div>
  );
}
