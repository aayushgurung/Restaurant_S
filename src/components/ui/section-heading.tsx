import type { ReactNode } from "react";
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`section-heading ${centered ? "section-heading--center" : ""}`}
    >
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <header className="page-intro container">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
