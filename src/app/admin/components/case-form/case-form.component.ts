import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable} from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CityService } from './../../../services/city/city.service';
import { City } from './../../../models/city.model';
import { MyValidators } from './../../../utils/validators';
import { CaseRegister } from 'src/app/models/case-register.model';
import { Format } from './../../../utils/formaters';
import { CaseService } from './../../../services/case/case.service';
@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})
export class CaseFormComponent implements OnInit {
  options: City[] = new CityService().getCities();
  registerMessage = false;
  filteredOptions: Observable<City[]>;

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private caseService: CaseService
  ) {
    this.options = cityService.getCities();
    this.buildForm();
  }

  ngOnInit() {
    this.filteredOptions = this.form.get('city').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.city),
      map(city => city ? this._filter(city) : this.options.slice())
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      age: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required, MyValidators.isDateValid]],
      genre: ['', [Validators.required]],
      city: ['', [Validators.required, MyValidators.isCityValid]],
      district: ['', []],
      zone: ['', []],
      origin: ['', [Validators.required]]
    });
  }

  displayFn(city?: City): string | undefined {
    return city ? city.city : undefined;
  }
  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value);
      const day = this.form.value.date.getDate();
      console.log(day);
      const month = this.form.value.date.getMonth();
      console.log(month);
      const year = this.form.value.date.getFullYear();
      console.log(year);
      const data: CaseRegister = {
        age: this.form.value.age,
        // tslint:disable-next-line: max-line-length
        updateDate: Format.formatDate(this.form.value.date.getDate(), this.form.value.date.getMonth() + 1, this.form.value.date.getFullYear()),
        district: this.form.value.district,
        zone: this.form.value.zone.toString(),
        ganderId: Number(this.form.value.genre),
        medCondId: 1,
        municipallyId: this.cityService.getIdCity(this.form.value.city),
        oriContgId: Number(this.form.value.origin)
      };
      console.log(data);
      this.caseService.registerCase(data).subscribe(
        () => {
          alert('Registro Exitoso');
          this.form.reset();
        },
        (error) => {
          console.log(error.status);
        }
      );
    }
  }

}
