import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Good} from '../model/good.model'

/**сервис CRUD над товарами*/
@Injectable({providedIn: 'root'})
export class GoodService{
	private readonly _apiUrl = '/api/v1/goods'

	constructor(private _httpClient: HttpClient){}

	getGoods(){
		return this._httpClient.get<Good[]>(this._apiUrl)
	}

	createGood(good: Good){
		return this._httpClient.post<Good>(this._apiUrl, good)
	}

	updateGood(good: Good){
		return this._httpClient.put<Good>(`${this._apiUrl}/${good.id}`, good)
	}

	deleteGood(id: number){
		return this._httpClient.delete<void>(`${this._apiUrl}/${id}`)
	}
}
