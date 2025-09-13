import {Component, effect, model} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable, shareReplay, throttleTime} from 'rxjs'
import {Store} from '@ngrx/store'
import {Good} from '../../core/model/good.model'
import {GoodState} from '../../core/reducer/good.reducer'

/**форма создания или редактирования товара*/
@Component({
	selector: 'app-good-form',
	imports: [CommonModule, ReactiveFormsModule],
	template: `
		<form [formGroup]="form" (ngSubmit)="submit()" (reset)="good.set(null)">
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="good-form-manufacturer">Производитель *</label>
					<input class="form-control" id="good-form-manufacturer" formControlName="manufacturer" placeholder="Производитель">
				</div>
				<div class="form-group col-md-6">
					<label for="good-form-name">Название *</label>
					<input class="form-control" id="good-form-name" formControlName="name" placeholder="Название">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-4">
					<label for="good-form-weight">Масса</label>
					<input class="form-control" id="good-form-weight" formControlName="weight" placeholder="Масса">
				</div>
				<div class="form-group col-md-4">
					<label for="good-form-expiration">Годен до</label>
					<input class="form-control" id="good-form-expiration" formControlName="expiration" placeholder="Годен до">
				</div>
				<div class="form-group col-md-4">
					<label for="good-form-price">Цена</label>
					<input class="form-control" id="good-form-price" formControlName="price" placeholder="Цена">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-4">
					<button type="submit" class="w-100 btn btn-primary" [disabled]="!form.valid || (loading$ | async)">
						{{good() ? 'Сохранить' : 'Добавить'}}
					</button>
				</div>
				@if(good()){
					<div class="form-group col-md-4">
						<button type="reset" class="w-100 btn btn-danger">Отмена</button>
					</div>
				}
			</div>
		</form>
	`,
	styles: `
		form.ng-touched input.ng-invalid{
			border-color: red;
		}
	`
})
export class GoodFormComponent{
	protected readonly form: FormGroup

	/**модель товара*/
	readonly good = model.required<Good | null>()

	protected readonly loading$: Observable<boolean>

	constructor(private _formBuilder: FormBuilder, private _store: Store<{goods: GoodState}>){
		this.form = this._formBuilder.group({
			id: [''],
			manufacturer: ['', {
				validators: [Validators.required, Validators.maxLength(255)]
			}],
			name: ['', {
				validators: [Validators.required, Validators.maxLength(255)]
			}],
			weight: ['', Validators.maxLength(31)],
			expiration: ['', Validators.maxLength(31)],
			price: ['', Validators.maxLength(31)]
		})

		effect(() => {
			const good = this.good()
			if(good === null)
				this.form.reset()
			else
				this.form.setValue(good)
		})

		this.loading$ = this._store.select(state => state.goods.loading).pipe(
			throttleTime(150, undefined, {leading: false, trailing: true}),
			shareReplay(1)
		)
	}

	/**обновить и сбросить модель, если форма валидна*/
	protected submit(){
		if(this.form.valid){
			this.good.set(this.form.value)
			this.good.set(null)
		}
	}
}
