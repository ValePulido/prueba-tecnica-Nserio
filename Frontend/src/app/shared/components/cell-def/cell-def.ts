import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCellDef]',
  standalone: true
})
export class CellDefDirective {
  @Input('appCellDef') columnKey = '';
  constructor(public templateRef: TemplateRef<any>) { }
}