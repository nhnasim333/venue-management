export interface Venue {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  address: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingInquiry {
  id: string;
  venueId: string;
  companyName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  attendeeCount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueFilters {
  city?: string;
  minCapacity?: number;
  maxPrice?: number;
}
