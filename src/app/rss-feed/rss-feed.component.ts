import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RssFeedService } from '../rss-feed.service';
import { RssFeedItem } from '../rss-feed-item.interface';

@Component({
  selector: 'app-rss-feed',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [RssFeedService],
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.css']
})
export class RssFeedComponent implements OnInit {
  newsSites: { site: string, headerImage: string, url: string, items: RssFeedItem[] }[] = [
    { site: 'New York Times', headerImage: 'https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', items: [] },
    { site: 'Fox News', headerImage: 'https://thumbs.dreamstime.com/b/logo-icon-vector-logos-icons-set-social-media-flat-banner-vectors-svg-eps-jpg-jpeg-paper-texture-glossy-emblem-wallpaper-210442657.jpg', url: 'https://feeds.foxnews.com/foxnews/latest', items: [] }
  ];
  selectedSite: string | null = null;
  selectedFeedItems: RssFeedItem[] = [];
  errorMessage: string | null = null;

  constructor(private rssFeedService: RssFeedService) { }

  ngOnInit(): void {
    // Optionally, you can load a default site or perform other initialization tasks
  }

  selectSite(site: string, url: string): void {
    this.selectedSite = site;
    this.rssFeedService.getFeeds(url).subscribe(
      (items: RssFeedItem[]) => {
        this.selectedFeedItems = items;
      },
      (error: any) => {
        this.errorMessage = 'Error fetching RSS feeds';
        console.error('Error fetching RSS feeds', error);
      }
    );
  }
}
