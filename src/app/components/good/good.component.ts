import {Component, OnInit} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BehaviorSubject, Observable, shareReplay, throttleTime} from 'rxjs'
import {Store} from '@ngrx/store'
import {GoodFormComponent} from './good-form.component'
import {GoodTableComponent} from './good-table.component'
import {Good} from '../../core/model/good.model'
import {GoodState} from '../../core/reducer/good.reducer'
import * as GoodActions from '../../core/actions/good.actions'

/**компонент управления товарами*/
@Component({
	selector: 'app-good',
	imports: [CommonModule, GoodFormComponent, GoodTableComponent],
	template: `
		<div class="container mt-4">
			<h2>Управление товаром</h2>
			<app-good-form [good]="good$ | async" (goodChange)="handleGoodChange($event)"/>
			@if(error$ | async){
				<div class="alert alert-danger" role="alert">
					<h4 class="alert-heading">Ошибка!</h4>
					<p>{{error$ | async}}</p>
				</div>
			}
			<h3 class="mt-4">Товары
				{{(loading$ | async) ? '(загрузка)' : ''}}
			</h3>
			<app-good-table (editGood)="editGood($event)" (deleteGood)="deleteGood($event)"/>
		</div>
	`
})
export class GoodComponent implements OnInit{
	protected readonly loading$: Observable<boolean>
	protected readonly error$: Observable<string | null>

	private readonly _good$ = new BehaviorSubject<Good | null>(null)
	protected readonly good$ = this._good$.asObservable()

	constructor(private _store: Store<{goods: GoodState}>){
		this.loading$ = this._store.select(state => state.goods.loading).pipe(
			throttleTime(150, undefined, {leading: false, trailing: true}),
			shareReplay(1)
		)
		this.error$ = this._store.select(state => state.goods.error).pipe(
			throttleTime(150, undefined, {leading: false, trailing: true}),
			shareReplay(1)
		)
	}

	ngOnInit(){
		this._store.dispatch(GoodActions.getGoods())
	}

	/**обработка изменения модели формы*/
	protected handleGoodChange(good: Good | null){
		if(good){
			if(this._good$.value)
				this._store.dispatch(GoodActions.updateGood({good}))
			else
				this._store.dispatch(GoodActions.createGood({good}))
		}
		this._good$.next(null)
	}

	protected editGood(good: Good){
		this._good$.next(good)
	}

	protected deleteGood(id: number){
		this._store.dispatch(GoodActions.deleteGood({id}))
		const good = this._good$.value
		if(good && good.id === id)
			this._good$.next(null)
	}
}
