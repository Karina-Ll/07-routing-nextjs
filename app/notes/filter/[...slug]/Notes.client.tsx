"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import Modal from "../../../../components/Modal/Modal";
import css from "./NotesPage.module.css";
import type { NoteTag } from "../../../../types/note";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag }),
  });

  return (
    <div className={css.container}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          Add note +
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}