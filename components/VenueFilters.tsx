"use client";

import { useState } from "react";
import { VenueFilters } from "@/types";

interface VenueFiltersProps {
  filters: VenueFilters;
  onFilterChange: (filters: VenueFilters) => void;
}

export default function VenueFiltersComponent({
  filters,
  onFilterChange,
}: VenueFiltersProps) {
  const [localFilters, setLocalFilters] = useState<VenueFilters>(filters);

  const handleInputChange = (key: keyof VenueFilters, value: string) => {
    const newFilters = { ...localFilters };

    if (value === "") {
      delete newFilters[key];
    } else {
      if (key === "minCapacity") {
        newFilters[key] = parseInt(value, 10);
      } else if (key === "maxPrice") {
        newFilters[key] = parseFloat(value);
      } else {
        newFilters[key] = value;
      }
    }

    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Filter Venues</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            value={localFilters.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="e.g., San Francisco"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="minCapacity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Capacity
          </label>
          <input
            type="number"
            id="minCapacity"
            value={localFilters.minCapacity || ""}
            onChange={(e) => handleInputChange("minCapacity", e.target.value)}
            placeholder="e.g., 50"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Price Per Night ($)
          </label>
          <input
            type="number"
            id="maxPrice"
            value={localFilters.maxPrice || ""}
            onChange={(e) => handleInputChange("maxPrice", e.target.value)}
            placeholder="e.g., 5000"
            min="0"
            step="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
