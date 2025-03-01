import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Types pour les produits avec leurs images
type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

type Size = {
  id: string;
  name: string;
};

type Color = {
  id: string;
  name: string;
  hexCode: string;
};

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string | null;
  images: ProductImage[];
  sizes: Size[];
  colors: Color[];
};

// Génération métadonnées dynamiques
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const productData = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!productData) {
    return {
      title: "Produit non trouvé - SWEATS",
      description: "Ce produit n'existe pas ou n'est plus disponible.",
    };
  }

  return {
    title: `${productData.name} - SWEATS`,
    description:
      productData.description || "Découvrez ce produit de notre collection.",
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  // Récupération du produit avec toutes ses informations
  const productData = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
      sizes: true,
      colors: true,
    },
  });

  // Rediriger vers 404 si le produit n'existe pas
  if (!productData) {
    notFound();
  }

  // Cast des données pour correspondre au type attendu
  const product = productData as unknown as Product;

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Lien de retour à la boutique */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-gray-600 transition hover:text-black"
          >
            ← Retour à la boutique
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Galerie d'images */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <>
                {/* Image principale */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt ?? product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Images secondaires */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1).map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt ?? product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-square items-center justify-center bg-gray-100 text-gray-400">
                Image non disponible
              </div>
            )}
          </div>

          {/* Informations du produit */}
          <div>
            <h1 className="mb-2 text-3xl font-medium">{product.name}</h1>
            <p className="mb-6 text-2xl">{product.price} €</p>

            {/* Description */}
            {product.description && (
              <div className="mb-8">
                <h2 className="mb-2 text-lg font-medium">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {/* Sélection de taille */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-medium">Taille</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      className="border border-black px-4 py-2 transition hover:bg-black hover:text-white"
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sélection de couleur */}
            {product.colors.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-2 text-lg font-medium">Couleur</h2>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      className="size-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.hexCode }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Bouton d'ajout au panier */}
            <button className="mb-4 w-full bg-black py-3 text-white transition hover:opacity-90">
              AJOUTER AU PANIER
            </button>

            {/* Informations supplémentaires */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h3 className="mb-2 font-medium">Livraison</h3>
                <p className="text-sm text-gray-700">
                  Livraison gratuite pour les commandes de plus de 100€
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Retours</h3>
                <p className="text-sm text-gray-700">
                  Retours gratuits sous 30 jours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
