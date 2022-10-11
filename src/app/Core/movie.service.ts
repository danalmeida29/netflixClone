import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movies } from '../Models/movies';

const enum endpoint{
  latest = '/movie/latest',
  now_playing = '/movie/now_playing',
  popular = '/movie/popular',
  top_rated = '/movie/top_rated',
  upcoming = '/movie/upcoming',
  trending = '/trending/all/week',
  originals = '/discover/tv'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private URL = 'https://api.themoviedb.org/3';
  private BASE_API = environment.API_URL;

  constructor(private http:HttpClient) { }

  getLatesMovie(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.latest}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }
  getNowPlaying(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.now_playing}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }

  getOriginals(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.originals}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }

  getPopularMovie(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.popular}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }


  getTopRated(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.top_rated}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }

  getTrending(): Observable<any>{
    return this.http.get<Movies>(`${this.URL}${endpoint.trending}`,{
      params:{
        api_key: this.BASE_API
      }
    });
  }
}
