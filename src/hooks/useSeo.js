import { useEffect } from "react";
import { ROUTE_META, NOT_FOUND_META, routeUrl } from "../constants/seo";

const ROBOTS_DEFAULT = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

const set = (selector, attr, value) => document.head.querySelector(selector)?.setAttribute(attr, value);

// Keeps the title, description, canonical URL and share tags in step with the
// current route. Unknown routes are marked noindex so the 404 page isn't indexed.
export function useSeo(pathname) {
  useEffect(() => {
    const path  = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const known = ROUTE_META[path];
    const meta  = known ?? NOT_FOUND_META;
    const url   = routeUrl(known ? path : "/");

    document.title = meta.title;
    set('meta[name="description"]',         "content", meta.description);
    set('meta[property="og:title"]',        "content", meta.title);
    set('meta[property="og:description"]',  "content", meta.description);
    set('meta[name="twitter:title"]',       "content", meta.title);
    set('meta[name="twitter:description"]', "content", meta.description);
    set('meta[property="og:url"]',          "content", url);
    set('link[rel="canonical"]',            "href",    url);
    set('meta[name="robots"]',              "content", known ? ROBOTS_DEFAULT : "noindex");
  }, [pathname]);
}
