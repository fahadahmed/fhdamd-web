type AppContainerProps = {
  children: React.ReactNode
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div style={{ padding: '0 2rem 2rem 2rem', display: 'grid' }}>{children}</div>
  )
}