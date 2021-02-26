import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { ConfigService } from '../services/config/config.service';
import { Game } from '../data/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gamesUrl$: Observable<string>;

  constructor(private readonly http: HttpClient, config: ConfigService) { 
    const config$ = config.get();
    this.gamesUrl$ = config$.pipe(
      map((cfg) => `${cfg.api.games.base}${cfg.api.games.uri.game}`)
    );
  }

  getNewGame(playerOneId: number, playerTwoId: number): Observable<Game>{
    const params = new HttpParams().set('playerOneId', `${playerOneId}`).set('playerTwoId', `${playerTwoId}`);
    return this.gamesUrl$.pipe(
      concatMap((url) => this.http.get<Game>(url, { params }))
    );
  }

  getGame(gameId: string): Observable<Game>{
    return this.gamesUrl$.pipe(
      map((url) => url.concat(`/${gameId}`)),
      concatMap((url) => this.http.get<Game>(url))
    );
  }
  makeMove(gameId: string, spaceIndex: number, playerId: number): Observable<Game>{
    const params = new HttpParams().set('spaceIndex', `${spaceIndex}`).set('player',`${playerId}`);
    return this.gamesUrl$.pipe(
      map((url) => url.concat(`/${gameId}`)),
      concatMap((url) => this.http.put<Game>(url, { params }))
    );
  }
  deleteGame(gameId: string): Observable<Game>{
    return this.gamesUrl$.pipe(
      map((url) => url.concat(`/${gameId}`)),
      concatMap((url) => this.http.delete<Game>(url))
    );
  }
}
