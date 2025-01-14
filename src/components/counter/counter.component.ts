import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  count: number = 0; 
  direction: number = 1;
  intervalId: any = null; 

  startCounter(): void {
    if (this.intervalId !== null) {
      console.warn('Le compteur est déjà en cours !');
      return;
    }

    this.intervalId = setInterval(() => {
      this.count += this.direction;

      if (this.count === 10 || this.count === 0) {
        this.direction *= -1;
      }
    }, 1000); 
  }

  stopCounter(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId); 
      this.intervalId = null; 
    }
  }

  resetCounter(): void {
    this.stopCounter(); 
    this.count = 0; 
    this.direction = 1; 
  }
}


