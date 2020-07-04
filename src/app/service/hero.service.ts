import {Observable} from "rxjs";
import {Hero} from "../model/hero";

// Angular is not Spring:
// unable to register abstact class (even service as provider)
export abstract class HeroService {

  abstract  getHeroes(): Observable<Hero []> ;

  abstract getHeroById(id: number): Observable<Hero>;

  abstract getTopHeroes(): Observable<Hero []>;
}
