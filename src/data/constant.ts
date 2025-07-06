/**
 * Base features array for wedding invitation templates
 * Contains common features that apply to all templates
 */
const baseFeatures = [
  "Complete Pre Rendered Elements",
  "Video Help File Included",
  "Works in Adobe Premiere Pro CC 2015 and Above",
  "Video Orientation is Vertical",
  "Well Organized and Easy to Use",
  "No Plugins Required",
  "Very Easy to Customize",
  "Placeholders Formats - PSD, JPG, PNG",
];

/**
 * Wedding invitation template data
 * Contains detailed information about available wedding invitation templates
 * Each template includes media assets, pricing, and download information
 */
export const weddingInvitationDetails = [{
    id: 1,
    imageUrl: "/assetcard/project_001.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 105 MB"],
    price: 499,
    language: "Hindi",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%201.rar"
  },
  {
    id: 2,
    imageUrl: "/assetcard/project_002.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 112 MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%202.rar"
  },
  {
    id: 3,
    imageUrl: "/assetcard/project_003.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 144 MB"],
    price: 499,
    language: "Telugu",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%203.rar"
  },
  {
    id: 4,
    imageUrl: "/assetcard/project_004.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 173 MB"],
    price: 499,
    language: "Telugu",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%204.rar"
  },
  {
    id: 5,
    imageUrl: "/assetcard/project_005.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 225 MB"],
    price: 499,
    language: "Telugu",
    category: "Wedding",
    downloadUrl: "https://pub-881ec584fade4d4a8ecd1deec859aeea.r2.dev/Vr%20Visual%20Magics%20Project%205.rar"
  },
  {
    id: 6,
    imageUrl: "/assetcard/project_006.jpg",
    videoUrl: "https://www.youtube.com/shorts/6ImfFWCIsBo",
    title: "Traditional Wedding Invitation",
    features: [...baseFeatures, "Project Size 140 MB"],
    price: 499,
    language: "Telugu",
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
  return [...baseFeatures, `Project Size ${projectSize}`];
};

  