import React, { RefObject, TransitionEventHandler } from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { Paragraph } from './Paragraph';

export type ChapterProps = ChapterData & {
    children;
    classNameModifier?: string;
    height?: number;
    onTransitionEnd?: TransitionEventHandler;
};

export const Chapter = React.forwardRef(({ heading, paragraphs, children, classNameModifier, height, onTransitionEnd }: ChapterProps, ref: RefObject<HTMLDivElement>) => {
    return <div {...getDivContainerProps()} ref={ref}>
        { children }
        { getHeading() }
        <>
            { paragraphs.map((paragraphData, index) => <Paragraph key={index} {...paragraphData} />) }
        </>
    </div>;

    function getDivContainerProps() {
        type DivContainerProps = {
            className: string;
            style?: { height: string },
            onTransitionEnd?: TransitionEventHandler;
        };

        let props: DivContainerProps = { className: getClassName() };

        if (height) {
            props.style = {
                height: height + 'px'
            };
        }

        if (onTransitionEnd) {
            props.onTransitionEnd = onTransitionEnd;
        }

        return props;
    }

    function getClassName(): string {
        let className = 'book-chapter';

        if (classNameModifier) {
            className += ' book-chapter--' + classNameModifier;
        }

        return className;
    }

    function getHeading() {
        if ('' === heading) {
            return null;
        }

        return <h2 key="chapter-heading">{ heading }</h2>;
    }
});

Chapter.propTypes = {
    heading: PropTypes.string.isRequired,
    // @ts-ignore
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            numberInChapter: PropTypes.number.isRequired
        })).isRequired
    })).isRequired,
    children: PropTypes.node,
    classNameModifier: PropTypes.string,
    height: PropTypes.number,
    onTransitionEnd: PropTypes.func
};
