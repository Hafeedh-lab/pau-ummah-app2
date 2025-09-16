import type {
  EventCategory,
  EventItem,
  MediaItem,
  NavigationItem,
  PastEvent,
  PrayerSchedule,
  WhatWeDoItem,
} from "@/types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Prayer Times", href: "#prayer-times" },
  { label: "What We Do", href: "#services" },
  { label: "Past Events", href: "#past-events" },
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Contact", href: "#contact" },
];

export const PRAYER_SCHEDULE: PrayerSchedule[] = [
  {
    name: "fajr",
    displayName: "Fajr",
    callToPrayer: "05:15",
    congregation: "05:35",
  },
  {
    name: "dhuhr",
    displayName: "Dhuhr",
    callToPrayer: "12:45",
    congregation: "13:15",
  },
  {
    name: "asr",
    displayName: "Asr",
    callToPrayer: "15:45",
    congregation: "16:00",
  },
  {
    name: "maghrib",
    displayName: "Maghrib",
    callToPrayer: "18:32",
    congregation: "18:35",
  },
  {
    name: "isha",
    displayName: "Isha",
    callToPrayer: "19:55",
    congregation: "20:10",
  },
  {
    name: "jumuah",
    displayName: "Jumu'ah",
    callToPrayer: "13:00",
    congregation: "13:30",
  },
];

export const WHAT_WE_DO_ITEMS: WhatWeDoItem[] = [
  {
    id: "spiritual-growth",
    title: "Daily Congregational Prayers",
    description:
      "Join our vibrant community for all five daily prayers alongside inspiring reminders and supplications.",
    icon: "moon-star",
    ctaLabel: "View prayer schedule",
    href: "#prayer-times",
  },
  {
    id: "education",
    title: "Knowledge Circles",
    description:
      "Weekly halaqahs, tafsir sessions, and seminars with scholars that nurture sound Islamic understanding.",
    icon: "book-open",
    ctaLabel: "Explore learning",
    href: "#upcoming-events",
  },
  {
    id: "community",
    title: "Community Service",
    description:
      "Volunteer-driven programmes that empower the Ummah through social impact, mentorship, and charity.",
    icon: "users",
    ctaLabel: "Join the team",
    href: "#contact",
  },
  {
    id: "wellness",
    title: "Student Wellbeing",
    description:
      "Peer support, counselling referrals, and recreation nights that keep students energised and connected.",
    icon: "heart",
    ctaLabel: "Discover resources",
    href: "#about",
  },
];

export const EVENT_CATEGORIES: { label: string; value: EventCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Education", value: "education" },
  { label: "Spiritual", value: "spiritual" },
  { label: "Community", value: "community" },
  { label: "Charity", value: "charity" },
  { label: "Youth", value: "youth" },
  { label: "Volunteering", value: "volunteering" },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "islamic-seminar",
    title: "Islamic Seminar",
    date: "Every Saturday",
    time: "10:00 AM",
    location: "Main Musalla",
    image: "https://via.placeholder.com/640x360.png?text=Islamic+Seminar",
    category: "education",
    description:
      "Interactive sessions covering fiqh, creed, and prophetic guidance for university life.",
    registrationLink: "https://pau.edu.ng/events/seminar",
    featured: true,
  },
  {
    id: "game-night",
    title: "Game Night",
    date: "Wednesdays",
    time: "After Isha",
    location: "Community Hall",
    image: "https://via.placeholder.com/640x360.png?text=Game+Night",
    category: "youth",
    description:
      "Unwind with fellow students through strategic board games, sports challenges, and refreshments.",
  },
  {
    id: "sisters-circle",
    title: "Sisters' Reflection Circle",
    date: "Fridays",
    time: "4:00 PM",
    location: "Sisters' Wing",
    image: "https://via.placeholder.com/640x360.png?text=Sisters+Circle",
    category: "spiritual",
    description:
      "Weekly circle focusing on spiritual growth, reflections, and shared experiences for sisters.",
  },
  {
    id: "charity-drive",
    title: "Monthly Charity Drive",
    date: "Last Saturday",
    time: "2:00 PM",
    location: "Campus Gate",
    image: "https://via.placeholder.com/640x360.png?text=Charity+Drive",
    category: "charity",
    description:
      "Support the wider community through donation drives, outreach, and collaborative service projects.",
  },
];

export const PAST_EVENTS: PastEvent[] = [
  {
    id: "iftar-dinner",
    title: "Campus Iftar Dinner",
    date: "Ramadan 1445",
    time: "6:30 PM",
    location: "Mosque Courtyard",
    image: "https://via.placeholder.com/640x360.png?text=Campus+Iftar",
    category: "community",
    description:
      "Over 300 students gathered for a memorable evening of duas, reflection, and gratitude.",
    galleryLink: "https://pau.edu.ng/gallery/iftar-dinner",
  },
  {
    id: "career-seminar",
    title: "Faith & Careers Seminar",
    date: "Jan 2024",
    time: "3:00 PM",
    location: "Innovation Hub",
    image: "https://via.placeholder.com/640x360.png?text=Faith+%26+Careers",
    category: "education",
    description:
      "Industry professionals shared insights on balancing workplace excellence with strong faith values.",
  },
  {
    id: "community-outreach",
    title: "Community Outreach",
    date: "Nov 2023",
    time: "9:00 AM",
    location: "Lagos Mainland",
    image: "https://via.placeholder.com/640x360.png?text=Community+Outreach",
    category: "charity",
    description:
      "Distribution of relief packages and mentorship visits to neighbouring schools and communities.",
  },
  {
    id: "qiyam-night",
    title: "Qiyam Night",
    date: "Dec 2023",
    time: "11:00 PM",
    location: "Main Musalla",
    image: "https://via.placeholder.com/640x360.png?text=Qiyam+Night",
    category: "spiritual",
    description:
      "A soulful night of tahajjud, collective dua, and heartfelt recitations led by student Qaris.",
  },
];

export const FEATURED_MEDIA: MediaItem[] = [
  {
    id: "video-1",
    type: "video",
    url: "https://storage.googleapis.com/pau-mosque/media/iftar-highlights.mp4",
    thumbnail: "https://via.placeholder.com/540x960.png?text=Iftar+Highlights",
    title: "Ramadan Iftar Highlights",
    description: "Moments of unity, dua, and joy from our annual campus iftar dinner.",
    date: "2024-03-20",
    eventType: "community",
    likes: 1240,
    views: 19800,
    duration: 95,
    tags: ["ramadan", "community"],
  },
  {
    id: "video-2",
    type: "video",
    url: "https://storage.googleapis.com/pau-mosque/media/seminar-recap.mp4",
    thumbnail: "https://via.placeholder.com/540x960.png?text=Faith+%26+Careers",
    title: "Faith & Careers",
    description: "A glimpse into our transformational seminar with alumni mentors.",
    date: "2024-01-12",
    eventType: "education",
    likes: 980,
    views: 15200,
    duration: 72,
    tags: ["career", "seminar"],
  },
  {
    id: "image-1",
    type: "image",
    url: "https://storage.googleapis.com/pau-mosque/media/community-outreach.jpg",
    thumbnail: "https://via.placeholder.com/540x960.png?text=Community+Outreach",
    title: "Community Outreach",
    description: "Volunteers bringing relief packs to families across Lagos.",
    date: "2023-11-05",
    eventType: "charity",
    likes: 1560,
    views: 23100,
    tags: ["charity", "service"],
  },
];

export const STORIES_PREVIEWS = [
  {
    id: "story-1",
    title: "Ramadan Moments",
    thumbnail: "https://via.placeholder.com/96x96.png?text=Ramadan",
    category: "community",
  },
  {
    id: "story-2",
    title: "Knowledge Circles",
    thumbnail: "https://via.placeholder.com/96x96.png?text=Knowledge",
    category: "education",
  },
  {
    id: "story-3",
    title: "Service Days",
    thumbnail: "https://via.placeholder.com/96x96.png?text=Service",
    category: "charity",
  },
];

export const MEDIA_FILTERS: { label: string; value: EventCategory | "all" }[] = [
  { label: "For You", value: "all" },
  { label: "Community", value: "community" },
  { label: "Knowledge", value: "education" },
  { label: "Spiritual", value: "spiritual" },
  { label: "Youth", value: "youth" },
  { label: "Charity", value: "charity" },
];
