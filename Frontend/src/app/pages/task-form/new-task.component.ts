import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { ProjectService } from '../../core/services/project.service';
import { DeveloperService } from '../../core/services/developer.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  form!: FormGroup;
  projects: any[] = [];
  developers: any[] = [];

  loading = false;
  successMsg = '';
  errorMsg = '';

  readonly todayStr: string = new Date().toISOString().split('T')[0];

  readonly complexityLabels: Record<number, string> = {
    1: 'Very Simple', 2: 'Simple', 3: 'Moderate', 4: 'Complex', 5: 'Very Complex'
  };

  get complexityLabel(): string {
    const v = this.form?.get('estimatedComplexity')?.value;
    return v ? this.complexityLabels[v] : '';
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private developerService: DeveloperService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      projectId: ['', Validators.required],
      assigneeId: ['', Validators.required],
      priority: ['Medium'],
      status: ['ToDo'],
      estimatedComplexity: [3, Validators.required],
      dueDate: ['', Validators.required],
    });

    const projectId = this.route.snapshot.queryParamMap.get('projectId');
    if (projectId) this.form.patchValue({ projectId });

    this.projectService.getAll().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error loading projects:', err)
    });

    this.developerService.getAll().subscribe({
      next: (data) => this.developers = data,
      error: (err) => console.error('Error loading developers:', err)
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  setComplexity(n: number): void {
    this.form.patchValue({ estimatedComplexity: n });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const payload = {
      ...this.form.value,
      projectId: Number(this.form.value.projectId),
      assigneeId: Number(this.form.value.assigneeId),
    };

    this.taskService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Task created successfully!';
        this.form.reset({ priority: 'Medium', status: 'ToDo', estimatedComplexity: 3 });
        setTimeout(() => this.goBack(), 1800);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? err?.error ?? 'Something went wrong. Please try again.';
      }
    });
  }

  goBack(): void {
    const projectId = this.route.snapshot.queryParamMap.get('projectId');
    projectId ? this.router.navigate(['/projects', projectId]) : this.router.navigate(['/dashboard']);
  }
}