import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReverseArrPipe implements PipeTransform {

  transform(arr): any {
    var copy = arr.slice();
    return copy.reverse();
  }

}
