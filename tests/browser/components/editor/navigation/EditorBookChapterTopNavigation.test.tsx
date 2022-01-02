import React from 'react';
import { create } from 'react-test-renderer';
import { Context } from '@browser/context';
import { EditorBookChapterTopNavigation } from '@components/editor/navigation/EditorBookChapterTopNavigation';

import { BookChapterNavigationElement } from '@components/navigation/BookChapterNavigationElement';
import { InsertChapterLayer } from '@components/editor/layers/InsertChapterLayer';
import { TooltipTriggerDiv } from '@components/ui/TooltipTriggerDiv';

jest.mock('@components/navigation/BookChapterNavigationElement', () => ({
    BookChapterNavigationElement: (props) => (
        <div data-book-chapter-navigation-element {...props} />
    )
}));

jest.mock('@components/ui/TooltipTriggerDiv', () => ({
    TooltipTriggerDiv: (props) => <div data-tooltip-trigger-div {...props} />
}));

jest.mock('@components/editor/layers/InsertChapterLayer', () => ({
    InsertChapterLayer: (props) => <div data-insert-chapter-layer {...props} />
}));

jest.mock('@actions/navigation/setActiveChapterNumber', () => ({
    setActiveChapterNumber: (chapterNumber) => ({
        type: 'SET_ACTIVE_CHAPTER_NUMBER_MOCK',
        chapterNumber
    })
}));

describe('<EditorBookChapterTopNavigation />', () => {
    let props;
    let component;
    let dispatch;
    let state;
    const getState = () => state;

    beforeEach(() => {
        props = {
            chapters: [
                {
                    id: 943,
                    number: 1,
                    heading: 'Chapter 1',
                    paragraphs: []
                },
                {
                    id: 944,
                    number: 2,
                    heading: 'Chapter 2',
                    paragraphs: []
                }
            ],
            setTooltipText: jest.fn(),
            setLayerContent: jest.fn()
        };

        dispatch = jest.fn();
        state = {
            navigation: {
                activeChapterNumber: 2
            },
            book: {
                id: 5
            }
        };
    });

    function renderComponent() {
        component = create(
            <Context.Provider value={{ dispatch, getState }}>
                <EditorBookChapterTopNavigation {...props} />
            </Context.Provider>
        );
    }

    test('<EditorBookChapterTopNavigation /> is rendered correctly', () => {
        renderComponent();

        expect(component).toMatchInlineSnapshot(`
            <div
              className="book-chapter-navigation"
            >
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Kapitel hinzufügen"
              />
              <div
                chapterNumber={1}
                data-book-chapter-navigation-element={true}
                setActiveChapterNumber={[Function]}
              />
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Kapitel hinzufügen"
              />
              <div
                className="book-chapter-navigation-element book-chapter-navigation-element--active"
              >
                2
              </div>
              <div
                className="chapter-placeholder"
                data-tooltip-trigger-div={true}
                onClick={[Function]}
                setTooltipText={[MockFunction]}
                tooltipText="Kapitel hinzufügen"
              />
            </div>
        `);
    });

    test('setActiveChapterNumber is passed correctly to the navigation elements', () => {
        renderComponent();

        component.root
            .findAllByType(BookChapterNavigationElement)
            .forEach((navigationElement) => {
                dispatch.mockClear();
                navigationElement.props.setActiveChapterNumber(3);

                expect(dispatch).toHaveBeenCalledWith({
                    type: 'SET_ACTIVE_CHAPTER_NUMBER_MOCK',
                    chapterNumber: 3
                });
            });
    });

    test('setTooltipText is passed correctly to the chapter placeholders', () => {
        renderComponent();

        component.root
            .findAllByType(TooltipTriggerDiv)
            .forEach((tooltipTriggerDiv) => {
                props.setTooltipText.mockClear();
                tooltipTriggerDiv.props.setTooltipText('insert chapter');

                expect(props.setTooltipText).toHaveBeenCalledWith(
                    'insert chapter'
                );
            });
    });

    test('setLayerContent is called with correct layer content when a placeholder is clicked', () => {
        renderComponent();

        component.root
            .findAllByType(TooltipTriggerDiv)
            .forEach((tooltipTriggerDiv, index) => {
                props.setLayerContent.mockClear();
                tooltipTriggerDiv.props.onClick();

                expect(props.setLayerContent).toHaveBeenCalledWith(
                    <InsertChapterLayer
                        previousChapterNumber={index}
                    />
                );
            });
    });
});
