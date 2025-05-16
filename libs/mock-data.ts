import { Facility, User } from "./types";

export const facilities: Facility[] = [
  {
    id: "movieRoom",
    name: "Movie Room",
    description: "A state-of-the-art movie room with surround sound and 4K projection.",
    image: "/images/cinema_room_garden_halls.jpg",
    capacity: 20,
    location: "Main Building, Floor 1",
    amenities: ["4K Projector", "Surround Sound", "Comfortable Seating", "Blackout Curtains"],
  },
  {
    id: "conferenceRoom3A",
    name: "Conference Room 3A",
    description: "Professional conference room with video conferencing capabilities.",
    image: "/images/mock_meeting_room.jpeg",
    capacity: 12,
    location: "Main Building, Floor 1",
    amenities: ["Video Conferencing", "Whiteboard", "TV Display", "Coffee Machine"],
  },
  {
    id: "tennisCourt1",
    name: "Tennis Court 1",
    description: "Tennis court with a professional court surface.",
    image: "/images/tennis_court_garden_halls.jpg",
    capacity: 12,
    location: "Cartwright Gardens",
    amenities: ["Tennis Court", "Comfortable Seating"],
  },
];

export const currentUser: User = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
};

// Helper function to add a new facility
export function createFacility(
  name: string,
  description: string,
  image: string,
  capacity: number,
  location: string,
  amenities: string[]
): Facility {
  return {
    id: `f${facilities.length + 1}`,
    name,
    description,
    image: `/images/${image}`,
    capacity,
    location,
    amenities,
  };
}

// Example usage:
// const newFacility = createFacility(
//   "Art Studio",
//   "Creative space for artists with natural lighting.",
//   "art-studio.jpg",
//   15,
//   "Building D, Floor 2",
//   ["Easels", "Art Supplies", "Sink", "Storage Space"]
// );
// facilities.push(newFacility); 