import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number) {
        if(value.length < limit) {
            return value
        }
        return value.substr(0, limit ) + '...'
    }
}