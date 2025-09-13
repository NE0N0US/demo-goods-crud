import {createAction, props} from '@ngrx/store'
import {Good} from '../model/good.model'

export const getGoods = createAction('[Good] Get Goods')
export const getGoodsSuccess = createAction('[Good API] Get Goods Success', props<{goods: Good[]}>())
export const getGoodsFailure = createAction('[Good API] Get Goods Failure', props<{error: string}>())

export const createGood = createAction('[Good] Create Good', props<{good: Good}>())
export const createGoodSuccess = createAction('[Good API] Create Good Success', props<{good: Good}>())
export const createGoodFailure = createAction('[Good API] Create Good Failure', props<{error: string}>())

export const updateGood = createAction('[Good] Update Good', props<{good: Good}>())
export const updateGoodSuccess = createAction('[Good API] Update Good Success', props<{good: Good}>())
export const updateGoodFailure = createAction('[Good API] Update Good Failure', props<{error: string}>())

export const deleteGood = createAction('[Good] Delete Good', props<{id: number}>())
export const deleteGoodSuccess = createAction('[Good API] Delete Good Success', props<{id: number}>())
export const deleteGoodFailure = createAction('[Good API] Delete Good Failure', props<{error: string}>())
