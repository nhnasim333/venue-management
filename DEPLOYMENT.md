# Deployment Guide

## Deploying to Vercel

This application can be easily deployed to Vercel with a few configuration steps.

### Prerequisites

- A Vercel account (sign up at vercel.com)
- GitHub repository with the code pushed

### Steps

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import Project to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Select your repository
   - Configure the project:
     - Framework Preset: Next.js
     - Build Command: `npm run build` (default)
     - Output Directory: `.next` (default)

3. **Database Considerations**

   **Option A: Continue with SQLite (Development/Demo)**

   - The SQLite database will be created during build
   - Add a build script to seed the database:
     ```json
     "scripts": {
       "build": "npx prisma generate && npx prisma migrate deploy && npm run db:seed && next build"
     }
     ```
   - ⚠️ Note: SQLite is ephemeral on Vercel - database resets on each deployment

   **Option B: Upgrade to PostgreSQL (Recommended for Production)**

   1. Create a PostgreSQL database (options):

      - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
      - [Supabase](https://supabase.com/)
      - [Railway](https://railway.app/)
      - [Neon](https://neon.tech/)

   2. Update `prisma/schema.prisma`:

      ```prisma
      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model Venue {
        // ... existing fields
        pricePerNight   Decimal          @db.Decimal(10, 2)  // Restore Decimal type
        amenities       String[]         // Restore array type
        // ... rest of fields
      }
      ```

   3. Add environment variable in Vercel:

      - Go to Project Settings → Environment Variables
      - Add `DATABASE_URL` with your PostgreSQL connection string

   4. Update seed script to work with PostgreSQL amenities array

   5. Run migrations:
      ```bash
      npx prisma migrate dev --name switch_to_postgres
      ```

4. **Environment Variables**

   - Add to Vercel project settings:
     ```
     DATABASE_URL=<your-database-url>
     ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Post-Deployment

1. **Seed the database** (for PostgreSQL):

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Link project
   vercel link

   # Run seed command
   vercel env pull .env.local
   npm run db:seed
   ```

2. **Test the deployment**:
   - Visit your Vercel URL
   - Test venue listing and filtering
   - Test booking form submission

### Recommended Production Setup

For a production-ready deployment:

1. **Use PostgreSQL** instead of SQLite
2. **Set up database backups** through your database provider
3. **Add monitoring** (e.g., Vercel Analytics, Sentry)
4. **Configure custom domain** in Vercel settings
5. **Set up CI/CD** for automated testing before deployment
6. **Add rate limiting** to API endpoints
7. **Enable CORS** if needed for external API access

### Troubleshooting

**Build Failures:**

- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

**Database Connection Issues:**

- Verify `DATABASE_URL` is correct
- Check if database allows external connections
- Ensure IP whitelist includes Vercel's IPs (if applicable)

**Images Not Loading:**

- Verify `next.config.ts` has correct image domains
- Check if image URLs are accessible from Vercel's servers

### Performance Optimization

Once deployed:

1. Enable Vercel Analytics
2. Monitor Core Web Vitals
3. Optimize images with Next.js Image component
4. Consider adding Redis for caching
5. Implement pagination for venue listing

---

For more information, see:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deploy](https://www.prisma.io/docs/guides/deployment)
