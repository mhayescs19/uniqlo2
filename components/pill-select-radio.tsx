interface PillSelectRadioProps {
  name: string; // option name
  formGroupIdentifier: string;
  selectionState: string;
  handleSelectionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textOffset?: number | 0; // value in pixels to offset the text inlay
}

export default function PillSelectRadio({
  name,
  selectionState,
  formGroupIdentifier,
  handleSelectionChange,
  textOffset,
}: PillSelectRadioProps) {
  return (
    <label
      className={`relative w-12.75 flex justify-center items-center font-medium pill ${
        selectionState === name ? "selected" : ""
      }`}
    >
      <input
        type="radio"
        name={formGroupIdentifier}
        value={name}
        checked={selectionState === name}
        onChange={handleSelectionChange}
        className="sr-only"
      />
      <span
        style={{
          marginLeft: typeof textOffset === "number" ? `${textOffset}px` : "0",
        }}
      >
        {name}
      </span>
    </label>
  );
}
