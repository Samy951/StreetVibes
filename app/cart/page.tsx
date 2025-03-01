import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Panier - SWEATS",
  description: "Consultez et modifiez votre panier d'achats.",
};

export default function CartPage() {
  // Note: dans une implémentation réelle, nous récupérerions le panier de l'utilisateur depuis la base de données
  const cartItems = []; // Simuler un panier vide pour l'instant
  const subtotal = 0;
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-medium md:text-4xl">
          PANIER
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Liste des articles (8 colonnes) */}
            <div className="lg:col-span-8">
              <div className="mb-4 flex justify-between border-b border-gray-200 pb-4">
                <span className="font-medium">Produit</span>
                <span className="font-medium">Total</span>
              </div>

              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center py-6 md:flex-nowrap"
                  >
                    <div className="relative mb-4 aspect-square w-full bg-gray-100 md:mb-0 md:mr-4 md:w-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Taille: {item.size} / Couleur: {item.color}
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="flex border border-gray-300">
                          <button className="px-3 py-1 hover:bg-gray-100">
                            -
                          </button>
                          <span className="border-x border-gray-300 px-3 py-1">
                            {item.quantity}
                          </span>
                          <button className="px-3 py-1 hover:bg-gray-100">
                            +
                          </button>
                        </div>
                        <button className="ml-4 text-gray-500 hover:text-red-500">
                          <Trash2 size={18} />
                          <span className="sr-only">Supprimer</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 w-full text-right md:mt-0 md:w-auto">
                      <span className="font-medium">
                        {item.price * item.quantity} €
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Récapitulatif (4 colonnes) */}
            <div className="lg:col-span-4">
              <div className="border border-gray-200 bg-gray-50 p-6">
                <h2 className="mb-4 text-xl font-medium">Récapitulatif</h2>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? "Gratuit" : `${shipping} €`}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3 font-medium">
                    <span>Total</span>
                    <span>{total} €</span>
                  </div>
                </div>

                <button className="mb-3 w-full bg-black py-3 text-white transition hover:opacity-90">
                  PASSER LA COMMANDE
                </button>

                <Link
                  href="/shop"
                  className="block text-center text-sm text-gray-600 transition hover:text-black"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="mb-8 text-xl text-gray-600">Votre panier est vide</p>
            <Link
              href="/shop"
              className="inline-block border border-black px-8 py-3 transition hover:bg-black hover:text-white"
            >
              COMMENCER LES ACHATS
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
