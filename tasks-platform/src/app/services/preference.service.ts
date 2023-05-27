import { Injectable } from '@angular/core';
import { Themes } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  getTheme(): Themes {
    return localStorage.getItem('Theme') as Themes;
  }

  saveTheme(theme: Themes): void {
    localStorage.setItem('Theme', theme);
  }
}
