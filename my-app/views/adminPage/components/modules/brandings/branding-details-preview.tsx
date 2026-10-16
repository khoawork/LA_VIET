import { IonIcon } from "@/shared/icons/ion-icon";
import type { FooterDraft } from "../../../types/brandings/site-settings.type";

function PreviewIcon({ name }: { name: string | null | undefined }) {
  return name ? <IonIcon name={name} className="h-3.5 w-3.5" /> : null;
}

export function BrandingDetailsPreview({ footer }: { footer: FooterDraft }) {
  return (
    <div className="space-y-4 text-xs">
      <div>
        <h4 className="mb-2 font-bold">{footer.office.title}</h4>
        {footer.office.locations.map((item, index) => (
          <p key={index} className="mb-2"><strong>{item.name}</strong><br />{item.address}</p>
        ))}
      </div>
      <div className="border-t border-[#EAE2D5] pt-3">
        <h4 className="mb-2 font-bold">{footer.contact.title}</h4>
        {footer.contact.methods.map((item, index) => (
          <p key={index} className="mb-2 flex items-center gap-2">
            <PreviewIcon name={item.icon} /> {item.value}
          </p>
        ))}
      </div>
      <div className="border-t border-[#EAE2D5] pt-3">
        <h4 className="mb-2 font-bold">{footer.social.title}</h4>
        {footer.social.links.map((item, index) => (
          <p key={index} className="mb-2 flex items-center gap-2">
            <PreviewIcon name={item.icon} /> {item.href}
          </p>
        ))}
      </div>
    </div>
  );
}
