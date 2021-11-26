export type BookData = {
    title: string;
    chapters: Array<ChapterData>;
};

export type ChapterData = {
    number: number;
    heading: string;
    paragraphs: Array<ParagraphData>;
};

export type ParagraphData = {
    heading: string;
    verses: Array<VerseData>;
};

export type VerseData = {
    text: string;
    numberInChapter: number;
};
