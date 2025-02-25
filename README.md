<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=4169E1" alt="postgresql" />
    <img src="https://img.shields.io/badge/-Upstash-black?style=for-the-badge&logoColor=white&logo=upstash&color=00E9A3" alt="upstash" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">A Library Management System with Admin Panel</h3>
</div>

## <a name="introduction">🤖 Introduction</a>

Built with Next.js, TypeScript, and Postgres, the Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities such as registration process, seamless book borrowing with reminders, robust user management, and a modern, optimized tech stack for real-world scalability.

## <a name="tech-stack">⚙️ Tech Stack</a>

<details>
  <summary><code>Tech Stack</code></summary>
  - Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Resend
- Tailwind CSS
</details>

## <a name="features">🔋 Features</a>

### Features of the Library Management System Project

👉 **Open-source Authentication**: Personalized onboarding flow with email notifications.  

👉 **Home Page**: Highlighted books and newly added books with 3D effects.   

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and suggestions for similar books.  

👉 **Profile Page**: Manage accounts, track borrowed books, and download receipts (in progress).  

👉 **Onboarding Workflows**: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.

<details>
  <summary><code>Admin Features</code></summary>
  
  ### **Admin features are only accessible to a user with the following credentials**

  Email: **admin@admin.com**
  
  Password: **test1234**
  
👉 **Analytics Dashboard**: Statistics, new users, books, borrow requests, and more.  

👉 **All Users Page**: View and manage users, including approving or revoking access (in progress).  

👉 **Account Requests Page**: Admin approval for account requests, with email notifications for user verification (in progress).  

👉 **All Books Page**: List and manage all library books with advanced search, pagination, and filters (in progress). 

👉 **Book Management Forms**: Add new books and edit existing entries.
</details>

<details>
  <summary><code>General Features</code></summary>
  
👉 **Advanced Functionalities**: Caching, rate-limiting, DDoS protection, and custom notifications.  

👉 **Database Management**: Postgres with Neon for scalable and collaborative database handling.  

👉 **Real-time Media Processing**: ImageKit for image and video optimization and transformations. 

👉 **Efficient Caching**: Upstash Redis for caching, workflows, and triggers.  

👉 **Database ORM**: Drizzle ORM for simplified and efficient database interactions.  

👉 **Modern UI/UX**: Built with TailwindCSS, ShadCN, and other cutting-edge tools.  

👉 **Technology Stack**: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.  

</details>

## <a name="quick-start">🤸 Demo and Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Demo**

- [DEMO](https://bookwise-weld.vercel.app/)
- [DEMO_ADMIN](https://bookwise-weld.vercel.app/admin)

<details>
  <summary><code>Cloning, Installing, Running</code></summary>
    
**Cloning the Repository**

```bash
git clone https://github.com/Sasha-Krasnoshchokov/bookwise
cd bookwise_dashboard
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=
```

Replace the placeholder values with your actual ImageKit, NeonDB, and Upstash credentials. You can obtain these credentials by signing up on the [ImageKit](https://bit.ly/49zmXkt), [NeonDB](https://fyi.neon.tech/1jsm), and [Upstash](https://upstash.com/?utm_source=jsmastery1). 

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

</details>
