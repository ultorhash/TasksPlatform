import { IFooter } from "src/app/interfaces";

export const footerData: IFooter = {
  regions: [
    {
      title: 'About',
      text: `Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eos ullam ad nobis! Debitis
      ad doloremque quas? Voluptates, iure nihil. Repellat.`
    },
    {
      title: 'Links',
      linksType: 'inner',
      links: [
        {
          name: 'home',
          routerLink: ''
        },
        {
          name: 'quick start',
          routerLink: 'quick-start'
        },
        {
          name: 'tasks',
          routerLink: 'tasks'
        }
      ]
    },
    {
      title: 'See also',
      linksType: 'outer',
      links: [
        {
          name: 'MetaMask',
          href: 'https://metamask.io',
          target: '_blank'
        }
      ]
    }
  ],
  bottomText: '© Tasks Platform 2022'
}
