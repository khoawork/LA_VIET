import "dotenv/config";
import { prisma } from "./prisma.service";
import { DEFAULT_PAGE_NEW_PROPS } from "../views/newPages/types/pagenew.type";
import pageProjectSample from "../../page-project.sample.json";
import pageContactSample from "../../page-contact.sample.json";
import { PageContactRequestSchema } from "../shared/schema/pages/page-contact.schema";
import {
  PageProjectPropsSchema,
  PageProjectRequestSchema,
} from "../shared/schema/pages/page-project.schema";

async function seedContactPage() {
  const contactData = PageContactRequestSchema.parse(pageContactSample);
  console.log("🌐 Đang khởi tạo trang CMS Liên hệ (Page: 'contact')...");
  const existingContactPage = await prisma.page.findUnique({
    where: { slug: "contact" },
  });

  if (existingContactPage) {
    console.log(`  ✓ Trang 'contact' đã có (ID: ${existingContactPage.id}), giữ nguyên nội dung đã chỉnh sửa.`);
    return;
  }

  const contactPage = await prisma.page.create({
    data: { name: contactData.name, slug: "contact", props: contactData.props },
  });
  console.log(`  + Đã tạo trang 'contact' (ID: ${contactPage.id})`);
}
import { DEFAULT_PAGE_HOME_PROPS } from "../views/homePage/types/pagehome.type";

async function main() {
  if (process.argv.includes("--contact")) {
    await seedContactPage();
    return;
  }

  console.log("🌱 Bắt đầu khởi tạo dữ liệu mẫu (Seeding data)...");

  // 1. Seed News Categories
  console.log("📁 Đang tạo danh mục chuyên mục tin tức...");
  const categoriesData = [
    { name: "Nghiên cứu Kỹ nghệ & Vật liệu" },
    { name: "Sự kiện & Triển lãm Nghệ thuật" },
    { name: "Nhật ký Công trình" },
    { name: "Hợp tác Liên ngành Sơn mài" },
  ];

  const categoriesMap: Record<string, number> = {};

  for (const cat of categoriesData) {
    const existing = await prisma.newsCategory.findFirst({
      where: { name: cat.name },
    });
    if (existing) {
      categoriesMap[cat.name] = existing.id;
      console.log(`  ✓ Đã có danh mục: "${cat.name}" (ID: ${existing.id})`);
    } else {
      const created = await prisma.newsCategory.create({
        data: { name: cat.name },
      });
      categoriesMap[cat.name] = created.id;
      console.log(`  + Đã tạo mới danh mục: "${cat.name}" (ID: ${created.id})`);
    }
  }

  // 2. Seed News Articles
  console.log("📰 Đang tạo các bài viết tin tức mẫu...");
  const articlesData = [
    {
      name: "Bứt phá giới hạn: Ứng dụng hệ sơn men gốm và sơn 2K bảo vệ tranh sơn mài ngoài trời và không gian lớn",
      slug: "ung-dung-he-son-men-gom-va-son-2k-bao-ve-tranh-son-mai",
      categoryName: "Nghiên cứu Kỹ nghệ & Vật liệu",
      preside: "Ban Nghiên cứu Vật liệu Là Việt",
      presideIcon: "FlaskConical",
      date: new Date("2025-10-15T08:00:00.000Z"),
      reading: "8 phút đọc",
      button: "Đọc toàn văn nghiên cứu",
      description:
        "Giải pháp kết hợp đột phá giữa sơn ta hữu cơ truyền thống và hợp chất bảo vệ polymer phủ ngoài, cho phép các tấm hoành phi, bức bích họa sơn mài chịu đựng tia cực tím và độ ẩm khắc nghiệt mà vẫn bảo toàn độ sâu thẳm của mài then, vàng quỳ.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Không gian triển lãm ứng dụng sơn mài trong kiến trúc đương đại",
      slug: "khong-gian-trien-lam-ung-dung-son-mai-kien-truc",
      categoryName: "Sự kiện & Triển lãm Nghệ thuật",
      preside: "Ban Truyền thông Là Việt",
      presideIcon: "Palette",
      date: new Date("2025-10-12T08:00:00.000Z"),
      reading: "5 phút đọc",
      button: "Xem chi tiết",
      description:
        "Chuỗi đối thoại nghệ thuật mở ra cách tiếp cận mới cho các vách ngăn kiến trúc, cửa trượt hội họa và cột tròn công trình biểu tượng qua ngôn ngữ hội họa sơn mài.",
      image:
        "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kỹ nghệ dát vàng quỳ và mài đa tầng trên cốt liệu composite thế hệ mới",
      slug: "ky-nghe-dat-vang-quy-va-mai-da-tang-composite",
      categoryName: "Nghiên cứu Kỹ nghệ & Vật liệu",
      preside: "Nghệ nhân Nguyễn Văn Hiếu",
      presideIcon: "Sparkles",
      date: new Date("2025-10-08T08:00:00.000Z"),
      reading: "7 phút đọc",
      button: "Xem chi tiết",
      description:
        "Nghiên cứu khả năng tương thích của vàng lá tự nhiên khi tương tác với lõi nền composite chống cong vênh, tạo độ rực rỡ và chiều sâu khúc xạ ánh sáng đa chiều.",
      image:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Bàn giao đại tác phẩm phù điêu sơn mài 15m cho sảnh trụ sở tập đoàn tài chính",
      slug: "ban-giao-dai-tac-pham-phu-dieu-son-mai-15m",
      categoryName: "Nhật ký Công trình",
      preside: "Ban Quản lý Dự án",
      presideIcon: "Building2",
      date: new Date("2025-09-28T08:00:00.000Z"),
      reading: "6 phút đọc",
      button: "Xem chi tiết",
      description:
        "Hành trình 180 ngày chế tác và lắp ráp module cơ khí âm tường tinh vi cho kiệt tác phù điêu mô phỏng linh khí sông Lam, khẳng định năng lực thi công công trình lớn.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Hội thảo chuyên đề: Giải pháp bảo vệ bề mặt sơn ta chống ẩm nhiệt đới",
      slug: "hoi-thao-chuyen-de-giai-phap-bao-ve-be-mat-son-ta",
      categoryName: "Hợp tác Liên ngành Sơn mài",
      preside: "Chuyên viên Kỹ thuật Sơn",
      presideIcon: "ShieldCheck",
      date: new Date("2025-09-20T08:00:00.000Z"),
      reading: "9 phút đọc",
      button: "Xem chi tiết",
      description:
        "Phân tích dữ liệu thực nghiệm về phản ứng thủy hóa của nhựa cây sơn Phú Thọ kết hợp các lớp màng mỏng kỵ nước gốc dung môi sinh thái, đảm bảo độ bền vĩnh cửu.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Nghệ thuật khảm trứng và ốc xà cừ: Tinh hoa truyền cảm hứng cho kiến trúc",
      slug: "nghe-thuat-kham-trung-va-oc-xa-cu",
      categoryName: "Nghiên cứu Kỹ nghệ & Vật liệu",
      preside: "Giám tuyển Nghệ thuật",
      presideIcon: "Award",
      date: new Date("2025-09-15T08:00:00.000Z"),
      reading: "4 phút đọc",
      button: "Xem chi tiết",
      description:
        "Giải mã câu chuyện chất liệu từ vỏ trứng vịt rạn tự nhiên và xà cừ đại dương, biến hóa thành những mảng hoa văn đương đại ấn tượng trên nền sơn then đen sâu thẳm.",
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Xu hướng nội thất sơn mài Bespoke trong các không gian Penthouse & Luxury",
      slug: "xu-huong-noi-that-son-mai-bespoke-penthouse",
      categoryName: "Sự kiện & Triển lãm Nghệ thuật",
      preside: "KTS. Trần Hoàng Nam",
      presideIcon: "Home",
      date: new Date("2025-09-05T08:00:00.000Z"),
      reading: "6 phút đọc",
      button: "Xem chi tiết",
      description:
        "Tầm nhìn độc bản khi đưa tranh sơn mài khổ đại và hệ tủ trang trí vào không gian sống thượng lưu, kết hợp hoàn hảo giữa ánh sáng kiến trúc và màu sắc trầm ấm truyền thống.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  for (const art of articlesData) {
    const categoryId = categoriesMap[art.categoryName];
    if (!categoryId) {
      console.warn(`  ⚠️ Bỏ qua bài viết "${art.name}" do không tìm thấy danh mục "${art.categoryName}"`);
      continue;
    }

    const existingNews = await prisma.news.findUnique({
      where: { slug: art.slug },
    });

    if (existingNews) {
      await prisma.news.update({
        where: { slug: art.slug },
        data: {
          name: art.name,
          image: art.image,
          preside: art.preside,
          presideIcon: art.presideIcon,
          date: art.date,
          description: art.description,
          button: art.button,
          reading: art.reading,
          categoryId,
        },
      });
      console.log(`  ✓ Đã cập nhật bài viết: "${art.name}"`);
    } else {
      await prisma.news.create({
        data: {
          name: art.name,
          slug: art.slug,
          image: art.image,
          preside: art.preside,
          presideIcon: art.presideIcon,
          date: art.date,
          description: art.description,
          button: art.button,
          reading: art.reading,
          categoryId,
        },
      });
      console.log(`  + Đã tạo mới bài viết: "${art.name}"`);
    }
  }

  // 3. Seed Page Structure (Trang News CMS)
  console.log("🌐 Đang khởi tạo cấu trúc trang CMS Tin tức (Page: 'news')...");
  await prisma.page.upsert({
    where: { slug: "news" },
    create: {
      name: "Tin tức, Nghiên cứu & Hoạt động",
      slug: "news",
      props: DEFAULT_PAGE_NEW_PROPS as any,
    },
    update: {
      name: "Tin tức, Nghiên cứu & Hoạt động",
      props: DEFAULT_PAGE_NEW_PROPS as any,
    },
  });
  console.log("  ✓ Đã upsert thành công trang 'news' vào bảng `pages`");

  // 4. Seed Page Structure (Trang Project CMS)
  console.log("🌐 Đang khởi tạo trang CMS Dự án (Page: 'projects')...");
  const existingProjectPage = await prisma.page.findUnique({
    where: { slug: "projects" },
  });

  if (existingProjectPage) {
    console.log(`  ✓ Trang 'projects' đã có (ID: ${existingProjectPage.id}), giữ nguyên nội dung đã chỉnh sửa.`);
  } else {
    const projectData = PageProjectRequestSchema.parse(pageProjectSample);
    const projectCategories = await prisma.projectCategory.findMany({
      select: { id: true, name: true },
      orderBy: { id: "asc" },
    });
    const projectProps = PageProjectPropsSchema.parse({
      ...projectData.props,
      filter: {
        key: [
          { name: "Tất cả", categories: [] },
          ...projectCategories.map((category) => ({
            name: category.name,
            categories: [category.id],
          })),
        ],
      },
    });

    const projectPage = await prisma.page.create({
      data: {
        name: projectData.name,
        slug: "projects",
        props: projectProps,
      },
    });
    console.log(`  + Đã tạo trang 'projects' (ID: ${projectPage.id})`);
  }

  // 5. Seed Contact page once; admin edits are preserved on later runs.
  await seedContactPage();

  console.log("🎉 Hoàn tất gieo dữ liệu hạt giống (Seed completed successfully)!");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

