import React from 'react';

/**
 * Formats inline text with bolding (**text**) and cleans internal tags like [Product ID: X]
 */
function renderInlineFormatted(text) {
  // Strip out developer tags like [Product ID: 4]
  const cleaned = text.replace(/\[Product ID:\s*\d+\]/gi, '').trim();

  // Split by bold markdown **...**
  const parts = cleaned.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/**
 * Lightweight, zero-dependency Markdown renderer for shopping assistant responses.
 * Formats headings, bullet lists, spec items, and section dividers cleanly.
 */
export default function FormattedMessage({ content }) {
  if (!content) return null;

  // Split content by lines
  const lines = content.split('\n');
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
              <span className="flex-1">{renderInlineFormatted(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList();
      return;
    }

    // Horizontal divider (--- or ***)
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushList();
      elements.push(
        <hr key={`hr-${index}`} className="my-4 border-t border-gray-200" />
      );
      return;
    }

    // Headings: ### Title or ## Title or # Title
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const title = headingMatch[2];

      if (level === 1 || level === 2) {
        elements.push(
          <h2
            key={`h-${index}`}
            className="text-base font-bold text-gray-900 mt-3 mb-1.5 first:mt-0 flex items-center gap-1.5"
          >
            {renderInlineFormatted(title)}
          </h2>
        );
      } else {
        elements.push(
          <h3
            key={`h-${index}`}
            className="text-sm font-semibold text-indigo-950 mt-2.5 mb-1 flex items-center gap-1.5"
          >
            {renderInlineFormatted(title)}
          </h3>
        );
      }
      return;
    }

    // Bullet points: - item or * item
    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      currentList.push(bulletMatch[1]);
      return;
    }

    // Regular paragraph line
    flushList();
    elements.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-gray-700 my-1.5">
        {renderInlineFormatted(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1">{elements}</div>;
}
