import css from "./SidebarNotes.module.css";
import type { NoteTag } from "../../../../types/note";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <nav>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href="/notes/filter/all" className={css.menuLink}>
            All notes
          </a>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}