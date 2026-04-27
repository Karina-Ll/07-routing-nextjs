import { fetchNoteById } from "../../../lib/api";
import NotePreview from "../../../components/NotePreview/NotePreview";
import css from "./NoteDetails.module.css";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <main className={css.container}>
      <NotePreview note={note} />
    </main>
  );
}