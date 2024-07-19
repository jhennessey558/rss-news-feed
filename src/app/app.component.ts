import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssFeedComponent } from './rss-feed/rss-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RssFeedComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rss-newsfeed';
}
