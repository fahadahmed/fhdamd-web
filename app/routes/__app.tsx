import { Outlet } from "@remix-run/react";
import { AppContainer, Navigation } from "~/components";

export default function Index() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', height: '100vh' }}>
      <Navigation />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </div>
  )
}