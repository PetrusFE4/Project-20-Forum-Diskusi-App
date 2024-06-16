import React from 'react'
import './Style.css'
import { RichUtils } from 'draft-js'
import { FaBold, FaCode, FaHighlighter, FaItalic, FaListOl, FaListUl, FaQuoteLeft, FaStrikethrough, FaSubscript, FaSuperscript, FaUnderline } from "react-icons/fa6";
import { BiCodeBlock } from 'react-icons/bi';

const Toolbar = ({ editorState, setEditorState }) => {
    const tools = [
        {
            label: "bold",
            style: "BOLD",
            icon: <FaBold />,
            method: "inline",
        },
        {
            label: "italic",
            style: "ITALIC",
            icon: <FaItalic />,
            method: "inline",
        },
        {
            label: "underline",
            style: "UNDERLINE",
            icon: <FaUnderline />,
            method: "inline",
        },
        {
            label: "strike-through",
            style: "STRIKETHROUGH",
            icon: <FaStrikethrough />,
            method: "inline",
        },
        {
            label: "Superscript",
            style: "SUPERSCRIPT",
            icon: <FaSuperscript />,
            method: "inline",
        },
        {
            label: "Subscript",
            style: "SUBSCRIPT",
            icon: <FaSubscript />,
            method: "inline",
        },
        {
            label: "Unordered-List",
            style: "unordered-list-item",
            method: "block",
            icon: <FaListUl />,
        },
        {
            label: "Ordered-List",
            style: "ordered-list-item",
            method: "block",
            icon: <FaListOl />,
        },
        {
            label: "Monospace",
            style: "codeBlock",
            icon: <FaCode />,
            method: "block",
        },
        {
            label: "Blockquote",
            style: "blockQuote",
            icon: <FaQuoteLeft />,
            method: "block",
        }
    ];

    const applyStyle = (e, style, method) => {
        e.preventDefault();
        method === "block"
            ? setEditorState(RichUtils.toggleBlockType(editorState, style))
            : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const isActive = (style, method) => {
        if (method === "block") {
            const selection = editorState.getSelection();
            const blockType = editorState
                .getCurrentContent()
                .getBlockForKey(selection.getStartKey())
                .getType();
            return blockType === style;
        } else {
            const currentStyle = editorState.getCurrentInlineStyle();
            return currentStyle.has(style);
        }
    };

    return (
        <div className="p-1 border-b flex flex-wrap">
            {tools.map((item, idx) => (
                <button
                    className={`p-2 m-1 rounded-full block ${isActive(item.style, item.method) ? 'bg-gray-400' : 'hover:bg-gray-200'} `}
                    key={`${item.label}-${idx}`}
                    title={item.label}
                    onClick={(e) => applyStyle(e, item.style, item.method)}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {item.icon || item.label}
                </button>
            ))}
        </div>
    );
};

export default Toolbar