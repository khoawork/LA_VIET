import z from "zod";
import { PagesRequestSchema } from "../pages.schema";

const required = (label: string) => z.string().trim().min(1, `${label} is required`);
const optionalText = z.string().optional();

export const PageContactHeaderSchema = z.object({
  breadcrumb: z.object({
    homeLabel: required("Home label"),
    currentLabel: required("Current label"),
  }),
  title: required("Title"),
  description: required("Description"),
  brandBadge: z.object({
    icon: required("Icon"),
    title: required("Badge title"),
    description: required("Badge description"),
  }),
});

export const PageContactInfoSchema = z.object({
  companyName: required("Company name"),
  offices: z.array(z.object({
    name: required("Office name"),
    icon: required("Office icon"),
    address: required("Address"),
    tag: optionalText,
    detail: z.object({
      icon: required("Detail icon"),
      text: required("Detail text"),
    }),
  })),
  channels: z.array(z.object({
    title: required("Channel title"),
    contacts: z.array(z.object({
      value: required("Contact value"),
      description: optionalText,
    })),
  })),
  social: z.object({
    title: required("Social title"),
    links: z.array(z.object({
      icon: required("Social icon"),
      href: required("Social URL"),
    })),
  }),
});

export const PageContactMapSchema = z.object({
  directionsLabel: required("Directions label"),
  distanceNoteIcon: required("Distance note icon"),
  locations: z.array(z.object({
    name: required("Location name"),
    tabLabel: required("Tab label"),
    title: required("Location title"),
    distanceNote: required("Distance note"),
    embedUrl: z.url("Embed URL must be valid").refine((value) => {
      try {
        return Boolean(new URL(value).searchParams.get("q"));
      } catch {
        return false;
      }
    }, "Embed URL must contain a q parameter for directions"),
  })),
});

export const PageContactCTASchema = z.object({
  eyebrow: required("Eyebrow"),
  icon: required("CTA icon"),
  fields: z.array(z.object({
    name: required("Field name"),
    label: required("Field label"),
    type: z.enum(["text", "tel", "email", "textarea"]),
    placeholder: z.string(),
    required: z.boolean(),
  })).refine((fields) => new Set(fields.map((field) => field.name)).size === fields.length, {
    message: "Field names must be unique",
  }),
  iconPrivacy: required("Privacy icon"),
  privacyNote: required("Privacy note"),
  submitLabel: required("Submit label"),
});

export const PageContactExperienceSchema = z.object({
  eyebrow: required("Eyebrow"),
  title: required("Title"),
  suffix: required("Suffix"),
  spaces: z.array(z.object({
    tag: required("Space tag"),
    title: required("Space title"),
    description: required("Space description"),
    imageUrl: z.url("Image URL must be valid"),
  })),
  visitNote: required("Visit note"),
  bookingNote: required("Booking note"),
});

export const PageContactPropsSchema = z.object({
  header: PageContactHeaderSchema,
  contactInfo: PageContactInfoSchema,
  map: PageContactMapSchema,
  cta: PageContactCTASchema,
  experience: PageContactExperienceSchema,
});

export const PageContactRequestSchema = PagesRequestSchema.omit({
  props: true,
  slug: true,
}).extend({ props: PageContactPropsSchema });

export const PageContactResponseSchema = PageContactRequestSchema.extend({
  id: z.number(),
  slug: z.literal("contact"),
});
