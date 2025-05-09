import Logo from "@/features/navbar/components/logo";

export default function Navbar() {
  return (
    <nav className="pl-20 pr-20 sticky top-0 z-50 bg-white/90 h-20 flex justify-between items-center">
      <Logo />
      <div className="flex gap-12 items-center">
        <a className="inter-medium" href="/stats">
          Stats
        </a>
        <a className="inter-medium" href="/purchase">
          Purchase
        </a>
        <a className="inter-medium" href="/manage">
          Manage
        </a>
      </div>
    </nav>
  );
}
