import { useFarcaster } from '../contexts/FarcasterContext'

export function Header() {
  const { user } = useFarcaster()

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Vibe Check</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-2">
            {user.pfpUrl && (
              <img 
                src={user.pfpUrl} 
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700 hidden sm:block">
              {user.displayName || user.username}
            </span>
          </div>
        )}
      </div>
    </header>
  )
}