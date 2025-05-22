// src/components/SafeHtml.tsx
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  html: string;
  className?: string;
}

export default function SafeHtml({ html, className }: Readonly<SafeHtmlProps>) {
  const clean = DOMPurify.sanitize(html);
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
  );
}
