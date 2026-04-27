"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api";
import Modal from "../../../../components/Modal/Modal";
import NotePreview from "../../../../components/NotePreview/NotePreview";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading || !note ? (
        <p style={{ padding: "2rem" }}>Loading...</p>
      ) : (
        <NotePreview note={note} />
      )}
    </Modal>
  );
}