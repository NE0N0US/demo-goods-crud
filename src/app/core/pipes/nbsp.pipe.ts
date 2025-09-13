import {Pipe, PipeTransform} from '@angular/core'

/**замена пробелов неразрывными*/
@Pipe({name: 'nbsp'})
export class NbspPipe implements PipeTransform{
	/**замена пробелов неразрывными*/
	transform(value: unknown){
		return value?.toString().replaceAll(' ', '\u00A0') ?? ''
	}
}
