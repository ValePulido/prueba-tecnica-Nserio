import {
    Component, Input, OnChanges, SimpleChanges,
    ElementRef, ViewChild, AfterViewInit, OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';

@Component({
    selector: 'app-task-status-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task-status-chart.component.html',
    styleUrl: './task-status-chart.component.scss'
})
export class TaskStatusChartComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() tasks: Task[] = [];
    @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    private chart: any = null;
    private chartJsLoaded = false;

    ngAfterViewInit(): void {
        this.loadChartJs().then(() => {
            this.chartJsLoaded = true;
            this.renderChart();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tasks'] && !changes['tasks'].firstChange && this.chartJsLoaded) {
            this.renderChart();
        }
    }

    ngOnDestroy(): void {
        this.chart?.destroy();
    }

    private loadChartJs(): Promise<void> {
        return new Promise((resolve) => {
            if ((window as any).Chart) { resolve(); return; }
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
            script.onload = () => resolve();
            document.head.appendChild(script);
        });
    }

    private getStatusCounts(): { label: string; count: number; bg: string; border: string }[] {
        return [
            { label: 'To Do', count: this.tasks.filter(t => t.status === 'ToDo').length, bg: '#e0e7ff', border: '#6366f1' },
            { label: 'In Progress', count: this.tasks.filter(t => t.status === 'InProgress').length, bg: '#dbeafe', border: '#3b82f6' },
            { label: 'Blocked', count: this.tasks.filter(t => t.status === 'Blocked').length, bg: '#fee2e2', border: '#ef4444' },
            { label: 'Completed', count: this.tasks.filter(t => t.status === 'Completed').length, bg: '#dcfce7', border: '#22c55e' },
        ];
    }

    get statusSummary() {
        return this.getStatusCounts();
    }

    private renderChart(): void {
        const canvas = this.canvasRef?.nativeElement;
        if (!canvas || !(window as any).Chart) return;

        this.chart?.destroy();

        const statuses = this.getStatusCounts();
        const ChartJs = (window as any).Chart;

        this.chart = new ChartJs(canvas, {
            type: 'doughnut',
            data: {
                labels: statuses.map(s => s.label),
                datasets: [{
                    data: statuses.map(s => s.count),
                    backgroundColor: statuses.map(s => s.bg),
                    borderColor: statuses.map(s => s.border),
                    borderWidth: 2,
                    hoverOffset: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx: any) => {
                                const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                const pct = total ? Math.round((ctx.parsed / total) * 100) : 0;
                                return ` ${ctx.label}: ${ctx.parsed} tasks (${pct}%)`;
                            }
                        }
                    }
                },
                cutout: '65%',
            }
        });
    }
}