import mariadb from "mariadb";

// Cấu hình kết nối MySQL / MariaDB từ biến môi trường
const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "123456",
  database: process.env.DATABASE_NAME || "la_viet_db",
  allowPublicKeyRetrieval: true,
  connectionLimit: 5,
});

// Danh mục sản phẩm chuẩn Là Việt
const CATEGORIES = [
  { id: 1, name: "Tranh Sơn Mài Khổ Lớn" },
  { id: 2, name: "Vách Trang Trí Kiến Trúc" },
  { id: 3, name: "Nội Thất Sơn Mài Cao Cấp" },
  { id: 4, name: "Vật Phẩm Ứng Dụng Độc Bản" },
  { id: 5, name: "Hệ Sơn Hoa Việt (Ứng Dụng Liên Ngành)" },
];

// Danh sách sản phẩm thực tế cho xưởng sơn mài Là Việt
const PRODUCTS = [
  // 1. Tranh Sơn Mài Khổ Lớn
  {
    categoryId: 1,
    name: "Vũ Điệu Phù Sa",
    title: "BÍCH HOẠ SƠN MÀI KHỔ LỚN",
    description:
      "Tác phẩm trừu tượng biểu đạt trầm tích châu thổ sông Hồng, 12 lớp sơn hom truyền thống, dát vàng quỳ Kiêu Kỵ 9999, cẩn vỏ trứng vịt vôi và kỹ thuật mài lộ cơ hữu.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    slug: "vu-dieu-phu-sa",
    props: {
      dimension: "240 x 120 cm",
      material: "Vàng quỳ, sơn ta, vỏ trứng",
      badge: "ĐỘC BẢN SỐ 01/01",
      badgeColor: "red",
      yearOrSpec: "2024",
      isTechnicalSpec: false,
    },
  },
  {
    categoryId: 1,
    name: "Khúc Hát Bình Minh",
    title: "BÍCH HOẠ SƠN MÀI KHỔ LỚN",
    description:
      "Họa phẩm trừu tượng ánh bình minh chiếu rọi mặt hồ. Sắc son cánh gián kết hợp nhũ bạc tơ tằm nguyên chất mang lại hiệu ứng thị giác tầng sâu huyền ảo.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    slug: "khuc-hat-binh-minh",
    props: {
      dimension: "200 x 100 cm",
      material: "Sơn then, son cánh gián, bạc",
      badge: "ĐỘC BẢN SỐ 02/02",
      badgeColor: "red",
      yearOrSpec: "2024",
      isTechnicalSpec: false,
    },
  },

  // 2. Vách Trang Trí Kiến Trúc
  {
    categoryId: 2,
    name: "Cửu Long Ẩn Vân",
    title: "VÁCH TRANG TRÍ KIẾN TRÚC",
    description:
      "Bộ tam bình tái hiện rồng thiêng ẩn mây. Hơn 300 vỏ trai ngọc và xà cừ biển sâu gọt tỉa thủ công từng milimet, cẩn chìm sâu dưới đa tầng sơn mài.",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    slug: "cuu-long-an-van",
    props: {
      dimension: "360 x 180 cm",
      material: "Cẩn xà cừ, bạc cựu",
      badge: "BỘ BA TẤM (TRIPTYCH)",
      badgeColor: "red",
      yearOrSpec: "2024",
      isTechnicalSpec: false,
    },
  },
  {
    categoryId: 2,
    name: "Âm Vang Sóng Biển",
    title: "VÁCH TRANG TRÍ KIẾN TRÚC",
    description:
      "Hệ vách ốp ghép nối module liền mạch mô phỏng nhịp điệu của biển khơi đêm trăng. Hiệu ứng tán xạ ánh sáng tự nhiên qua kỹ nghệ rây bột bạc và mài xước.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    slug: "am-vang-song-bien",
    props: {
      dimension: "Module 120 x 240 cm",
      material: "Bột bạc, khoáng thạch",
      badge: "ỨNG DỤNG KIẾN TRÚC",
      badgeColor: "dark",
      yearOrSpec: "2024",
      isTechnicalSpec: false,
    },
  },

  // 3. Nội Thất Sơn Mài Cao Cấp
  {
    categoryId: 3,
    name: "Bàn Trà Hoàng Triều",
    title: "NỘI THẤT SƠN MÀI CAO CẤP",
    description:
      "Cốt gỗ gõ đỏ tự nhiên nguyên khối được xử lý chống co ngót trước khi bao phủ bởi 18 lượt sơn then và cánh gián. Phối trộn bột bạc tán mịn tạo chiều sâu.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    slug: "ban-tra-hoang-trieu",
    props: {
      dimension: "180 x 90 x 42 cm",
      material: "Gỗ gõ đỏ & sơn then đen",
      badge: "ỨNG DỤNG NỘI THẤT",
      badgeColor: "dark",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },
  {
    categoryId: 3,
    name: "Tủ Console Tinh Hoa",
    title: "NỘI THẤT SƠN MÀI CAO CẤP",
    description:
      "Sự kết hợp tinh tế giữa đồng thau đúc thủ công và 20 chu kỳ mài nước. Cánh tủ thể hiện đồ án trừu tượng lấy cảm hứng từ cấu trúc triện son cổ truyền.",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    slug: "tu-console-tinh-hoa",
    props: {
      dimension: "200 x 50 x 85 cm",
      material: "Gỗ walnut, đồng thau xước",
      badge: "ĐỘC BẢN SỐ 01/03",
      badgeColor: "red",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },

  // 4. Vật Phẩm Ứng Dụng Độc Bản
  {
    categoryId: 4,
    name: "Họa Sắc Đông Dương",
    title: "VẬT PHẨM ỨNG DỤNG ĐỘC BẢN",
    description:
      "Cốt gốm sành mộc nung lò củi 1250°C kết hợp sơn phủ đa lớp. Sắc đỏ chu sa và vàng lá rực rỡ gợi vẻ đẹp kiêu sa của mỹ thuật Đông Dương thế kỷ XX.",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=800&q=80",
    slug: "hoa-sac-dong-duong",
    props: {
      dimension: "H 65 - 85 cm",
      material: "Gốm sành & chu sa tự nhiên",
      badge: "BỘ 3 VẬT PHẨM",
      badgeColor: "dark",
      yearOrSpec: "2025",
      isTechnicalSpec: false,
    },
  },

  // 5. Hệ Sơn Hoa Việt
  {
    categoryId: 5,
    name: "Hệ Sơn Men Sứ & Men Gốm Hoa Việt",
    title: "VẬT LIỆU SƠN PHỦ CHUYÊN DỤNG",
    description:
      "Dòng sơn men sứ công nghệ cao bám dính siêu việt trên cốt gốm sứ, kính, kim loại và composite. Chịu nhiệt, kháng hóa chất, tạo độ bóng sâu như men gốm.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    slug: "he-son-men-su-men-gom-hoa-viet",
    props: {
      dimension: "Quy cách 1L - 5L - 20L",
      material: "Gốm, kính, kim loại, composite",
      badge: "HỆ SƠN CÔNG NGHỆ CAO",
      badgeColor: "red",
      yearOrSpec: "1L - 5L - 20L",
      isTechnicalSpec: true,
    },
  },
  {
    categoryId: 5,
    name: "Hệ Sơn Đa Năng 2K & Sơn Nhũ Kim Hoa Việt",
    title: "BẢO VỆ & HIỆU ỨNG SƠN MÀI",
    description:
      "Sơn 2K bóng trong suốt bảo vệ bề mặt sơn mài, sơn nhũ vàng kim/bạc lấp lánh phối hợp cùng sơn ta truyền thống trên mọi bề mặt gỗ, MDF, sắt mạ kẽm.",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    slug: "he-son-da-nang-2k-son-nhu-kim-hoa-viet",
    props: {
      dimension: "Hệ phủ bóng cao cấp",
      material: "Polyurethane 2K, nhũ vàng/bạc",
      badge: "SƠN HIỆU ỨNG MỸ THUẬT",
      badgeColor: "dark",
      yearOrSpec: "Chống ố vàng & UV",
      isTechnicalSpec: true,
    },
  },
];

async function seed() {
  console.log("🌱 Bắt đầu quá trình gieo mầm dữ liệu (Seed DB)...");

  let conn;
  try {
    conn = await pool.getConnection();

    // Vô hiệu hóa tạm thời foreign key checks để xóa sạch bảng
    await conn.query("SET FOREIGN_KEY_CHECKS = 0");
    await conn.query("TRUNCATE TABLE products");
    await conn.query("TRUNCATE TABLE prod_cates");
    await conn.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("✓ Đã dọn dẹp các bảng 'products' và 'prod_cates'");

    // 1. Chèn danh mục sản phẩm
    for (const cat of CATEGORIES) {
      await conn.query(
        "INSERT INTO prod_cates (id, name) VALUES (?, ?)",
        [cat.id, cat.name]
      );
    }
    console.log(`✓ Đã thêm ${CATEGORIES.length} danh mục sản phẩm vào bảng 'prod_cates'`);

    // 2. Chèn danh sách sản phẩm
    for (const prod of PRODUCTS) {
      await conn.query(
        `INSERT INTO products (name, description, image, title, props, slug, categoryId, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          prod.name,
          prod.description,
          prod.image,
          prod.title,
          JSON.stringify(prod.props),
          prod.slug,
          prod.categoryId,
        ]
      );
    }
    console.log(`✓ Đã thêm ${PRODUCTS.length} sản phẩm thực tế vào bảng 'products'`);

    console.log("🎉 Hoàn tất Seed Database thành công 100%!");
  } catch (err) {
    console.error("❌ Lỗi khi thực hiện seed database:", err);
    process.exit(1);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

seed();

