import { stateToHTML } from 'draft-js-export-html'

let options = {
    inlineStyles: {
        // Override default element (`strong`).
        BOLD: { element: 'b' },
        ITALIC: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: { class: 'foo' },
            // Use camel-case. Units (`px`) will be added where necessary.
            style: { fontSize: 12 }
        },
        // Use a custom inline style. Default element is `span`.
        RED: { style: { color: '#900' } },
        CODE: {
            // backgroundColor: "rgba(0, 0, 0, 0.05)",
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
};

const ExportToHTML = (contentState) => {
    return stateToHTML(contentState, options);
}

export default ExportToHTML