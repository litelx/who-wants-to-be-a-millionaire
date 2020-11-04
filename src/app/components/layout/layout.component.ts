import { Component, OnInit } from '@angular/core';
import timerTime from '../../../data/time';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    timer: number = timerTime;
    color: string = 'primary';
    value: number = (this.timer / timerTime) * 100;
    constructor() { }

    ngOnInit() {
        this.startTimer();
    }

    public initTime() {
        this.timer = timerTime;
    }

    public decreaseTime() {
        if (this.timer < 1) return;
        this.timer--;
        this.value = (this.timer / timerTime) * 100;
        if (this.timer < 6) {
            this.color = 'warn';
        };
    }
    
    private startTimer() {
        setTimeout(() => {
            this.decreaseTime();
            if (this.timer < 1) return;
            this.startTimer();
        }, 1000);
    }
}
