import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;

  today: Date = new Date();

  days = [
    { name: 'Lundi', date: this.getDateByDayOffset(0), tasksToDo: ['Task 1'], tasksDone: [], newTask: '' },
    { name: 'Mardi', date: this.getDateByDayOffset(1), tasksToDo: ['Task 2'], tasksDone: [], newTask: '' },
    { name: 'Mercredi', date: this.getDateByDayOffset(2), tasksToDo: ['Task 3'], tasksDone: [], newTask: '' },
    { name: 'Jeudi', date: this.getDateByDayOffset(3), tasksToDo: ['Task 4'], tasksDone: [], newTask: '' },
    { name: 'Vendredi', date: this.getDateByDayOffset(4), tasksToDo: ['Task 5'], tasksDone: [], newTask: '' },
    { name: 'Samedi', date: this.getDateByDayOffset(5), tasksToDo: ['Task 6'], tasksDone: [], newTask: '' },
    { name: 'Dimanche', date: this.getDateByDayOffset(6), tasksToDo: ['Task 7'], tasksDone: [], newTask: '' }
  ];
  
  event!: CdkDragDrop<string[], string[], any>;

  ngAfterViewInit() {
    setTimeout(() => this.scrollCalendar(-10), 0); 
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  toggleTaskStatus(day: any, task: string, isDone: boolean) {
    if (isDone) {
      const index = day.tasksDone.indexOf(task);
      if (index !== -1) {
        day.tasksDone.splice(index, 1);
        day.tasksToDo.push(task);
      }
    } else {
      const index = day.tasksToDo.indexOf(task);
      if (index !== -1) {
        day.tasksToDo.splice(index, 1);
        day.tasksDone.push(task);
      }
    }
  }

  scrollCalendar(offset: number) {
    if (this.calendarContainer?.nativeElement) {
      const container = this.calendarContainer.nativeElement;
      container.scrollTop += offset; 
    }
  }

  addTask(day: any) {
    if (day.newTask && day.newTask.trim()) {
      day.tasksToDo.push(day.newTask.trim()); 
      day.newTask = ''; 
    }
  }  

  getDateByDayOffset(offset: number): Date {
    const today = new Date();
    const newDate = new Date(today.setDate(today.getDate() - today.getDay() + 1 + offset));
    return newDate;
  }
}




