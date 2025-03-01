import { Search as SearchIcon } from "lucide-react";

export const metadata = {
  title: "Recherche - SWEATS",
  description: "Recherchez des produits dans notre collection.",
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-medium md:text-4xl">
          RECHERCHE
        </h1>

        {/* Formulaire de recherche */}
        <div className="mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
              <SearchIcon size={20} />
              <span className="sr-only">Rechercher</span>
            </button>
          </div>
        </div>

        {/* Résultats de recherche */}
        <div className="py-20 text-center">
          <p className="mb-4 text-xl text-gray-600">
            Saisissez des termes de recherche ci-dessus
          </p>
          <p className="text-gray-500">Les résultats apparaîtront ici</p>
        </div>
      </div>
    </main>
  );
}
