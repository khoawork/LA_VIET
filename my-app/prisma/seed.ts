import "dotenv/config";
import { Prisma } from "./generated/prisma/client";
import { prisma } from "./prisma.service";
import { PageContactRequestSchema } from "../shared/schema/pages/page-contact.schema";
import { PageProjectPropsSchema } from "../shared/schema/pages/page-project.schema";

const productCategories = [
  "Tranh Sơn Mài Khổ Lớn",
  "Vách Trang Trí Kiến Trúc",
  "Nội Thất Sơn Mài Cao Cấp",
  "Vật Phẩm Ứng Dụng Độc Bản",
  "Hệ Sơn Hoa Việt",
];

const products = [
  {
    name: "Vũ Điệu Phù Sa",
    title: "BÍCH HỌA SƠN MÀI KHỔ LỚN",
    description:
      "Tác phẩm gợi nhịp bồi đắp của châu thổ sông Hồng qua nhiều lớp sơn ta, vàng quỳ và kỹ thuật mài thủ công.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
    slug: "vu-dieu-phu-sa",
    categoryName: productCategories[0],
    props: {
      dimension: "240 x 120 cm",
      material: "Sơn ta, vàng quỳ, vỏ trứng",
      badge: "TÁC PHẨM ĐỘC BẢN",
      badgeColor: "red",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },
  {
    name: "Khúc Hát Bình Minh",
    title: "BÍCH HỌA SƠN MÀI KHỔ LỚN",
    description:
      "Sắc son cánh gián và ánh bạc tạo nên chuyển động ánh sáng trên mặt hồ lúc bình minh.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
    slug: "khuc-hat-binh-minh",
    categoryName: productCategories[0],
    props: {
      dimension: "200 x 100 cm",
      material: "Sơn then, son cánh gián, bạc",
      badge: "TÁC PHẨM ĐỘC BẢN",
      badgeColor: "red",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },
  {
    name: "Cửu Long Ẩn Vân",
    title: "VÁCH TRANG TRÍ KIẾN TRÚC",
    description:
      "Bộ vách sơn mài nhiều tấm kết hợp cẩn xà cừ, lấy cảm hứng từ hình tượng rồng và mây Việt.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
    slug: "cuu-long-an-van",
    categoryName: productCategories[1],
    props: {
      dimension: "360 x 180 cm",
      material: "Sơn ta, cẩn xà cừ",
      badge: "BỘ BA TẤM",
      badgeColor: "red",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },
  {
    name: "Bàn Trà Hoàng Triều",
    title: "NỘI THẤT SƠN MÀI CAO CẤP",
    description:
      "Bàn trà chế tác trên cốt gỗ tự nhiên, hoàn thiện bằng sơn then và nhiều lượt mài nước.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
    slug: "ban-tra-hoang-trieu",
    categoryName: productCategories[2],
    props: {
      dimension: "180 x 90 x 42 cm",
      material: "Gỗ tự nhiên, sơn then",
      badge: "CHẾ TÁC THỦ CÔNG",
      badgeColor: "dark",
      yearOrSpec: "2026",
      isTechnicalSpec: false,
    },
  },
  {
    name: "Họa Sắc Đông Dương",
    title: "VẬT PHẨM ỨNG DỤNG ĐỘC BẢN",
    description:
      "Bộ vật phẩm trang trí kết hợp cốt gốm và sắc son, vàng, mang tinh thần mỹ thuật Đông Dương.",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=1000&q=80",
    slug: "hoa-sac-dong-duong",
    categoryName: productCategories[3],
    props: {
      dimension: "Cao 65–85 cm",
      material: "Gốm, sơn mài, vàng",
      badge: "BỘ SƯU TẬP",
      badgeColor: "dark",
      yearOrSpec: "2026",
      isTechnicalSpec: false,
    },
  },
  {
    name: "Hệ Sơn Men Sứ Hoa Việt",
    title: "VẬT LIỆU SƠN PHỦ CHUYÊN DỤNG",
    description:
      "Hệ sơn hiệu ứng dành cho gốm, kính, kim loại và composite trong các ứng dụng nội thất, kiến trúc.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80",
    slug: "he-son-men-su-hoa-viet",
    categoryName: productCategories[4],
    props: {
      dimension: "Quy cách 1L, 5L, 20L",
      material: "Hệ sơn phủ chuyên dụng",
      badge: "GIẢI PHÁP VẬT LIỆU",
      badgeColor: "red",
      yearOrSpec: "1L–20L",
      isTechnicalSpec: true,
    },
  },
];

const projectCategories = [
  "Khách sạn & Nghỉ dưỡng",
  "Không gian văn hóa",
  "Dinh thự & Nội thất",
];

const projects = [
  {
    name: "Sảnh đón Heritage",
    slug: "sanh-don-heritage",
    categoryName: projectCategories[0],
    description:
      "Tổ hợp vách sơn mài và điểm nhấn nghệ thuật được thiết kế riêng cho không gian sảnh đón.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    location: "Phú Quốc",
    caption: "Sơn mài trong không gian nghỉ dưỡng đương đại",
    material: "Sơn ta, gỗ, vàng quỳ",
    scale: "Vách nghệ thuật 18 m²",
    button: "Xem dự án",
  },
  {
    name: "Dòng Chảy Di Sản",
    slug: "dong-chay-di-san",
    categoryName: projectCategories[1],
    description:
      "Tác phẩm sơn mài khổ lớn kể câu chuyện văn hóa bản địa bằng ngôn ngữ tạo hình đương đại.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80",
    location: "Hà Nội",
    caption: "Tác phẩm dành cho không gian văn hóa cộng đồng",
    material: "Sơn ta, vỏ trứng, bạc",
    scale: "Bích họa 12 m²",
    button: "Xem dự án",
  },
  {
    name: "Tĩnh Vật Á Đông",
    slug: "tinh-vat-a-dong",
    categoryName: projectCategories[2],
    description:
      "Bộ tác phẩm và nội thất sơn mài được phát triển đồng bộ với vật liệu và ánh sáng của công trình.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    location: "Hồ Chí Minh",
    caption: "Thiết kế sơn mài theo đặt hàng riêng",
    material: "Sơn then, gỗ tự nhiên, xà cừ",
    scale: "Bộ sưu tập 8 tác phẩm",
    button: "Xem dự án",
  },
];

const newsCategories = [
  "Nghiên cứu Kỹ nghệ & Vật liệu",
  "Sự kiện & Triển lãm Nghệ thuật",
  "Nhật ký Công trình",
  "Hợp tác Liên ngành Sơn mài",
];

const articles = [
  {
    name: "Ứng dụng hệ sơn bảo vệ bề mặt sơn mài trong kiến trúc",
    slug: "ung-dung-he-son-bao-ve-be-mat-son-mai",
    categoryName: newsCategories[0],
    preside: "Ban Nghiên cứu Vật liệu Là Việt",
    presideIcon: "FlaskConical",
    date: new Date("2026-10-10T08:00:00.000Z"),
    reading: "8 phút đọc",
    button: "Đọc bài viết",
    description:
      "Khảo sát các giải pháp hoàn thiện giúp bảo vệ bề mặt sơn mài trước độ ẩm, ánh sáng và điều kiện sử dụng trong công trình.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Đối thoại nghệ thuật: sơn mài trong không gian đương đại",
    slug: "doi-thoai-son-mai-trong-khong-gian-duong-dai",
    categoryName: newsCategories[1],
    preside: "Ban Truyền thông Là Việt",
    presideIcon: "Palette",
    date: new Date("2026-09-28T08:00:00.000Z"),
    reading: "5 phút đọc",
    button: "Xem chi tiết",
    description:
      "Cuộc gặp gỡ giữa nghệ nhân, kiến trúc sư và nhà thiết kế về khả năng đưa sơn mài vào không gian sống hôm nay.",
    image:
      "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Từ vóc sơn đến tác phẩm: nhật ký một công trình",
    slug: "tu-voc-son-den-tac-pham-nhat-ky-cong-trinh",
    categoryName: newsCategories[2],
    preside: "Ban Quản lý Dự án",
    presideIcon: "Building2",
    date: new Date("2026-09-12T08:00:00.000Z"),
    reading: "6 phút đọc",
    button: "Xem chi tiết",
    description:
      "Theo chân đội ngũ nghệ nhân từ khâu nghiên cứu vật liệu, tạo vóc đến hoàn thiện và lắp đặt tác phẩm tại công trình.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kỹ nghệ khảm trứng và xà cừ trong tạo hình sơn mài",
    slug: "ky-nghe-kham-trung-va-xa-cu-trong-son-mai",
    categoryName: newsCategories[0],
    preside: "Nhóm Nghiên cứu Chất liệu",
    presideIcon: "Sparkles",
    date: new Date("2026-08-20T08:00:00.000Z"),
    reading: "7 phút đọc",
    button: "Xem chi tiết",
    description:
      "Tìm hiểu cách nghệ nhân lựa chọn, xử lý và kết hợp vật liệu tự nhiên để tạo nên chiều sâu cho bề mặt sơn mài.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
  },
];

const contactPage = PageContactRequestSchema.parse({
  name: "Trang Liên hệ",
  props: {
    header: {
      breadcrumb: { homeLabel: "Trang chủ", currentLabel: "Liên hệ" },
      title: "Kết nối cùng Là Việt",
      description:
        "Chia sẻ ý tưởng và nhu cầu của bạn để đội ngũ Là Việt cùng tư vấn giải pháp phù hợp.",
      brandBadge: {
        icon: "Sparkles",
        title: "Tư vấn nghệ thuật & vật liệu",
        description: "Đồng hành từ ý tưởng đến hoàn thiện công trình",
      },
    },
    contactInfo: {
      companyName: "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội họa Là Việt",
      offices: [
        {
          name: "Văn phòng Là Việt",
          icon: "Building2",
          address: "Hà Nội, Việt Nam",
          tag: "Tiếp khách theo lịch hẹn",
          detail: { icon: "Clock3", text: "Thứ Hai – Thứ Sáu, 09:00 – 17:30" },
        },
      ],
      channels: [
        {
          title: "Liên hệ tư vấn",
          contacts: [
            { value: "contact@laviet.vn", description: "Email" },
            { value: "+84 24 0000 0000", description: "Điện thoại" },
          ],
        },
      ],
      social: {
        title: "Theo dõi Là Việt",
        links: [
          { icon: "globeOutline", href: "https://laviet.vn" },
        ],
      },
    },
    map: {
      directionsLabel: "Xem chỉ đường",
      distanceNoteIcon: "MapPin",
      locations: [
        {
          name: "Văn phòng Là Việt",
          tabLabel: "Văn phòng",
          title: "Gặp gỡ đội ngũ Là Việt",
          distanceNote: "Vui lòng liên hệ trước khi ghé thăm",
          embedUrl:
            "https://www.google.com/maps?q=Hanoi,Vietnam&output=embed",
        },
      ],
    },
    cta: {
      eyebrow: "BẮT ĐẦU MỘT CUỘC TRÒ CHUYỆN",
      icon: "MessageCircle",
      fields: [
        {
          name: "fullname",
          label: "Họ và tên",
          type: "text",
          placeholder: "Nhập họ và tên",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "name@example.com",
          required: true,
        },
        {
          name: "phone",
          label: "Số điện thoại",
          type: "tel",
          placeholder: "Số điện thoại liên hệ",
          required: false,
        },
        {
          name: "message",
          label: "Nội dung",
          type: "textarea",
          placeholder: "Chia sẻ thêm về nhu cầu của bạn",
          required: true,
        },
      ],
      iconPrivacy: "ShieldCheck",
      privacyNote: "Thông tin của bạn chỉ được sử dụng để phản hồi yêu cầu.",
      submitLabel: "Gửi yêu cầu tư vấn",
    },
    experience: {
      eyebrow: "KHÔNG GIAN SÁNG TẠO",
      title: "Khám phá nghệ thuật",
      suffix: "cùng Là Việt",
      spaces: [
        {
          tag: "ATELIER",
          title: "Xưởng chế tác",
          description: "Nơi kỹ nghệ thủ công và chất liệu truyền thống gặp gỡ.",
          imageUrl:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
        },
      ],
      visitNote: "Vui lòng đặt lịch trước khi đến thăm xưởng.",
      bookingNote: "Đội ngũ sẽ liên hệ xác nhận lịch hẹn của bạn.",
    },
  },
});

function toJson(value: unknown): Prisma.InputJsonValue {
  const serialized = JSON.stringify(value);
  if (serialized === undefined) {
    throw new TypeError("Seed data must be serializable to JSON.");
  }
  return JSON.parse(serialized) as Prisma.InputJsonValue;
}

async function ensurePage(name: string, slug: string, props: unknown) {
  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) {
    console.log(`  ✓ Giữ nguyên trang '${slug}' hiện có.`);
    return existing;
  }

  const page = await prisma.page.create({
    data: { name, slug, props: toJson(props) },
  });
  console.log(`  + Đã tạo trang '${slug}'.`);
  return page;
}

async function ensureProductCategory(name: string) {
  const category = await prisma.productCategory.findFirst({ where: { name } });
  if (category) return category.id;
  return (
    await prisma.productCategory.create({ data: { name } })
  ).id;
}

async function ensureProjectCategory(name: string) {
  const category = await prisma.projectCategory.findFirst({ where: { name } });
  if (category) return category.id;
  return (
    await prisma.projectCategory.create({ data: { name } })
  ).id;
}

async function ensureNewsCategory(name: string) {
  const category = await prisma.newsCategory.findFirst({ where: { name } });
  if (category) return category.id;
  return (
    await prisma.newsCategory.create({ data: { name } })
  ).id;
}

async function seedProducts() {
  const categoryIds = new Map<string, number>();
  for (const name of productCategories) {
    categoryIds.set(name, await ensureProductCategory(name));
  }

  const productIds: number[] = [];
  for (const product of products) {
    const categoryId = categoryIds.get(product.categoryName);
    if (!categoryId) {
      throw new Error(`Không tìm thấy danh mục sản phẩm '${product.categoryName}'.`);
    }

    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        name: product.name,
        title: product.title,
        description: product.description,
        image: product.image,
        slug: product.slug,
        categoryId,
        props: toJson(product.props),
      },
      update: {},
    });
    productIds.push(saved.id);
  }
  console.log(`  ✓ Đảm bảo ${productIds.length} sản phẩm mẫu.`);
  return productIds;
}

async function seedProjects() {
  const categoryIds = new Map<string, number>();
  for (const name of projectCategories) {
    categoryIds.set(name, await ensureProjectCategory(name));
  }

  for (const project of projects) {
    const categoryId = categoryIds.get(project.categoryName);
    if (!categoryId) {
      throw new Error(`Không tìm thấy danh mục dự án '${project.categoryName}'.`);
    }
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        name: project.name,
        slug: project.slug,
        categoryId,
        description: project.description,
        image: project.image,
        location: project.location,
        caption: project.caption,
        material: project.material,
        scale: project.scale,
        button: project.button,
      },
      update: {},
    });
  }
  console.log(`  ✓ Đảm bảo ${projects.length} dự án mẫu.`);
}

async function seedNews() {
  const categoryIds = new Map<string, number>();
  for (const name of newsCategories) {
    categoryIds.set(name, await ensureNewsCategory(name));
  }

  for (const article of articles) {
    const categoryId = categoryIds.get(article.categoryName);
    if (!categoryId) {
      throw new Error(`Không tìm thấy danh mục tin tức '${article.categoryName}'.`);
    }
    await prisma.news.upsert({
      where: { slug: article.slug },
      create: {
        name: article.name,
        slug: article.slug,
        categoryId,
        preside: article.preside,
        presideIcon: article.presideIcon,
        date: article.date,
        reading: article.reading,
        button: article.button,
        description: article.description,
        image: article.image,
      },
      update: {},
    });
  }
  console.log(`  ✓ Đảm bảo ${articles.length} bài viết mẫu.`);

  return prisma.news.findMany({
    where: { slug: { in: articles.map((article) => article.slug) } },
    include: { category: true },
    orderBy: { date: "desc" },
  });
}

async function seedSiteSettings() {
  const existing = await prisma.siteSetting.findFirst();
  if (existing) {
    console.log("  ✓ Giữ nguyên cấu hình thương hiệu hiện có.");
    return;
  }

  await prisma.siteSetting.create({
    data: {
      logo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=256&q=80",
      company: "LÀ VIỆT",
      tagline: "SƠN MÀI HỘI HỌA LIÊN NGÀNH",
      footer: toJson({
        description:
          "Là Việt gìn giữ tinh hoa sơn mài Việt và phát triển chất liệu trong không gian đương đại.",
        office: {
          title: "Văn phòng",
          locations: [
            { name: "Là Việt", address: "Hà Nội, Việt Nam" },
          ],
        },
        contact: {
          title: "Liên hệ",
          methods: [
            { icon: "mailOutline", value: "contact@laviet.vn" },
            { icon: "callOutline", value: "+84 24 0000 0000" },
          ],
        },
        social: {
          title: "Mạng xã hội",
          links: [{ icon: "globeOutline", href: "https://laviet.vn" }],
        },
        copyright: "© 2026 LÀ VIỆT. BẢO LƯU MỌI QUYỀN.",
        policies: [
          { label: "Chính sách bảo mật", href: "/policies/privacy" },
          { label: "Điều khoản sử dụng", href: "/policies/terms" },
        ],
      }),
    },
  });
  console.log("  + Đã tạo cấu hình thương hiệu và footer.");
}

async function seedPages() {
  const categories = await prisma.projectCategory.findMany({
    where: { name: { in: projectCategories } },
    orderBy: { id: "asc" },
  });
  const projectPageProps = PageProjectPropsSchema.parse({
    header: {
      breadcrumb: {
        homeLabel: "Trang chủ",
        currentLabel: "Dự án",
      },
      stats: [
        {
          title: "Dự án tiêu biểu",
          icon: "Building2",
          quantity: String(projects.length),
          suffix: "+",
          description: "Các công trình sơn mài và nghệ thuật liên ngành.",
        },
      ],
    },
    filter: {
      key: [
        { name: "Tất cả", categories: [] },
        ...categories.map((category) => ({
          name: category.name,
          categories: [category.id],
        })),
      ],
    },
    procedure: {
      eyebrow: "TỪ Ý TƯỞNG ĐẾN CÔNG TRÌNH",
      title: "Quy trình đồng hành",
      description: "Đảm bảo tính đồng nhất giữa tinh thần giám tuyển nghệ thuật và tiêu chuẩn kỹ thuật xây dựng khắt khe nhất.",
      steps: [
        {
          order: "01",
          icon: "MessagesSquare",
          title: "Trao đổi",
          description: "Tìm hiểu không gian, nhu cầu và định hướng sáng tạo.",
          value: "Lắng nghe",
        },
        {
          order: "02",
          icon: "PencilRuler",
          title: "Thiết kế",
          description: "Phát triển giải pháp nghệ thuật và vật liệu phù hợp.",
          value: "Đồng sáng tạo",
        },
        {
          order: "03",
          icon: "Paintbrush",
          title: "Chế tác",
          description: "Nghệ nhân hoàn thiện tác phẩm qua từng công đoạn thủ công.",
          value: "Tỉ mỉ",
        },
        {
          order: "04",
          icon: "CheckCircle2",
          title: "Hoàn thiện",
          description: "Lắp đặt, kiểm tra và bàn giao theo yêu cầu công trình.",
          value: "Trọn vẹn",
        },
      ],
    },
    cta: {
      eyebrow: "CÙNG LÀ VIỆT KIẾN TẠO",
      eyebrow_icon: "Sparkles",
      title: "Bắt đầu dự án của bạn",
      description:
        "Kết nối với đội ngũ Là Việt để cùng phát triển giải pháp sơn mài phù hợp với không gian.",
      contacts: [
        { icon: "Mail", label: "Email", value: "contact@laviet.vn" },
        { icon: "Phone", label: "Điện thoại", value: "+84 24 0000 0000" },
      ],
      actions: [{ label: "Liên hệ tư vấn", link: "https://laviet.vn/contact" }],
    },
  });
  await ensurePage("Trang Dự Án", "projects", projectPageProps);

  await ensurePage(contactPage.name, "contact", contactPage.props);
}

async function seedUsers() {
  const bcrypt = await import("bcryptjs");
  const adminPassword = await bcrypt.hash("AdminPassword@123", 10);
  const managerPassword = await bcrypt.hash("ManagerPassword@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@laviet.vn" },
    update: {
      fullname: "Quản Trị Viên Là Việt",
      role: "ADMIN",
      isActive: true,
      password: adminPassword,
    },
    create: {
      email: "admin@laviet.vn",
      username: "admin",
      fullname: "Quản Trị Viên Là Việt",
      role: "ADMIN",
      isActive: true,
      password: adminPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: "manager@laviet.vn" },
    update: {
      fullname: "Quản Lý Nội Dung Là Việt",
      role: "MANAGER",
      isActive: true,
      password: managerPassword,
    },
    create: {
      email: "manager@laviet.vn",
      username: "manager",
      fullname: "Quản Lý Nội Dung Là Việt",
      role: "MANAGER",
      isActive: true,
      password: managerPassword,
    },
  });

  console.log("👤 Đã tạo sẵn 2 tài khoản quản trị (Admin & Manager).");
}

async function main() {
  if (process.argv.includes("--contact")) {
    await ensurePage(contactPage.name, "contact", contactPage.props);
    return;
  }

  if (process.argv.includes("--users")) {
    await seedUsers();
    return;
  }

  console.log("🌱 Bắt đầu khởi tạo dữ liệu mẫu cho website Là Việt...");

  await seedUsers();
  await seedProducts();
  await seedProjects();
  await seedNews();
  await seedSiteSettings();

  await seedPages();
  console.log("🎉 Hoàn tất seed dữ liệu website Là Việt.");
}

main()
  .catch((error: unknown) => {
    console.error("❌ Lỗi khi seed dữ liệu:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
