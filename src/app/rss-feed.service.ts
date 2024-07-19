import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RssFeedItem } from './rss-feed-item.interface';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class RssFeedService {

  constructor(private http: HttpClient) { }

  getFeeds(url: string): Observable<RssFeedItem[]> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(response => {
        const parser = new xml2js.Parser({ trim: true, explicitArray: false });
        let rssFeedItems: RssFeedItem[] = [];
        parser.parseString(response, (err: any, result: any) => {
          if (err) {
            throw new Error('Error parsing RSS feed');
          }
          const items = result.rss.channel.item;
          rssFeedItems = items.map((item: any) => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate
          }));
        });
        return rssFeedItems;
      })
    );
  }
}
