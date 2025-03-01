import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Récupérer quelques produits phares pour la section "Cozy selection"
  const cozyProducts = await prisma.product.findMany({
    take: 4,
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
        take: 1,
      },
    },
  });

  type ProductWithImages = {
    id: string;
    slug: string;
    name: string;
    price: number;
    images: {
      url: string;
      alt: string | null;
    }[];
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section - Image plein écran avec texte superposé */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/herobanner.webp"
            alt="SWEATS Collection"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">StreetVibes</h1>
          <p className="mb-8 text-xl md:text-2xl">Confort & Élégance</p>
          <Link
            href="/shop"
            className="px-8 py-3 text-black transition bg-white rounded-none hover:bg-gray-200"
          >
            DÉCOUVRIR
          </Link>
        </div>
      </section>

      {/* Section "À propos" */}
      <section className="px-4 py-20 bg-white md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-medium md:text-4xl">
            NOTRE PHILOSOPHIE
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Des vêtements essentiels, confortables et intemporels. Chaque pièce
            est soigneusement conçue pour allier style minimaliste et qualité
            exceptionnelle.
          </p>
        </div>
      </section>

      {/* Section "Cozy Selection" */}
      <section className="px-4 py-16 bg-gray-50 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-medium text-center">
            COZY SELECTION
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(cozyProducts as unknown as ProductWithImages[]).map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group"
              >
                <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-square">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt ?? product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-gray-400 size-full">
                      Image non disponible
                    </div>
                  )}
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-gray-700">{product.price} €</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block px-8 py-3 transition border border-black hover:bg-black hover:text-white"
            >
              VOIR TOUS LES PRODUITS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
