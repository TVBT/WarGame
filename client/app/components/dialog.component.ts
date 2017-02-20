/**
 * Created by thinhth2 on 2/20/2017.
 */

import {Component, OnInit} from '@angular/core';
import {DialogService} from "../services/dialog.service";

@Component({
    selector: 'dialogs',
    template: `
    <div *ngFor="let dialog of dialogs">
        <div [ngSwitch]="dialog.name">   
            <endgame-dlg *ngSwitchCase="'${DialogService.ENDGAME}'" [data]="dialog.data"></endgame-dlg>
        </div>
    </div>
    
  `,
    styles: [
        `
       
        `
    ]
})
export class DialogComponent implements OnInit {

    dialogs = [];

    constructor(private dialogService:DialogService) {
        this.dialogService.onAppend.subscribe((dialog) => this.dialogs.push(dialog));
        this.dialogService.onCloseAll.subscribe(() => this.dialogs = []);
        this.dialogService.onPop.subscribe(() => this.dialogs.pop());
    }

    ngOnInit() {

    }
}