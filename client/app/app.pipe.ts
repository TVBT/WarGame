import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'clock'})
class ClockPipe implements PipeTransform {
    transform(seconds: number): string {
        var second:any = seconds % 60;
        var minute:any = seconds / 60 | 0;
        second = second < 10 ? "0" + second : ""+second;
        minute = minute < 10 ? "0" + minute : ""+minute;
        return minute + ":" + second;
    }
}

export {
    ClockPipe
}