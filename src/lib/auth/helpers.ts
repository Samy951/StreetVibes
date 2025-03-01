import { baseAuth } from "./auth";

/**
 * Fonction utilitaire pour récupérer la session utilisateur côté serveur
 * @returns La session utilisateur ou null si non authentifié
 */
export async function getSession() {
  return baseAuth();
}
