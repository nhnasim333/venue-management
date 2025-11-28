import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.bookingInquiry.findMany({
      include: {
        venue: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: bookings,
      count: bookings.length,
    });
  } catch (error) {
    console.error('Error fetching booking inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch booking inquiries',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { venueId, companyName, email, startDate, endDate, attendeeCount } = body;

    // Validate required fields
    if (!venueId || !companyName || !email || !startDate || !endDate || !attendeeCount) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return NextResponse.json(
        {
          success: false,
          error: 'Start date cannot be in the past',
        },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        {
          success: false,
          error: 'End date must be after start date',
        },
        { status: 400 }
      );
    }

    // Validate attendee count
    if (attendeeCount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Attendee count must be greater than 0',
        },
        { status: 400 }
      );
    }

    // Fetch the venue to check capacity
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
    });

    if (!venue) {
      return NextResponse.json(
        {
          success: false,
          error: 'Venue not found',
        },
        { status: 404 }
      );
    }

    // Validate attendee count doesn't exceed venue capacity
    if (attendeeCount > venue.capacity) {
      return NextResponse.json(
        {
          success: false,
          error: `Attendee count (${attendeeCount}) exceeds venue capacity (${venue.capacity})`,
        },
        { status: 400 }
      );
    }

    // Create the booking inquiry
    const bookingInquiry = await prisma.bookingInquiry.create({
      data: {
        venueId,
        companyName,
        email,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        attendeeCount,
      },
      include: {
        venue: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: bookingInquiry,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create booking inquiry',
      },
      { status: 500 }
    );
  }
}
