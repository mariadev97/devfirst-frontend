export default function TechTag({ children }) {
  return (
    <span className="font-mono-tag text-xs text-violet bg-violet-soft px-2 py-1 rounded">
      {children}
    </span>
  );
}
