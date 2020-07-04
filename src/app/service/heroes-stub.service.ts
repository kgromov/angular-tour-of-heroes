import {Injectable} from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable()
export class HeroesStubService {
  private topHeroIDs: Map<number, number>;

  constructor(private messageService: MessageService) {
    this.topHeroIDs = new Map<number, number>();
  }

  public getHeroesSync(): Hero [] {
    return HEROES;
  }

  public getHeroes(): Observable<Hero []> {
    return of(HEROES);
  }

  public getHeroById(id: number): Observable<Hero> {
    this.populateIDs(id);
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  public getHeroByName(name: string): Observable<Hero> {
    return of(HEROES.find(hero => hero.name === name));
  }

  public getHeroByNameLike(name: string): Observable<Hero> {
    return of(HEROES.find(
      hero => hero.name.toLowerCase().includes(name.toLowerCase())));
  }

  public getTopHeroes(): Observable<Hero []> {
    let visitedHeroes: number = this.topHeroIDs.size;
    if (visitedHeroes === 0) {
      return of(HEROES.slice(0, 4));
    }
    let counter = 0;
    console.log('Before sort: ', this.topHeroIDs);
    const sortedByTop: Map<any, any> = this.sortMapByValue(this.topHeroIDs);
    console.log('After sort: ', sortedByTop);
    let topHeroes: Hero[] = [];
    for (const id of sortedByTop.keys()) {
      if (counter > 4) {
        break;
      }
      topHeroes.push(HEROES.find(hero => hero.id === id));
      ++counter;
    }
    for (let i = 0; visitedHeroes !== 4; i++) {
      let hero: Hero = HEROES[i];
      if (!topHeroes.includes(hero)) {
        topHeroes.push(hero);
        ++visitedHeroes;
      }
    }
    return of(topHeroes);
  }

  private populateIDs(id: number) {
    let value: number = this.topHeroIDs.get(id);
    if (value === undefined) {
      this.topHeroIDs.set(id, 1);
    } else {
      this.topHeroIDs.set(id, ++value);
    }
  }

  private sortMapByValue(map: Map<any, any>): Map<any, any> {
    let tupleArray = [];
    for (const [key, value] of map.entries()) {
      tupleArray.push([key, value]);
    }
    tupleArray.sort(function (a, b) {
      return b[1] - a[1]
    });
    var sortedMap = new Map<any, any>();
    for (let el of tupleArray) {
      sortedMap.set(el[0], el[1]);
    }
    return sortedMap;
  }
}
