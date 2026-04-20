/**
 * seed.js — Run once to populate the database with sample data
 * Usage: node backend/src/data/seed.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');

const DESTINATIONS = [
  {
    name: 'Bora Bora',
    country: 'French Polynesia',
    continent: 'Oceania',
    category: 'Island',
    description: 'A small South Pacific island northwest of Tahiti, surrounded by a lagoon and barrier reef, known for turquoise waters and luxury overwater bungalows.',
    images: ['https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80'],
    pricePerNight: 850,
    rating: 4.9,
    reviewCount: 1240,
    tags: ['luxury', 'romance', 'overwater bungalow'],
    featured: true,
    climate: 'Tropical',
    bestTime: 'May-October',
  },
  {
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    category: 'Island',
    description: 'An island in the southern Aegean Sea, known for stunning sunsets, white-washed architecture, and crystal-clear waters.',
    images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'],
    pricePerNight: 620,
    rating: 4.8,
    reviewCount: 2180,
    tags: ['romantic', 'views', 'wine', 'sunsets'],
    featured: true,
    climate: 'Mediterranean',
    bestTime: 'April-November',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    category: 'Cultural',
    description: 'Japan\'s former capital, renowned for classical Buddhist temples, gardens, imperial palaces, and traditional wooden architecture.',
    images: ['https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80'],
    pricePerNight: 340,
    rating: 4.9,
    reviewCount: 3450,
    tags: ['culture', 'temples', 'cherry blossom', 'history'],
    featured: true,
    climate: 'Temperate',
    bestTime: 'March-May, October-November',
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    continent: 'Asia',
    category: 'Island',
    description: 'A tropical paradise of 26 coral atolls, famous for crystal-clear waters, white-sand beaches, and world-class diving.',
    images: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80'],
    pricePerNight: 1200,
    rating: 4.9,
    reviewCount: 1870,
    tags: ['luxury', 'diving', 'overwater villa', 'snorkelling'],
    featured: true,
    climate: 'Tropical',
    bestTime: 'November-April',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    category: 'Beach',
    description: 'An Indonesian island known for forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
    pricePerNight: 180,
    rating: 4.7,
    reviewCount: 5200,
    tags: ['spiritual', 'temples', 'surf', 'affordable'],
    featured: true,
    climate: 'Tropical',
    bestTime: 'April-October',
  },
  {
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'Americas',
    category: 'Adventure',
    description: 'A 15th-century Inca citadel in the Eastern Cordillera of southern Peru — one of the world\'s most iconic archaeological sites.',
    images: ['https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80'],
    pricePerNight: 280,
    rating: 4.8,
    reviewCount: 2900,
    tags: ['history', 'hiking', 'inca', 'wonder'],
    featured: true,
    climate: 'Mountain',
    bestTime: 'May-October',
  },
];

const PACKAGES = [
  {
    title: 'Bora Bora Overwater Romance',
    description: 'Seven nights in an exclusive overwater bungalow with private plunge pool, sunset dinners, and couples spa.',
    category: 'Honeymoon',
    price: 4999,
    originalPrice: 6500,
    duration: 8,
    maxGuests: 2,
    rating: 4.9,
    featured: true,
    includes: ['Return Business Class flights','Overwater bungalow (7 nights)','Daily breakfast & 3 sunset dinners','Private snorkelling excursion','Couples spa treatment'],
    images: ['https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80'],
    destinationName: 'Bora Bora',
  },
  {
    title: 'Japan Cherry Blossom Explorer',
    description: 'Ten days through Tokyo, Kyoto, and Osaka during peak cherry blossom season with a local expert guide.',
    category: 'Adventure',
    price: 3299,
    originalPrice: 4200,
    duration: 10,
    maxGuests: 12,
    rating: 4.8,
    featured: true,
    includes: ['Economy class return flights','Luxury ryokan & hotel stays','JR Rail Pass (7 days)','Expert local English guide','Tea ceremony & cooking class'],
    images: ['https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80'],
    destinationName: 'Kyoto',
  },
  {
    title: 'Maldives Private Island Escape',
    description: 'Eleven nights of absolute luxury — private beach villa, bioluminescent night tour, and world-class diving.',
    category: 'Luxury',
    price: 7800,
    duration: 12,
    maxGuests: 2,
    rating: 5.0,
    featured: true,
    includes: ['Business Class return flights','Private beach villa (11 nights)','Full board dining','Daily diving sessions','Sunset dolphin cruise','Private beach picnic'],
    images: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80'],
    destinationName: 'Maldives',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/travelbee');
    console.log('✅ Connected to MongoDB');

    const Destination = require('../models/Destination');
    const Package     = require('../models/Package');

    await Destination.deleteMany({});
    await Package.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const createdDests = await Destination.insertMany(DESTINATIONS);
    console.log(`🌍 Seeded ${createdDests.length} destinations`);

    const pkgsWithRefs = PACKAGES.map((pkg) => {
      const dest = createdDests.find(
        (d) => d.name.toLowerCase().includes(pkg.destinationName.toLowerCase())
      );
      return { ...pkg, destination: dest?._id };
    });

    const createdPkgs = await Package.insertMany(pkgsWithRefs);
    console.log(`✈️  Seeded ${createdPkgs.length} packages`);
    console.log('\n🎉 Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
