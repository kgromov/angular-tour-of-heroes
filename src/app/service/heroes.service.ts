import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Hero} from "../model/hero";
import {ErrorHandlerService} from "./error-handler.service";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private readonly httpOptions;

  // TODO: add error handling and logging
  // 404 handling
  constructor(private httpClient: HttpClient,
              private messageService: MessageService,
              private errorHandlerService: ErrorHandlerService) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroesService: ${message}`);
  }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
  }

  public getHeroById(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this.heroesUrl}/${id}`)
  }

  public addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero);
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions);
  }

  public deleteHero(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.heroesUrl}/${id}`);
  }

  /** GET hero by id. Return `undefined` when id not found */
  // TODO: try to figure out
  public getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.httpClient.get<Hero[]>(url)
      .pipe(map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.errorHandlerService.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /* GET heroes whose name contains search term */
  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.errorHandlerService.handleError<Hero[]>('HeroesService#searchHeroes', []))
    );
  }
}
