import React, { useEffect, useRef, useState } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import Button from "../Form/Button";
import Toolbar from "./Toolbar";
import './Style.css'
import ExportToHTML from "./ExportToHTML";

const DraftEditor = ({ discussionId, onSubmit }) => {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            convertFromRaw({
                blocks: [],
                entityMap: {},
            })
        )
    );
    const editor = useRef(null);

    useEffect(() => {
        focusEditor();
    }, []);

    const focusEditor = () => {
        editor.current.focus();
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    // FOR INLINE STYLES
    const styleMap = {
        CODE: {
            // backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
        HIGHLIGHT: {
            backgroundColor: "#F7A5F7",
        },
        SUPERSCRIPT: {
            verticalAlign: "super",
            fontSize: "80%",
        },
        SUBSCRIPT: {
            verticalAlign: "sub",
            fontSize: "80%",
        },
    };

    // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
    const myBlockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
            case "blockQuote":
                return "superFancyBlockquote"
            case "codeBlock":
                return "codeBlock"
            default:
                break;
        }
    };

    return (
        <div className="editor-wrapper" onClick={focusEditor}>
            <Toolbar editorState={editorState} setEditorState={setEditorState} />
            <div className="p-2 border-b">
                <Editor
                    ref={editor}
                    placeholder="Write Here"
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={styleMap}
                    blockStyleFn={myBlockStyleFn}
                    onChange={(editorState) => {
                        const contentState = editorState.getCurrentContent();
                        console.log(convertToRaw(contentState));
                        setEditorState(editorState);
                    }}
                />
            </div>

            <div className="flex flex-row p-2 justify-end">
                <Button
                    className='max-w-40 mr-4'
                    title='Cancel'
                // onClick={() => setShowInput(false)} 
                />
                <Button
                    className='max-w-40'
                    title='Post'
                onClick={() => onSubmit(ExportToHTML(editorState.getCurrentContent()))} 
                />
            </div>
        </div>
    );
};

export default DraftEditor;