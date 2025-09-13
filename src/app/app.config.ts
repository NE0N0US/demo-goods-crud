import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http'
import {provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {routes} from './app.routes'
import {GoodInterceptor} from './core/interceptors/good.interceptor'
import {goodReducer} from './core/reducer/good.reducer'
import {GoodEffects} from './core/effects/good.effects'

/**конфигурация приложения*/
export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({eventCoalescing: true}),
		provideRouter(routes),
		provideHttpClient(withInterceptorsFromDi()),
		{provide: HTTP_INTERCEPTORS, useClass: GoodInterceptor, multi: true},
		provideStore({goods: goodReducer}),
		provideEffects([GoodEffects])
	]
}
