import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { styledRank } from '../utils/helpers';

//TODO: Tipar al conectar con back
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = ({ data }: { data: any[] }) => {
  return (
    <main className="py-4 md:max-w-3xl mx-auto">
      <div className="space-y-2">
        {data.map((user) => (
          <div
            key={user.username}
            className={`flex items-center p-4 border rounded-lg ${
              user.rank <= 3 ? 'bg-amber-50 border-amber-200' : 'bg-card border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${styledRank(
                  user.rank,
                )}`}
              >
                {user.rank}
              </div>

              <Avatar>
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col flex-1 text-end md:flex-row md:justify-between">
                <p className="font-medium">{user.username}</p>
                <div className="font-bold">{user.score} pts</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Table;
