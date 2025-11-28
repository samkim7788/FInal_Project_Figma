import React, { useState } from 'react';
import { Header } from './Header';
import { Download } from 'lucide-react';

interface ReferenceBoardProps {
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userPreferences?: any;
  onLogout?: () => void;
}

const styleCategories = [
  'vintage', 'luxury', 'natural', 'scandinavian', 'french',
  'lovely', 'pastel', 'modern', 'bohemian', 'classic',
  'industrial', 'minimal'
];

const categoryImages: { [key: string]: string[] } = {
  vintage: [
    'https://images.unsplash.com/photo-1725711362462-a0333461e1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1710082777338-dcb6189ae64f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNDMwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1725711362462-a0333461e1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1710082777338-dcb6189ae64f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNDMwNnww&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  luxury: [
    'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  natural: [
    'https://images.unsplash.com/photo-1597562965673-42cc92e8408f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjQxMzYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1597562965673-42cc92e8408f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjQxMzYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1597562965673-42cc92e8408f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjQxMzYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1597562965673-42cc92e8408f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaW50ZXJpb3IlMjBzcGFjZXxlbnwxfHx8fDE3NjQxMzYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  scandinavian: [
    'https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxMjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxMjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxMjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxMjUzODd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  french: [
    'https://images.unsplash.com/photo-1678775970375-05bbabcc6bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1678775970375-05bbabcc6bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1678775970375-05bbabcc6bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1678775970375-05bbabcc6bcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBpbnRlcmlvciUyMGRlc2lnbnxlbnwxfHx8fDE3NjQxMzYxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  lovely: [
    'https://images.unsplash.com/photo-1756317058150-63264dea336c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlbHklMjBjdXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1756317058150-63264dea336c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlbHklMjBjdXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1756317058150-63264dea336c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlbHklMjBjdXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1756317058150-63264dea336c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlbHklMjBjdXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  pastel: [
    'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBpbnRlcmlvciUyMHJvb218ZW58MXx8fHwxNzY0MTM2MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  modern: [
    'https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjQxMzYxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0MDY2NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjQxMzYxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1592401526914-7e5d94a8d6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzY0MDY2NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  bohemian: [
    'https://images.unsplash.com/photo-1600493504591-aa1849716b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2NDEzNjE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1600493504591-aa1849716b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2NDEzNjE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1600493504591-aa1849716b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2NDEzNjE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1600493504591-aa1849716b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc2NDEzNjE1OHww&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  classic: [
    'https://images.unsplash.com/photo-1716058845923-9212b7e0887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1716058845923-9212b7e0887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1716058845923-9212b7e0887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1716058845923-9212b7e0887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwaW50ZXJpb3IlMjByb29tfGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  industrial: [
    'https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW50ZXJpb3IlMjBsb2Z0fGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW50ZXJpb3IlMjBsb2Z0fGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW50ZXJpb3IlMjBsb2Z0fGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwaW50ZXJpb3IlMjBsb2Z0fGVufDF8fHx8MTc2NDEzNjE1OXww&ixlib=rb-4.1.0&q=80&w=1080'
  ],
  minimal: [
    'https://images.unsplash.com/photo-1621363183028-c97aec91a9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NjQxMzYxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MDczNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1621363183028-c97aec91a9f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjB3aGl0ZXxlbnwxfHx8fDE3NjQxMzYxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY0MDczNjM0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  ]
};

export function ReferenceBoard({ onNavigate, isLoggedIn, userPreferences, onLogout }: ReferenceBoardProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    userPreferences?.styles || []
  );

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  // Get images based on selected styles
  const getDisplayImages = () => {
    // If no preferences set (user hasn't completed preference survey), show random images
    if (!userPreferences || selectedStyles.length === 0) {
      const allImages: string[] = [];
      styleCategories.forEach(style => {
        if (categoryImages[style]) {
          allImages.push(...categoryImages[style]);
        }
      });
      // Shuffle and return random images
      return allImages.sort(() => Math.random() - 0.5);
    }
    
    const allImages: string[] = [];
    selectedStyles.forEach(style => {
      if (categoryImages[style]) {
        allImages.push(...categoryImages[style]);
      }
    });
    
    return allImages;
  };

  const displayImages = getDisplayImages();
  const hasPreferences = userPreferences && userPreferences.styles && userPreferences.styles.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Style Tags */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {styleCategories.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  className={`px-6 py-2 rounded-full border transition-colors ${
                    selectedStyles.includes(style)
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          
          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-4xl mb-4">Reference Board</h1>
            <p className="text-gray-600 mb-2">
              원하는 무드 이미지가 없다면, 이제 손쉽게 MOOD ON의 레퍼런스 보드에서 찾아보세요.
            </p>
            <p className="text-gray-600">
              빈티지부터 미니멀까지, 12개의 인테리어 카테고리로 분류된 이미지 레퍼런스를 찾아 저장하고, 당신만의 감성 취향을 찾아보는 건 어떨까요?
            </p>
          </div>
          
          {/* Preference Survey Banner */}
          <div className="relative h-32 rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-between px-8">
            <div className="text-2xl">선호도가 바뀌셨나요? 언제든 당신의 선호도를 업데이트해주세요!</div>
            <button 
              onClick={() => onNavigate('preference')}
              className="px-6 py-3 bg-white rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              선호도 업데이트 &gt;
            </button>
          </div>
          
          {/* Preference Message */}
          {hasPreferences && (
            <div className="mb-6">
              <p className="text-xl text-gray-700">
                {userPreferences.gender || '회원'}님이 선호하는 인테리어 무드 이미지입니다
              </p>
            </div>
          )}
          
          {/* Image Grid */}
          {displayImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <img 
                      src={image}
                      alt={`Interior ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white rounded-full border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Download size={16} />
                    download
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              스타일을 선택하면 해당 이미지가 표시됩니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}