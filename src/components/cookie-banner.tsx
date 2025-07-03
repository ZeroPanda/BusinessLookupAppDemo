'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // We need to check if we're in the browser
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-20 md:pb-6">
      <Card className="bg-background/95 backdrop-blur-sm shadow-2xl animate-in slide-in-from-bottom-5">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <Cookie className="h-6 w-6 text-primary hidden sm:block shrink-0"/>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. Read our{' '}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/cookies" className="underline hover:text-primary">
                Cookie Policy
              </Link>.
            </p>
          </div>
          <Button onClick={handleAccept} className="shrink-0 w-full sm:w-auto">
            Accept
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
