export type BookData = {
    id?: number;
    title: string;
    chapters: Array<ChapterData>;
};

export type ChapterData = {
    id?: number;
    heading: string;
    number: number;
    paragraphs: Array<ParagraphData>;
};

export type ParagraphData = {
    id?: number;
    heading: string;
    verses: Array<VerseData>;
};

export type VerseData = {
    id?: number;
    text: string;
    numberInChapter: number;
};
