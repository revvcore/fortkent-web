import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkDownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="style-blog-p mb-4">{children}</p>,
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => (
          <h4 className="text-xl md:text-2xl font-medium text-gray-900 tracking-tight mb-1">
            {children}
          </h4>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc list-inside">{children}</ul>
        ),
        li: ({ children }) => <li className="style-blog-p mb-2">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="text-blue-500 underline">
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img src={src} className="w-full rounded-xl" alt={alt} />
        ),
        // Add more overrides as needed (e.g., code, blockquote, etc.)
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
