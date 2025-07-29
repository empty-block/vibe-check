import { FarcasterProvider, useFarcaster } from './contexts/FarcasterContext'
import { Layout } from './components/Layout'
import { Header } from './components/Header'
import { Loading } from './components/Loading'
import VibePage from './components/VibePage'

function AppContent() {
  const { user, loading, error } = useFarcaster()

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-600 p-8">
            <p className="text-lg font-semibold">Failed to connect to Farcaster</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Header />
      <main className="p-4">
        <VibePage />
      </main>
    </Layout>
  )
}

export default function App() {
  return (
    <FarcasterProvider>
      <AppContent />
    </FarcasterProvider>
  )
}