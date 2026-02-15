
import React from 'react';
import { 
  Ghost, Pizza, Footprints, AlarmClock, Smartphone, 
  Trash2, Umbrella, Coffee, Dog, Camera, Mic2, 
  PartyPopper, Hammer, CloudRain, Star, Heart,
  UserCheck, Moon, Sun, BookOpen, Video, Shirt,
  Users, Plane, Timer, Box, Zap, Car, Layout,
  Paintbrush, Sparkles, Wind, SmartphoneOff, Music,
  PhoneCall, MessageSquare, Dumbbell, Map, UserCircle,
  Crown, Briefcase, ShieldCheck, Instagram, Clapperboard,
  Search, UserPlus, Fingerprint, MapPin
} from 'lucide-react';

export interface SubNiche {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subNiches: SubNiche[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'comfort-presence',
    title: 'Personal Comfort & Presence',
    description: 'Human presence for when the vibes are off.',
    icon: <Heart className="w-6 h-6" />,
    subNiches: [
      { id: 'cp1', title: 'Personal Listener', description: 'Zero judgement, 100% ears. We listen to your toxic stories while you vent it out.', image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'cp2', title: 'Silent Companion', description: 'Deep work? Sitting in silence? We sit with you and say exactly nothing.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'cp3', title: 'Late Night Walk Buddy', description: 'Walking home at 2 AM? We walk beside you so you can ponder life safely.', image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'cp4', title: 'Morning Routine Assistant', description: 'We wake you up, hand you water, and assist your stretching routine like a personal sensei.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'cp5', title: 'Meditation Companion', description: 'Guided presence during your zen moments. We help keep the distractions at bay.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'cp6', title: 'Reading Companion', description: 'We read your favorite book out loud while you pretend to be a Victorian royal.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
    ]
  },
  {
    id: 'status-flex',
    title: 'Lifestyle & Status',
    description: 'Services to make your neighbors jealous.',
    icon: <Camera className="w-6 h-6" />,
    subNiches: [
      { id: 'sf1', title: 'Personal Paparazzi', description: 'High-end cameras, flashy lenses. We make strangers think you are a celebrity.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'sf2', title: 'Luxury Day Doc', description: 'A cinematic vlog of your day. We make your mundane tasks look like a Netflix documentary.', image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'sf3', title: 'Outfit Selection Assistant', description: 'Your personal stylist for the day. We plan every look from head to toe.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'sf4', title: 'Social Event Companion', description: 'Need a plus-one for a wedding or party? We are the ultimate social wingman.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'sf5', title: 'Cafe Companion', description: 'Premium cafe visits with documentation. We take 400 photos of your latte art.', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'sf6', title: 'Airport Send-off / Pickup', description: 'A tearful, cinematic goodbye or a grand royal welcome at the terminal.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
    ]
  },
  {
    id: 'convenience-lazy',
    title: 'Convenience & Daily Life',
    description: 'We do the boring stuff. You do the napping.',
    icon: <Timer className="w-6 h-6" />,
    subNiches: [
      { id: 'cl1', title: 'Queue Standing', description: 'Bank, govt office, ticket lines? We stand there while you chill in the car.', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'cl2', title: 'Waiting Service', description: 'Waiting for the plumber or a courier? We sit in your lobby so you don’t have to.', image: 'https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'cl3', title: 'Personal Errand Runner', description: 'Need a local task done? Buying gifts, picking up dry cleaning—we handle it.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'cl4', title: 'Car Wash at Home', description: 'Premium style cleaning right in your driveway. We make it sparkle.', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'cl5', title: 'Wardrobe Organizer', description: 'We fix that "clothes mountain" on your chair. Color-coded chaos control.', image: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'cl6', title: 'Room Aesthetic Setup', description: 'We turn your boring room into a "Premium Lifestyle" aesthetic for the ‘Gram.', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
    ]
  },
  {
    id: 'wellness-chill',
    title: 'Wellness & Care',
    description: 'Stress relief for people who hate yoga.',
    icon: <Sparkles className="w-6 h-6" />,
    subNiches: [
      { id: 'wc1', title: 'Head Massage Specialist', description: 'Magic fingers to erase the 14 tabs open in your brain.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'wc2', title: 'Hand / Foot Relaxation', description: 'Focused relaxation for your most tired limbs. Premium care session.', image: 'https://images.unsplash.com/photo-1519415510236-855909a04bc6?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'wc3', title: 'Stress Relief Presence', description: 'A session designed just to ground you. We bring the calm to your chaos.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'wc4', title: 'Digital Detox Companion', description: 'We hide your phone and stop you from doom-scrolling. Real human focus.', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'wc5', title: 'Evening Relaxation Setup', description: 'Lighting, music, lofi vibes. We set the mood for your perfect wind-down.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
    ]
  },
  {
    id: 'social-modern',
    title: 'Social & Modern Life',
    description: 'Handle the world without the social anxiety.',
    icon: <PhoneCall className="w-6 h-6" />,
    subNiches: [
      { id: 'sm1', title: 'Phone Call Proxy', description: 'Hate calling the bank? We talk to them professionally while you hide.', image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'sm2', title: 'Confidence Practice', description: 'Interview tomorrow? We pretend to be a scary boss so you can practice.', image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'sm3', title: 'Gym Companion', description: 'The ultimate motivation partner. We don’t let you skip that last rep.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'sm4', title: 'Hiking / Travel Buddy', description: 'Exploring a new trail? We join you so you’re never lost or alone.', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'sm5', title: 'Local Guide Companion', description: 'Know the hidden gems of the city. We show you the places locals love.', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
    ]
  },
  {
    id: 'creator-digital',
    title: 'Creator & Digital Age',
    description: 'Elevate your online presence with professional aid.',
    icon: <Instagram className="w-6 h-6" />,
    subNiches: [
      { id: 'cd1', title: 'Reel Shooting Assistant', description: 'We handle the transitions, the lighting, and the "pointing at text" shots.', image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
      { id: 'cd2', title: 'Personal Videographer', description: 'On-demand pro video for your day. High-quality b-roll and main shots.', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'cd3', title: 'Profile Photo Upgrade', description: 'Get that high-ticket look. Professional headshots for LinkedIn or social.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'cd4', title: 'Dating Profile Opti', description: 'Photos + Bio overhaul. We fix your profile so you actually get matches.', image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'cd5', title: 'Personal Brand Doc', description: 'Documenting your growth. We create a library of content for your personal brand.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', color: '#FF00D6' },
    ]
  },
  {
    id: 'ultra-premium',
    title: 'Ultra Premium',
    description: 'High-ticket vibes for the absolute bosses.',
    icon: <Crown className="w-6 h-6" />,
    subNiches: [
      { id: 'up1', title: 'Day-Long Assistant', description: '8 to 12 hours of us managing your life while you enjoy your empire.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
      { id: 'up2', title: 'Executive Presence', description: 'Accompanying you as a high-tier assistant for business meetings and events.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', color: '#76C24F' },
      { id: 'up3', title: 'VIP Lifestyle Manager', description: 'Monthly subscription to having zero problems. We handle it all.', image: 'https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=800', color: '#8B5CF6' },
      { id: 'up4', title: 'Personal Time Saver', description: 'Total life management. Every detail handled so you have absolute freedom.', image: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800', color: '#FFCF25' },
    ]
  }
];
