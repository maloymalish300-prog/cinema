import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Ticket, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

const links = [
  { to: "/afisha", label: "Афиша", hash: undefined },
  { to: "/", label: "Сеансы", hash: "schedule" },
  { to: "/hall", label: "Зал", hash: undefined },
  { to: "/orders", label: "Мои билеты", hash: undefined },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        К содержанию
      </a>
      <div className="header-inner">
        <Logo />
        <nav className="nav-desktop" aria-label="Основное меню">
          {links.map((link) => {
            const active =
              link.hash !== undefined
                ? pathname === "/" && hash === link.hash
                : pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                className={active ? "nav-link is-active" : "nav-link"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-actions">
          <Link to="/ticket" className="btn btn-primary btn-sm" aria-label="Купить билет">
            <Ticket size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Купить билет</span>
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobile-panel" aria-label="Мобильное меню">
          {links.map((link) => (
            <Link key={link.label} to={link.to} hash={link.hash}>
              {link.label}
            </Link>
          ))}
          <Link to="/ticket">Купить билет</Link>
        </nav>
      ) : null}
    </header>
  );
}
