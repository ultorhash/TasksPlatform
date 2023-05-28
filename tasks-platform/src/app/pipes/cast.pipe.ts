import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cast'
})
export class CastPipe implements PipeTransform {
  transform<T>(input: unknown, item: T | undefined): T {
    return (input as unknown) as T;
  }
}
