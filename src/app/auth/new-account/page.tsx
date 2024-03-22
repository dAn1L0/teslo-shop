import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen sm:pt-10">

      <h1 className={ `${ titleFont.className } text-4xl mb-5 mt-7` }>Nueva cuenta</h1>

      <RegisterForm />
    </div>
  )
}