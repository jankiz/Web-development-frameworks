import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../tasks.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule,
     MatCheckboxModule,
     MatChipsModule,
     MatIconModule,
     MatButtonModule,
     MatTableModule
    ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() complete = new EventEmitter<Task>();

  toggleComplete(): void {
    this.complete.emit(this.task);
  }
}