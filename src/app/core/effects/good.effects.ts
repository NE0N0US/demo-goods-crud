import {Injectable} from '@angular/core'
import {catchError, map, mergeMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import * as GoodActions from '../actions/good.actions'
import {GoodService} from '../services/good.service'

/**изменение состояния товаров побочными эффектами*/
@Injectable()
export class GoodEffects{
	constructor(private _actions$: Actions, private _goodService: GoodService){}

	readonly getGoods$ = createEffect(() => this._actions$.pipe(
		ofType(GoodActions.getGoods),
		mergeMap(() => this._goodService.getGoods().pipe(
			map(goods => GoodActions.getGoodsSuccess({goods})),
			catchError(error => of(GoodActions.getGoodsFailure({error: error.message})))
		))
	))

	readonly createGood$ = createEffect(() => this._actions$.pipe(
		ofType(GoodActions.createGood),
		mergeMap(({good}) => this._goodService.createGood(good).pipe(
			map(good => GoodActions.createGoodSuccess({good})),
			catchError(error => of(GoodActions.createGoodFailure({error: error.message})))
		))
	))

	readonly updateGood$ = createEffect(() => this._actions$.pipe(
		ofType(GoodActions.updateGood),
		mergeMap(({good}) => this._goodService.updateGood(good).pipe(
			map(good => GoodActions.updateGoodSuccess({good})),
			catchError(error => of(GoodActions.updateGoodFailure({error: error.message})))
		))
	))

	readonly deleteGood$ = createEffect(() => this._actions$.pipe(
		ofType(GoodActions.deleteGood),
		mergeMap(({id}) => this._goodService.deleteGood(id).pipe(
			map(() => GoodActions.deleteGoodSuccess({id})),
			catchError(error => of(GoodActions.deleteGoodFailure({error: error.message})))
		))
	))
}
