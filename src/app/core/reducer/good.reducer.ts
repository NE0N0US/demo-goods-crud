import {createReducer, on} from '@ngrx/store'
import {Good} from '../model/good.model'
import * as GoodActions from '../actions/good.actions'

/**состояние товаров*/
export interface GoodState{
	loading: boolean,
	goods: Good[]
	error: string | null
}

/**изначальное состояние товаров*/
export const initialState: GoodState = {
	loading: false,
	goods: [],
	error: null
}

/**изменение состояния товаров чистыми функциями*/
export const goodReducer = createReducer(
	initialState,

	on(GoodActions.getGoodsSuccess, (state, {goods}) => ({
		...state, loading: false, error: null,
		goods
	})),

	on(GoodActions.createGoodSuccess, (state, {good}) => ({
		...state, loading: false, error: null,
		goods: [...state.goods, good]
	})),

	on(GoodActions.updateGoodSuccess, (state, {good: newGood}) => ({
		...state, loading: false, error: null,
		goods: state.goods.map(good => good.id === newGood.id ? newGood : good),
	})),

	on(GoodActions.deleteGoodSuccess, (state, {id}) => ({
		...state, loading: false, error: null,
		goods: state.goods.filter(good => good.id !== id),
	})),

	on(
		GoodActions.getGoods, GoodActions.createGood, GoodActions.updateGood, GoodActions.deleteGood,
		state => ({...state, loading: true, error: null})
	),

	on(
		GoodActions.getGoodsFailure, GoodActions.createGoodFailure, GoodActions.updateGoodFailure, GoodActions.deleteGoodFailure,
		(state, {error}) => ({...state, loading: false, error})
	)
)
