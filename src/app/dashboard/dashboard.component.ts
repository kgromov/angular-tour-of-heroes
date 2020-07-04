import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HeroesStubService} from "../service/heroes-stub.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroesStubService) {
  }

  ngOnInit() {
    this.heroService.getTopHeroes()
      .subscribe(heroes => this.heroes = heroes);
    console.log('Top heroes: ', JSON.stringify(this.heroes));
  }
}
