'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

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
    coords: [-122.4194, 37.7749], // [lon, lat]
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
    coords: [-122.4294, 37.7850], // [lon, lat]
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
    coords: [-122.4394, 37.7649], // [lon, lat]
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
    coords: [-122.4094, 37.7949], // [lon, lat]
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
    coords: [-122.4494, 37.7549], // [lon, lat]
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
    coords: [-122.4000, 37.7849], // [lon, lat]
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
    coords: [-122.4340, 37.7900], // [lon, lat]
  },
  {
    id: 8,
    name: 'Bella Napoli Pizzeria',
    category: 'Restaurants',
    description: 'Authentic Italian Pizza',
    rating: 2.8,
    reviews: 180,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'pizza logo',
    coords: [-122.4350, 37.7600], // [lon, lat]
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

const Map = dynamic(() => import('./map').then((mod) => mod.ExploreMap), { 
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />
});

export default function ExplorePage() {
    const [selectedBusiness, setSelectedBusiness] = useState<any>(businesses[0]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);

    const filteredBusinesses = useMemo(() => businesses.filter(biz => {
        const categoryMatch = activeCategory === 'All' || biz.category === activeCategory;
        const searchTermMatch = !searchTerm || biz.name.toLowerCase().includes(searchTerm.toLowerCase()) || biz.description.toLowerCase().includes(searchTerm.toLowerCase());
        const ratingMatch = ratingFilter === null || biz.rating >= ratingFilter;
        return categoryMatch && searchTermMatch && ratingMatch;
    }), [activeCategory, searchTerm, ratingFilter]);

    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
      <div className="lg:col-span-1 lg:flex lg:flex-col min-h-[50vh] lg:min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Explore Businesses</CardTitle>
             <div className="relative pt-2">
              <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or keyword..." 
                className="pl-8" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <div className="p-6 pt-0">
             <div>
                <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                <ScrollArea className="w-full whitespace-nowrap pt-2">
                    <div className="flex gap-2 pb-2">
                        {categories.map(category => (
                            <Button 
                                key={category} 
                                variant={activeCategory === category ? "default" : "outline"}
                                size="sm"
                                className="rounded-full shrink-0"
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="pt-4">
                <Label htmlFor="rating-filter" className="text-sm font-medium text-muted-foreground">Minimum Rating</Label>
                 <Select onValueChange={(value) => setRatingFilter(value === '0' ? null : Number(value))}>
                    <SelectTrigger id="rating-filter" className="w-full mt-1">
                        <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="4.5">4.5 Stars & Up</SelectItem>
                        <SelectItem value="4">4 Stars & Up</SelectItem>
                        <SelectItem value="3">3 Stars & Up</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1 min-h-0">
              <CardContent className="pt-6 space-y-4">
              {filteredBusinesses.length > 0 ? filteredBusinesses.map((biz) => (
                <div 
                  key={biz.id} 
                  className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-lg border p-3 transition-colors text-left",
                      selectedBusiness?.id === biz.id ? 'bg-secondary ring-2 ring-primary' : 'hover:bg-secondary/60'
                  )}
                  onClick={() => setSelectedBusiness(biz)}
                >
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={biz.avatar} data-ai-hint={biz.dataAiHint} />
                    <AvatarFallback>{getInitials(biz.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{biz.name}</p>
                    <p className="text-sm text-muted-foreground">{biz.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span>{biz.rating.toFixed(1)} ({biz.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-center text-sm text-muted-foreground py-10">No businesses found. Try adjusting your filters.</p>
              )}
            </CardContent>
          </ScrollArea>
        </Card>
      </div>

      <div className="lg:col-span-2 relative h-96 lg:h-full rounded-lg overflow-hidden border">
        <Map businesses={filteredBusinesses} selectedBusiness={selectedBusiness} />
        {selectedBusiness && (
          <div className="absolute bottom-6 left-1/2 w-[calc(100%_-_3rem)] max-w-sm -translate-x-1/2 z-10">
            <Card className="border-2 bg-background/80 shadow-2xl backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-16 w-16 border-2 border-background">
                  <AvatarImage
                    src={selectedBusiness.avatar}
                    data-ai-hint={selectedBusiness.dataAiHint}
                  />
                  <AvatarFallback>
                    {getInitials(selectedBusiness.name)}
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
                      {selectedBusiness.rating.toFixed(1)} ({selectedBusiness.reviews}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
                <Button>View</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
