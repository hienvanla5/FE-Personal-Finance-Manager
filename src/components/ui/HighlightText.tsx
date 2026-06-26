interface HighlightTextProps {
  text: string
  highlight: string
}

/**
 * Renders text with matching substrings wrapped in a <mark> element.
 * The match is case-insensitive.
 */
export default function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight.trim()) {
    return <>{text}</>
  }

  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="rounded bg-[#F7CEAD] px-0.5 text-[#2C2C2A]"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}