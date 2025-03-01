import { Search, ShoppingCart, User } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo (centre) */}
        <div className="flex-1 text-center md:flex-none">
          <Link href="/" className="inline-block text-2xl font-medium">
            StreetVibes
          </Link>
        </div>

        {/* Navigation principale */}
        <nav className="items-center justify-center flex-1 hidden md:flex">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="py-2 text-sm font-medium uppercase transition hover:opacity-70"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="py-2 text-sm font-medium uppercase transition hover:opacity-70"
              >
                Boutique
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icônes utilisateur (droite) */}
        <div className="flex items-center space-x-4">
          <Link
            href={session ? "/account" : "/auth/signin"}
            className="transition hover:opacity-70"
          >
            <User size={20} />
            <span className="sr-only">Compte</span>
          </Link>
          <Link href="/search" className="transition hover:opacity-70">
            <Search size={20} />
            <span className="sr-only">Recherche</span>
          </Link>
          <Link href="/cart" className="transition hover:opacity-70">
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="sr-only">Panier</span>
              {/* Badge de comptage d'articles */}
              <span className="absolute flex items-center justify-center text-xs text-white bg-black rounded-full -right-2 -top-2 size-5">
                0
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
