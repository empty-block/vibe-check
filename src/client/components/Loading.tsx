export function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
        <p className="text-gray-500 text-sm">Loading vibes...</p>
      </div>
    </div>
  )
}