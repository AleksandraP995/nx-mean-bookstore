import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}

}



//ViewContainerRef nam da je acces za mesto gde je ova direktiva plejsovana i onda mzoemo da dodajemo elemente
// i onda stavimo ovu direktivu negde u templejt
// i preko viewChild dobijemo pristup - ali ne radi bas