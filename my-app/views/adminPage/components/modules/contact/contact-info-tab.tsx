import type { PageContactProps } from "../../../types/contact/page-contact.type";
import {
  ContactField,
  ContactListHeader,
  ContactListItem,
  ContactPanel,
} from "./contact-field";

type Info = PageContactProps["contactInfo"];
type Office = Info["offices"][number];
type Channel = Info["channels"][number];

export function ContactInfoTab({
  data,
  onChange,
}: {
  data: Info;
  onChange: (data: Info) => void;
}) {
  const updateOffice = (index: number, patch: Partial<Office>) =>
    onChange({
      ...data,
      offices: data.offices.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  const updateChannel = (index: number, patch: Partial<Channel>) =>
    onChange({
      ...data,
      channels: data.channels.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    });
  return (
    <ContactPanel title="Thông tin liên hệ">
      <ContactField
        label="Tên công ty"
        value={data.companyName}
        onChange={(companyName) => onChange({ ...data, companyName })}
      />
      <ContactListHeader
        title={`Văn phòng (${data.offices.length})`}
        addLabel="Thêm văn phòng"
        onAdd={() =>
          onChange({
            ...data,
            offices: [
              ...data.offices,
              {
                name: "",
                icon: "",
                address: "",
                detail: { icon: "", text: "" },
              },
            ],
          })
        }
      />
      {data.offices.map((office, index) => (
        <ContactListItem
          key={index}
          label={office.name || "văn phòng mới"}
          onRemove={() =>
            onChange({
              ...data,
              offices: data.offices.filter((_, i) => i !== index),
            })
          }
        >
          <ContactField
            label="Tên"
            value={office.name}
            onChange={(name) => updateOffice(index, { name })}
          />
          <ContactField
            label="Icon văn phòng"
            icon
            value={office.icon}
            onChange={(icon) => updateOffice(index, { icon })}
          />
          <div className="sm:col-span-2">
            <ContactField
              label="Địa chỉ"
              value={office.address}
              onChange={(address) => updateOffice(index, { address })}
            />
          </div>
          <ContactField
            label="Tag (tùy chọn)"
            value={office.tag ?? ""}
            onChange={(tag) => updateOffice(index, { tag })}
          />
          <ContactField
            label="Icon thông tin"
            icon
            value={office.detail.icon}
            onChange={(icon) =>
              updateOffice(index, { detail: { ...office.detail, icon } })
            }
          />
          <ContactField
            label="Dòng thông tin"
            value={office.detail.text}
            onChange={(text) =>
              updateOffice(index, { detail: { ...office.detail, text } })
            }
          />
        </ContactListItem>
      ))}
      <ContactListHeader
        title={`Kênh liên hệ (${data.channels.length})`}
        addLabel="Thêm kênh"
        onAdd={() =>
          onChange({
            ...data,
            channels: [...data.channels, { title: "", contacts: [] }],
          })
        }
      />
      {data.channels.map((channel, index) => (
        <ContactListItem
          key={index}
          label={channel.title || "kênh liên hệ mới"}
          onRemove={() =>
            onChange({
              ...data,
              channels: data.channels.filter((_, i) => i !== index),
            })
          }
        >
          <ContactField
            label="Tiêu đề"
            value={channel.title}
            onChange={(title) => updateChannel(index, { title })}
          />
          <div className="sm:col-span-2 space-y-3">
            <ContactListHeader
              title="Dòng liên hệ"
              addLabel="Thêm dòng"
              onAdd={() =>
                updateChannel(index, {
                  contacts: [
                    ...channel.contacts,
                    { value: "", description: "" },
                  ],
                })
              }
            />
            {channel.contacts.map((contact, contactIndex) => (
              <ContactListItem
                key={contactIndex}
                label={contact.value || "dòng liên hệ mới"}
                onRemove={() =>
                  updateChannel(index, {
                    contacts: channel.contacts.filter(
                      (_, i) => i !== contactIndex,
                    ),
                  })
                }
              >
                <ContactField
                  label="Giá trị"
                  value={contact.value}
                  onChange={(value) =>
                    updateChannel(index, {
                      contacts: channel.contacts.map((item, i) =>
                        i === contactIndex ? { ...item, value } : item,
                      ),
                    })
                  }
                />
                <ContactField
                  label="Mô tả"
                  value={contact.description ?? ""}
                  onChange={(description) =>
                    updateChannel(index, {
                      contacts: channel.contacts.map((item, i) =>
                        i === contactIndex ? { ...item, description } : item,
                      ),
                    })
                  }
                />
              </ContactListItem>
            ))}
          </div>
        </ContactListItem>
      ))}
      <ContactField
        label="Tiêu đề mạng xã hội"
        value={data.social.title}
        onChange={(title) =>
          onChange({ ...data, social: { ...data.social, title } })
        }
      />
      <ContactListHeader
        title={`Liên kết (${data.social.links.length})`}
        addLabel="Thêm liên kết"
        onAdd={() =>
          onChange({
            ...data,
            social: {
              ...data.social,
              links: [...data.social.links, { icon: "", href: "" }],
            },
          })
        }
      />
      {data.social.links.map((link, index) => (
        <ContactListItem
          key={index}
          label={link.icon || "liên kết mới"}
          onRemove={() =>
            onChange({
              ...data,
              social: {
                ...data.social,
                links: data.social.links.filter((_, i) => i !== index),
              },
            })
          }
        >
          <ContactField
            label="Icon"
            icon
            value={link.icon}
            onChange={(icon) =>
              onChange({
                ...data,
                social: {
                  ...data.social,
                  links: data.social.links.map((item, i) =>
                    i === index ? { ...item, icon } : item,
                  ),
                },
              })
            }
          />
          <ContactField
            label="URL"
            value={link.href}
            onChange={(href) =>
              onChange({
                ...data,
                social: {
                  ...data.social,
                  links: data.social.links.map((item, i) =>
                    i === index ? { ...item, href } : item,
                  ),
                },
              })
            }
          />
        </ContactListItem>
      ))}
    </ContactPanel>
  );
}
