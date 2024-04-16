type Note = {
    id: string;
} & NoteData;

type RawNote = {
    id: string;
} & RawNoteData;

type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
};

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
} & Partial<NoteData>;

type NoteData = {
    title: string;
    content: string;
    tags: Tag[];
};

type Tag = {
    id: string;
    label: string;
    userId: string;
};

type SimplifiedNote = {
    tags: Tag[];
    title: string;
    id: string;
};

type NoteListProps = {
    isLoaded?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
};

type EditTagsModalProps = {
    show: boolean;
    availableTags: Tag[];
    handleClose: () => void;
    onDeleteTag: (id: string) => void;
};

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export type { SimplifiedNote, NoteListProps, EditTagsModalProps, Note, NoteData, RawNote, RawNoteData, Tag, EditNoteProps, NewNoteProps, NoteFormProps };
