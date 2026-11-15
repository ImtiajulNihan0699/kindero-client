# Kindero – Community Event Management Platform

Kindero is a community-driven event management platform designed to bring people together through social activities, volunteering, and community service. Users can discover events, create their own events, join activities, and manage their participation.

## ✨ Features

### 🏠 Home Page
- Introduces the Kindero platform and its purpose.
- Highlights featured community events.
- Provides easy navigation to explore events and other sections.

### 🔍 Explore & Upcoming Events
- Browse available community events.
- View event information through event cards.
- Discover events based on their availability and categories.

### 📄 Event Details
- View complete information about individual events.
- See event descriptions, dates, locations, categories, and images.
- Join upcoming events.

### ➕ Create Events
- Authenticated users can create new community events.
- Submit event details, including title, description, category, date, location, and image.

### 🗂️ Manage Events
- View events created by the logged-in user.
- Update existing event information.
- Delete events when necessary.

### 🤝 Joined Events
- View events that the user has joined.
- Track event participation.
- Remove participation from joined events.

### 👤 User Profile
- Access personal account information.
- View the user's profile details.

### 🔐 Authentication & Security
- Email and password authentication.
- Google Sign-In integration.
- JWT-based authentication for protected API requests.
- Protected pages and authenticated operations.

---

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** – React framework and application routing.
- **React** – Component-based user interface.
- **TypeScript** – Type safety and improved code maintainability.
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui** – Reusable UI components.
- **Lucide React** – Icons and interface elements.

### Authentication
- **Better Auth** – User authentication and session management.
- **Google OAuth** – Google account sign-in.
- **JWT (JSON Web Tokens)** – Token-based authentication.

### Backend & Database
- **Node.js** – JavaScript runtime.
- **Express.js** – REST API development.
- **MongoDB** – Database for storing events and user participation data.
- **MongoDB Node.js Driver** – Database operations.
- **jose** – JWT verification and JWKS integration.

---

## 📁 Project Structure

```text
kindero-client/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── events/
│   │   ├── profile/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── components/
│   │   ├── events/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── providers/
│   │   └── ui/
│   ├── lib/
│   └── types/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd kindero-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id

BETTER_AUTH_GOOGLE_SECRET=your_google_client_secret

NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 🎯 Project Goal

Kindero aims to encourage community engagement by making it easier for people to discover meaningful activities, organize social events, and participate in initiatives that create positive change.

---

## 👨‍💻 Author

**Imtiajul Islam**

Full Stack Developer
