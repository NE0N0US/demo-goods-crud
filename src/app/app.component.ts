import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'

/**коренной компонент*/
@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	template: '<router-outlet/>'
})
export class AppComponent{}
