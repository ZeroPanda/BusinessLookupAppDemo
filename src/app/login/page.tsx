import { redirect } from 'next/navigation';

export default function LoginPage() {
  redirect('/dashboard');
  return null;
}
