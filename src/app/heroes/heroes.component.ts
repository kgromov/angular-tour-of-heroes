import {Component, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HEROES} from "../model/mock-heroes";
import {HeroesStubService} from "../service/heroes-stub.service";
import {delay} from "rxjs/operators";
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
  // providers: [HeroesServiceStubService]
})
export class HeroesComponent implements OnInit {
  // hero: Hero  = {name :'Windstorm'};
  heroes: Hero[];

  constructor(private  heroService: HeroesStubService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      // .pipe(delay(2000))
      .subscribe(data => this.heroes = data);
  }
}
