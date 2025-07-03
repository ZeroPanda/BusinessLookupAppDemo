'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function PrivacyPolicyPage() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Privacy Policy</CardTitle>
          <p className="text-muted-foreground">Last updated: {date}</p>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">1. Introduction</h2>
            <p>Welcome to Neighborly. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application or otherwise when you contact us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the application, the choices you make and the products and features you use. The personal information we collect may include the following: names, phone numbers, email addresses, mailing addresses, job titles, contact preferences, and other similar information.</p>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">3. How We Use Your Information</h2>
            <p>We use personal information collected via our application for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">5. Do We Use Cookies and Other Tracking Technologies?</h2>
            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">6. How Do We Keep Your Information Safe?</h2>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
          </section>

           <section className="space-y-2">
            <h2 className="text-xl font-semibold text-card-foreground">7. Contact Us</h2>
            <p>If you have questions or comments about this policy, you may contact us through our contact page.</p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
