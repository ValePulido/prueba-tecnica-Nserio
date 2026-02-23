import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {

  pageTitle = 'Dashboard Overview';
  searchQuery = '';
  isDarkMode = false;

  private readonly titleMap: Record<string, string> = {
    '/dashboard': 'Dashboard Overview',
    '/projects': 'Project Tasks',
    '/new-task': 'Create New Task',
    '/team': 'Team',
    '/settings': 'Settings',
  };

  constructor(private router: Router) { }

  ngOnInit(): void {

    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }

    this.updateTitle(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.updateTitle(e.urlAfterRedirects));
  }

  private updateTitle(url: string): void {
    const match = Object.keys(this.titleMap).find(k => url.startsWith(k));
    this.pageTitle = match ? this.titleMap[match] : 'Dashboard Overview';
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  goToNewTask(): void {
    this.router.navigate(['/new-task']);
  }
}