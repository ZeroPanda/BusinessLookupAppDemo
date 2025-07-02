import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Briefcase, MessageCircle, PenSquare, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
              <span className="hidden font-bold sm:inline-block font-headline">
                Local Connect
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container text-center">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Find & Offer Local Services
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              The ultimate platform to connect with local professionals, find services you need, and grow your own business within your community.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 lg:py-32 bg-secondary">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl font-headline">
                Everything You Need to Connect
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Local Connect provides a comprehensive suite of tools for both customers and businesses.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Profiles</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Showcase Your Brand</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Create a stunning profile for your business or as an individual.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Posts</CardTitle>
                  <PenSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Share Updates</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Keep your community updated with your latest news and offers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Messaging</CardTitle>
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Connect Directly</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Communicate privately for quotes, services, and inquiries.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                  <Star className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Build Trust</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gain credibility with a robust review and rating system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-4xl font-headline">
                Loved by the Community
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our users are saying about connecting locally.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex space-x-1 mb-2">
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “This platform transformed my freelance business. I'm getting more local clients than ever before!”
                  </blockquote>
                  <div className="mt-4 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="person" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm text-muted-foreground">Graphic Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex space-x-1 mb-2">
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “Finding a reliable plumber was so easy. I requested a quote and had my sink fixed the next day. Highly recommend!”
                  </blockquote>
                  <div className="mt-4 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="man portrait" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Michael Smith</p>
                      <p className="text-sm text-muted-foreground">Homeowner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex space-x-1 mb-2">
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “As a small bakery, Local Connect helped us reach customers in our neighborhood we never would have otherwise.”
                  </blockquote>
                  <div className="mt-4 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="woman portrait" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Sarah Adams</p>
                      <p className="text-sm text-muted-foreground">Bakery Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32 bg-secondary">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              Ready to Join Your Community?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
              Create an account today and start connecting with local talent and customers.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Logo />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by Local Connect. All rights reserved. &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
