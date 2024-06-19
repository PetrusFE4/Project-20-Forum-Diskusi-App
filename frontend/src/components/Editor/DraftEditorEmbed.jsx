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

const DraftEditorEmbed = ({ autoFocus, onSubmit }) => {
    const [buttonState, setButtonState] = useState(false)
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            convertFromRaw({
                blocks: [],
                entityMap: {},
            })
        )
    )
    const [focus, setFocus] = useState(false)
    const editor = useRef(null);

    useEffect(() => {
        if (autoFocus)
            focusEditor()
    }, [])

    useEffect(() => {
        console.log(focus)
    }, [focus])

    const focusEditor = () => {
        editor.current.focus()
        setFocus(true)
    }

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
                return "blockQuote"
            case "codeBlock":
                return "codeBlock"
            default:
                break;
        }
    }

    const onFocus = () => {
        setButtonState(false)
        setFocus(true)
    }

    const onBlur = () => {
        if (editorState.getCurrentContent().hasText())
            setButtonState(true)
        setFocus(false)
    }

    return (
        <div className="editor-wrapper" onClick={focusEditor}>
            <Toolbar editorState={editorState} setEditorState={setEditorState} />
            <div className="p-5 pt-5 pb-2 border-b relative">
                <label className={`absolute pointer-events-none left-5 top-4 font-light focus transition-all ${focus || editorState.getCurrentContent().hasText() ? '-translate-y-3 text-xs' : 'text-base'}`}>Content{true ? <span className='text-red-600'>*</span> : null}</label>
                <Editor
                    ref={editor}
                    placeholder={null}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={styleMap}
                    blockStyleFn={myBlockStyleFn}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(editorState) => {
                        // const contentState = editorState.getCurrentContent();
                        // console.log(contentState);
                        setEditorState(editorState)
                    }}
                />
            </div>

            <div className="flex flex-row p-2 justify-end">
                {/* <Button
                    className='block max-w-40 mr-4'
                    title='Cancel'
                onClick={() => setShowInput(false)} 
                /> */}
                <Button
                    className='block max-w-40'
                    title='Post'
                    disabled={!buttonState}
                    onClick={() => onSubmit(ExportToHTML(editorState.getCurrentContent()))}
                />
            </div>
        </div>
    );
};

export default DraftEditorEmbed;