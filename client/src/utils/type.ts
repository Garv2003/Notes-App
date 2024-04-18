type Note = {
    id: string;
} & NoteData;

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
    content: string;
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

export type { SimplifiedNote, EditTagsModalProps, Note, NoteData, Tag, EditNoteProps, NewNoteProps, NoteFormProps };
