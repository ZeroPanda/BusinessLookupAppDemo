'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Creative Solutions',
      handle: '@creatives',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
    },
    content: 'Just launched our new website design package! Perfect for small businesses looking to make a big impact online. DM for a free consultation! #webdesign #localbusiness',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'website design',
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    author: {
      name: 'John The Plumber',
      handle: '@johnplumbs',
      avatar: 'https://placehold.co/40x40.png',
      type: 'individual'
    },
    content: 'Leaky faucet? Clogged drain? I\'m available for plumbing emergencies all week. Fast, reliable, and affordable service. Call me at 555-1234.',
    image: null,
    imageHint: null,
    likes: 12,
    comments: 3,
  },
    {
    id: 3,
    author: {
      name: 'The Sweet Spot Bakery',
      handle: '@sweetspot',
      avatar: 'https://placehold.co/40x40.png',
      type: 'business',
    },
    content: 'Fresh batch of our famous croissants are out of the oven! Come and get them while they are hot. 🥐 We are open until 6 PM today.',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'bakery croissants',
    likes: 58,
    comments: 17,
  },
];

export default function DashboardPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: {
        name: 'David',
        handle: '@david',
        avatar: 'https://placehold.co/40x40.png',
        type: 'individual',
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


  return (
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
          <CardFooter className="flex justify-end">
            <Button onClick={handleCreatePost}>Create Post</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src={post.author.avatar} data-ai-hint={post.author.type === 'business' ? 'company logo' : 'person'} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-sm text-muted-foreground">{post.author.handle}</p>
                    </div>
                    </div>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
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
          ))}
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
  );
}
