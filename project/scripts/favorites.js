
/* ================== FAVORITES.JS ================== */

/* ===== STORAGE KEY ===== */
const STORAGE_KEY = "englishActivityHubFavorites";

/* ===== LOAD FAVORITES ===== */
export function getFavorites() {
    try {
        const storedFavorites = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        return Array.isArray(storedFavorites)
            ? storedFavorites
            : [];

    } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
    }
}

/* ===== SAVE FAVORITES ===== */
function saveFavorites(favorites) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );

        return true;

    } catch (error) {
        console.error("Error saving favorites:", error);
        return false;
    }
}

/* ===== CHECK FAVORITE STATUS ===== */
export function isFavorite(activityId) {
    return getFavorites().includes(Number(activityId));
}

/* ===== TOGGLE FAVORITE ===== */
export function toggleFavorite(activityId) {
    const id = Number(activityId);
    const favorites = getFavorites();

    const updatedFavorites = favorites.includes(id)
        ? favorites.filter(favoriteId => favoriteId !== id)
        : [...favorites, id];

    const saved = saveFavorites(updatedFavorites);

    return saved ? updatedFavorites.includes(id) : null;
}
