import {Component, output} from '@angular/core'
import {CommonModule} from '@angular/common'
import {Observable, shareReplay, throttleTime} from 'rxjs'
import {Store} from '@ngrx/store'
import {NbspPipe} from '../../core/pipes/nbsp.pipe'
import {Good} from '../../core/model/good.model'
import {GoodState} from '../../core/reducer/good.reducer'

/**таблица товаров с внешними редактированием и удалением*/
@Component({
	selector: 'app-good-table',
	imports: [CommonModule, NbspPipe],
	template: `
		<div class="table-responsive">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Производитель</th>
						<th>Название</th>
						<th>Масса</th>
						<th>Годен до</th>
						<th>Цена</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					@for(good of (goods$ | async); track good.id){
						<tr>
							<td>{{good.manufacturer}}</td>
							<td>{{good.name}}</td>
							<td class="nbsp">{{good.weight | nbsp}}</td>
							<td>{{good.expiration}}</td>
							<td class="nbsp">{{good.price | nbsp}}</td>
							<td>
								<div class="d-flex flex-wrap action-buttons">
									<button class="btn btn-primary" [disabled]="loading$ | async" (click)="editGood.emit(good)">
										Редактировать
									</button>
									<button class="btn btn-danger" [disabled]="loading$ | async" (click)="deleteGood.emit(good.id)">
										Удалить
									</button>
								</div>
							</td>
						</tr>
					}
				</tbody>
			</table>
		</div>
	`,
	styles: `
		.action-buttons{
			gap: 10px;
			&>button{
				flex-grow: 1;
			}
		}
	`
})
export class GoodTableComponent{
	protected readonly loading$: Observable<boolean>
	protected readonly goods$: Observable<Good[]>

	constructor(private _store: Store<{goods: GoodState}>){
		this.loading$ = this._store.select(state => state.goods.loading).pipe(
			throttleTime(150, undefined, {leading: false, trailing: true}),
			shareReplay(1)
		)
		this.goods$ = this._store.select(state => state.goods.goods)
	}

	readonly editGood = output<Good>()
	readonly deleteGood = output<number>()
}
