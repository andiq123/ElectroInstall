import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center group"
      aria-label="ElectroInstall - Pagina principală"
    >
      <Logo size="sm" light={true} />
    </Link>
  );
}
