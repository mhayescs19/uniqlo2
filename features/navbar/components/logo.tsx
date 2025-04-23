export default function Logo() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <a href="/" className="flex flex-row gap-1 items-center">
        <p className="factoExtraBold font-normal text-xl">UNIQLO</p>
        <div className="factoExtraBold w-[24px] h-[30px] bg-black rounded-xs text-white flex items-center justify-center">
          2
        </div>
      </a>
    </div>
  );
}
