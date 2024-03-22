import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen sm:pt-10">
      <h1 className={ `${ titleFont.className } text-4xl mb-5 mt-7` }>Ingresar</h1>
      <LoginForm />
    </div>
  )
}