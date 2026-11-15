import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Венера, на главную">
      <svg className="logo-mark" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse
          cx="18"
          cy="18"
          rx="15"
          ry="5.5"
          fill="none"
          stroke="var(--color-primary-soft)"
          strokeWidth="1.6"
          transform="rotate(-28 18 18)"
        />
      </svg>
      ВЕНЕРА
    </Link>
  );
}
