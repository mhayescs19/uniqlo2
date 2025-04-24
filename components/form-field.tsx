interface FormFieldProps {
  inputLabel: string;
  type: string; // todo add constraint to match <input> type
  identifier: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export default function FormField({
  inputLabel,
  type,
  identifier,
  placeholder,
  value,
  handleChange,
  error,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="pb-1.75 font-bold">{inputLabel}</label>
      <input
        className="border-2 border-outline-gray p-3 font-medium text-sm text-605C5C rounded-[0.3125rem]"
        type={type}
        name={identifier}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></input>
      {error !== "" && (
        <div className="pt-1 text-red-700 text-[0.7rem]">{error}</div>
      )}
    </div>
  );
}
