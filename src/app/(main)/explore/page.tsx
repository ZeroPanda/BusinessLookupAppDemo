import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const businesses = [
  {
    id: 1,
    name: 'Green Leaf Gardening',
    category: 'Lawn care, landscaping',
    rating: 4.8,
    reviews: 45,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'gardening logo',
  },
  {
    id: 2,
    name: 'Sparkle Cleaners',
    category: 'Home & office cleaning',
    rating: 4.9,
    reviews: 72,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'cleaning logo',
  },
  {
    id: 3,
    name: 'Pawsitive Pups',
    category: 'Dog walking & pet sitting',
    rating: 5.0,
    reviews: 112,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'pet logo',
  },
  {
    id: 4,
    name: 'The Code Crafters',
    category: 'Web Development',
    rating: 4.7,
    reviews: 30,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'tech logo',
  },
  {
    id: 5,
    name: 'Fit Fusion Gym',
    category: 'Fitness Center',
    rating: 4.6,
    reviews: 88,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'gym logo',
  },
  {
    id: 6,
    name: 'John The Plumber',
    category: 'Plumbing Services',
    rating: 4.9,
    reviews: 65,
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'person portrait',
  },
];

export default function ExplorePage() {
  return (
    <div className="grid h-[calc(100vh_-_8rem)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Search Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or category..." className="pl-8" />
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-1 flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Local Businesses</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
             <ScrollArea className="h-full">
                <div className="space-y-1 p-6 pt-0">
                {businesses.map((biz) => (
                  <div key={biz.id} className="flex cursor-pointer items-center space-x-4 rounded-lg p-2 hover:bg-secondary">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={biz.avatar} data-ai-hint={biz.dataAiHint} />
                      <AvatarFallback>{biz.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{biz.name}</p>
                      <p className="text-sm text-muted-foreground">{biz.category}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
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
      <div className="h-full md:col-span-2 lg:col-span-3">
        <Card className="relative h-full overflow-hidden">
          <Image
            src="https://placehold.co/1200x900.png"
            alt="Map of business locations"
            layout="fill"
            objectFit="cover"
            data-ai-hint="map city"
          />
        </Card>
      </div>
    </div>
  );
}
