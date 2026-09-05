import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AppLayout user={user}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>
        
        <div className="bg-card/50 border border-border/50 rounded-xl p-8 text-center backdrop-blur-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Settings Coming Soon</h2>
          <p className="text-muted-foreground">Profile editing and app preferences will go here.</p>
        </div>
      </div>
    </AppLayout>
  )
}
