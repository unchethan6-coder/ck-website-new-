import Image from "next/image";
import type { JSX } from "react";

/**
 * Renders Strapi v5 "blocks" (rich text) into styled JSX.
 * Supports heading, paragraph, list, quote, code, image, and inline
 * bold / italic / underline / strikethrough / code / link.
 */

function InlineText({ node }: { node: any }): JSX.Element {
  const text = node.text ?? "";
  if (node.code) {
    return (
      <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[0.9em] text-primary">
        {text}
      </code>
    );
  }
  const cls = [
    node.bold ? "font-bold" : "",
    node.italic ? "italic" : "",
    node.underline ? "underline underline-offset-2" : "",
    node.strikethrough ? "line-through" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{text}</span>;
}

function Inline({ node, index }: { node: any; index: number }): JSX.Element {
  if (node.type === "link") {
    return (
      <a
        key={index}
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-[#F7D774]"
      >
        {Array.isArray(node.children) && node.children.map((c: any, i: number) => <Inline key={i} node={c} index={i} />)}
      </a>
    );
  }
  return <InlineText key={index} node={node} />;
}

function Block({ block, index }: { block: any; index: number }): JSX.Element | null {
  const key = `blk-${index}`;
  const children = Array.isArray(block.children)
    ? block.children.map((c: any, i: number) => <Inline key={i} node={c} index={i} />)
    : null;

  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;
      const cls =
        "font-[family-name:var(--font-inter-tight)] font-extrabold text-foreground tracking-tight";
      if (level === 1) return <h1 key={key} className={`${cls} text-2xl sm:text-3xl mt-2`}>{children}</h1>;
      if (level === 2) return <h2 key={key} className={`${cls} text-xl sm:text-2xl mt-6`}>{children}</h2>;
      if (level === 3) return <h3 key={key} className={`${cls} text-lg sm:text-xl mt-5`}>{children}</h3>;
      return <h4 key={key} className={`${cls} text-base sm:text-lg mt-4`}>{children}</h4>;
    }
    case "paragraph":
      return <p key={key} className="text-[15px] leading-relaxed text-foreground/70">{children}</p>;
    case "list": {
      const items = Array.isArray(block.children)
        ? block.children.map((li: any, i: number) => (
            <li key={i} className="text-[15px] leading-relaxed text-foreground/70">
              {Array.isArray(li.children) && li.children.map((c: any, j: number) => <Inline key={j} node={c} index={j} />)}
            </li>
          ))
        : null;
      return block.format === "ordered" ? (
        <ol key={key} className="list-decimal space-y-2 pl-6">{items}</ol>
      ) : (
        <ul key={key} className="list-disc space-y-2 pl-6">{items}</ul>
      );
    }
    case "quote":
      return (
        <blockquote
          key={key}
          className="rounded-r-xl border-l-4 border-primary/50 bg-foreground/[0.03] py-4 pl-5 pr-4 text-[15px] italic leading-relaxed text-foreground/80"
        >
          {children}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={key}
          className="overflow-x-auto rounded-xl border border-foreground/10 bg-[#0d0b06] p-4 font-mono text-[13px] leading-relaxed text-[#e8e6e1]"
        >
          {block.children?.map((c: any, i: number) => <span key={i}>{c.text ?? ""}</span>)}
        </pre>
      );
    case "image": {
      const img = block.image;
      if (!img?.url) return null;
      const src = img.url.startsWith("http") ? img.url : `https://cms.fundedproptraders.com${img.url}`;
      const w = img.width ?? 1200;
      const h = img.height ?? 675;
      return (
        <div key={key} className="overflow-hidden rounded-2xl border border-foreground/10">
          <Image
            src={src}
            alt={img.alternativeText ?? ""}
            width={w}
            height={h}
            className="h-auto w-full"
            sizes="(min-width: 768px) 760px, 100vw"
          />
        </div>
      );
    }
    default:
      return null;
  }
}

export function BlocksRenderer({ blocks }: { blocks: any[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => (
        <Block key={i} block={b} index={i} />
      ))}
    </div>
  );
}
