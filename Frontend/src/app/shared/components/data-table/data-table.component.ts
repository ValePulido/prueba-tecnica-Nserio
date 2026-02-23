import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellDefDirective } from '../cell-def/cell-def';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'date' | 'number';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements AfterContentInit {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() highlightCondition?: (row: any) => boolean;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() pageSize = 5;
  @Output() rowClick = new EventEmitter<any>();

  @ContentChildren(CellDefDirective) cellDefs!: QueryList<CellDefDirective>;

  cellTemplates: Record<string, TemplateRef<any>> = {};

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;

  readonly min = Math.min;

  ngAfterContentInit(): void {
    this.buildTemplateMap();
    this.cellDefs.changes.subscribe(() => this.buildTemplateMap());
  }

  private buildTemplateMap(): void {
    this.cellTemplates = {};
    this.cellDefs.forEach(def => {
      this.cellTemplates[def.columnKey] = def.templateRef;
    });
  }

  get sortedData(): any[] {
    if (!this.sortColumn) return this.data;
    return [...this.data].sort((a, b) => {
      const va = a[this.sortColumn];
      const vb = b[this.sortColumn];
      if (typeof va === 'number' && typeof vb === 'number') {
        return this.sortDirection === 'asc' ? va - vb : vb - va;
      }
      const result = String(va ?? '').toLowerCase().localeCompare(String(vb ?? '').toLowerCase());
      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  goToPage(p: number): void {
    if (p >= 1 && p <= this.totalPages) this.currentPage = p;
  }

  formatCell(value: any, col: TableColumn): string {
    if (value == null) return '—';
    if (col.type === 'date') {
      const d = new Date(value);
      return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return String(value);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  isHighlighted(row: any): boolean {
    return this.highlightCondition ? this.highlightCondition(row) : false;
  }
}