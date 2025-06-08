import { Card, CardContent } from "@/app/components/ui/card";

export const ProfileInfoSkeleton = () => (
  <Card className="mb-6 border-0 shadow-lg bg-white/95 backdrop-blur-sm animate-pulse">
    <CardContent className="p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-3 w-full">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/4" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-32 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);