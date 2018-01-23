import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ApiService } from "../../shared/services/api.service";
import { Home } from "../../shared/models/home.model";
import { HomeService } from "../../shared/services/home.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    form: FormGroup;

    body: string;
    updated_at: string;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private api: ApiService,
                private homeService: HomeService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.homeService.getConfigs()
            .subscribe((config: Home) => {
                this.body = config[0].body;
            });

    }

    createForm() {
        this.form = this.fb.group({
            body: [this.body, [Validators.required]],
            image: null
        });
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.form.get('image').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                })
            };
        }
    }

    onSubmit() {
        const body = this.form.value;
        let {filename, filetype, value} = this.form.value.image;
        this.homeService.updateConfigs(body)
            .subscribe(res => {
                console.log(res);
                this.updated_at = res.updated_at.data;
            });
    }

    clearFile() {
        this.form.get('image').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
}
