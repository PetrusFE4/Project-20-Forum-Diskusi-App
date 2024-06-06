import { stateToHTML } from 'draft-js-export-html'

const options = {
    inlineStyles: {
        BOLD: { element: 'b' },
        ITALIC: {
            style: { fontSize: 12 }
        },
        RED: { style: { color: '#900' } },
        CODE: {
            style: {
                fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
                fontSize: 16,
                padding: 2,
            }
        },
        HIGHLIGHT: {
            style: { backgroundColor: "#F7A5F7", }
        },
        SUPERSCRIPT: {
            style: {
                verticalAlign: "super",
                fontSize: "80%",
            }
        },
        SUBSCRIPT: {
            style: {
                verticalAlign: "sub",
                fontSize: "80%",
            }
        },
    },
    blockRenderers: {
        'codeBlock': (block) => {
            return `<code class="codeBlock">${block.getText()}</code>`;
        },
        'blockQuote': (block) => {
            return `<blockquote class="blockQuote">${block.getText()}</blockquote>`;
        }
    },
    blockStyleFn: (block) => {
        if (block.getType() === 'blockQuote') {
            return 'blockQuote';
        }
    }
};

const ExportToHTML = (contentState) => {
    return stateToHTML(contentState, options);
}

export default ExportToHTML