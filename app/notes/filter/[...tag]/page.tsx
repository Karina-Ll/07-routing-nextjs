import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "../../Notes.client";
import type { NoteTag } from "../../../../types/note";

interface FilterPageProps {
  params: Promise<{ tag?: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { tag: tagSegments } = await params;
  const tagValue = tagSegments?.[0];
  const tag =
    tagValue && tagValue !== "all" ? (tagValue as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}