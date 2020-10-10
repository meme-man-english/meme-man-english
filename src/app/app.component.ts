import {Component, ViewEncapsulation} from '@angular/core';
import {transliterateSentence} from './transliteration.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  source = `Angry
English
French
Women
Karen
Smart
Doubt
Debt
Relationship
Hacker
Engineer
Friends
Doctor
Neighbour
European
Indian
American
Girlfriend
Language
Knowledge
Twitter
Reddit
Facebook
Photoshop`;
  transliteration: string;

  constructor() {
    this.transliterate(this.source);
  }

  clear(): void {
    this.source = '';
    this.transliteration = '';
  }

  transliterate(text: string = this.source): void {
    this.source = text;
    this.transliteration = transliterateSentence(text);
  }
}
