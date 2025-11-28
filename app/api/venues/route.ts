import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const minCapacity = searchParams.get('minCapacity');
    const maxPrice = searchParams.get('maxPrice');

    // Build the where clause dynamically based on filters
    const where: Prisma.VenueWhereInput = {};

    if (city) {
      where.city = {
        contains: city,
      };
    }

    if (minCapacity) {
      where.capacity = {
        gte: parseInt(minCapacity, 10),
      };
    }

    if (maxPrice) {
      where.pricePerNight = {
        lte: parseFloat(maxPrice),
      };
    }

    const venues = await prisma.venue.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Parse amenities JSON string back to array for each venue
    const venuesWithParsedAmenities = venues.map((venue) => ({
      ...venue,
      amenities: JSON.parse(venue.amenities),
    }));

    return NextResponse.json({
      success: true,
      data: venuesWithParsedAmenities,
      count: venuesWithParsedAmenities.length,
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch venues',
      },
      { status: 500 }
    );
  }
}
