import { redirect } from 'next/navigation';

export default function SignupPage() {
  redirect('/dashboard');
  return null;
}
