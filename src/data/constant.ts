/**
 * Wedding invitation template data
 * Contains detailed information about available wedding invitation templates
 * Each template includes media assets, pricing, and download information
 */
export const weddingInvitationDetails = [{
    id: 1,
    imageUrl: "/assetcard/Project_001.jpg",
    videoUrl: "https://youtu.be/HefxBttRjCw?si=GZfvGBabGcwjRnXb",
    title: "Traditional ancient Project 01",
    features: ["Project Size 105 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%201.rar"
  },
  {
    id: 2,
    imageUrl: "/assetcard/Project_002.jpg",
    videoUrl: "https://youtu.be/9JEF1i2jrkk?si=VO3uRPGw94MbEYcS",
    title: "Indian Hindu Project 02",
    features: ["Project Size 112 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%202.rar"
  },
  {
    id: 3,
    imageUrl: "/assetcard/Project_003.jpg",
    videoUrl: "https://youtu.be/pOQL0XYR3ks?si=SVlGxwZRdsKhOkRg",
    title: "Best Musical Project 03",
    features: ["Project Size 144 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%203.rar"
  },
  {
    id: 4,
    imageUrl: "/assetcard/Project_004.jpg",
    videoUrl: "https://youtu.be/dnl6gJUWm_A?si=Pyb9ISBUv_b1Ovbb",
    title: "Cinematic Wedding Project 04",
    features: ["Project Size 173 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%204.rar"
  },
  {
    id: 5,
    imageUrl: "/assetcard/Project_005.jpg",
    videoUrl: "https://youtu.be/0a3jqhgGwNc?si=HYcqG0KAfO-NLHyf",
    title: "Classic Wedding Project 05",
    features: ["Project Size 225 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%205.rar"
  },
  {
    id: 6,
    imageUrl: "/assetcard/Project_006.jpg",
    videoUrl: "https://youtu.be/HpdAzQ23AFc?si=RnTgLpWudnYNSl-N",
    title: "Trendy Wedding Project 06",
    features: ["Project Size 140 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%206.rar"
  },
];

/**
 * Helper function to create features array with custom project size
 * @param projectSize - The project size in MB (e.g., "540 MB")
 * @returns Array of features with the specified project size
 */
export const createFeatures = (projectSize: string): string[] => {
  return [`Project Size ${projectSize}`];
};

  