type StatePanelProps = {
  title: string;
  message: string;
};

export function StatePanel({ title, message }: StatePanelProps) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-rosewood/40 bg-white p-6 text-center">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink/65">{message}</p>
    </div>
  );
}
