# Neighborly: Your Local Business & Community Hub

Welcome to Neighborly, a modern web application designed to connect users with local businesses and foster a sense of community. This platform serves as a central hub where users can discover services, share experiences, and engage with their neighborhood like never before.

This project is built with a modern tech stack, prioritizing a great user experience, scalability, and clean code.

## Core Features

Neighborly is packed with features designed to make local discovery and interaction seamless and enjoyable.

### 1. Dynamic Dashboard & Social Feed
- **Central Hub**: The dashboard presents a dynamic feed of posts from local businesses and individual users.
- **Post Variety**: The feed supports multiple post types, including special offers, product announcements, upcoming events, user ratings, and general status updates, each with a unique visual style.
- **Interactive Posts**: Users can like, comment on, and share posts. They can also create their own status updates.
- **User/Business Popovers**: Hovering over a user or business name reveals a detailed popover with their bio, follower counts, and a "Follow" button.

### 2. Interactive Explore Page
- **Map-Based Discovery**: A fully interactive map (powered by OpenStreetMap and `react-map-gl`) allows users to visually explore the location of local businesses.
- **Advanced Search & Filtering**: Users can easily find what they're looking for with:
    - A real-time search bar for names and keywords.
    - Category filters (e.g., "Home Services", "Restaurants").
    - A minimum rating filter (e.g., "4 Stars & Up").
- **Synchronized List & Map**: The list of businesses updates instantly as filters are applied. Clicking a business in the list automatically pans and zooms the map to its location.

### 3. Detailed Business & User Profiles
- **Comprehensive Profiles**: The profile page showcases a business's or user's information, including a cover image, avatar, bio, and key details like location and website.
- **Tabbed Content**: Information is neatly organized into tabs for:
    - **Services**: A list of services offered, with pricing and ratings.
    - **Posts**: A feed of all posts made by that user/business.
    - **Reviews**: A collection of reviews from other users.
- **"Request a Quote"**: An integrated dialog allows users to easily send a message to a business to request a quote for their services.

### 4. Real-Time Messaging
- **Direct Communication**: A dedicated messaging interface allows users to have private conversations with businesses.
- **Familiar Layout**: The classic two-pane layout displays a list of conversations on the left and the active chat on the right, providing an intuitive user experience.

### 5. Modern & Responsive UI
- **Light & Dark Themes**: The entire application supports both light and dark modes, with a theme toggle in the header for users to choose their preference. The theme is persisted across sessions.
- **Fully Responsive**: The layout is designed to work beautifully across all devices, from large desktops to mobile phones, with adaptive navigation and content.
- **Professional Components**: Built with ShadCN UI and Tailwind CSS for a polished, consistent, and modern look and feel.

---

## Application Workflow & Structure

The application is built using the Next.js App Router, which enables a powerful and organized structure based on server components and modern React patterns.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: ShadCN UI
- **Styling**: Tailwind CSS
- **Mapping**: `react-map-gl` with OpenStreetMap
- **Icons**: `lucide-react`

### Routing
The main application routes are organized within the `src/app/(main)/` directory group:
- `layout.tsx`: The main layout for the authenticated part of the app, containing the shared header and navigation.
- `dashboard/page.tsx`: The main social feed.
- `explore/page.tsx`: The business discovery page with the list and map.
- `messages/page.tsx`: The private messaging interface.
- `profile/page.tsx`: The detailed user/business profile page.

### Data Flow
Currently, the application uses mock data defined directly within the page components (e.g., `initialPosts` in `dashboard/page.tsx`, `businesses` in `explore/page.tsx`). This data is managed using React's `useState` hook. In a production environment, this static data would be replaced with API calls to a backend service and database.

---

## Data Models

The application relies on a few key data structures to represent its content. Here are simplified versions of the main models:

### Business / Author Model
```typescript
{
  id: number;
  name: string;
  handle: string;
  avatar: string;
  type: 'business' | 'individual';
  rating: number | null;
  bio: string;
  followers: number;
  following: number;
  coords: [number, number]; // [longitude, latitude]
}
```

### Post Model
```typescript
{
  id: number;
  type: 'offer' | 'rating' | 'event' | 'product' | 'status';
  author: Author; // Reference to the Author model
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  // Type-specific fields:
  title?: string; // For offers
  eventName?: string; // For events
  productName?: string; // For products
  rating?: number; // For ratings
}
```

---

## Getting Started

To run the application locally:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
