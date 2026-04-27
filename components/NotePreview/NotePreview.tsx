import css from "./NotePreview.module.css";
import type { Note } from "../../types/note";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <span className={css.tag}>{note.tag}</span>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Created: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}