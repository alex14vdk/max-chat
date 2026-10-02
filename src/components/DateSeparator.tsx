interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex items-center justify-center py-3">
      <span className="rounded-xl bg-[#0f8ec285] px-1.5 py-px text-sm leading-4.5 text-white [backdrop-filter:blur(25px)]">
        {date}
      </span>
    </div>
  );
}
