import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/confirm-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/confirm-password"!</div>
}
