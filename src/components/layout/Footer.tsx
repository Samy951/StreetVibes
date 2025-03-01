import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Partie principale du footer */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
          {/* Colonne 1: À propos */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">À propos</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Développement durable
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 2: Boutique */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Boutique</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=new"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=cozy"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Cozy Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Aide */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Aide</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Livraison
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Retours & Échanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Légal */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-600 transition hover:text-black"
                >
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Partie basse du footer */}
        <div className="flex flex-col items-center justify-between border-t border-gray-200 py-6 md:flex-row">
          {/* Copyright */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} SWEATS. Tous droits réservés.
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition hover:text-black"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition hover:text-black"
            >
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 transition hover:text-black"
            >
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
