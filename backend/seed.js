import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  category: String,
  image: String
});

const NoticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  priority: String,
  category: String
});

const Event = mongoose.model('Event', EventSchema);
const Notice = mongoose.model('Notice', NoticeSchema);

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Event.deleteMany({});
    await Notice.deleteMany({});

    const events = [
      {
        title: 'Tech Innovation Summit 2026',
        description: 'Join us for a day of inspiring talks from industry leaders about the future of AI and Web3.',
        date: 'May 25, 2026',
        time: '10:00 AM',
        venue: 'Main Auditorium',
        category: 'Academic',
        image: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Inter-Hostel Cricket Finals',
        description: 'The final showdown between Block A and Block B. Come support your team!',
        date: 'May 28, 2026',
        time: '04:00 PM',
        venue: 'Campus Ground',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Cultural Night & Jam Session',
        description: 'A night filled with music, dance, and cultural performances by students.',
        date: 'June 02, 2026',
        time: '07:30 PM',
        venue: 'Amphitheater',
        category: 'Cultural',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
      }
    ];

    const notices = [
      {
        title: 'Hostel Maintenance Schedule',
        description: 'Routine plumbing and electrical maintenance for Block B will take place this Saturday.',
        date: 'May 18, 2026',
        priority: 'Medium',
        category: 'Maintenance'
      },
      {
        title: 'End Term Examination Forms',
        description: 'All students are requested to fill their exam forms by May 30th to avoid late fees.',
        date: 'May 16, 2026',
        priority: 'High',
        category: 'Examination'
      },
      {
        title: 'Summer Internship Drive',
        description: 'The placement cell is organizing an internship drive for 2nd and 3rd year students.',
        date: 'May 15, 2026',
        priority: 'High',
        category: 'Placement'
      }
    ];

    await Event.insertMany(events);
    await Notice.insertMany(notices);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
