type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="w-full text-gray-800 border border-gray-400 rounded-xl px-4 py-3 text-sm   focus:outline-none "
    />
  );
}
