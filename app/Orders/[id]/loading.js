export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" role="status"></div>
          <p className="text-gray-500 mt-4">Your Data is Being Loaded, please wait...</p>
        </div>
      </div>
    );
  }
  