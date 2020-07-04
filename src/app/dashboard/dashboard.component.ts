import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HeroesService} from "../service/heroes.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroesService) {
  }

  ngOnInit() {
   /* this.heroService.getTopHeroes()
      .subscribe(heroes => this.heroes = heroes);*/
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 4));
    console.log('Top heroes: ', JSON.stringify(this.heroes));
  }
}
