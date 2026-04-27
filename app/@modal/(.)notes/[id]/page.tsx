import NotePreviewClient from "./NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: PageProps) {
  const { id } = await params;
  return <NotePreviewClient id={id} />;
}