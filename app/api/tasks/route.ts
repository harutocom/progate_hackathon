import { NextRequest, NextResponse } from "next/server";

// ダミーデータ
const allTasks = [
  // カードID: 10 のタスク
  { id: 101, bingocardsid: 10, taskname: "Go to the beach" },
  { id: 102, bingocardsid: 10, taskname: "Have a picnic" },
  { id: 103, bingocardsid: 10, taskname: "Read a book" },
  { id: 104, bingocardsid: 10, taskname: "Visit a museum" },
  { id: 105, bingocardsid: 10, taskname: "Go hiking" },
  { id: 106, bingocardsid: 10, taskname: "Learn a new skill" },
  { id: 107, bingocardsid: 10, taskname: "Attend a concert" },
  { id: 108, bingocardsid: 10, taskname: "Volunteer" },
  { id: 109, bingocardsid: 10, taskname: "Try a new recipe" },

  // カードID: 11 のタスク
  { id: 111, bingocardsid: 11, taskname: "Go to the beach" },
  { id: 112, bingocardsid: 11, taskname: "Have a picnic" },
  { id: 113, bingocardsid: 11, taskname: "Read a book" },
  { id: 114, bingocardsid: 11, taskname: "Visit a museum" },
  { id: 115, bingocardsid: 11, taskname: "Go hiking" },
  { id: 116, bingocardsid: 11, taskname: "Learn a new skill" },
  { id: 117, bingocardsid: 11, taskname: "Attend a concert" },
  { id: 118, bingocardsid: 11, taskname: "Volunteer" },
  { id: 119, bingocardsid: 11, taskname: "Try a new recipe" },

  // カードID: 12 のタスク (他のユーザー用)
  { id: 121, bingocardsid: 12, taskname: "Go to the beach" },
  { id: 122, bingocardsid: 12, taskname: "Have a picnic" },
  { id: 123, bingocardsid: 12, taskname: "Read a book" },
  { id: 124, bingocardsid: 12, taskname: "Visit a museum" },
  { id: 125, bingocardsid: 12, taskname: "Go hiking" },
  { id: 126, bingocardsid: 12, taskname: "Learn a new skill" },
  { id: 127, bingocardsid: 12, taskname: "Attend a concert" },
  { id: 128, bingocardsid: 12, taskname: "Volunteer" },
  { id: 129, bingocardsid: 12, taskname: "Try a new recipe" },

  { id: 130, bingocardsid: 13, taskname: "Go to the beach" },
  { id: 131, bingocardsid: 13, taskname: "Have a picnic" },
  { id: 132, bingocardsid: 13, taskname: "Read a book" },
  { id: 133, bingocardsid: 13, taskname: "Visit a museum" },
  { id: 134, bingocardsid: 13, taskname: "Go hiking" },
  { id: 135, bingocardsid: 13, taskname: "Learn a new skill" },
  { id: 136, bingocardsid: 13, taskname: "Attend a concert" },
  { id: 137, bingocardsid: 13, taskname: "Volunteer" },
  { id: 138, bingocardsid: 13, taskname: "Try a new recipe" },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const bingoCardId = searchParams.get("bingoCardId");

  if (!bingoCardId) {
    return NextResponse.json(
      { error: "bingoCardId is required" },
      { status: 400 }
    );
  }

  const cardTasks = allTasks.filter(
    (task) => task.bingocardsid === parseInt(bingoCardId, 10)
  );

  return NextResponse.json(cardTasks);
}
