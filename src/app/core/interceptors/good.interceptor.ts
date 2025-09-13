import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {of} from 'rxjs'
import goods from './goods.mock.json'

/**интерсептор для имитации серверного API товаров*/
@Injectable()
export class GoodInterceptor implements HttpInterceptor{
	private readonly _goodApiUrl = '/api/v1/goods'

	private _goodId = Math.max(...goods.map(good => good.id))

	intercept(req: HttpRequest<any>, handler: HttpHandler){
		if(req.url === this._goodApiUrl){
			if(req.method === 'GET')
				return of(new HttpResponse({body: goods}))
			if(req.method === 'POST')
				return of(new HttpResponse({body: {...req.body, id: ++this._goodId}}))
		}
		if(req.url.startsWith(this._goodApiUrl + '/')){
			if(req.method === 'PUT')
				return of(new HttpResponse({body: req.body}))
			if(req.method === 'DELETE')
				return of(new HttpResponse({status: 204}))
		}
		return handler.handle(req)
	}
}
