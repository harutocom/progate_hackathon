import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BingoCard, Task, TasksByCard } from "../lib/types";

interface BingoCardListProps {
  username: string;
  cards: BingoCard[];
  tasks: TasksByCard;
}

export const BingoCardList = ({
  username,
  cards,
  tasks,
}: BingoCardListProps) => {
  return (
    <div className="my-bingo-card">
      <div className="title-wrapper items-start pl-[300px]">
        <h2 className="bingo-title text-[30px] mb-4 font-[inter]">
          My Bingo Cards
        </h2>
        <p className="comment mb-4 text-[20px]">
          Here are all the bingo cards you&apos;ve created.
        </p>
        <h2 className="name text-[25px]">Created by: {username}</h2>
      </div>

      <div className="bingo-card ml-[300px] w-[900px] mt-[150px] border border-[#CFD9E8] rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px] h-[100px] pl-[30px]">
                Date
              </TableHead>
              <TableHead className="ml-[650px] h-[100px]">Task</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium h-[200px] pl-[30px]">
                  {card.date}
                </TableCell>
                <TableCell className="h-[200px] ml-[700px] whitespace-normal break-words">
                  {tasks[card.id]
                    ?.map((task: Task) => task.taskname)
                    .join(", ") || ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
