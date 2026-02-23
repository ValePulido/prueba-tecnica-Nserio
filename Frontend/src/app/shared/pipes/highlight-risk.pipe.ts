import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightRisk',
  standalone: true
})
export class HighlightRiskPipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 1) return '⚠️ High Risk';
    return '✅ Low Risk';
  }
}