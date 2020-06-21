import { Component, OnInit } from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // hero: Hero  = {name :'Windstorm'};
  heroes: Hero[];
  selectedHero: Hero;

  constructor() {
    this.heroes = HEROES;
  }

  ngOnInit(): void {
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
