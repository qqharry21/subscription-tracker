# Subscription Tracker

Subscription Tracker is a full-stack application designed to help users efficiently manage their subscriptions. Built using Next.js and Supabase, it offers a seamless experience with modern tools like Tailwind CSS and shadcn/ui.

## Features

- **Subscription Management**: Track and organize your subscriptions in one place.
- **Authentication**: Secure user authentication with Supabase Auth.
- **Responsive Design**: Styled with Tailwind CSS for mobile-first responsiveness.
- **UI Components**: Built with reusable components from shadcn/ui.
- **Full-stack Integration**: Works across Next.js client and server components.
- **Fast Deployment**: Easily deployable to Vercel with Supabase integration.

## Demo

Check out the live demo here: [Subscription Tracker Demo](https://demo-nextjs-with-supabase.vercel.app/)

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm package manager
- A Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/subscription-tracker.git
   cd subscription-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up Supabase:

   - Create a new Supabase project via the [Supabase dashboard](https://database.new).
   - Copy the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase API settings.

4. Configure environment variables:

   - Rename `.env.example` to `.env.local`.
   - Update the file with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=[INSERT YOUR SUPABASE PROJECT URL]
     NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT YOUR SUPABASE ANON KEY]
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```
   Your application will be available at [http://localhost:3000](http://localhost:3000).

### Database Migration

1. Pull the existing database schema from Supabase:

   ```bash
   npx prisma db pull
   ```

2. Update your schema in `prisma/schema.prisma`, then create a new migration file:

   ```bash
   npx prisma migrate dev --name <migration_name>
   ```

3. Apply the migration to the Supabase database:

   ```bash
   npx prisma migrate deploy
   ```

4. Verify the changes:
   - Use `npx prisma studio` to explore your database.
   - Alternatively, check the changes via the Supabase dashboard.

## Deployment

To deploy Subscription Tracker to Vercel:

1. Click the button below to deploy:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/subscription-tracker)

2. During the setup, link your Supabase account to the Vercel project. Environment variables will be automatically configured.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com)
- **Backend**: [Supabase](https://supabase.com) (PostgreSQL, Supabase Auth)
- **Deployment**: [Vercel](https://vercel.com)

## Folder Structure

```
subscription-tracker/
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   └── styles/           # Tailwind CSS configuration and global styles
├── .env.example          # Environment variable template
├── README.md             # Project documentation
```

## Contributing

We welcome contributions! Feel free to open a pull request or submit an issue on GitHub.

## Feedback and Issues

If you encounter any issues or have suggestions for improvement, please file them in the [Issues section](https://github.com/your-username/subscription-tracker/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
