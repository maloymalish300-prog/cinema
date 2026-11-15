import { Link, createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main id="content" className="page page-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="display-md mt-3">Этот сеанс не найден</h1>
        <p className="mt-3 text-muted">Такой страницы в «Венере» нет.</p>
        <Link to="/" className="btn btn-primary mt-6">
          На главную
        </Link>
      </div>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
