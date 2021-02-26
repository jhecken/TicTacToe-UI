import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Config } from '../../data/config.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly configPath: string;

  config: Config;

  constructor(private readonly http: HttpClient) {
    this.configPath = environment.config;
    this.config = {
      api: {
        games: {
          base: "https://localhost:44317/",
          uri: {
           game: "api/Game" 
          }
        }
      }
    };
  }

  get(): Observable<Config> {
    return of(this.config);
    //return this.http.get<Config>(this.configPath);
  }
}
