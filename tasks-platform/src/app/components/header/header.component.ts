import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ISubpage } from '@interfaces';
import { PreferenceService } from '@services';
import { ThemeClasses, Themes } from '@enums';
import { subpages } from './header.data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public subpages: ISubpage[] = subpages;

  public isChecked: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private preferenceService: PreferenceService
  ) {}

  ngOnInit(): void {
    const theme = this.preferenceService.getTheme();
    this.isChecked = theme === Themes.DARK;
    const themeClass = this.isChecked ? ThemeClasses.DARK_CLASS : ThemeClasses.LIGHT_CLASS;

    this.setTheme(themeClass);
  }

  private setTheme(themeClass: ThemeClasses): void {
    this.renderer.setAttribute(this.document.body, 'class', themeClass);
  }

  onThemeChange({ checked }: MatSlideToggleChange): void {
    const themeClass = checked ? ThemeClasses.DARK_CLASS : ThemeClasses.LIGHT_CLASS;
  
    this.isChecked = checked;
    this.preferenceService.saveTheme(checked ? Themes.DARK : Themes.LIGHT);
    this.setTheme(themeClass);
  }
}
