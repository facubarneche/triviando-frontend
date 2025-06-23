import Loader from '@/app/components/ui/loader';

// app/ranking/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-700 flex items-center justify-center">
      <Loader />
    </div>
  );
}
