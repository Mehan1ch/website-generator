import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/verify-email')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/verify-email"!</div>
}
