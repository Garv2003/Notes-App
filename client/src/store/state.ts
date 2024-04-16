import { atom } from "recoil";
import { Tag, Note } from "../utils/type";

const notesState = atom<Note[]>({
    key: "notesState",
    default: [],
});

const tagsState = atom<Tag[]>({
    key: "tagsState",
    default: [],
});

export { notesState, tagsState };