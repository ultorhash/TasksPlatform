import { Component } from '@angular/core';
import { IFooter, ILink, ISubpage } from '@interfaces';
import { footerData } from './footer.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public ISubpage!: ISubpage;
  public ILink!: ILink;
  public Event = Event;

  public year: number = new Date().getFullYear();
  public footerData: IFooter = footerData;
}

export class MyClass {
  public x: string = ""
}