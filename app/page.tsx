import NotesClient from "@/components/notes-client/NotesClient";
import dbConnect from "@/lib/db";
import Note from "@/models/Note";

import { Toaster } from "react-hot-toast";

async function getNotes() {
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    id: note._id.toString(),
  }));
}

export default async function Home() {
  await dbConnect();
  const notes = await getNotes();
  console.log(notes);
  return (
    <div className="container mx-auto p-4">
      <h1>Notes App</h1>

      <NotesClient initialNotes={notes} />
      <Toaster />
    </div>
  );
}
