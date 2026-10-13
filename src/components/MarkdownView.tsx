import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  // Parse markdown into structured segments
  const renderFormattedText = (text: string) => {
    // Process bold, italic, inline code
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Pattern for inline tokens: **bold**, *italic*, `code`
    const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/;

    while (remaining.length > 0) {
      const match = remaining.match(tokenRegex);
      if (!match || match.index === undefined) {
        parts.push(remaining);
        break;
      }

      if (match.index > 0) {
        parts.push(remaining.substring(0, match.index));
      }

      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={`b-${keyIdx++}`} className="font-semibold text-slate-900 dark:text-white">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={`i-${keyIdx++}`} className="italic text-slate-800 dark:text-slate-200">
            {token.slice(1, -1)}
          </em>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={`c-${keyIdx++}`}
            className="px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-700/80 text-violet-700 dark:text-violet-300 font-mono text-[12px]"
          >
            {token.slice(1, -1)}
          </code>
        );
      }

      remaining = remaining.substring(match.index + token.length);
    }

    return parts;
  };

  // Split lines and parse blocks: code blocks, headers, lists, quotes, paragraphs
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let isNumberedList = false;

  const flushList = (key: string) => {
    if (inList && listItems.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={key} className="my-2 pl-5 list-decimal space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {listItems}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key} className="my-2 pl-5 list-disc space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {listItems}
          </ul>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        const codeText = codeBuffer.join('\n');
        elements.push(
          <CodeBlockView key={`code-${i}`} code={codeText} language={codeLanguage} />
        );
        codeBuffer = [];
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        // Open code block
        flushList(`flush-${i}`);
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Empty line
    if (!trimmed) {
      flushList(`flush-empty-${i}`);
      continue;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList(`flush-${i}`);
      elements.push(
        <h4 key={`h3-${i}`} className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-3 mb-1">
          {renderFormattedText(trimmed.slice(4))}
        </h4>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList(`flush-${i}`);
      elements.push(
        <h3 key={`h2-${i}`} className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mt-3.5 mb-1.5">
          {renderFormattedText(trimmed.slice(3))}
        </h3>
      );
      continue;
    }
    if (trimmed.startsWith('# ')) {
      flushList(`flush-${i}`);
      elements.push(
        <h2 key={`h1-${i}`} className="font-bold text-lg text-slate-900 dark:text-white mt-4 mb-2">
          {renderFormattedText(trimmed.slice(2))}
        </h2>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushList(`flush-${i}`);
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-2 pl-3 border-l-2 border-[#5B7CFA] italic text-slate-600 dark:text-slate-300 text-xs sm:text-sm bg-blue-50/50 dark:bg-blue-950/20 py-1 rounded-r-lg"
        >
          {renderFormattedText(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Numbered List
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (!inList || !isNumberedList) {
        flushList(`flush-${i}`);
        inList = true;
        isNumberedList = true;
      }
      listItems.push(
        <li key={`num-li-${i}`} className="leading-relaxed">
          {renderFormattedText(numMatch[2])}
        </li>
      );
      continue;
    }

    // Bullet List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList || isNumberedList) {
        flushList(`flush-${i}`);
        inList = true;
        isNumberedList = false;
      }
      listItems.push(
        <li key={`bullet-li-${i}`} className="leading-relaxed">
          {renderFormattedText(trimmed.slice(2))}
        </li>
      );
      continue;
    }

    // Regular paragraph
    flushList(`flush-${i}`);
    elements.push(
      <p key={`p-${i}`} className="my-1 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {renderFormattedText(trimmed)}
      </p>
    );
  }

  // Flush any remaining list
  flushList('flush-final');

  // Flush open code block if any
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlockView key="code-final" code={codeBuffer.join('\n')} language={codeLanguage} />
    );
  }

  return <div className="space-y-1">{elements}</div>;
};

// Sub-component for code block with copy button
const CodeBlockView: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 text-slate-100 text-xs shadow-md">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/60 text-[11px] text-slate-400 font-mono">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
        </button>
      </div>
      <pre className="p-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-emerald-300/90 whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
};
