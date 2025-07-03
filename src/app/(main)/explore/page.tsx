'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const businesses = [
  {
    id: 1,
    name: 'Green Leaf Gardening',
    category: 'Home Services',
    description: 'Lawn care, landscaping',
    rating: 4.8,
    reviews: 45,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'gardening logo',
  },
  {
    id: 2,
    name: 'Sparkle Cleaners',
    category: 'Home Services',
    description: 'Home & office cleaning',
    rating: 4.9,
    reviews: 72,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'cleaning logo',
  },
  {
    id: 3,
    name: 'Pawsitive Pups',
    category: 'Pet Services',
    description: 'Dog walking & pet sitting',
    rating: 5.0,
    reviews: 112,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'pet logo',
  },
  {
    id: 4,
    name: 'The Code Crafters',
    category: 'Professional Services',
    description: 'Web Development',
    rating: 4.7,
    reviews: 30,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'tech logo',
  },
  {
    id: 5,
    name: 'Fit Fusion Gym',
    category: 'Health & Wellness',
    description: 'Fitness Center',
    rating: 4.6,
    reviews: 88,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'gym logo',
  },
  {
    id: 6,
    name: 'John The Plumber',
    category: 'Home Services',
    description: 'Plumbing Services',
    rating: 4.9,
    reviews: 65,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'person portrait',
  },
  {
    id: 7,
    name: 'The Golden Spoon',
    category: 'Restaurants',
    description: 'Modern European Cuisine',
    rating: 4.9,
    reviews: 250,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'restaurant logo',
  },
  {
    id: 8,
    name: 'Bella Napoli Pizzeria',
    category: 'Restaurants',
    description: 'Authentic Italian Pizza',
    rating: 4.8,
    reviews: 180,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'pizza logo',
  },
];

const categories = [
    'All',
    'Home Services',
    'Restaurants',
    'Pet Services',
    'Health & Wellness',
    'Professional Services',
]

export default function ExplorePage() {
    const [selectedBusiness, setSelectedBusiness] = useState(businesses[0]);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredBusinesses = businesses.filter(biz => 
        activeCategory === 'All' || biz.category === activeCategory
    );

  return (
    <div className="grid h-[calc(100vh_-_8rem)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col md:col-span-1 lg:col-span-1">
        <Card className="flex flex-1 flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Explore</CardTitle>
             <div className="relative pt-2">
              <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search businesses..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col p-0">
             <div className="p-6 pt-0">
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <Button 
                            key={category} 
                            variant={activeCategory === category ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
             </div>
             <ScrollArea className="flex-1 min-h-0 px-6">
                <div className="space-y-4 pb-6">
                {filteredBusinesses.map((biz) => (
                  <div 
                    key={biz.id} 
                    className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors",
                        selectedBusiness?.id === biz.id ? 'bg-secondary' : 'hover:bg-secondary/60'
                    )}
                    onClick={() => setSelectedBusiness(biz)}
                  >
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={biz.avatar} data-ai-hint={biz.dataAiHint} />
                      <AvatarFallback>{biz.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{biz.name}</p>
                      <p className="text-sm text-muted-foreground">{biz.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>{biz.rating} ({biz.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="relative h-full md:col-span-2 lg:col-span-3">
        <Card className="relative h-full overflow-hidden">
          <Image
            src="https://placehold.co/1200x900.png"
            alt="Map of business locations"
            fill
            className="object-cover"
            data-ai-hint="map city"
          />
          {selectedBusiness && (
            <div className="absolute bottom-6 left-1/2 w-full max-w-md -translate-x-1/2 px-6">
              <Card className="border-0 bg-background/80 shadow-2xl backdrop-blur-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage
                      src={selectedBusiness.avatar}
                      data-ai-hint={selectedBusiness.dataAiHint}
                    />
                    <AvatarFallback>
                      {selectedBusiness.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{selectedBusiness.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedBusiness.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>
                        {selectedBusiness.rating} ({selectedBusiness.reviews}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                  <Button>View Profile</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
