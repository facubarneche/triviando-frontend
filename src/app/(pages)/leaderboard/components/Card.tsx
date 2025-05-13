'use server';
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
import Paginator from '@/app/components/paginator';
import { parseLeaderboardData } from '../utils/helpers';
import ButtonPosition from './ButtonPosition';

interface CardProps {
  leaderBoardData: ILeaderBoardDTO;
}

const Card = ({ leaderBoardData }: CardProps) => {
  const { content, ...paginatorData } = leaderBoardData;
  //TODO: Eliminar paginatorData al recibir ranking desde el back
  const historicalData = parseLeaderboardData(content, paginatorData.number - 1);
  return (
    <UICard className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center mb-4">🏆 Ranking</CardTitle>
        <CardDescription className="text-center">
          Sigue de cerca a los mejores jugadores
        </CardDescription>
        <ButtonPosition />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="allTime">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly" disabled>
              Esta Semana
            </TabsTrigger>
            <TabsTrigger value="allTime">Historico</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Table data={leaderboardDataMock.weekly} />
          </TabsContent>
          <TabsContent value="allTime">
            <Table data={historicalData} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <Paginator {...paginatorData} />
    </UICard>
  );
};

export default Card;
