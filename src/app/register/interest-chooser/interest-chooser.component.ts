import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ServerService} from '../../server.service';
import {ArrayType} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-interest-chooser',
  templateUrl: './interest-chooser.component.html',
  styleUrls: ['./interest-chooser.component.css']
})
export class InterestChooserComponent implements OnInit {
  @Input() redirectTo: string;
  categoryForm: FormGroup;
  categories = ['culture', 'science', 'politics', 'sport', 'today', 'economy', 'world'];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.initForm();
    if (!this.redirectTo) {
      this.redirectTo = '/';
    }
  }

  initForm() {
    this.categoryForm = new FormGroup(
      {
        culture: new FormControl(false),
        science: new FormControl(false),
        politics: new FormControl(false),
        sport: new FormControl(false),
        today: new FormControl(false),
        economy: new FormControl(false),
        world: new FormControl(false)
      }
    );
  }

  categoriesToArray(): string[] {
    const categoryObj = this.categoryForm.getRawValue();
    const categoryArr = [];
    for (const category of this.categories) {
      if (categoryObj[category]) {
        categoryArr.push(category);
      }
    }
    return categoryArr;
  }

  onSubmit() {
    console.log(this.categoryForm.getRawValue());
    console.log(this.categoriesToArray());
    this.serverService.registerCategories(this.categoriesToArray(), this.redirectTo);
  }

}
