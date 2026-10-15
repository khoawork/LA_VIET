# KIẾN TRÚC FOLDER VÀ QUY CHUẨN DỰ ÁN LA VIET (FULLSTACK NEXT.JS)

Tài liệu này mô tả chi tiết cấu trúc thư mục, kiến trúc phân tầng (Layered / Modular Architecture) và các **quy chuẩn Fullstack (Request/Response, Validation với Zod, DTOs, Exception Handling, Database Access)** trong dự án **LA VIET**.

---

## 1. Công nghệ sử dụng (Tech Stack)

* **Framework:** [Next.js](https://nextjs.org/) (Phiên bản 16 - App Router)
* **Frontend:** [React](https://react.dev/) 19, TypeScript, [Tailwind CSS](https://tailwindcss.com/) v4
* **Backend:** Next.js Route Handlers (`app/api/**`) kết hợp kiến trúc phân tầng Service - Repository
* **Validation & Schema:** [Zod](https://zod.dev/) v4 (Schema-first validation & DTO inference)
* **Database & ORM:** [Prisma ORM](https://www.prisma.io/) v7 (multi-file schema, MariaDB/MySQL adapter)
* **Ngôn ngữ:** TypeScript (Strict mode)

---

## 2. Sơ đồ cây thư mục chi tiết (Directory Tree)

```text
LA_VIET/
├── .gitignore                      # Git ignore cấp root
├── README.md                       # Giới thiệu dự án
├── ARCHITECTURE.md                 # Tài liệu kiến trúc dự án (file này)
└── my-app/                         # Ứng dụng chính (Next.js Fullstack)
    ├── app/                        # [Tầng Giao diện & Routing] Next.js App Router
    │   ├── page.tsx                # Trang chủ Index chính của App (Landing Page)
    │   ├── projects/               # [UI Test CRUD] Quản lý dự án
    │   │   └── page.tsx            # UI tương tác CRUD trực tiếp qua API
    │   ├── about/                  # Route /about
    │   │   └── page.tsx            # UI trang giới thiệu
    │   ├── home/                   # Route /home
    │   │   └── page.tsx            # UI trang cấu trúc / demo
    │   ├── api/                    # [API Endpoints] Next.js Route Handlers
    │   │   ├── about/
    │   │   │   └── route.ts        # GET /api/about
    │   │   ├── home/
    │   │   │   └── route.ts        # GET /api/home (kiểm tra kết nối DB)
    │   │   └── projects/           # RESTful API cho module Projects
    │   │       └── route.ts        # CRUD trực tiếp: GET (list / by name), POST, PUT, DELETE
    │   ├── globals.css             # CSS toàn cục (Tailwind CSS v4)
    │   └── layout.tsx              # Root Layout
    │
    ├── shared/                     # [Tầng Dùng chung toàn App] Shared Core
    │   ├── common/                 # Các định nghĩa và hàm dùng chung
    │   │   ├── http-status.ts      # Enum HttpStatus chuẩn (200, 201, 400, 404, 500...)
    │   │   ├── app-error.ts        # AppError & Exception classes (BadRequest, NotFound...)
    │   │   ├── api-response.ts     # Format ApiResponse<T>, sendSuccess, sendError, sendPaginated
    │   │   ├── pagination.ts       # Type PaginationMeta & helper createPaginationMeta
    │   │   └── index.ts            # Barrel export shared/common
    │   ├── schema/                 # Zod Schemas dùng chung & validate
    │   │   ├── pagination.schema.ts# Schema Zod phân trang (page, limit, search, sort...)
    │   │   ├── project.schema.ts   # Schema Zod Project (Create, Update, Query, Delete theo name)
    │   │   └── index.ts            # Barrel export shared/schema
    │   ├── utils/                  # Tiện ích backend & handlers
    │   │   ├── validate.ts         # validateBody, validateQuery, validateParams bằng Zod
    │   │   ├── api-handler.ts      # Wrapper withErrorHandler bắt lỗi toàn cục tự động
    │   │   └── index.ts            # Barrel export shared/utils
    │   └── index.ts                # Barrel export toàn bộ tầng shared (@/shared)
    │
    ├── views/                      # [Tầng Trình bày & UI Views theo Feature]
    │   ├── home/                   # Feature Home (Sơn Mài Lã Việt)
    │   │   ├── components/         # Các khối UI con full-width cho Home
    │   │   │   ├── home-header.tsx     # Header & Navigation
    │   │   │   ├── home-hero.tsx       # Hero Section & Dải 4 Bộ sưu tập
    │   │   │   ├── home-statistics.tsx # Thống kê "Những con số ấn tượng"
    │   │   │   ├── home-spotlight.tsx  # Tiêu điểm dự án & Nghệ nhân
    │   │   │   ├── home-news.tsx       # Tin tức mới nhất
    │   │   │   ├── home-partners.tsx   # Đối tác chiến lược & Đánh giá
    │   │   │   ├── home-cta.tsx        # CTA Khởi tạo dự án
    │   │   │   ├── home-footer.tsx     # Chân trang & Thông tin liên hệ
    │   │   │   └── index.ts            # Barrel export components
    │   │   └── index.ts            # Barrel export module home
    │   ├── products/               # Feature Products (Danh mục tác phẩm & Sơn mài)
    │   │   ├── components/         # Các khối UI con cho Products
    │   │   │   ├── products-header.tsx # Header & Nav menu
    │   │   │   ├── products-hero.tsx   # Breadcrumb, Title, 4 metrics & Filter tabs
    │   │   │   ├── products-grid.tsx   # Lưới 8 tác phẩm/sản phẩm chi tiết
    │   │   │   ├── products-footer.tsx # Chân trang Lã Việt & VPĐD
    │   │   │   └── index.ts            # Barrel export components
    │   │   ├── types.ts            # Type definitions (ProductItem, Category...)
    │   │   └── index.ts            # Barrel export module products
    │   └── about/                  # Feature About (Về chúng tôi & Di sản Sơn mài)
    │       ├── components/         # Các khối UI con cho About
    │       │   ├── about-header.tsx    # Header & Nav menu (active Về chúng tôi)
    │       │   ├── about-hero.tsx      # Title & Dấu ấn bản quyền di sản Lã Việt
    │       │   ├── about-technology.tsx# Nhựa sơn Phú Thọ & 4 chỉ số thống kê
    │       │   ├── about-values.tsx    # 3 Trụ cột cốt lõi & Tiêu chuẩn vận hành
    │       │   ├── about-organization.tsx # Sơ đồ bộ máy quản trị & sáng tác
    │       │   ├── about-partners.tsx  # Đối tác chiến lược & Lời chứng thực
    │       │   ├── about-cta.tsx       # Banner CTA Đỏ son Lã Việt
    │       │   ├── about-footer.tsx    # Chân trang, Văn phòng TP.HCM & Bình Dương
    │       │   └── index.ts            # Barrel export components
    │       └── index.ts            # AboutView & barrel export module about
    │
    ├── modules/                    # [Tầng Nghiệp vụ] Modular Domain-driven Modules
    │   └── project/                # Module chuẩn mẫu Project
    │       ├── project.dto.ts      # DTOs kế thừa (inferred) từ Zod Schemas (@/shared)
    │       ├── project.repository.ts # Data Access Layer CRUD DB theo name qua Prisma
    │       └── project.service.ts  # Business Logic, validation nghiệp vụ & ném Exception
    │
    ├── prisma/                     # [Tầng Dữ liệu] Cấu hình Prisma ORM & Database
    │   ├── schema/                 # Multi-file schema (Prisma 7)
    │   │   ├── schema.prisma       # Cấu hình Datasource, Generator & Model User
    │   │   ├── projects.prisma     # Model Project
    │   │   └── page.prisma         # Model Page
    │   ├── generated/              # Mã nguồn Prisma Client sinh tự động
    │   │   └── prisma/
    │   └── prisma.service.ts       # Singleton PrismaClient với adapter MariaDB/MySQL
    │
    ├── prisma.config.ts            # Cấu hình Prisma CLI
    ├── next.config.ts              # Cấu hình Next.js
    ├── tsconfig.json               # Cấu hình TypeScript & path alias (@/* -> ./*)
    ├── package.json                # Quản lý dependencies (zod, prisma, next...)
    └── .env                        # Biến môi trường kết nối cơ sở dữ liệu
```

---

## 3. Kiến trúc phân tầng và luồng dữ liệu

```mermaid
flowchart TD
    Client["Client (Browser / Mobile / Postman)"] -->|HTTP Request| RouteHandler["app/api/projects/route.ts<br/>(Bọc bởi withErrorHandler)"]
    
    subgraph Validation ["Validation Layer (Zod in shared/schema)"]
        RouteHandler -->|Validate Body / Query / Params| ZodSchema["validateBody / validateQuery<br/>(shared/schema/*.schema.ts)"]
    end

    subgraph ServiceLayer ["Service Layer (Business Logic)"]
        ZodSchema -->|Dữ liệu chuẩn DTO (z.infer)| Service["modules/project/project.service.ts"]
        Service -.->|Không tìm thấy / Trùng lặp| AppError["Ném Exception (NotFound, Conflict, ...)"]
    end

    subgraph DataLayer ["Data Access Layer (Repository)"]
        Service -->|Gọi CRUD theo Name| Repo["modules/project/project.repository.ts"]
        Repo -->|Prisma Client Singleton| DB[("MySQL / MariaDB Database")]
    end

    AppError -->|Bắt tự động| ErrorHandler["withErrorHandler"]
    Service -->|Trả về DTO| SuccessHandler["sendSuccess / sendPaginated"]
    
    ErrorHandler -->|HTTP Response chuẩn lỗi (404, 409, 422...)| Client
    SuccessHandler -->|HTTP Response chuẩn thành công (200, 201)| Client
```

---

## 4. Các Quy chuẩn cốt lõi (Standards & Conventions)

### 4.1. Định danh và thao tác dữ liệu theo Tên (`name`), không dùng `[id]`
* Không tổ chức các sub-folder dynamic route như `[id]` nếu đối tượng được định danh qua tên (hoặc slug/tên page).
* Viết **toàn bộ CRUD trực tiếp** trong file endpoint gốc (ví dụ: `app/api/projects/route.ts`):
  * `GET /api/projects`: Lấy danh sách (phân trang, tìm kiếm).
  * `GET /api/projects?name=...`: Lấy chi tiết bản ghi theo tên.
  * `POST /api/projects`: Tạo mới `{ name, description }`.
  * `PUT /api/projects`: Cập nhật theo tên `{ name, newName?, description? }`.
  * `DELETE /api/projects?name=...` (hoặc body `{ name }`): Xóa theo tên.

### 4.2. Tổ chức thư mục dùng chung trong `shared/`
Mọi tiện ích chung của hệ thống được tập trung vào `shared/`:
* `shared/common`: Chứa constants (`http-status.ts`), exceptions (`app-error.ts`), responses (`api-response.ts`), pagination (`pagination.ts`).
* `shared/schema`: Chứa Zod schemas dùng chung cho validation.
* `shared/utils`: Chứa helper validation (`validate.ts`) và middleware bắt lỗi (`api-handler.ts`).
* `shared/index.ts`: Re-export tất cả, giúp các module khác chỉ cần `import { ... } from "@/shared"`.

### 4.3. Quy chuẩn Response chuẩn toàn ứng dụng (`ApiResponse<T>`)

Mọi API route đều trả về cấu trúc JSON đồng nhất:

#### Khi thành công (`sendSuccess` hoặc `sendPaginated`):
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": {
    "name": "la-viet-coffee",
    "description": "Mô tả dự án"
  },
  "timestamp": "2026-10-12T07:50:00.000Z"
}
```

#### Khi có lỗi (`sendError` / Tự động qua `withErrorHandler`):
```json
{
  "success": false,
  "message": "Không tìm thấy dự án có tên 'la-viet-coffee'",
  "errorCode": "NOT_FOUND",
  "timestamp": "2026-10-12T07:50:00.000Z"
}
```

---

### 4.4. Mẫu triển khai CRUD trực tiếp trong Route Handler (`app/api/projects/route.ts`)

```typescript
import { NextRequest } from "next/server";
import { projectService } from "@/modules/project/project.service";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectQuerySchema,
  DeleteProjectSchema,
  withErrorHandler,
  validateBody,
  validateQuery,
  sendSuccess,
  sendPaginated,
  HttpStatus,
} from "@/shared";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const query = validateQuery(ProjectQuerySchema, req.nextUrl.searchParams);
  if (query.name) {
    const project = await projectService.getProjectByName(query.name);
    return sendSuccess(project, "Lấy thông tin dự án theo tên thành công");
  }
  const { items, meta } = await projectService.getAllProjects(query);
  return sendPaginated(items, meta, "Lấy danh sách dự án thành công");
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await validateBody(CreateProjectSchema, req);
  const newProject = await projectService.createProject(body);
  return sendSuccess(newProject, "Tạo dự án mới thành công", HttpStatus.CREATED);
});

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const body = await validateBody(UpdateProjectSchema, req);
  const updated = await projectService.updateProject(body);
  return sendSuccess(updated, "Cập nhật dự án thành công");
});

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  let targetName = req.nextUrl.searchParams.get("name")?.trim();
  if (!targetName) {
    const body = await validateBody(DeleteProjectSchema, req);
    targetName = body.name;
  }
  const deleted = await projectService.deleteProject(targetName);
  return sendSuccess(deleted, `Đã xóa dự án "${targetName}" thành công`);
});
```
