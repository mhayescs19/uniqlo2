import Logo from "@/features/navbar/components/logo";

export default function Navbar() {
  return (
    <nav className="pl-20 pr-20 sticky top-0 z-50 bg-white/90 backdrop-blur-sm h-20 flex justify-between items-center">
      <Logo />
      <div className="flex gap-12 items-center">
        <a href="/stats">Stats</a>
        <a href="/purchase">Purchase</a>
        <a className="font-normal" href="/manage">
          Manage
        </a>
      </div>
    </nav>
  );
}
