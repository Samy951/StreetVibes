import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Shop - SWEATS",
  description: "Découvrez notre collection de sweats et hoodies de qualité.",
};

// Types pour les produits avec leurs images
type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string | null;
  images: ProductImage[];
};

export default async function ShopPage() {
  // Récupération de tous les produits avec leurs images
  const productsData = await prisma.product.findMany({
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  // Cast des données pour correspondre au type attendu
  const products = productsData as unknown as Product[];

  // Récupération des catégories pour le filtre
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-3xl font-medium md:text-4xl">
          COLLECTION
        </h1>

        {/* Filtres et tri */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <button className="border border-black bg-black px-4 py-2 text-white transition hover:opacity-80">
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className="border border-black px-4 py-2 transition hover:bg-black hover:text-white"
              >
                {category.name}
              </button>
            ))}
          </div>

          <div>
            <select className="border border-black bg-white px-4 py-2">
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group"
            >
              <div className="relative mb-4 aspect-square overflow-hidden bg-gray-100">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt ?? product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-gray-400">
                    Image non disponible
                  </div>
                )}
              </div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="mt-1 text-gray-700">{product.price} €</p>
            </Link>
          ))}
        </div>

        {/* Message si aucun produit trouvé */}
        {products.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-xl text-gray-500">
              Aucun produit disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
