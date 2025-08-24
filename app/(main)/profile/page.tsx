import React from "react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const profile = [
  {
    name: "山田 太郎",
  },
];

const tasks = [
  {
    date: "2025/01/12",
    task: "Go to the beach, Have a picnic, Read a book, Visit a museum, Go hiking, Learn a new skill, Attend a concert, Volunteer, Try a new recipe",
  },
  {
    date: "2025/12/29",
    task: "Go to the beach, Have a picnic, Read a book, Visit a museum, Go hiking, Learn a new skill, Attend a concert, Volunteer, Try a new recipe",
  },
  {
    date: "2025/11/05",
    task: "Go to the beach, Have a picnic, Read a book, Visit a museum, Go hiking, Learn a new skill, Attend a concert, Volunteer, Try a new recipe",
  },
];

const ProfilePage = () => {
  return (
    <div className="profile-container flex flex-col bg-E5E8EB p-8 rounded-lg w-full mt-[100px]">
      <div className="profile-icon-container flex flex-col items-center mb-6">
        <h2 className="profile-title text-8xl mb-[50px]">Profile</h2>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h1 className="text-[30px] font-bold mt-10 mb-12">{profile[0].name}</h1>
      </div>

      <div className="my-bingo-card">
        <div className="title-wrapper items-start pl-[300px]">
          <h2 className="bingo-title text-[80px] mb-4">My Bingo Cards</h2>
          <p className="comment mb-4 text-[40px]">
            Here are all the bingo cards you&apos;ve created.
          </p>
          <h2 className="name text-[30px]">Created by: {profile[0].name}</h2>
        </div>

        <div className="bingo-card ml-[300px] w-[1500px] mt-[150px] border border-[#CFD9E8] rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[700px] h-[100px] pl-[30px]">
                  Date
                </TableHead>
                <TableHead className="ml-[650px] h-[100px]">Task</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.date}>
                  <TableCell className="font-medium h-[200px] pl-[30px]">
                    {task.date}
                  </TableCell>
                  <TableCell className="h-[200px] ml-[700px] whitespace-normal break-words">
                    {task.task}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center gap-2 flex-col mt-[100px]">
          <Button className="w-[372px] h-[48px] bg-[#0D80F2] text-white hover:bg-[#0D80F2]/90 cursor-pointer">
            return page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
