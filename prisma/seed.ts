import { prisma } from '../lib/prisma';

async function main() {
  // Clear existing data
  await prisma.bookingInquiry.deleteMany();
  await prisma.venue.deleteMany();

  // Create sample venues
  const venues = [
    {
      name: 'Mountain View Resort',
      description: 'A stunning resort nestled in the mountains with panoramic views, perfect for team retreats and strategic planning sessions.',
      location: 'Aspen, Colorado',
      city: 'Aspen',
      address: '123 Mountain Road, Aspen, CO 81611',
      capacity: 50,
      pricePerNight: 5000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Outdoor Activities', 'Spa', 'Gym']),
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    },
    {
      name: 'Beachside Conference Center',
      description: 'Modern beachfront facility with state-of-the-art meeting rooms and ocean views to inspire creativity.',
      location: 'San Diego, California',
      city: 'San Diego',
      address: '456 Coastal Drive, San Diego, CA 92101',
      capacity: 100,
      pricePerNight: 8000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Beach Access', 'Audio/Visual Equipment', 'Breakout Rooms']),
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    },
    {
      name: 'Urban Innovation Hub',
      description: 'Downtown loft-style venue perfect for tech companies and startups looking for a modern collaborative space.',
      location: 'San Francisco, California',
      city: 'San Francisco',
      address: '789 Market Street, San Francisco, CA 94103',
      capacity: 75,
      pricePerNight: 6500,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Whiteboards', 'Tech Support', 'Parking']),
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    },
    {
      name: 'Lakeside Lodge',
      description: 'Peaceful lakeside retreat offering a perfect balance of work and relaxation for team building activities.',
      location: 'Lake Tahoe, Nevada',
      city: 'Lake Tahoe',
      address: '321 Lakeview Lane, Lake Tahoe, NV 89449',
      capacity: 40,
      pricePerNight: 4500,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Water Sports', 'Hiking Trails', 'Fire Pit']),
      imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    },
    {
      name: 'Historic Mansion Estate',
      description: 'Elegant historic venue with classic architecture and modern amenities, ideal for executive retreats.',
      location: 'Charleston, South Carolina',
      city: 'Charleston',
      address: '555 Heritage Boulevard, Charleston, SC 29401',
      capacity: 60,
      pricePerNight: 7000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Gardens', 'Library', 'Wine Cellar']),
      imageUrl: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800',
    },
    {
      name: 'Desert Oasis Resort',
      description: 'Unique desert setting with stunning sunsets and modern facilities for immersive team experiences.',
      location: 'Scottsdale, Arizona',
      city: 'Scottsdale',
      address: '888 Desert Vista, Scottsdale, AZ 85251',
      capacity: 80,
      pricePerNight: 5500,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Pool', 'Golf Course', 'Spa']),
      imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
    },
    {
      name: 'Woodland Retreat Center',
      description: 'Secluded forest venue offering tranquility and focus for deep work sessions and team bonding.',
      location: 'Portland, Oregon',
      city: 'Portland',
      address: '999 Forest Path, Portland, OR 97201',
      capacity: 35,
      pricePerNight: 3500,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Hiking Trails', 'Meditation Space', 'Campfire Area']),
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    },
    {
      name: 'Skyline Tower Suites',
      description: 'Premium high-rise venue with breathtaking city views and luxury accommodations for corporate events.',
      location: 'New York, New York',
      city: 'New York',
      address: '100 Park Avenue, New York, NY 10016',
      capacity: 120,
      pricePerNight: 10000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Rooftop Terrace', 'Concierge', 'Valet Parking']),
      imageUrl: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800',
    },
    {
      name: 'Countryside Farm Venue',
      description: 'Charming rural venue with farm-to-table dining and outdoor team building opportunities.',
      location: 'Napa, California',
      city: 'Napa',
      address: '777 Vineyard Road, Napa, CA 94558',
      capacity: 45,
      pricePerNight: 4000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Wine Tasting', 'Farm Tours', 'Outdoor Seating']),
      imageUrl: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800',
    },
    {
      name: 'Coastal Lighthouse Inn',
      description: 'Historic coastal venue with maritime charm and modern meeting facilities overlooking the Atlantic.',
      location: 'Boston, Massachusetts',
      city: 'Boston',
      address: '222 Harbor Street, Boston, MA 02108',
      capacity: 55,
      pricePerNight: 6000,
      amenities: JSON.stringify(['WiFi', 'Conference Room', 'Catering', 'Harbor Views', 'Sailing', 'Seafood Restaurant']),
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    },
  ];

  for (const venue of venues) {
    await prisma.venue.create({
      data: venue,
    });
  }

  console.log('✅ Database seeded successfully with', venues.length, 'venues');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
