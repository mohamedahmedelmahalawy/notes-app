import NotesClient from "@/components/notes-client/NotesClient";
import dbConnect from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  await dbConnect();
  return (
    <div className="container mx-auto p-4">
      <h1>Notes App</h1>
      <NotesClient />
    </div>
  );
}
