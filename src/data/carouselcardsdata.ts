/**
 * Interface for carousel card data structure
 * Defines the properties for individual carousel items
 */
export interface CarouselCard {
  id: number;           // Unique identifier for the card
  title: string;        // Display title for the card
  category: string;     // Category classification
  imageUrl: string;     // Path to the card's image
}

/**
 * Carousel cards data array
 * Contains wedding celebration category cards for the carousel component
 */
export const carouselCardsData: CarouselCard[] = [
  {
    id: 1,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/001.png"
  },
  {
    id: 2,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/002.png"
  },
  {
    id: 3,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/003.png"
  },
  {
    id: 4,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/004.png"
  },
  {
    id: 5,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/005.png"
  },
  {
    id: 6,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/006.png"
  },
  {
    id: 7,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/007.png"
  },
  {
    id: 8,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/008.png"
  },
  {
    id: 9,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/009.png"
  },
  {
    id: 10,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/010.png"
  },
  {
    id: 11,
    title: "Wedding Celebration",
    category: "Wedding",
    imageUrl: "/categories/011.png"
  }
]; 