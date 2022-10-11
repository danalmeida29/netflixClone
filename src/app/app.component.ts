
import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import { MovieService } from './Core/movie.service';
import { Movies } from './Models/movies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'netflixClone';

  sticky = false;
  subs: Subscription[] = [];
  trending: any;
  popular!: Movies;
  topRated!: Movies;
  originals!: Movies;
  nowPlaying!: Movies;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl!: string;

  constructor(private movieService: MovieService){}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.subs.push(this.movieService.getTrending().subscribe(data => {
      this.trending = data;
      this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[0].backdrop_path;
    }));
    this.subs.push(this.movieService. getPopularMovie().subscribe(data => this.popular = data));
    this.subs.push(this.movieService.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movieService.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movieService.getNowPlaying().subscribe(data => this.nowPlaying = data));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  // tslint:disable-next-line:typedef
  handleScroll() {
    const windowScroll = window.pageYOffset;

    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}