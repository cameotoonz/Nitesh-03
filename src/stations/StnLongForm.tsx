import SeatCarriage from '../components/SeatCarriage';
import type { Project } from '../lib/types';

interface Props {
  onPlay: (p: Project) => void;
}

export default function StnLongForm({ onPlay }: Props) {
  return (
    <div className="h-full pt-2">
      <SeatCarriage category="long" accent="#FFB224" onPlay={onPlay} />
    </div>
  );
}
