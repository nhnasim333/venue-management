# Quick Start Guide

Get the Retreat Venue Management System running in under 5 minutes!

## Prerequisites

- Node.js 18+ installed ([download here](https://nodejs.org/))
- A terminal/command prompt

## Installation Steps

### 1. Clone and Install (2 minutes)

```bash
# Navigate to the project directory
cd venue-management

# Install all dependencies
npm install
```

### 2. Setup Database (1 minute)

```bash
# Create database tables
npx prisma migrate dev --name init

# Populate with 10 sample venues
npm run db:seed
```

You should see: `✅ Database seeded successfully with 10 venues`

### 3. Start the Application (30 seconds)

```bash
# Start the development server
npm run dev
```

Wait for: `✓ Ready in X.Xs`

### 4. Open in Browser

Visit: **http://localhost:3000**

## What You'll See

1. **Main Page** - Clean header with "Retreat Venue Finder" title
2. **Filter Panel** - Search by city, capacity, and price
3. **Venue Grid** - 10 beautiful venue cards with images
4. **Booking Button** - Click any "Request Booking" button to test

## Test the Features

### Try Filtering:

1. **City Filter:**

   - Type "San Francisco" → see 1 venue
   - Clear → see all 10 venues again

2. **Capacity Filter:**
   - Enter "50" → see venues with 50+ capacity
3. **Price Filter:**

   - Enter "5000" → see venues ≤ $5000/night

4. **Combined:**
   - City: "San", Capacity: "40", Price: "7000"
   - Click "Apply Filters"

### Try Booking:

1. Click "Request Booking" on any venue
2. Fill in the form:
   - Company Name: "Tech Corp"
   - Email: "team@techcorp.com"
   - Start Date: Tomorrow's date
   - End Date: Day after tomorrow
   - Attendees: "25"
3. Click "Submit Inquiry"
4. See success message! ✅

## Verify Database

Want to see the data?

```bash
# Open Prisma Studio (database viewer)
npx prisma studio
```

Visit http://localhost:5555 to see:

- All 10 venues
- Your booking inquiries

## API Testing (Optional)

Test the API endpoints directly:

```bash
# Get all venues
curl http://localhost:3000/api/venues

# Filter by city
curl "http://localhost:3000/api/venues?city=Boston"

# Create a booking (replace VENUE_ID with actual ID from database)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "venueId": "VENUE_ID",
    "companyName": "Acme Inc",
    "email": "booking@acme.com",
    "startDate": "2025-12-15",
    "endDate": "2025-12-17",
    "attendeeCount": 30
  }'
```

## Troubleshooting

### Port 3000 Already in Use?

```bash
# Kill the process and restart
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev
```

### Database Issues?

```bash
# Reset and reseed database
npx prisma migrate reset --force
npm run db:seed
```

### Module Not Found Errors?

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ **Explore the Code** - Check out the clean TypeScript components
2. ✅ **Read the README** - Comprehensive documentation available
3. ✅ **Test Features** - Try all filtering combinations
4. ✅ **Check the API** - RESTful endpoints with validation
5. ✅ **Review the Database** - Well-structured Prisma schema

## File Locations

- **API Routes:** `app/api/venues/route.ts` and `app/api/bookings/route.ts`
- **Components:** `components/` folder
- **Database Schema:** `prisma/schema.prisma`
- **Seed Data:** `prisma/seed.ts`

## Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

---

**Need Help?** Check the full README.md for detailed documentation!

**Ready to Deploy?** See DEPLOYMENT.md for Vercel deployment instructions!
