import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../shared/services/home.service";
import { Home } from "../../shared/models/home.model";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    body: string;
    updated_at: any;

    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
        this.homeService.getConfigs()
            .subscribe((config: Home) => {
                this.body = config[0].body;
                this.updated_at = config[0].updated_at;
            });

    }


}
