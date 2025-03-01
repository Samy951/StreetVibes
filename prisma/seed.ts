import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Début de l'importation des données...");

    // 1. Charger les données depuis le fichier JSON
    const jsonPath = path.join(
      __dirname,
      "seed-data",
      "sweatscollective-products.json",
    );
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const productsData = JSON.parse(rawData);
    console.log(`Données chargées: ${productsData.length} produits trouvés`);

    // Créer quelques couleurs de base
    const navy = await prisma.color.create({
      data: {
        name: "Navy",
        hexCode: "#000080",
      },
    });

    const black = await prisma.color.create({
      data: {
        name: "Black",
        hexCode: "#000000",
      },
    });

    // Créer quelques tailles de base
    const sizeM = await prisma.size.create({
      data: {
        name: "M",
        description: "Medium",
      },
    });

    const sizeL = await prisma.size.create({
      data: {
        name: "L",
        description: "Large",
      },
    });

    // Créer une catégorie par défaut
    const hoodieCategory = await prisma.category.create({
      data: {
        name: "Hoodie",
        slug: "hoodie",
        description: "Sweats à capuche confortables",
      },
    });

    // Créer une collection par défaut
    const cozyCollection = await prisma.collection.create({
      data: {
        name: "Cozy Collection",
        slug: "cozy-collection",
        description: "Notre collection confortable",
      },
    });

    // Importer les produits
    for (const product of productsData) {
      // Vérifier si le produit a un titre
      if (!product.titre) {
        console.log("Produit sans titre trouvé, skip...");
        continue;
      }

      // Nettoyer et formater les données
      const productName = product.titre.trim();
      const productSlug = productName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      // Extraire le prix
      let productPrice = 0;
      if (product.prix) {
        const priceMatch = product.prix.match(/\d+[.,]\d+/);
        if (priceMatch) {
          productPrice = parseFloat(priceMatch[0].replace(",", "."));
        }
      }

      // Créer le produit de base
      try {
        const newProduct = await prisma.product.create({
          data: {
            name: productName,
            slug: productSlug,
            description: product.description || "Description non disponible",
            price: productPrice,
            stock: 10,
            category: {
              connect: {
                id: hoodieCategory.id,
              },
            },
          },
        });

        // Ajouter l'image principale si disponible
        if (product.image) {
          await prisma.productImage.create({
            data: {
              url: product.image,
              alt: productName,
              position: 0,
              product: {
                connect: {
                  id: newProduct.id,
                },
              },
            },
          });
        }

        // Connecter à la collection
        await prisma.collectionProduct.create({
          data: {
            product: {
              connect: {
                id: newProduct.id,
              },
            },
            collection: {
              connect: {
                id: cozyCollection.id,
              },
            },
            position: 0,
          },
        });

        console.log(`Produit "${productName}" créé avec succès`);
      } catch (productError) {
        console.error(
          `Erreur lors de la création du produit "${productName}":`,
          productError,
        );
      }
    }

    console.log("Importation terminée avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation :", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
