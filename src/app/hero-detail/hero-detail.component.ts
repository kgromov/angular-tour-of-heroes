import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../model/hero";
import {HeroesStubService} from "../service/heroes-stub.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private heroesService: HeroesStubService) {
  }

  ngOnInit(): void {
    // The route.snapshot is a static image of the route information
    // shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL.
    // const id = +this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((params: Params) =>
      this.heroesService.getHeroById(+params.id)
        .subscribe(data => this.hero = data))
  }

  goBack() {
    this.location.back();
  }
}
