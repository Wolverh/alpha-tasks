import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch tasks for dashboard
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, projects(name, color)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { name: 'Total Tasks', value: tasks?.length || 0, icon: CheckSquare, color: 'text-blue-500' },
    { name: 'Completed', value: tasks?.filter(t => t.status === 'completed').length || 0, icon: CheckCircle2, color: 'text-green-500' },
    { name: 'In Progress', value: tasks?.filter(t => t.status === 'in_progress').length || 0, icon: Clock, color: 'text-yellow-500' },
    { name: 'Urgent', value: tasks?.filter(t => t.priority === 'urgent').length || 0, icon: AlertCircle, color: 'text-red-500' },
  ]

  return (
    <AppLayout user={user}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your command center.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Tasks */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks && tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${task.priority === 'urgent' ? 'bg-red-500' : task.priority === 'high' ? 'bg-yellow-500' : 'bg-primary'}`} />
                      <div>
                        <p className="font-medium">{task.title}</p>
                        {task.projects && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: (task.projects as any).color }} />
                            {(task.projects as any).name}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className={task.status === 'completed' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}>
                      {task.status?.replace('_', ' ') || 'Todo'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks yet. Time to dominate your day.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
import { CheckSquare } from 'lucide-react'
