import { resolveIonIconSvg } from "./ion-icons";

interface Props {
  name: string | null | undefined;
  className?: string;
  fallback?: string;
}

export function IonIcon({ name, className = "h-4 w-4", fallback = "helpCircleOutline" }: Props) {
  const svg = resolveIonIconSvg(name) ?? resolveIonIconSvg(fallback);
  if (!svg) return null;

  return (
    <span
      aria-hidden="true"
      className={`ion-inline-icon inline-flex shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
