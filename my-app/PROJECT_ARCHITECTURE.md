# Phân tích cấu trúc project LA VIET và hướng dẫn đặt backend, truy vấn

> Phạm vi: mã nguồn trong `my-app/` tại thời điểm đọc ngày 13/10/2026. Tài liệu mô tả **những gì mã hiện đang làm** và đánh dấu rõ phần **đề xuất**. Không suy ra rằng một thư mục trống đã có chức năng hoàn chỉnh.

## 1. Nhìn nhanh toàn hệ thống

Đây là một ứng dụng **Next.js 16 App Router + React 19 + TypeScript**. Cùng một project chứa giao diện và HTTP API. Dữ liệu được truy cập bằng **Prisma 7** với datasource `mysql`; mã chạy dùng adapter `@prisma/adapter-mariadb`. **Zod 4** kiểm tra dữ liệu đầu vào, còn Tailwind CSS 4 phục vụ giao diện. Các phiên bản trên lấy từ [package.json](package.json).

Project chưa có backend tách thành một server riêng. Đường đi của chức năng CRUD `Project` hiện tại là:

```text
Trình duyệt: app/projects/page.tsx
    -> HTTP /api/projects
    -> app/api/projects/route.ts (nhận request, validate, trả response)
    -> modules/project/project.service.ts (quy tắc nghiệp vụ)
    -> modules/project/project.repository.ts (truy vấn Prisma)
    -> prisma/prisma.service.ts (PrismaClient + adapter)
    -> cơ sở dữ liệu MySQL/MariaDB
```

Đây là **quy ước thực tế đang được dùng cho `Project`**, chưa phải một kiến trúc được áp dụng đều cho mọi tính năng. `home` mới có nhiều component giao diện và chưa có lớp dữ liệu; `/api/home` hiện chỉ là kiểm tra DB.

## 2. Cây thư mục và trách nhiệm

```text
LA_VIET/
├─ README.md                         # File rất ngắn ở gốc repo
├─ .gitignore                        # Ignore ở gốc repo
└─ my-app/                           # Gốc ứng dụng; chạy npm tại đây
   ├─ app/                           # App Router: URL, trang, layout và API
   │  ├─ api/
   │  │  ├─ about/route.ts           # GET /api/about: thông tin API cố định
   │  │  ├─ home/route.ts            # GET /api/home: thử SELECT 1
   │  │  └─ projects/route.ts        # GET/POST/PUT/DELETE /api/projects
   │  ├─ about/page.tsx              # Giao diện /about, đang là trang đơn giản
   │  ├─ home/page.tsx               # Giao diện /home, ghép các component home
   │  ├─ projects/page.tsx           # Giao diện /projects, trang client CRUD
   │  ├─ page.tsx                    # Giao diện /, đang là trang thử Tailwind
   │  ├─ layout.tsx                  # Root layout, font và metadata chung
   │  └─ globals.css                 # Tailwind và CSS toàn cục
   ├─ modules/                       # Mã theo tính năng
   │  ├─ home/
   │  │  ├─ components/              # 8 phần giao diện của /home
   │  │  ├─ services/home.service.ts # Đang trống
   │  │  ├─ types/home-type.ts       # Đang trống
   │  │  └─ index.ts                 # Chỉ xuất lại components
   │  └─ project/
   │     ├─ project.service.ts       # Nghiệp vụ Project
   │     ├─ project.repository.ts    # Truy vấn Project bằng Prisma
   │     ├─ project.dto.ts           # Kiểu input/output của Project
   │     └─ project.schema.ts        # Xuất lại schema từ shared
   ├─ prisma/
   │  ├─ schema/
   │  │  ├─ schema.prisma            # Generator và datasource mysql
   │  │  ├─ projects.prisma          # Model Project
   │  │  └─ page.prisma              # Đang trống; không có model Page
   │  ├─ generated/prisma/           # Prisma Client đã sinh, có Project và User
   │  └─ prisma.service.ts           # Khởi tạo PrismaClient dùng adapter MariaDB
   ├─ shared/
   │  ├─ common/                     # HTTP status, response, error, pagination
   │  ├─ schema/                     # Zod schema dùng chung; hiện có Project
   │  ├─ utils/                      # Validate request, bọc lỗi route
   │  └─ index.ts                    # Điểm xuất công khai của shared
   ├─ prisma.config.ts               # Cấu hình Prisma CLI, URL và migrations
   ├─ next.config.ts                 # Cấu hình Next, image, cache, Turbopack
   ├─ tsconfig.json                  # TypeScript strict và alias @/*
   ├─ package.json                   # Dependencies, scripts, Node tối thiểu
   ├─ package-lock.json              # Khóa phiên bản npm
   ├─ postcss.config.mjs             # Plugin Tailwind cho PostCSS
   ├─ eslint.config.mjs              # ESLint + cấu hình Next/TypeScript
   ├─ .gitignore                     # Ignore build, env, node_modules...
   ├─ README.md                      # README mặc định của create-next-app
   ├─ AGENTS.md                      # Hướng dẫn làm việc với Next trong repo
   ├─ .next/                         # Đầu ra Next khi chạy/build, sinh tự động
   └─ node_modules/                  # Dependency đã cài, không viết mã vào đây
```

### `app/`: định tuyến và điểm giao tiếp HTTP

Trong App Router, thư mục và tên file quyết định URL. `page.tsx` tạo trang; `route.ts` tạo HTTP endpoint. Vì vậy [app/about/page.tsx](app/about/page.tsx) là `/about`, còn [app/api/about/route.ts](app/api/about/route.ts) là `/api/about`: hai URL và hai chức năng riêng. [app/layout.tsx](app/layout.tsx) bao mọi trang, nạp [app/globals.css](app/globals.css), font Geist và metadata.

| File | URL / hành vi hiện tại |
| --- | --- |
| [app/page.tsx](app/page.tsx) | `/`: khối `TEST TAILWIND`; chưa phải trang chủ thực tế. |
| [app/home/page.tsx](app/home/page.tsx) | `/home`: ghép Header, Hero, Statistics, Spotlight, News, Partners, CTA, Footer. |
| [app/about/page.tsx](app/about/page.tsx) | `/about`: nội dung placeholder đơn giản. |
| [app/projects/page.tsx](app/projects/page.tsx) | `/projects`: Client Component (`"use client"`), `fetch` API để hiển thị/tạo/sửa/xóa Project. |
| [app/api/about/route.ts](app/api/about/route.ts) | `GET /api/about`: trả tên/phiên bản/mô tả API cố định; không truy vấn DB. |
| [app/api/home/route.ts](app/api/home/route.ts) | `GET /api/home`: chạy `SELECT 1`, trả `{ database: "connected" }` khi thành công; chưa cung cấp dữ liệu trang chủ. |
| [app/api/projects/route.ts](app/api/projects/route.ts) | `GET`, `POST`, `PUT`, `DELETE /api/projects`; đây là API nghiệp vụ đầy đủ nhất. |

Lưu ý: gọi `/api/home` **không** làm dữ liệu hiển thị ở `/home` thay đổi; các component trang chủ hiện chứa dữ liệu viết trực tiếp trong TSX. Route API là nơi đặt mã nhận request và kết nối các lớp, không nên trở thành nơi chứa nhiều câu truy vấn và quy tắc nghiệp vụ.

### `modules/`: mã theo tính năng

**`modules/project/`** là ví dụ backend nên tham chiếu:

| File | Vai trò và nội dung hiện có |
| --- | --- |
| [project.repository.ts](modules/project/project.repository.ts) | Tất cả truy vấn `prisma.project`: `findMany`, `count`, `findByName`, `create`, `updateByName`, `deleteByName`. `findMany` áp dụng `skip/take`, tìm bằng `contains`, sắp xếp. Update/delete trước hết tìm tên, sau đó thao tác bằng `id`. |
| [project.service.ts](modules/project/project.service.ts) | Điều phối repository; tạo metadata phân trang; báo 404 khi không thấy Project, báo 409 khi tên bị trùng theo kiểm tra ứng dụng. Có xuất instance `projectService`. |
| [project.dto.ts](modules/project/project.dto.ts) | Suy ra các DTO đầu vào từ Zod schema bằng `z.infer`; khai báo `ProjectResponseDto` gồm `id`, `name`, `description`, `createdAt`, `updatedAt`. |
| [project.schema.ts](modules/project/project.schema.ts) | Chỉ `export *` từ `shared/schema/project.schema.ts`; không có định nghĩa schema riêng. |

**`modules/home/`** hiện mới là phần giao diện:

- [components/index.ts](modules/home/components/index.ts) và [modules/home/index.ts](modules/home/index.ts) giúp import nhiều component vào `app/home/page.tsx` qua một đường dẫn.
- `home-hero.tsx`: hero và bộ sưu tập; `home-statistics.tsx`: thống kê; `home-spotlight.tsx`: dự án nổi bật; `home-news.tsx`: tin tức; `home-partners.tsx`: đối tác; `home-cta.tsx`: lời kêu gọi hành động; `home-header.tsx` và `home-footer.tsx`: đầu/cuối trang.
- Nội dung thống kê, bài viết, đối tác và nhiều đoạn thông tin khác hiện được viết trực tiếp trong component. Chúng chưa đọc từ `home.service.ts` hoặc `/api/home`.
- [services/home.service.ts](modules/home/services/home.service.ts) và [types/home-type.ts](modules/home/types/home-type.ts) là **file 0 byte**. Có thể dùng khi phát triển tính năng home, nhưng hiện chưa có contract hoặc hành vi nào để tuân theo.

### `prisma/`: định nghĩa dữ liệu và kết nối DB

- [schema/schema.prisma](prisma/schema/schema.prisma) đặt generator `prisma-client`, output `../generated/prisma`, datasource `mysql`. Dòng chú thích Postgres là boilerplate; cấu hình thực tế là MySQL.
- [schema/projects.prisma](prisma/schema/projects.prisma) hiện khai báo `Project`: `id` tự tăng là khóa chính; `name` bắt buộc; `description` nullable; `createdAt` có mặc định `now()`; `updatedAt` được Prisma cập nhật. **Không có `@unique` trên `name`.**
- [schema/page.prisma](prisma/schema/page.prisma) đang trống. Tên file không tự tạo model hay bảng `Page`.
- [prisma.service.ts](prisma/prisma.service.ts) tạo một PrismaClient với `PrismaMariaDb`, dùng `DB_HOST`, `DB_PORT` (mặc định 3306), `DB_USER`, `DB_PASSWORD`, `DB_NAME`. Trong môi trường không phải production, instance được giữ trên `globalThis` để giảm tạo lại client khi reload.
- [prisma.config.ts](prisma.config.ts) là cấu hình **Prisma CLI**: dùng `DATABASE_URL` và dự kiến migrations tại `prisma/migrations`. Đây là biến khác với bộ biến mà adapter runtime đọc. Muốn cả CLI lẫn ứng dụng hoạt động, cần cấu hình cả hai kiểu kết nối một cách nhất quán.
- `prisma/generated/prisma/` là mã **được sinh**. Client hiện chứa cả `Project` lẫn `User`, nhưng các file schema hiện chỉ khai báo `Project`. Đây là dấu hiệu client được sinh từ một trạng thái schema khác; không lấy generated code làm nguồn sự thật, và cần generate lại sau khi sửa schema. Không chỉnh sửa bằng tay trong thư mục này.
- Tại thời điểm đọc, **không thấy** thư mục `prisma/migrations` hoặc file `.env*` trong `my-app/`. Không có căn cứ để khẳng định DB thực tế đang có bảng nào hoặc đã áp dụng migration nào.

### `shared/`: hạ tầng dùng lại

| Vị trí | Chức năng |
| --- | --- |
| [shared/schema/pagination.schema.ts](shared/schema/pagination.schema.ts) | Zod schema cho `page`, `limit`, `search`, `sortBy`, `sortOrder`; mặc định trang 1, limit 10, tối đa 100. |
| [shared/schema/project.schema.ts](shared/schema/project.schema.ts) | Validate create/update/query/delete Project. `ProjectQuerySchema` mở rộng pagination. |
| [shared/utils/validate.ts](shared/utils/validate.ts) | `validateBody`, `validateQuery`, `validateParams`; chuyển lỗi Zod thành danh sách `{ field, message }`. |
| [shared/utils/api-handler.ts](shared/utils/api-handler.ts) | `withErrorHandler`: đổi `AppError`, lỗi Zod và mã Prisma `P2002`/`P2025` thành HTTP response; lỗi chưa nhận diện thành 500. |
| [shared/common/api-response.ts](shared/common/api-response.ts) | `sendSuccess`, `sendPaginated`, `sendError`; response có `success`, `message`, `timestamp`, và có thể có `data`, `meta`, `errors`, `errorCode`. |
| [shared/common/app-error.ts](shared/common/app-error.ts) | Các exception 400, 401, 403, 404, 409, 422, 500. |
| [shared/common/pagination.ts](shared/common/pagination.ts) | Tạo `totalPages`, `hasNextPage`, `hasPrevPage` từ kết quả đếm. |
| `shared/**/index.ts` | Xuất lại các hàm/kiểu để có thể import từ `@/shared`. |

`shared` phù hợp cho chức năng **thực sự dùng chung**. Logic hoặc schema chỉ thuộc một nghiệp vụ nên ưu tiên ở `modules/<tên-tính-năng>/`; code hiện tại đặt schema Project trong `shared/schema`, nên nếu tiếp tục theo đúng ví dụ đang có, hãy giữ DTO và chỗ route import cùng một schema, tránh tạo hai bản validation khác nhau.

### Cấu hình và thư mục sinh tự động

- [tsconfig.json](tsconfig.json): TypeScript `strict`, alias `@/*` trỏ về gốc `my-app/`. Ví dụ `@/modules/project/project.service` là `my-app/modules/project/project.service.ts`.
- [next.config.ts](next.config.ts): bật `cacheComponents`, `partialPrefetching`, cho phép ảnh từ `images.unsplash.com`, thiết lập Turbopack cho CSS và `agentFeedback`.
- [postcss.config.mjs](postcss.config.mjs), [app/globals.css](app/globals.css): cấu hình Tailwind CSS 4 và style toàn cục.
- [eslint.config.mjs](eslint.config.mjs): ESLint theo Next Core Web Vitals và TypeScript.
- [package.json](package.json): `npm run dev`, `npm run build`, `npm run start`, `npm run lint`; yêu cầu Node `>=22.5.0`. Hiện không có script test.
- `.next/` và `node_modules/` là đầu ra/cache/dependency; không phải nơi viết chức năng. `next-env.d.ts` cũng được Next sinh. Không thấy thư mục `public/` trong mã hiện tại; hình trang chủ dùng URL Unsplash.

## 3. Cụ thể API `Project` đang chạy ra sao?

| HTTP | Input | Xử lý chính | Response thành công |
| --- | --- | --- | --- |
| `GET /api/projects` | `page`, `limit`, `search`, `sortBy`, `sortOrder`; có thể có `name` | Không có `name` thì lấy danh sách + `count`; có `name` không rỗng thì lấy một Project theo tên. | Danh sách có `meta` phân trang hoặc một object Project. |
| `POST /api/projects` | JSON `{ name, description? }` | Validate body, kiểm tra tên đã tồn tại, tạo bản ghi. | 201 + Project. |
| `PUT /api/projects` | JSON `{ name, newName?, description? }` | Tìm bằng tên cũ, kiểm tra tên mới, cập nhật. | 200 + Project. |
| `DELETE /api/projects?name=...` | `name` từ URL; nếu không có thì từ JSON body | Tìm bằng tên, xóa bản ghi. | 200 + Project đã xóa. |

Các bước cụ thể của `GET /api/projects?limit=50` từ trang UI: [app/projects/page.tsx](app/projects/page.tsx) gọi `fetch` → route dùng `validateQuery(ProjectQuerySchema, ...)` → service gọi song song `repository.findMany` và `repository.count` → repository dùng `prisma.project.findMany/count` → route trả `sendPaginated`. Trang UI hiện lấy tối đa 50 dòng và hiển thị `projects.length`; chưa dùng `meta` để điều hướng nhiều trang.

`GET /api/projects?name=abc` là nhánh tìm **một** Project. Repository dùng `findFirst({ where: { name } })`, tức so khớp tên theo điều kiện của DB; trong `findMany`, bộ lọc `name` lại dùng `contains`. Do route rẽ nhánh trước, bộ lọc `contains` theo `name` của `findMany` không được nhánh GET hiện tại sử dụng.

## 4. Nên viết backend và truy vấn ở đâu?

### Quy tắc chọn vị trí

| Bạn cần viết gì? | Đặt ở đâu? | Lý do |
| --- | --- | --- |
| URL API, phương thức HTTP, đọc request, gọi validate, trả response | `app/api/<resource>/route.ts` | Giữ lớp HTTP mỏng; cấu trúc URL rõ ràng. |
| Quy tắc nghiệp vụ, phối hợp nhiều truy vấn, kiểm tra điều kiện, báo lỗi nghiệp vụ | `modules/<feature>/<feature>.service.ts` | Tách nghiệp vụ khỏi HTTP và DB. |
| `prisma.<model>.findMany/create/update/...`, truy vấn raw SQL, điều kiện lọc/sắp xếp/phân trang | `modules/<feature>/<feature>.repository.ts` | Gom truy vấn của một feature vào một nơi, giống `ProjectRepository`. |
| Model/bảng, trường, quan hệ, index và ràng buộc DB | `prisma/schema/<model>.prisma` | Schema Prisma là nguồn để sinh client và quản lý cấu trúc DB. |
| Tạo và chia sẻ PrismaClient | `prisma/prisma.service.ts` | Đã có một điểm kết nối; import `prisma` từ đây. |
| Validate dữ liệu đến từ HTTP | Một schema Zod cho feature; hiện pattern Project là `shared/schema/<feature>.schema.ts` | Cùng schema được route validate và DTO suy ra; tránh trùng luật. |
| Kiểu dữ liệu request/response | `modules/<feature>/<feature>.dto.ts` hoặc `types/` trong module đó | Kiểu riêng của feature không cần đẩy lên `shared`. |
| UI riêng của một trang/tính năng | `modules/<feature>/components/`; `app/<route>/page.tsx` ghép UI | Giữ page gọn, giống `home`. |
| Tiện ích HTTP/validate/phân trang dùng ở nhiều feature | `shared/common`, `shared/utils`, `shared/schema` | Dùng lại một bản. |

**Nếu hỏi riêng “viết câu truy vấn ở đâu?”: đặt truy vấn nghiệp vụ trong `modules/<feature>/<feature>.repository.ts`.** Ví dụ thêm điều kiện cho Project thì sửa [modules/project/project.repository.ts](modules/project/project.repository.ts). Chỉ khi làm endpoint chẩn đoán đơn giản như `SELECT 1` mới có truy vấn trực tiếp ở route hiện tại; `/api/home` không nên là khuôn mẫu cho một API nghiệp vụ lớn.

### Ví dụ thêm backend cho tin tức `News`

Nếu muốn thay danh sách bài viết tĩnh ở home bằng dữ liệu DB, cấu trúc **đề xuất** theo pattern Project là:

```text
prisma/schema/news.prisma                # model News/Article và các ràng buộc DB
modules/news/news.repository.ts          # prisma.news.findMany/findUnique/...
modules/news/news.service.ts             # trạng thái xuất bản, điều kiện hiển thị...
modules/news/news.dto.ts                 # kiểu request/response
shared/schema/news.schema.ts             # Zod cho body/query, nếu theo pattern hiện có
app/api/news/route.ts                    # GET/POST /api/news
app/api/news/[id]/route.ts               # GET/PUT/DELETE theo ID nếu cần
modules/home/services/home.service.ts    # ghép dữ liệu cho /home nếu trang cần nhiều nguồn
modules/home/types/home-type.ts          # kiểu dữ liệu trang chủ nếu thực sự cần
```

Luồng đọc gợi ý: `app/api/news/route.ts` validate query → `newsService.listPublished` áp quy tắc “chỉ bài đã xuất bản” → `newsRepository.findPublished` gọi Prisma → `sendPaginated`. Nếu dữ liệu chỉ để render `/home` trên server, [app/home/page.tsx](app/home/page.tsx) cũng có thể gọi server service trực tiếp rồi truyền dữ liệu cho component; không bắt buộc tự gọi HTTP API từ một server page. Chỉ thêm API khi trình duyệt hoặc hệ thống khác cần endpoint đó.

Ví dụ hình thức repository (minh họa vị trí đặt query, **chưa phải mã đang có**):

```ts
// modules/news/news.repository.ts
import { prisma } from "@/prisma/prisma.service";

export const newsRepository = {
  listPublished(limit: number) {
    return prisma.news.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });
  },
};
```

Đoạn trên chỉ chạy sau khi bạn **định nghĩa model `News`**, đồng bộ DB và sinh lại Prisma Client. Nếu cần SQL thô, vẫn đặt trong repository và dùng tagged template của Prisma với tham số gắn an toàn:

```ts
const rows = await prisma.$queryRaw`SELECT * FROM News WHERE id = ${id}`;
```

Tránh ghép chuỗi SQL từ input người dùng.

### Trình tự triển khai một feature có DB

1. Xác định resource, dữ liệu đầu vào/đầu ra và URL. Nếu cần trang, tạo `app/<route>/page.tsx`; nếu cần HTTP endpoint, tạo `app/api/<resource>/route.ts`.
2. Khai báo model, index và ràng buộc trong `prisma/schema/`; chuẩn bị migration theo quy trình DB của nhóm. Repo hiện chưa có lịch sử migration để làm ví dụ.
3. Cấu hình biến kết nối: `DATABASE_URL` cho Prisma CLI và `DB_HOST/PORT/USER/PASSWORD/NAME` cho runtime. Không lưu mật khẩu trong repo; `.env*` đã được ignore.
4. Chạy Prisma generate sau khi schema đổi; không sửa `prisma/generated/prisma/` bằng tay. Kiểm tra schema và client khớp nhau trước khi dùng model mới.
5. Viết truy vấn trong repository; viết nghiệp vụ trong service; xác định DTO và Zod schema; route chỉ nhận/validate/gọi service/trả response.
6. Nối UI đến dữ liệu, sau đó kiểm tra `npm run lint`, `npm run build` và thử các endpoint với DB phù hợp. Các lệnh này cần môi trường DB đúng nếu build hoặc trang/route truy cập DB.

## 5. Những điểm cần biết để tránh phá vỡ cấu trúc

1. **Schema và generated client chưa khớp.** Client đã sinh có `User`, nhưng source schema không có model `User`. Trước khi viết truy vấn User hoặc generate lại, xác minh model mong muốn và trạng thái DB/migration. Generate lại từ schema hiện tại có thể làm mất API `prisma.user` khỏi client; điều đó không chứng minh bảng User có hay không trong DB.
2. **`Project.name` không có unique constraint ở DB.** Service kiểm tra trùng tên trước khi tạo/sửa, nhưng kiểm tra này không bảo đảm duy nhất khi hai request đồng thời. `findByName` dùng `findFirst`, update/delete theo tên sẽ mơ hồ nếu DB có hai bản ghi cùng tên. Nếu tên là định danh nghiệp vụ, cần thiết kế `@unique` và migration sau khi xử lý dữ liệu trùng; hoặc ưu tiên ID/slug có ràng buộc rõ ràng. Wrapper đã biết xử lý lỗi Prisma `P2002` nếu DB có unique constraint.
3. **`sortBy` chưa giới hạn cột hợp lệ.** [shared/schema/pagination.schema.ts](shared/schema/pagination.schema.ts) cho phép mọi chuỗi, rồi repository dùng làm key `orderBy`. Đây không phải chỗ nên cho client tự quyết tên field không kiểm soát; khi mở rộng API nên dùng `z.enum` hoặc danh sách field được phép theo từng model.
4. **`GET ?name=` và `search` có nghĩa khác nhau.** `name` đi vào nhánh lấy một Project; `search` dùng `contains` trên `name` hoặc `description` cho danh sách. Cần giữ rõ contract này hoặc thay đổi có chủ đích khi thiết kế API mới.
5. **Home hiện là dữ liệu tĩnh.** `home.service.ts`/`home-type.ts` trống; `/api/home` chỉ ping DB. Nếu cần backend cho trang chủ, phải xây đường dữ liệu mới và đổi component/page để nhận dữ liệu, không chỉ thêm query vào file service trống.
6. **UI demo và navigation chưa phản ánh đầy đủ domain.** `/` mới là test Tailwind; `/about` là placeholder; vài liên kết trên home như “Về chúng tôi”, “Xem tất cả tin tức”, CTA chuyển tới `/projects` (trang CRUD demo). Cần kiểm tra lại khi mở rộng các trang nội dung.
7. **Quy ước response của API đã có sẵn.** Giữ `withErrorHandler`, `validateBody/Query/Params`, `sendSuccess/sendPaginated` để lỗi và dữ liệu nhất quán. `ProjectResponseDto` dùng `Date` ở server, nhưng sau JSON hóa `createdAt/updatedAt` là chuỗi ở browser, như kiểu local trong `app/projects/page.tsx`.
8. **Chưa thấy test, migration hoặc cấu hình auth.** Không giả định đã có xác thực/phân quyền cho `POST/PUT/DELETE /api/projects`; mã route hiện không kiểm tra quyền. Nếu API sẽ phục vụ dữ liệu thật, đây là chức năng cần thiết kế trước khi mở quyền ghi.

## 6. Câu trả lời ngắn cho quyết định đặt file

- **Thêm bảng/cột** → `prisma/schema/*.prisma`, sau đó đồng bộ DB và generate client.
- **Thêm hoặc sửa truy vấn DB** → `modules/<feature>/<feature>.repository.ts`.
- **Thêm quy tắc nghiệp vụ** → `modules/<feature>/<feature>.service.ts`.
- **Thêm validation/kiểu dữ liệu** → Zod schema và DTO của feature; dùng `shared` khi thực sự dùng chung hoặc theo pattern Project hiện tại.
- **Mở endpoint** → `app/api/<resource>/route.ts`; **mở trang** → `app/<route>/page.tsx`.
- **Đưa dữ liệu vào trang chủ** → triển khai `modules/home/services/home.service.ts` hoặc service của từng feature, rồi cho `app/home/page.tsx` lấy dữ liệu và truyền xuống component. Đừng coi `/api/home` hiện tại là API nội dung.

Nguồn đối chiếu chính là các file mã được liên kết ở trên; quy tắc `page.tsx`/`route.ts` cũng được kiểm tra với tài liệu đi kèm bản Next.js cài tại `node_modules/next/dist/docs/01-app/`.
