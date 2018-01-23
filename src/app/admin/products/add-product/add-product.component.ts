import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../../../shared/services/products.service";
import { Product } from "../../../shared/models/product.model";
import { CategoriesService } from "../../../shared/services/categories.service";
import { Category } from "../../../shared/models/category.model";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

    @Input() products: Product[] = [];
    @ViewChild('fileInput') fileInput: ElementRef;

    categories: Category[] = [];
    apForm: FormGroup;
    s1: Subscription;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {

        this.s1 = this.categoriesService.getCategories()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
            });
    }

    createForm() {
        this.apForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: ['', [Validators.required]],
            category_id: ['', [Validators.required]],
            image: null
        });
    }

    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.apForm.get('image').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
        }
    }

    addProductSubmit() {
        const body = this.apForm.value;
        let {filename, filetype, value} = this.apForm.value.image;
        this.productsService.addProduct(body)
            .subscribe((product: Product) => {
                this.categories.forEach((cat) => {
                    if (cat.id == body.category_id) {
                        body['catName'] = cat.name;
                    }
                });

                body['id'] = product.id;
                this.apForm.reset();
                this.clearFile();
                // console.log(body);
                this.products.push(body);
            });
    }

    clearFile() {
        this.apForm.get('image').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

    ngOnDestroy() {
        if (this.s1) this.s1.unsubscribe();
    }

}
