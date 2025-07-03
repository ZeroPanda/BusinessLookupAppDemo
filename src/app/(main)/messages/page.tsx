'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Smile } from 'lucide-react';
import React, { useState } from 'react';

const conversations = [
  { id: 1, name: 'John The Plumber', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'person portrait', lastMessage: 'Sure, I can be there at 3 PM.', unread: 2 },
  { id: 2, name: 'Green Leaf Gardening', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'gardening logo', lastMessage: 'Thanks for the quote!', unread: 0 },
  { id: 3, name: 'The Sweet Spot Bakery', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'bakery logo', lastMessage: 'Your order is ready for pickup.', unread: 0 },
  { id: 4, name: 'Sparkle Cleaners', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'cleaning logo', lastMessage: 'Yes, we do offer bi-weekly plans.', unread: 0 },
];

const initialMessages = [
  { from: 'me', text: 'Hi John, I need a quote for a leaky kitchen faucet. Are you available this week?' },
  { from: 'other', text: 'Hello! Yes, I can take a look. I have an opening tomorrow afternoon. Does 3 PM work for you?' },
  { from: 'me', text: 'That works perfectly! What\'s your estimated cost for a visit?' },
  { from: 'other', text: 'My visit fee is $50, which will be applied to the final repair cost if you decide to proceed.' },
  { from: 'me', text: 'Great, see you then.' },
  { from: 'other', text: 'Sure, I can be there at 3 PM.' },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { from: 'me', text: newMessage }]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    <div className="h-[calc(100vh-theme(spacing.32))]">
    <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-1 lg:col-span-1 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold font-headline">Messages</h2>
           <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages" className="pl-8" />
            </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map(convo => (
            <div key={convo.id} className={`flex items-start space-x-3 p-4 cursor-pointer hover:bg-secondary ${convo.id === 1 ? 'bg-secondary' : ''}`}>
              <Avatar>
                <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">{convo.name}</p>
                    {convo.unread > 0 && <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">{convo.unread}</span>}
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
        <div className="p-4 border-b flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">John The Plumber</p>
            <p className="text-sm text-muted-foreground">Active now</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-6 space-y-4 bg-secondary/40">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                   {msg.from === 'other' && <Avatar className="w-8 h-8"><AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person portrait" /><AvatarFallback>JP</AvatarFallback></Avatar>}
                   <div className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                        <p>{msg.text}</p>
                   </div>
                </div>
            ))}
        </ScrollArea>
        <div className="p-4 border-t bg-background">
            <div className="relative">
                <Input 
                  placeholder="Type a message..." 
                  className="pr-20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button variant="ghost" size="icon"><Smile className="w-5 h-5"/></Button>
                    <Button variant="ghost" size="icon" onClick={handleSendMessage}><Send className="w-5 h-5"/></Button>
                </div>
            </div>
        </div>
      </div>
    </Card>
    </div>
  );
}
