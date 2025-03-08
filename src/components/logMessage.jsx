import DOMPurify from "dompurify";

function formatMessage(message) {
    let isAction = false;
    // Handle IRC-style action messages
    if (message.startsWith("\u0001ACTION") && message.endsWith("\u0001")) {
        isAction = true;
        message = message.slice(1, -1).slice(7);
    }

    // Updated regex to handle multiple links and prevent stripping `]` incorrectly
    const regex = /\[(https?:\/\/[^\s\]]+)\s+((?:[^\]]|\](?!\s|\[|$))+)]|\[([^\]]+)]/g;
    const parts = [];
    let lastIndex = 0;

    message.replace(regex, (match, url, text, unformatted, index) => {
        // Push preceding normal text
        if (index > lastIndex) {
            parts.push(
                <span key={lastIndex} className={isAction ? "log-action-text" : ""}>
                    {DOMPurify.sanitize(message.substring(lastIndex, index))}
                </span>
            );
        }

        if (url && text) {
            parts.push(
                <a
                    className="log-link"
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {DOMPurify.sanitize(text)}
                </a>
            );
        } else if (unformatted) {
            // Normal bracketed text
            parts.push(
                <span key={index} className="log-bracket-text">
                    [{DOMPurify.sanitize(unformatted)}]
                </span>
            );
        }

        lastIndex = index + match.length;
    });

    // Push remaining normal text
    if (lastIndex < message.length) {
        parts.push(
            <span key={lastIndex} className={isAction ? "log-action-text" : ""}>
                {DOMPurify.sanitize(message.substring(lastIndex))}
            </span>
        );
    }

    return parts;
}

export default function Message({ text }) {
    return <span className="text-break">{formatMessage(text)}</span>;
}
