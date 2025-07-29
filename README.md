# Stock Images Platform

A modern, user-friendly platform for discovering and purchasing high-quality stock images. Built with Next.js and Material-UI, this application provides a seamless experience for browsing, searching, and filtering stock images across various categories and languages.


## Tech Stack

- **Frontend Framework:** Next.js 15.2.4
- **UI Library:** Material-UI (@mui/material)
- **Styling:** Styled Components, Tailwind CSS
- **Authentication:** Clerk
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd stockimages
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your Clerk credentials:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY=
RAZORPAY_SECRET=
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/            # Next.js app directory
├── components/     # Reusable UI components
├── lib/            # Utility functions and configurations
└── middleware.ts   # Middleware for authentication
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production


## User Guide for Adding New Projects

---

### 1. Upload Project to Cloudflare R2 Object Storage

- Log in to your Cloudflare account.
- Navigate to **R2 Object Storage** from the dashboard.
- Go to the **Overview** section.
- Upload your new project files with the correct file names.
- After uploading, copy the **Public Development URL** for your project. You will need this URL later.

---

### 2. Open the Project in VSCode

- Open Visual Studio Code (VSCode).
- Open the Stock Images Platform project folder if it is not already opened.

---

### 3. Add New Thumbnail Image

- Navigate to the `public/assetcard` folder inside the project.
- Add your new thumbnail image here.
- Make sure to name the new image file following the existing naming pattern (e.g., `Project_007.jpg`).

---

### 4. Add New Project Details in `src/data/constant.ts`

- Open the file `src/data/constant.ts`.
- Inside the `weddingInvitationDetails` array, add a new project object within curly braces `{}`.
- Follow the existing format and separate your new entry with a comma.
- Example entry:
  ```typescript
  {
    id: 7,
    imageUrl: "/assetcard/Project_007.jpg",
    videoUrl: "https://youtu.be/your-video-link",
    title: "Your Project Title",
    features: ["Project Size XXX MB"],
    price: 499,
    language: "English",
    category: "Wedding",
    downloadUrl: "https://your-public-url-from-cloudflare"
  }
  ```
- Edit all details accordingly to match your new project.

---

### 5. Check Changes Locally

- Open the terminal in VSCode (top left menu or click `ctrl + ~` ).
- Run the development server with:
  ```
  npm run dev
  ```
- Once the server is running, open your browser and go to:
  ```
  http://localhost:3000
  ```
- Verify that your new project and thumbnail appear correctly.

---

### 6. Stop the Development Server

- To stop the running server, go to the terminal.
- Press `Ctrl + C` to terminate the process.

---

### 7. Rebuild and Verify Changes

- Run the build command to ensure all changes are applied:
  ```
  npm run build
  ```
---

### 8. Commit and Sync Deployment

- After verifying your changes, commit your changes using the Git interface in VSCode:
  - Click the Git icon on the left sidebar.
  - Review the files you changed.
  - Select the files you want to commit.
  - Enter a commit message like "Add new project: Your Project Title".
  - Click the commit button and sync your changes.

---