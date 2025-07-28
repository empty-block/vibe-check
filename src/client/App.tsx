import { FarcasterProvider, useFarcaster } from './contexts/FarcasterContext'
import { Layout } from './components/Layout'
import { Header } from './components/Header'
import { Loading } from './components/Loading'

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
        <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            What's the vibe?
          </h2>
          <p className="text-center text-gray-600 text-sm">
            Share your vibe with the world
          </p>
          
          <div className="mt-8 text-center">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors">
              Submit
            </button>
          </div>
        </div>
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