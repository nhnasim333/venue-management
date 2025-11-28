"use client";

import { useState, useEffect } from "react";
import { Venue, VenueFilters } from "@/types";
import VenueCard from "@/components/VenueCard";
import VenueFiltersComponent from "@/components/VenueFilters";

export default function VenueList() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VenueFilters>({});

  useEffect(() => {
    fetchVenues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.city) params.append("city", filters.city);
      if (filters.minCapacity)
        params.append("minCapacity", filters.minCapacity.toString());
      if (filters.maxPrice)
        params.append("maxPrice", filters.maxPrice.toString());

      const response = await fetch(`/api/venues?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setVenues(data.data);
      } else {
        setError(data.error || "Failed to fetch venues");
      }
    } catch (err) {
      setError("An error occurred while fetching venues");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: VenueFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <VenueFiltersComponent
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="text-gray-600 text-sm">
        Found {venues.length} venue{venues.length !== 1 ? "s" : ""}
      </div>

      {venues.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            No venues found matching your criteria.
          </p>
          <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
}
