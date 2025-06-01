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
  const historicalData = parseLeaderboardData(content);

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
          <TabsList className="grid w-full grid-cols-2 cursor-pointer">
            <TabsTrigger value="weekly" className="cursor-pointer" disabled>
              Esta Semana
            </TabsTrigger>
            <TabsTrigger value="allTime" className="cursor-pointer">
              Historico
            </TabsTrigger>
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
