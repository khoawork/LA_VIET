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
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
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
    const insertedProductIds = [];
    for (const prod of PRODUCTS) {
      const result = await conn.query(
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
      insertedProductIds.push(Number(result.insertId));
    }
    console.log(`✓ Đã thêm ${PRODUCTS.length} sản phẩm thực tế vào bảng 'products'`);

    // 3. Khởi tạo/Cập nhật cấu hình trang sản phẩm trong bảng 'pages'
    const pageProps = {
      title: "Bộ Sưu Tập Tác Phẩm Sơn Mài | Là Việt",
      description:
        "Tuyển tập những kiệt tác sơn mài hàn lâm, bình phong và vách nghệ thuật độc bản chế tác thủ công từ cây sơn Phú Thọ.",
      herosection: {
        badge: "GIÁM TUYỂN ĐỘC QUYỀN",
        heading: "DANH MỤC TÁC PHẨM & ỨNG DỤNG SƠN MÀI",
        subHeading: "BẢO TỒN VÀ KHAI MỞ DI SẢN HỘI HOẠ PHƯƠNG ĐÔNG",
        description:
          "Tại xưởng hội hoạ Là Việt, chất liệu sơn ta nguyên bản từ cây sơn Phú Thọ giao thoa cùng tư duy không gian đương đại. Từng nét dát vàng quỳ, cẩn ốc xà cừ hay mài quang kỳ công được chuyển hoá thành các đại hoạ phẩm vách ốp, bàn trà điêu khắc và tác phẩm độc bản – bảo lưu trọn vẹn khí chất phương Đông.",
        metrics: [
          { value: "100%", label: "SƠN TA TỰ NHIÊN" },
          { value: "06+", label: "THÁNG CHẾ TÁC" },
          { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
        ],
        image: "",
      },
      displayedProductIds: insertedProductIds,
    };

    // Kiểm tra xem trang 'products' đã có trong bảng 'pages' chưa
    const existingPage = await conn.query(
      "SELECT id FROM pages WHERE slug = 'products' LIMIT 1"
    );

    if (existingPage.length > 0) {
      await conn.query(
        "UPDATE pages SET name = ?, props = ? WHERE slug = 'products'",
        ["Trang Sản Phẩm", JSON.stringify(pageProps)]
      );
    } else {
      await conn.query(
        "INSERT INTO pages (name, slug, props) VALUES (?, 'products', ?)",
        ["Trang Sản Phẩm", JSON.stringify(pageProps)]
      );
    }
    console.log(
      `✓ Đã cập nhật cấu hình Trang Sản phẩm ('pages') với ${insertedProductIds.length} ID sản phẩm được kích hoạt hiển thị`
    );

    // 4. Khởi tạo/Cập nhật cấu hình trang Về Chúng Tôi trong bảng 'pages'
    const aboutPageProps = {
      title: "Về chúng tôi | Là Việt - Sơn mài hội hoạ liên ngành",
      description:
        "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ cùng công nghệ bề mặt tiên tiến.",
      image: "",
      herosection: {
        badge: "SƠN MÀI HỘI HOẠ LIÊN NGÀNH",
        heading: "HÀNH TRÌNH TÔN VINH DI SẢN SƠN MÀI TRONG KHÔNG GIAN ĐƯƠNG ĐẠI",
        description:
          "Công ty TNHH Ứng dụng Liên ngành Sơn mài Hội hoạ Là Việt kết hợp nền tảng nhựa mủ sơn ta Phú Thọ nguyên bản cùng các thành tựu vật liệu mới, tạo lập cầu nối giữa di sản hội hoạ hàn lâm và thực tiễn kiến trúc quy mô lớn.",
        metrics: [
          { value: "100%", label: "SƠN TA TỰ NHIÊN" },
          { value: "06+", label: "THÁNG CHẾ TÁC" },
          { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
        ],
        image: "",
        imageTitle: "LÀ VIỆT",
        imageSubtitle: "ẤN TRIỆN LÀ VIỆT",
      },
      technologySection: {
        badge: "KHÁI LƯỢC HỘI HOẠ LIÊN NGÀNH",
        heading: "TỪ NHỰA CÂY PHÚ THỌ ĐẾN CÔNG NGHỆ BỀ MẶT HIỆN ĐẠI",
        description1:
          "Là Việt được hình thành từ trăn trở giải phóng sơn mài khỏi khuôn khổ tranh treo tường thuần tuý. Chúng tôi kế thừa tinh hoa nhựa mủ sơn tự nhiên thu hoạch từ vùng gò đồi Phú Thọ – chất liệu có độ sâu quang học và tính cảm xúc mà không hoá chất nào thay thế được.",
        description2:
          "Thông qua liên minh chiến lược công nghệ cùng Sơn Hoa Việt, Là Việt mở rộng giới hạn của sơn mài truyền thống lên các vật liệu kiến trúc hiện đại: nhôm tấm hàng không, sợi thuỷ tinh đúc khổ lớn, đá tự nhiên và thép chịu nhiệt, đáp ứng các tiêu chuẩn khắt khe về phòng chống trầy xước, chịu ẩm và kháng tia UV trong nội ngoại thất công trình hạng sang.",
        stats: [
          {
            id: "years",
            label: "NĂM TÍCH LUỸ NGHỀ",
            value: "20",
            unit: "+",
            description: "Kế thừa và gìn giữ tinh hoa kỹ thuật sơn mài truyền thống.",
            accentColor: "text-[#9A1C1F]",
          },
          {
            id: "projects",
            label: "DỰ ÁN QUY MÔ LỚN",
            value: "120",
            unit: "+",
            description:
              "Ứng dụng đại sảnh ngoại giao, khách sạn 5 sao và dinh thự tư nhân.",
            accentColor: "text-[#96671E]",
          },
          {
            id: "artisans",
            label: "NGHỆ NHÂN CƠ HỮU",
            value: "40",
            unit: "+",
            description: "Đội ngũ thợ sơn then, thếp vàng và nghệ sĩ tạo hình bậc thầy.",
            accentColor: "text-[#1E1917]",
          },
          {
            id: "origin",
            label: "SƠN TA CHÍNH GỐC",
            value: "100",
            unit: "%",
            description: "Nhựa mủ tự nhiên khai thác tại vùng gò đồi đất tổ Phú Thọ.",
            accentColor: "text-[#9A1C1F]",
          },
        ],
        workshop: {
          image:
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
          badge: "XƯỞNG CHẾ TÁC HỘI HỌA",
          caption: "Bảo tồn kỹ thuật ủ ẩm mùn cưa và mài nước truyền thống",
        },
      },
      valuesSection: {
        items: [
          {
            id: "vision",
            category: "TẦM NHÌN ĐƯƠNG ĐẠI",
            title: "TỔ HỢP SƠN MÀI HÀNG ĐẦU KHU VỰC",
            description:
              "Trở thành tổ hợp sáng tạo sơn mài hội họa liên ngành tiên phong tại Đông Nam Á, thiết lập tiêu chuẩn thẩm mỹ mới trong không gian kiến trúc toàn cầu thông qua sự kết hợp tinh tế giữa nghệ thuật thị giác và công nghệ công trình.",
            tag: "ĐỊNH VỊ KHU VỰC & TOÀN CẦU",
            gradient: "from-[#9A1C1F] via-[#9A1C1F]/80 to-transparent",
            accentColor: "text-[#9A1C1F]",
          },
          {
            id: "mission",
            category: "SỨ MỆNH KHỞI SINH",
            title: "BẢO CHỨNG DI SẢN TRONG ĐỜI SỐNG",
            description:
              "Tuyệt đối tôn trọng và gìn giữ quy trình thủ công 12–20 công đoạn nghiêm ngặt; đồng thời không ngừng khai mở các cấu trúc vật liệu lai ghép để chất liệu sơn mài hòa nhịp sinh động cùng phong cách sống đương đại.",
            tag: "BẢO TỒN & TIẾN HÓA VẬT LIỆU",
            gradient: "from-[#96671E] via-[#96671E]/80 to-transparent",
            accentColor: "text-[#96671E]",
          },
          {
            id: "core-values",
            category: "GIÁ TRỊ CỐT LÕI",
            title: "4 TRỤ CỘT BỀN VỮNG",
            description:
              "Định chuẩn chất lượng dựa trên sự nghiêm cẩn trong học thuật hội hoạ và độ chính xác kỹ thuật thi công xây dựng cao cấp.",
            tag: "TIÊU CHUẨN THẨM MỸ KHẮT KHE",
            gradient: "from-[#4A423D] via-[#4A423D]/80 to-transparent",
            accentColor: "text-[#4A423D]",
            pillars: [
              "Mastery Craft: Tinh hoa kỹ xảo thủ công sơn ta chuẩn mực.",
              "Interdisciplinary: Ứng dụng liên ngành vật liệu và kiến trúc.",
              "Bespoke Heritage: Độc bản hóa từng không gian danh giá.",
              "Timeless Quality: Độ bền truyền đời cùng năm tháng.",
            ],
          },
        ],
      },
      organizationSection: {
        badge: "CẤU TRÚC TỔ CHỨC",
        heading: "SƠ ĐỒ BỘ MÁY QUẢN TRỊ & SÁNG TÁC",
        description:
          "Mô hình kết hợp nhuần nhuyễn giữa Viện thẩm mỹ giám tuyển nghệ thuật, nhà xưởng nghệ nhân truyền thống và phòng thí nghiệm vật liệu ứng dụng.",
        leaders: [
          {
            id: "chairman",
            name: "ÔNG NGUYỄN VĂN PHAN",
            role: "CHỦ TỊCH HĐQT & SÁNG LẬP",
            tag: "HỘI ĐỒNG QUẢN TRỊ",
            bio: "Định hướng chiến lược tối cao, bảo tồn và phát huy giá trị di sản văn hóa sơn mài thuần Việt trong kỷ nguyên mới.",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            department: "Hội Đồng Quản Trị",
            accentColor: "border-[#9A1C1F] text-[#9A1C1F]",
          },
          {
            id: "ceo",
            name: "KTS. PHAN VĂN THÌN THỌ",
            role: "TỔNG GIÁM ĐỐC ĐIỀU HÀNH",
            tag: "CEO & GIÁM ĐỐC NGHỆ THUẬT",
            bio: "Điều hành tổng thể, tiên phong phát triển các giải pháp kiến trúc, công nghệ bề mặt & hội họa liên ngành đỉnh cao.",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            department: "Ban Điều Hành & Nghệ Thuật",
            accentColor: "border-[#96671E] text-[#96671E]",
          },
        ],
        divisions: [
          {
            code: "KHỐI 01",
            title: "GIÁM ĐỐC NGHỆ THUẬT & SÁNG TÁC",
            subtitle: "Artistic Director",
            description:
              "Chủ trì xưởng chế tác hội họa khổ lớn, nghệ nhân bậc thầy sơn thếp, đắp nổi mài phẳng và cẩn xà cừ cổ truyền.",
            focus: "Atelier & Master Artisans",
            accentBorder: "border-t-[#9A1C1F]",
          },
          {
            code: "KHỐI 02",
            title: "GIÁM ĐỐC R&D VẬT LIỆU MỚI",
            subtitle: "R&D Director",
            description:
              "Kỹ thuật sơn công nghệ liên ngành phối hợp chuyên sâu cùng Sơn Hoa Việt, thử nghiệm bám dính và kháng thời tiết.",
            focus: "High-tech Lab & Chemical Testing",
            accentBorder: "border-t-[#96671E]",
          },
          {
            code: "KHỐI 03",
            title: "GIÁM ĐỐC TƯ VẤN DỰ ÁN KIẾN TRÚC",
            subtitle: "Architectural Project Director",
            description:
              "Tư vấn giải pháp nội thất bespoke cho dinh thự, khách sạn resort 5 sao và các không gian ngoại giao cấp cao.",
            focus: "Bespoke Architectural Studio",
            accentBorder: "border-t-[#4A423D]",
          },
          {
            code: "KHỐI 04",
            title: "GIÁM ĐỐC THI CÔNG & BẢO TỒN DI SẢN",
            subtitle: "Execution & Heritage Director",
            description:
              "Quản trị thi công quy mô lớn, kiểm soát vi khí hậu và lập hồ sơ bảo dưỡng phục hồi định kỳ tác phẩm dài hạn.",
            focus: "Execution & Archival Maintenance",
            accentBorder: "border-t-[#9A1C1F]",
          },
        ],
      },
      partnersSection: {
        badge: "HỢP TÁC & BẢO CHỨNG",
        heading: "ĐỐI TÁC CHIẾN LƯỢC & KHÁCH HÀNG DOANH NGHIỆP",
        items: [
          {
            name: "SƠN HOA VIỆT",
            role: "ĐỐI TÁC R&D KỸ THUẬT",
            category: "technology",
          },
          {
            name: "VINPEARL RESORTS",
            role: "KHÔNG GIAN VĂN HOÁ ĐẠI SẢNH",
            category: "hospitality",
          },
          {
            name: "BẢO TÀNG MỸ THUẬT",
            role: "GIÁM ĐỊNH & PHỤC CHẾ",
            category: "heritage",
          },
          {
            name: "PARK HYATT SAIGON",
            role: "BESPOKE SUITE ARTWORKS",
            category: "hospitality",
          },
          {
            name: "MASTERISE HOMES",
            role: "VÁCH TRANG TRÍ SẢNH VIP",
            category: "real-estate",
          },
          {
            name: "AA CORPORATION",
            role: "GIA CÔNG BỀ MẶT NỘI THẤT",
            category: "interior",
          },
        ],
        testimonial: {
          quote:
            "“Sơn mài không thể chỉ dừng lại là món quà lưu niệm hay bức tranh đóng khung trên tường. Là Việt đang biến sơn mài thành ngôn ngữ của kiến trúc tầm vóc quốc gia.”",
          organization: "HỘI ĐỒNG CỐ VẤN THẨM MỸ SƠN MÀI VIỆT NAM",
          note: "Đánh giá chuyên môn niên khoá 2024",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
      },
      ctaSection: {
        badge: "KHỞI TẠO TÁC PHẨM ĐỘC BẢN",
        heading: "ĐỒNG HÀNH KIẾN TẠO DỰ ÁN CÙNG LÀ VIỆT",
        description:
          "Hãy liên hệ với đội ngũ giám tuyển và kỹ sư chuyên môn của chúng tôi để đưa tinh hoa sơn mài hội hoạ vào không gian kiến trúc của bạn.",
        primaryButton: {
          label: "ĐẶT LỊCH TƯ VẤN CHUYÊN GIA",
          link: "/contact",
        },
        secondaryButton: {
          label: "XEM CATALOGUE DỰ ÁN",
          link: "/products",
        },
      },
    };

    const existingAboutPage = await conn.query(
      "SELECT id FROM pages WHERE slug = 'about' LIMIT 1"
    );

    if (existingAboutPage.length > 0) {
      await conn.query(
        "UPDATE pages SET name = ?, props = ? WHERE slug = 'about'",
        ["Trang Về Chúng Tôi", JSON.stringify(aboutPageProps)]
      );
    } else {
      await conn.query(
        "INSERT INTO pages (name, slug, props) VALUES (?, 'about', ?)",
        ["Trang Về Chúng Tôi", JSON.stringify(aboutPageProps)]
      );
    }
    console.log("✓ Đã cập nhật cấu hình Trang Về Chúng Tôi ('about') vào bảng 'pages'");

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

