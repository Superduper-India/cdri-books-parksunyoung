interface DescriptionProps {
  bookContents: string;
}

export default function Description({ bookContents }: DescriptionProps) {
  return (
    <div className="mb-6">
      <p className="whitespace-pre-line text-[10px] text-text-primary leading-relaxed">
        {bookContents}
      </p>
    </div>
  );
}
