import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { leaderboardDataMock } from '../utils/mocks';
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import Table from './Table';

const Card = () => {
  return (
    <UICard className="bg-white mx-2 md:mx-10">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Ranking</CardTitle>
        <CardDescription className="text-center">
          Sigue de cerca a los mejores jugadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly" disabled>
              Esta Semana
            </TabsTrigger>
            <TabsTrigger value="allTime">Historico</TabsTrigger>
          </TabsList>

          <TabsContent value="allTime">
            <Table data={leaderboardDataMock.allTime} />
          </TabsContent>
          <TabsContent value="weekly">
            <Table data={leaderboardDataMock.weekly} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </UICard>
  );
};

export default Card;
