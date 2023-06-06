import { IFooter } from "@interfaces";

export const footerData: IFooter = {
  regions: [
    {
      title: 'About',
      text: `The purpose of the platform is to easily and securely
      store information about the tasks performed by employees and
      also reward them for additional work in the form of tokens.`
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
          name: 'Metamask',
          href: 'https://metamask.io',
          target: '_blank'
        }
      ]
    }
  ],
  bottomText: '© Tasks Platform 2022'
}
