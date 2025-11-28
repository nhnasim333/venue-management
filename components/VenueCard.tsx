"use client";

import { useState } from "react";
import { Venue } from "@/types";
import BookingModal from "@/components/BookingModal";
import Image from "next/image";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {venue.imageUrl && (
          <div className="relative h-48 w-full bg-gray-200">
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {venue.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{venue.location}</p>
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {venue.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Capacity:</span>
              <span className="font-medium text-gray-900">
                {venue.capacity} people
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Price per night:</span>
              <span className="font-medium text-gray-900">
                ${venue.pricePerNight.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {venue.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {venue.amenities.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{venue.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Request Booking
          </button>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          venue={venue}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </>
  );
}
