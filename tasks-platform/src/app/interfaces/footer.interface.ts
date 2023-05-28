import { ILink } from "./link.interface";
import { ISubpage } from "./subpage.interface";

interface IFooterRegionOptional {
  linksType?: 'inner' | 'outer'
  links?: (ILink | ISubpage)[];
  text?: string;
}

interface IFooterRegion extends IFooterRegionOptional {
  title: string;
}

export interface IFooter {
  regions: IFooterRegion[];
  bottomText: string;
}
