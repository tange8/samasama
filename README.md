# SamaSama

SamaSama is a centralized platform for news and updates within UCI Kababayan's Alyansa. While Kababayan offers a wide range of activities and programs, fragmented social media updates make it difficult for students to stay informed. Instead of hunting through separate social media profiles or stumbling upon opportunities by chance, students can use SamaSama to discover events, initiatives, and community resources — all in one unified, purpose-built platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js (Express) |
| Database & Auth | Supabase (PostgreSQL) |
| Styling | Tailwind CSS |

---

## Project Structure

```
samasama/
├── client/       #React frontend (Vite): UI, feed, public data fetching
└── server/       #Node.js/Express backend: secure logic, admin verification, routing
```

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/tange8/samasama.git
cd samasama
```

### 2. Install dependencies
```bash
#root
npm install

#client
cd client && npm install

#server
cd ../server && npm install
```

### 3. Environment Variables

Create a `.env` file in both `/client` and `/server` with your Supabase credentials:

```bash
# /server/.env
SUPABASE_URL= 'https://pzazipbuaqshnkqgixzt.supabase.co'
SUPABASE_SERVICE_ROLE_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YXppcGJ1YXFzaG5rcWdpeHp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTUzNzAzNiwiZXhwIjoyMDg3MTEzMDM2fQ.Tr1h1cXeGcAs969jz_GF4MrRayuG5GQAWpjJ6hTwmrc'

# /client/.env
VITE_SUPABASE_URL= 'https://pzazipbuaqshnkqgixzt.supabase.co'
VITE_SUPABASE_ANON_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YXppcGJ1YXFzaG5rcWdpeHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MzcwMzYsImV4cCI6MjA4NzExMzAzNn0.9jid4wqiwhkL1PpsOKKBExZVXqO4rJTtUK3tGfrEIQ8'
```

### 4. Run the development environment & start the server
```bash
cd ../client && npm run dev
```

```bash
cd ../server && npm start
```

The app will be running at **http://localhost:5173**

---

## Acknowledgements

A special thank you to our designers: Vivienne Catarroja, Bryant Dang, Tawann Alvarez, Grace Jong, Maiella Nuqui
And our developers: Emily Tang, Farin Soriano, Kaila Miyasaki, Julianna Alderete, Mailee Dizon, Christopher Walden, Sebastian Capuyan, Ethan Chao



---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for full license text.
