import { Biography } from "@/components/sections/Biography";
import { ResearchInterests } from "@/components/sections/ResearchInterests";
import { News } from "@/components/sections/News";
import { Publications } from "@/components/sections/Publications";
import { Teaching } from "@/components/sections/Teaching";
import { Portfolio } from "@/components/sections/Portfolio";

/**
 * The page, in order. Both the nav bar and the page body are generated from
 * this list, so adding a section here is the only step needed -- the two
 * cannot drift apart.
 *
 * `id` is the anchor target; `label` is the nav text.
 */
export const SECTIONS = [
  { id: "biography", label: "Biography", Component: Biography },
  { id: "research", label: "Research", Component: ResearchInterests },
  { id: "news", label: "News", Component: News },
  { id: "publications", label: "Publications", Component: Publications },
  { id: "teaching", label: "Teaching", Component: Teaching },
  { id: "portfolio", label: "Portfolio", Component: Portfolio },
] as const;
