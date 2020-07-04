import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HeroesService} from "../service/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
  // providers: [HeroesServiceStubService]
})
export class HeroesComponent implements OnInit {
  // hero: Hero  = {name :'Windstorm'};
  heroes: Hero[];

  constructor(private  heroService: HeroesService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      // .pipe(delay(2000))
      .subscribe(data => this.heroes = data);
  }

  add(name: string) {
    name = name.trim();
    if (!name) { return; }
    let hero = {name};
    this.heroService.addHero(hero).subscribe(
      hero => this.heroes.push(hero)
    );
  }

  delete(id: number) {
    this.heroes = this.heroes.filter(h => h.id !== id);
    this.heroService.deleteHero(id).subscribe()
  }
}
