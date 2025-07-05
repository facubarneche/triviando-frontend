'use server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import Table from './Table';
import Paginator from '@/app/components/paginator';
import ButtonPosition from './ButtonPosition';

interface CardProps {
  weekly: Omit<ILeaderBoardDTO, 'content'> & { content: ILeaderContentBoard[] };
  historical: Omit<ILeaderBoardDTO, 'content'> & { content: ILeaderContentBoard[] };
}

const Card = ({ weekly, historical }: CardProps) => {
  const { content: historicalContent, ...historicalPagination } = historical;
  const { content: weeklyContent, ...weeklyPagination } = weekly;

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
            <TabsTrigger value="weekly" className="cursor-pointer">
              Esta Semana
            </TabsTrigger>
            <TabsTrigger value="allTime" className="cursor-pointer">
              Historico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Table data={weeklyContent} />
            <Paginator {...weeklyPagination} />
          </TabsContent>
          <TabsContent value="allTime">
            <Table data={historicalContent} />
            <Paginator {...historicalPagination} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </UICard>
  );
};

export default Card;
