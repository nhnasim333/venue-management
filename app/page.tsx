import VenueList from "@/components/VenueList";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Retreat Venue Finder
          </h1>
          <p className="mt-2 text-gray-600">
            Find the perfect venue for your team offsite
          </p>
        </div>
        <Navigation />
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VenueList />
      </main>
    </div>
  );
}
