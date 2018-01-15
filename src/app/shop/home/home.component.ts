import { Component, OnInit } from '@angular/core';
import { HomeService } from "./home.service";
import { Home } from "./home.model";
import { Http } from "@angular/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    body: string;
    banner: string;

    constructor(private homeService: HomeService,
    private http: Http
    ) { }

    ngOnInit() {
        this.homeService.getConfigs()
            .subscribe((config: Home) => {
                this.body = config[0].body;
                this.banner = config[0].banner;
            });
    }

}
