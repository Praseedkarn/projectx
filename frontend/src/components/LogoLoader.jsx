export default function SimpleLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-[#5b7c67] rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 bg-[#5b7c67] rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 bg-[#5b7c67] rounded-full animate-bounce" />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Planning your itinerary…
      </p>
    </div>
  );
}
