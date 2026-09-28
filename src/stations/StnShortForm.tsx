import SeatCarriage from '../components/SeatCarriage';
import type { Project } from '../lib/types';

interface Props {
  onPlay: (p: Project) => void;
}

export default function StnShortForm({ onPlay }: Props) {
  return (
    <div className="h-full pt-2">
      <SeatCarriage category="short" accent="#4DA3FF" onPlay={onPlay} />
    </div>
  );
}
