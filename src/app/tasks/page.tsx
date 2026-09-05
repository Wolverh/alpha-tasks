import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch tasks
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, projects(name, color)')
    .eq('user_id', user.id)
    .order('order_index', { ascending: true })

  return (
    <AppLayout user={user}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your workload.</p>
        </div>
        
        <div className="bg-card/50 border border-border/50 rounded-xl p-8 text-center backdrop-blur-sm shadow-sm">
          <h2 className="text-xl font-semibold text-foreground mb-2">Kanban Board Coming Soon</h2>
          <p className="text-muted-foreground">This page is ready for the @dnd-kit drag-and-drop implementation.</p>
        </div>
      </div>
    </AppLayout>
  )
}
