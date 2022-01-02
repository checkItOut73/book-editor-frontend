export type BookData = {
    id?: number;
    title: string;
    chapters: Array<ChapterData>;
};

export type ChapterData = {
    id?: number;
    number: number;
    heading: string;
    paragraphs: Array<ParagraphData>;
};

export type ParagraphData = {
    id?: number;
    numberInChapter?: number;
    heading: string;
    verses: Array<VerseData>;
};

export type VerseData = {
    id?: number;
    numberInParagraph: number;
    numberInChapter: number;
    text: string;
};
