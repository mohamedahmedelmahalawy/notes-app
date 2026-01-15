import mongoose, { Document, Model } from "mongoose";

interface NoteDocument extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new mongoose.Schema<NoteDocument>({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, maxLength: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

NoteSchema.pre<NoteDocument>("save", async function () {
  this.updatedAt = new Date();
});

const Note: Model<NoteDocument> =
  mongoose.models.Note || mongoose.model<NoteDocument>("Note", NoteSchema);

export default Note;
