import Logo from "@/features/navbar/components/logo";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm h-20 flex justify-between items-center pl-20">
      <Logo />
    </nav>
  );
}
