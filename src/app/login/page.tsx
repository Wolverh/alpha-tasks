import { LoginForm } from '@/components/auth/login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src="/logo.jpg"
              alt="AlphaTasks Logo"
              fill
              className="object-contain rounded-xl shadow-2xl shadow-primary/20"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Alpha<span className="text-primary">Tasks</span>
          </h1>
          <p className="text-muted-foreground text-sm text-center">
            Dominate your day with the ultimate task manager.
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}
