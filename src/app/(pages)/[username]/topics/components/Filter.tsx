import { Card, CardContent } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import AnimatedContainer from '@/app/components/AnimatedContainer';
import { Search } from 'lucide-react';

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const Filter = ({ searchTerm, setSearchTerm }: FilterProps) => (
  <AnimatedContainer animation="slideUp" delay={0.2}>
    <Card className="mb-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardContent className="p-3">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar temas..."
            className="pl-8 border-cyan-200 focus:border-cyan-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  </AnimatedContainer>
);

export default Filter;
