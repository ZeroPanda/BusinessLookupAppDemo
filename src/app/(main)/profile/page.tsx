import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Globe, Edit, Share2, ThumbsUp, MessageCircle, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full bg-secondary">
          <Image src="https://placehold.co/1200x400.png" data-ai-hint="abstract background" layout="fill" objectFit="cover" alt="Cover image" />
        </div>
        <div className="p-6">
          <div className="flex items-start -mt-20">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="company logo" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div className="ml-6 flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3">
                          <h1 className="text-3xl font-bold font-headline">Creative Solutions</h1>
                          <Badge variant="outline" className="border-primary text-primary font-semibold py-1 px-2">
                              <BadgeCheck className="w-4 h-4 mr-1.5"/>
                              Top-rated
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">@creatives</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                        <Button>Request a Quote</Button>
                    </div>
                </div>
            </div>
          </div>
          <p className="mt-4 max-w-2xl">
            We are a full-service digital agency specializing in web design, branding, and marketing for local businesses. Let's build something amazing together.
          </p>
           <div className="mt-4 flex items-center gap-6">
              <div className="text-sm">
                  <span className="font-bold text-card-foreground">2,154</span> <span className="text-muted-foreground">Following</span>
              </div>
              <div className="text-sm">
                  <span className="font-bold text-card-foreground">18.7k</span> <span className="text-muted-foreground">Followers</span>
              </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <a href="#" className="hover:underline">creativesolutions.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>4.9 (120 reviews)</span>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="services">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
                { title: 'Website Design', desc: 'Custom, responsive websites.', price: '$1,500+' },
                { title: 'Branding & Logo', desc: 'Memorable brand identities.', price: '$800+' },
                { title: 'Social Media Mgmt', desc: 'Engaging content & growth.', price: '$500/mo' },
            ].map(service => (
                <Card key={service.title}>
                    <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{service.price}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="posts" className="mt-6">
            <div className="space-y-6 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <Avatar><AvatarImage src="https://placehold.co/128x128.png" data-ai-hint="company logo"/><AvatarFallback>CS</AvatarFallback></Avatar>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <p className="font-semibold">Creative Solutions</p>
                                    <BadgeCheck className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-sm text-muted-foreground">@creatives</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Just launched our new website design package! Perfect for small businesses looking to make a big impact online. DM for a free consultation! #webdesign #localbusiness</p>
                        <div className="mt-4 rounded-lg overflow-hidden border">
                            <Image src="https://placehold.co/600x400.png" data-ai-hint="website design" alt="Post image" width={600} height={400} className="object-cover w-full"/>
                        </div>
                    </CardContent>
                     <CardFooter className="flex justify-between items-center border-t pt-4">
                        <div className="flex space-x-4 text-muted-foreground">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><ThumbsUp className="w-4 h-4" /> 24</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> 5</Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6 max-w-2xl mx-auto">
                {[
                    {name: 'Local Cafe', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'cafe logo', rating: 5, text: 'Creative Solutions completely revamped our online presence. The new website is beautiful and so much easier to navigate. Highly recommended!'},
                    {name: 'Handy Andy', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'person portrait', rating: 5, text: 'They designed a fantastic logo and business cards for my handyman service. The process was smooth and the result was professional.'},
                ].map(review => (
                    <Card key={review.name}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar><AvatarImage src={review.avatar} data-ai-hint={review.dataAiHint}/><AvatarFallback>{review.name.charAt(0)}</AvatarFallback></Avatar>
                                <div><p className="font-semibold">{review.name}</p></div>
                            </div>
                            <div className="flex items-center gap-1">{Array(review.rating).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500"/>)}</div>
                        </CardHeader>
                        <CardContent><p>{review.text}</p></CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
