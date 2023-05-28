export interface ILinkOptional {
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export interface ILink extends ILinkOptional {
  name: string;
  href: string;
}
