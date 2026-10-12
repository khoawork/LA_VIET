import Link from "next/link";

const principles = [
  {
    number: "01",
    title: "Giao diện rõ ràng",
    description:
      "Các trang trong app tập trung vào trải nghiệm người dùng, bố cục dễ hiểu và hiển thị tốt trên nhiều kích thước màn hình.",
  },
  {
    number: "02",
    title: "Backend tách biệt",
    description:
      "Nghiệp vụ và xử lý dữ liệu được tổ chức trong feature để giao diện có thể kết nối API mà không trộn lẫn trách nhiệm.",
  },
  {
    number: "03",
    title: "Phát triển linh hoạt",
    description:
      "Phân chia rõ từng phần giúp nhóm dễ kiểm thử, bảo trì và mở rộng sản phẩm khi có thêm tính năng.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#20251f]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="text-lg font-bold tracking-[0.16em]">
          LA VIET<span className="text-[#6c8065]">.</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="flex items-center gap-6 text-sm">
          <Link className="text-[#656b63] transition hover:text-[#20251f]" href="/">
            Trang chủ
          </Link>
          <Link
            aria-current="page"
            className="font-semibold text-[#20251f]"
            href="/about"
          >
            Về chúng tôi
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-12 sm:px-10 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#71836b]">
            Về dự án
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Một nền tảng,
            <br />
            <span className="font-normal text-[#71836b]">hai phần rõ ràng.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#656b63] sm:text-lg">
            LA VIET được xây dựng với mục tiêu giữ trải nghiệm giao diện đơn
            giản, đồng thời tổ chức phần xử lý phía máy chủ gọn gàng và dễ mở
            rộng.
          </p>
          <a
            href="#cach-chung-toi-lam"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#263328] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3b4b3d]"
          >
            Khám phá cách chúng tôi làm
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-[#dfe5d9] p-7 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#71836b]/20"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 -top-6 h-36 w-36 rounded-full border border-[#71836b]/25"
          />
          <p className="relative text-sm font-medium text-[#596a54]">
            Cấu trúc dự án
          </p>
          <div className="relative mt-8 space-y-4">
            <div className="rounded-2xl bg-white/85 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-[#71836b]">/app</span>
                <span className="rounded-full bg-[#e8eee4] px-3 py-1 text-xs font-medium text-[#596a54]">
                  Giao diện
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#656b63]">
                Trang, bố cục và thành phần người dùng nhìn thấy.
              </p>
            </div>
            <div className="rounded-2xl bg-[#263328] p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-[#c2d0ba]">/feature</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#e1e8dc]">
                  Backend
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Nghiệp vụ, xử lý dữ liệu và các chức năng phía máy chủ.
              </p>
            </div>
          </div>
          <p className="relative mt-6 text-xs leading-5 text-[#596a54]">
            Nội dung minh họa cho trang kiểm thử giao diện.
          </p>
        </div>
      </section>

      <section
        id="cach-chung-toi-lam"
        className="bg-white px-6 py-20 sm:px-10 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#71836b]">
              Cách chúng tôi làm
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tách đúng phần, làm tốt từng phần.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.number}
                className="border-t border-[#e5e7e1] pt-5"
              >
                <p className="font-mono text-sm text-[#8b9a84]">
                  {principle.number}
                </p>
                <h3 className="mt-5 text-lg font-semibold">{principle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#656b63]">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-7 text-sm text-[#777d74] sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>© 2026 LA VIET</p>
        <p>Trang About demo · Giao diện thuộc thư mục app</p>
      </footer>
    </main>
  );
}