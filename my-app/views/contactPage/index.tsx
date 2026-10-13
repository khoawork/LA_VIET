import {
  ContactBreadcrumb,
  ContactHeader,
  ContactInfoCard,
  ContactMapCard,
  ContactForm,
  ContactExperience,
} from "./components";

/**
 * Component nội dung trang Liên Hệ & Tư Vấn Lã Việt
 */
export default function ContactPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-2">
      <ContactBreadcrumb />

      <ContactHeader />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <ContactInfoCard />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <ContactMapCard />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        <div className="lg:col-span-7 flex flex-col">
          <ContactForm />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <ContactExperience />
        </div>
      </section>
    </div>
  );
}

export { ContactPage };
export * from "./components";
export * from "./services/contact.services";
export * from "./types/contact.type";

