import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Globe, Edit, Share2, ThumbsUp, MessageCircle, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const services = [
    { title: 'Website Design', desc: 'Custom, responsive websites.', price: '$1,500+', rating: 4.9, reviewCount: 82 },
    { title: 'Branding & Logo', desc: 'Memorable brand identities.', price: '$800+', rating: 5.0, reviewCount: 25 },
    { title: 'Social Media Mgmt', desc: 'Engaging content & growth.', price: '$500/mo', rating: 4.8, reviewCount: 13 },
];

const reviews = [
    {name: 'Local Cafe', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'cafe logo', rating: 5, text: '@CreativeSolutions completely revamped our online presence. The new website is beautiful and so much easier to navigate. Highly recommended!', service: 'Website Design'},
    {name: 'Handy Andy', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'person portrait', rating: 5, text: 'They designed a fantastic #BrandingLogo and business cards for my handyman service. The process was smooth and the result was professional.', service: 'Branding & Logo'},
    {name: 'Downtown Books', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'bookstore logo', rating: 4, text: 'Their #SocialMediaMgmt has really helped us connect with the community. We\'ve seen a definite increase in foot traffic thanks to @CreativeSolutions.', service: 'Social Media Mgmt'},
];

const renderReviewText = (text: string) => {
    const parts = text.split(/([@#]\w+)/g);
    return parts.filter(part => part).map((part, index) => {
        if (part.startsWith('@')) {
            return (
                <Badge key={index} variant="secondary" className="font-medium cursor-pointer hover:bg-secondary/80">
                    {part}
                </Badge>
            );
        }
        if (part.startsWith('#')) {
            return (
                <Badge key={index} variant="outline" className="font-medium cursor-pointer hover:bg-accent">
                    {part}
                </Badge>
            );
        }
        return <span key={index}>{part}</span>;
    });
};

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
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Request a Quote</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Request a Quote from Creative Solutions</DialogTitle>
                                <DialogDescription>
                                    Describe your project below. They will receive your request and get back to you soon.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid w-full gap-1.5">
                                        <Label htmlFor="message">Your message</Label>
                                        <Textarea placeholder="Hi, I'm looking for a new website for my coffee shop..." id="message" rows={6}/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit">Send Request</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
            {services.map(service => (
                <Card key={service.title}>
                    <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-2xl font-bold">{service.price}</p>
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span>{service.rating.toFixed(1)} ({service.reviewCount} reviews)</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary" className="w-full">Get a Quote</Button>
                    </CardFooter>
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
                        <div className="text-sm leading-relaxed">{renderReviewText("Just launched a new website for @LocalCafe! They're thrilled with their new online presence. Check it out! #webdesign #localbusiness")}</div>
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
                {reviews.map(review => (
                    <Card key={review.name}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar><AvatarImage src={review.avatar} data-ai-hint={review.dataAiHint}/><AvatarFallback>{review.name.charAt(0)}</AvatarFallback></Avatar>
                                <div><p className="font-semibold">{review.name}</p></div>
                            </div>
                            <div className="flex items-center gap-1">{Array(review.rating).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500"/>)}</div>
                        </CardHeader>
                        <CardContent>
                            {review.service && (
                                <p className="text-sm text-muted-foreground font-medium mb-2">
                                    Review for: <span className="text-foreground">{review.service}</span>
                                </p>
                            )}
                            <div className="text-sm leading-relaxed">{renderReviewText(review.text)}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
