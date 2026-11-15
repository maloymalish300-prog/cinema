import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pad = pathname === "/ticket" ? " footer-ticket-pad" : "";

  return (
    <footer id="contacts" className={`site-footer${pad}`}>
      <div className="wrap footer-grid">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-muted">
            Технологичный зал в Москве: чёрные кресла, белый экран и фиолетовый контур света.
            Бронь сохраняется в вашем браузере.
          </p>
        </div>
        <div>
          <h2 className="footer-title">Меню</h2>
          <div className="footer-links">
            <Link to="/afisha">Афиша</Link>
            <Link to="/" hash="schedule">
              Сеансы
            </Link>
            <Link to="/hall">Зал «Орбита»</Link>
            <Link to="/ticket">Купить билет</Link>
            <Link to="/orders">Мои билеты</Link>
          </div>
        </div>
        <div>
          <h2 className="footer-title">Контакты</h2>
          <div className="footer-links">
            <p>Москва, Пресненская набережная, 12</p>
            <p>Башня «Орбита», 3 этаж</p>
            <p>Метро «Деловой центр», 4 минуты пешком</p>
            <p>
              <a href="tel:+74951200712">+7 (495) 120-07-12</a>
            </p>
            <p>Касса 10:30–01:00, без выходных</p>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 Кинотеатр «Венера»</p>
        <p>Демо-бронь, не платёж. Код показывают на входе.</p>
      </div>
    </footer>
  );
}
