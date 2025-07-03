'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, BadgeCheck, Star, TicketPercent, Calendar, ShoppingBag, FileText, MapPin, Sparkles, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generatePost } from '@/ai/flows/generatePostFlow';

const initialPosts = [
  {
    id: 1,
    type: 'offer',
    author: {
      name: 'Creative Solutions',
      handle: '@creatives',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
      rating: 4.9,
      bio: 'Full-service digital agency specializing in web design, branding, and marketing for local businesses.',
      followers: 18700,
      following: 2154,
    },
    title: '50% Off Web Design',
    content: 'Limited time offer! Get 50% off our standard #webdesign package. Perfect for new businesses. DM @creatives for a free consultation!',
    validUntil: 'Ends Dec 31st',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'website design',
    likes: 42,
    comments: 11,
  },
  {
    id: 2,
    type: 'rating',
    author: {
        name: 'David',
        handle: '@david',
        avatar: 'https://placehold.co/40x40.png',
        type: 'individual',
        rating: null,
        bio: 'Exploring the neighborhood and connecting with local businesses.',
        followers: 12,
        following: 88,
    },
    business: {
      name: 'The Sweet Spot Bakery',
      handle: '@sweetspot'
    },
    rating: 5,
    content: 'Just tried the almond croissant at @sweetspot, and it was heavenly! 🥐 The staff is super friendly too. Highly recommend stopping by! #foodreview',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'bakery croissants',
    likes: 18,
    comments: 4,
  },
    {
    id: 3,
    type: 'event',
    author: {
      name: 'Green Leaf Gardening',
      handle: '@greenleaf',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
      rating: 4.8,
      bio: 'Lawn care, landscaping, and all your gardening needs.',
      followers: 850,
      following: 120,
    },
    eventName: 'Free Gardening Workshop',
    date: 'Saturday, Aug 10th @ 11:00 AM',
    location: 'Our Store',
    content: 'Join us for a free workshop on container gardening. Learn how to grow your own herbs and vegetables on your balcony or patio! #gardening #workshop',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'gardening workshop',
    likes: 35,
    comments: 9,
  },
  {
    id: 4,
    type: 'product',
    author: {
      name: 'Pawsitive Pups',
      handle: '@pawsitive',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
      rating: 5.0,
      bio: 'Dog walking & pet sitting services. We love your pets!',
      followers: 1200,
      following: 80,
    },
    productName: 'Organic Dog Treats',
    price: '$12.99',
    content: 'New in stock! Our homemade organic peanut butter dog treats. Your furry friends at @pawsitive will love them! #dogtreats #pets',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'dog treats',
    likes: 62,
    comments: 21,
  },
   {
    id: 5,
    type: 'status',
    author: {
      name: 'John The Plumber',
      handle: '@johnplumbs',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
      rating: 4.7,
      bio: 'Your friendly neighborhood plumber. Fast, reliable, and affordable service.',
      followers: 231,
      following: 45,
    },
    content: 'Just finished a big repiping job in the downtown area. If you\'re experiencing low water pressure in an older home, give @johnplumbs a call! 555-1234. #plumbing',
    image: null,
    imageHint: null,
    likes: 12,
    comments: 3,
  },
];

const postTypeConfig: any = {
  offer: { icon: TicketPercent, color: 'border-l-chart-1', title: 'Special Offer' },
  rating: { icon: Star, color: 'border-l-chart-4', title: 'New Rating' },
  event: { icon: Calendar, color: 'border-l-chart-3', title: 'Upcoming Event' },
  product: { icon: ShoppingBag, color: 'border-l-chart-2', title: 'New Product' },
  status: { icon: FileText, color: 'border-l-transparent', title: 'Status Update' },
};

const renderPostText = (text: string) => {
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


export default function DashboardPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: any = {
      id: posts.length + 1,
      type: 'status',
      author: {
        name: 'David',
        handle: '@david',
        avatar: 'https://placehold.co/40x40.png',
        type: 'individual',
        rating: null,
        bio: 'Exploring the neighborhood and connecting with local businesses.',
        followers: 12,
        following: 88,
      },
      content: newPostContent,
      image: null,
      imageHint: null,
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleGeneratePost = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
        const generatedContent = await generatePost({ prompt: aiPrompt });
        setNewPostContent(generatedContent.post);
        setIsAiDialogOpen(false);
        setAiPrompt('');
    } catch (error) {
        console.error("Error generating post:", error);
        toast({
            variant: "destructive",
            title: "AI Post Generation Failed",
            description: "There was an error generating the post. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
};


  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                 <Textarea 
                    placeholder="What's on your mind, David?" 
                    className="bg-background"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                 />
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAiDialogOpen(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with AI
            </Button>
            <Button onClick={handleCreatePost}>Create Post</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {posts.map((post: any) => {
            const config = postTypeConfig[post.type];
            const PostIcon = config.icon;
            return (
            <Card key={post.id} className={cn('border-l-4', config.color)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center space-x-3 cursor-pointer group">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} data-ai-hint={post.author.type === 'business' ? 'company logo' : 'person'} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold group-hover:underline">{post.author.name}</p>
                            {post.author.rating && post.author.rating >= 4.8 && (
                              <BadgeCheck className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <p className="text-muted-foreground">{post.author.handle}</p>
                            {post.author.type === 'business' && post.author.rating && (
                              <>
                                <span className="text-muted-foreground text-xs">·</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                  <span className="font-medium text-foreground">{post.author.rating.toFixed(1)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" side="bottom" align="start">
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={post.author.avatar} data-ai-hint={post.author.type === 'business' ? 'company logo' : 'person'} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold">{post.author.name}</h4>
                             {post.author.rating && post.author.rating >= 4.8 && (
                              <BadgeCheck className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.author.handle}</p>
                           <Button size="sm">Follow</Button>
                        </div>
                      </div>
                      <p className="text-sm my-4">{post.author.bio}</p>
                      <div className="flex items-center justify-between text-sm border-t pt-3">
                        <div className="flex gap-4">
                          <div><span className="font-bold">{post.author.following}</span> <span className="text-muted-foreground">Following</span></div>
                          <div><span className="font-bold">{post.author.followers}</span> <span className="text-muted-foreground">Followers</span></div>
                        </div>
                         {post.author.type === 'business' && post.author.rating && (
                            <div className="flex items-center gap-1 text-sm">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-semibold text-foreground">{post.author.rating.toFixed(1)}</span>
                            </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
                {post.type !== 'status' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 font-medium">
                    <PostIcon className="w-4 h-4" />
                    <span>{config.title}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {post.type === 'offer' && (
                  <div className="p-4 rounded-lg bg-secondary mb-3">
                      <h3 className="font-bold text-lg text-primary">{post.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium">Valid until: {post.validUntil}</p>
                  </div>
                )}
                 {post.type === 'rating' && (
                  <div className="mb-3 flex items-center gap-2">
                    <p className="font-semibold">Rated <span className="text-primary">{post.business.name}</span>:</p>
                    <div className="flex items-center">
                        {Array(post.rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                  </div>
                )}
                {post.type === 'event' && (
                  <div className="p-4 rounded-lg bg-secondary mb-3">
                      <h3 className="font-bold text-lg">{post.eventName}</h3>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {post.date}</p>
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {post.location}</p>
                      </div>
                  </div>
                )}
                 {post.type === 'product' && (
                  <div className="p-4 rounded-lg bg-secondary mb-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{post.productName}</h3>
                        <Badge variant="outline" className="text-base">{post.price}</Badge>
                      </div>
                  </div>
                )}

                <div className="text-sm leading-relaxed">{renderPostText(post.content)}</div>
                {post.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border">
                    <Image
                      src={post.image}
                      alt="Post image"
                      width={600}
                      height={400}
                      className="object-cover w-full"
                      data-ai-hint={post.imageHint || ''}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex space-x-4 text-muted-foreground">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4" /> {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>
              </CardFooter>
            </Card>
          )})}
        </div>
      </div>
      <div className="lg:col-span-1 space-y-6 sticky top-20">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Suggested Businesses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="gardening logo" />
                        <AvatarFallback>GL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-semibold">Green Leaf Gardening</p>
                        <p className="text-sm text-muted-foreground">Lawn care, landscaping</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                </div>
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="cleaning logo" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-semibold">Sparkle Cleaners</p>
                        <p className="text-sm text-muted-foreground">Home & office cleaning</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                </div>
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="pet logo" />
                        <AvatarFallback>PP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="font-semibold">Pawsitive Pups</p>
                        <p className="text-sm text-muted-foreground">Dog walking & pet sitting</p>
                    </div>
                    <Button size="sm" variant="outline">Follow</Button>
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
     <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Post with AI</DialogTitle>
          <DialogDescription>
            Describe your post idea, and our AI will write it for you. Try "a special on croissants this weekend" or "our new dog walking service".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="ai-prompt" className="sr-only">Your Idea</Label>
          <Textarea 
            id="ai-prompt"
            placeholder="e.g., A post about our new organic dog treats"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={3}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsAiDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleGeneratePost} disabled={isGenerating}>
            {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
