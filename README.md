# Retreat Venue Management System

A full-stack web application for searching and booking venues for team offsites, built with Next.js, TypeScript, Prisma, and SQLite.

## Features

### Backend (API)

- **Venues Endpoint** (`GET /api/venues`)

  - Returns a list of all venues
  - Supports filtering by:
    - `city` - Filter by city name
    - `minCapacity` - Minimum attendee capacity
    - `maxPrice` - Maximum price per night
  - Returns venues with all details including amenities

- **Booking Inquiry Endpoint** (`POST /api/bookings`)
  - Creates a new booking inquiry
  - Required fields: `venueId`, `companyName`, `email`, `startDate`, `endDate`, `attendeeCount`
  - Validates:
    - All required fields are present
    - Email format is valid
    - Start date is not in the past
    - End date is after start date
    - Attendee count doesn't exceed venue capacity
    - Attendee count is greater than 0

### Database

- **Venue Model**

  - Name, description, location details (city, address)
  - Capacity and price per night
  - Amenities (stored as JSON string for SQLite compatibility)
  - Image URL for venue photos
  - Timestamps for creation and updates

- **BookingInquiry Model**
  - References venue via foreign key
  - Company and contact information
  - Date range for booking
  - Attendee count with validation
  - Status tracking (pending/confirmed/rejected)
  - Timestamps

### Frontend

- **Venue Search Page**

  - Grid layout displaying all venues
  - Filter panel with:
    - City search
    - Minimum capacity filter
    - Maximum price filter
  - Real-time filtering
  - Loading states
  - Error handling

- **Venue Cards**

  - Display venue image, name, location
  - Show capacity and price
  - List amenities (top 4 with overflow indicator)
  - "Request Booking" button

- **Booking Modal**
  - Form with all required fields
  - Client-side and server-side validation
  - Real-time feedback
  - Success and error states
  - Disabled state during submission

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd venue-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   ```bash
   # Run migrations to create database tables
   npx prisma migrate dev --name init

   # Seed the database with sample venues
   npm run db:seed
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with sample data
- `npx prisma studio` - Open Prisma Studio to view/edit database

## Technical Approach

### Architecture Decisions

1. **Database Choice - SQLite**

   - Chose SQLite over PostgreSQL for simplicity and ease of setup
   - No external database server required
   - Perfect for development and demonstration
   - Trade-off: Limited to single-server deployments
   - Note: Stored amenities as JSON string instead of array due to SQLite limitations

2. **API Design**

   - RESTful endpoints with clear resource naming
   - Query parameters for filtering (GET requests)
   - JSON body for mutations (POST requests)
   - Consistent response format with `success` flag and `data`/`error` fields
   - Proper HTTP status codes (200, 201, 400, 404, 500)

3. **Frontend Architecture**

   - Client-side components for interactivity
   - Component separation (VenueList, VenueCard, VenueFilters, BookingModal)
   - State management with React hooks
   - Form validation on both client and server
   - Loading and error states for better UX

4. **Type Safety**

   - Shared TypeScript types between frontend and backend
   - Prisma-generated types for database models
   - Strict TypeScript configuration

5. **Styling**
   - Tailwind CSS for rapid development
   - Responsive design (mobile-first)
   - Consistent color scheme and spacing
   - Hover states and transitions for interactivity

### Code Structure

```
venue-management/
├── app/
│   ├── api/
│   │   ├── venues/route.ts      # Venues API endpoint
│   │   └── bookings/route.ts    # Bookings API endpoint
│   ├── page.tsx                  # Main page
│   └── layout.tsx                # Root layout
├── components/
│   ├── VenueList.tsx            # Venue listing with filters
│   ├── VenueCard.tsx            # Individual venue card
│   ├── VenueFilters.tsx         # Filter component
│   └── BookingModal.tsx         # Booking form modal
├── lib/
│   └── prisma.ts                # Prisma client singleton
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Seed data script
│   └── migrations/              # Database migrations
├── types/
│   └── index.ts                 # TypeScript type definitions
└── package.json
```

## Trade-offs and Decisions

### What Was Prioritized

1. **Functionality over Polish**

   - Focused on core features working correctly
   - Basic but clean UI design
   - All required features implemented

2. **Type Safety**

   - Strong TypeScript usage throughout
   - Prisma for type-safe database access
   - Clear interface definitions

3. **Error Handling**

   - Comprehensive validation on both client and server
   - User-friendly error messages
   - Proper error states in UI

4. **Code Organization**
   - Clean separation of concerns
   - Reusable components
   - Clear file structure

### What Was Simplified

1. **Database**

   - Used SQLite instead of PostgreSQL for easier setup
   - Stored amenities as JSON string instead of proper relations

2. **Authentication**

   - No authentication/authorization (out of scope)
   - Anyone can create booking inquiries

3. **Pagination**

   - Not implemented (bonus feature)
   - Could cause performance issues with many venues

4. **Availability Checking**
   - No double-booking prevention (bonus feature)
   - Would require date range overlap queries

## What I'd Improve With More Time

### High Priority

1. **Pagination**

   - Add pagination to venue listing
   - Improve performance with large datasets
   - Add page size selection

2. **Availability System**

   - Implement date range conflict checking
   - Prevent double-bookings
   - Show calendar with available/unavailable dates
   - Add booking status workflow

3. **Testing**

   - Unit tests for API endpoints
   - Integration tests for booking flow
   - E2E tests with Playwright or Cypress
   - Component tests with React Testing Library

4. **Form Enhancements**
   - Add more validation (phone number, etc.)
   - Save form state to localStorage
   - Add confirmation step before submission
   - Email notifications for booking inquiries

### Medium Priority

5. **Search Enhancements**

   - Full-text search for venue names/descriptions
   - Date range availability search
   - Sort options (price, capacity, name)
   - Save/bookmark favorite venues

6. **UI/UX Improvements**

   - Image carousel for venues
   - Map integration showing venue locations
   - Venue comparison feature
   - Print/export venue details

7. **Admin Features**

   - Admin dashboard for managing venues
   - Booking inquiry management
   - Analytics and reporting
   - Bulk operations

8. **Database Migration**
   - Move to PostgreSQL for production
   - Proper amenities table with relations
   - Add indexes for common queries
   - Implement database connection pooling

### Nice to Have

9. **Additional Features**

   - User accounts and login
   - Review and rating system
   - Photo uploads
   - Pricing calculator (multi-day discounts)
   - Real-time availability updates
   - Integration with calendar systems

10. **Performance Optimization**

    - Image optimization and lazy loading
    - API response caching
    - Database query optimization
    - Implement CDN for static assets

11. **Deployment**
    - Set up CI/CD pipeline
    - Deploy to Vercel
    - Configure production database
    - Set up monitoring and error tracking

## API Examples

### Get All Venues

```bash
curl http://localhost:3000/api/venues
```

### Filter Venues

```bash
# By city
curl "http://localhost:3000/api/venues?city=San%20Francisco"

# By minimum capacity
curl "http://localhost:3000/api/venues?minCapacity=50"

# By maximum price
curl "http://localhost:3000/api/venues?maxPrice=5000"

# Combined filters
curl "http://localhost:3000/api/venues?city=San&minCapacity=40&maxPrice=6000"
```

### Create Booking Inquiry

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "venueId": "cm4m1234567890",
    "companyName": "Tech Corp",
    "email": "team@techcorp.com",
    "startDate": "2025-12-01",
    "endDate": "2025-12-03",
    "attendeeCount": 25
  }'
```

## Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Image Hosting**: Unsplash (for demo images)
- **Development**: ESLint, TypeScript strict mode

## License

This project was created as a take-home assignment for Retreat.

---

Built with ❤️ for Retreat
