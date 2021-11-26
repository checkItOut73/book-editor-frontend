import React, { TransitionEventHandler } from 'react';
import PropTypes from 'prop-types';
import { ChapterData } from '@src/server/UseCase/GetApp/BookData';
import { Paragraph } from './Paragraph';

type Props = ChapterData & {
    children;
    classNameModifier?: string;
    onTransitionEnd?: TransitionEventHandler;
};

export const Chapter = ({  heading, paragraphs, children, classNameModifier, onTransitionEnd }: Props) => {
    return <div {...getDivContainerProps()}>
        { children }
        { getHeading() }
        <>
            { paragraphs.map((paragraphData, index) => <Paragraph key={index} {...paragraphData} />) }
        </>
    </div>;

    function getDivContainerProps() {
        type DivContainerProps = {
            className: string;
            onTransitionEnd?: TransitionEventHandler;
        };

        let props: DivContainerProps = { className: getClassName() };

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
};

Chapter.propTypes = {
    heading: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            numberInChapter: PropTypes.number.isRequired
        })).isRequired
    })).isRequired,
    children: PropTypes.node,
    classNameModifier: PropTypes.string,
    onTransitionEnd: PropTypes.func
};
