import * as icons from "ionicons/icons";

const catalog = icons as Record<string, string>;

function normalize(value: string) {
  return value.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

export const ionIconNames = Object.keys(catalog).sort();

const normalizedNames = new Map(
  ionIconNames.map((name) => [normalize(name), name]),
);

const legacyNames: Record<string, string> = {
  phone: "callOutline",
  email: "mailOutline",
  envelope: "mailOutline",
  building2: "businessOutline",
  handshake: "peopleOutline",
  ruler: "resizeOutline",
  layers: "layersOutline",
  palette: "colorPaletteOutline",
  shield: "shieldCheckmarkOutline",
  sparkles: "sparklesOutline",
  draftingcompass: "compassOutline",
  clock: "timeOutline",
  clipboardcheck: "checkboxOutline",
  shieldcheck: "shieldCheckmarkOutline",
  navigation: "navigateOutline",
  globe: "globeOutline",
  shoppingbag: "bagHandleOutline",
};

export function resolveIonIconName(value: string | null | undefined) {
  if (!value) return null;
  if (Object.hasOwn(catalog, value)) return value;

  const normalized = normalize(value.replace(/^Fa(?=[A-Z])/, ""));
  const brand = normalized.endsWith("f") ? normalized.slice(0, -1) : normalized;
  return (
    legacyNames[normalized] ??
    normalizedNames.get(normalized) ??
    normalizedNames.get(`logo${normalized}`) ??
    normalizedNames.get(`logo${brand}`) ??
    null
  );
}

const svgIcons = new Map<string, string>();

export function resolveIonIconSvg(value: string | null | undefined) {
  const name = resolveIonIconName(value);
  if (!name) return null;
  const cached = svgIcons.get(name);
  if (cached) return cached;

  const svg = catalog[name].slice(catalog[name].indexOf(",") + 1);
  svgIcons.set(name, svg);
  return svg;
}
