import { Biography } from "@/components/sections/Biography";
// Hidden for now. Uncomment this and its SECTIONS entry to bring it back;
// the content is still in content/research-interests.yml.
// import { ResearchInterests } from "@/components/sections/ResearchInterests";
import { News } from "@/components/sections/News";
import { Publications } from "@/components/sections/Publications";
import { Experience } from "@/components/sections/Experience";
import { Teaching } from "@/components/sections/Teaching";
import { Awards } from "@/components/sections/Awards";
// Hidden for now. Uncomment this and its SECTIONS entry to bring it back;
// the content is still in content/portfolio.yml.
// import { Portfolio } from "@/components/sections/Portfolio";

/**
 * The page, in order. Both the nav bar and the page body are generated from
 * this list, so adding a section here is the only step needed -- the two
 * cannot drift apart.
 *
 * `id` is the anchor target; `label` is the nav text.
 */
export const SECTIONS = [
  { id: "biography", label: "Biography", Component: Biography },
  // { id: "research", label: "Research", Component: ResearchInterests },
  { id: "news", label: "News", Component: News },
  { id: "publications", label: "Publications", Component: Publications },
  { id: "teaching", label: "Teaching", Component: Teaching },
  { id: "experience", label: "Industry", Component: Experience },
  { id: "awards", label: "Awards", Component: Awards },
  // { id: "portfolio", label: "Portfolio", Component: Portfolio },
] as const;
