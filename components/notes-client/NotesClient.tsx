"use client";

import { NoteDocument } from "@/models/Note";
import { set } from "mongoose";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface SerializedNote {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface InitalNotesProps {
  initialNotes: SerializedNote[];
}

function NotesClient({ initialNotes }: InitalNotesProps) {
  const [notes, setNotes] = useState<Array<SerializedNote>>(initialNotes);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log(notes);
  const createNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (data.success) {
        setNotes([data.data, ...notes]);
        toast.success("Note Created Successfully");
        setTitle("");
        setContent("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error Creating note:", error);
      toast.error("Error Creating Note");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      console.error("Error Deleting note:", error);
      toast.error("Error Deleting Note");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="input-field"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            {loading ? "Creating Note... " : "Create Note"}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Notes ({notes?.length})</h2>
        {notes?.length === 0 && (
          <p className="text-gray-500">No Notes yet create your first Note.</p>
        )}
        {notes?.map((note) => (
          <div key={note.title} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <div className="flex gap-2">
                <button className="text-blue-500 hover:text-blue-700 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesClient;
