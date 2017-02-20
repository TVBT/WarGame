/**
 * Created by thinhth2 on 2/20/2017.
 */

import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {StateService} from "../../services/state.service";
import {DialogService} from "../../services/dialog.service";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'endgame-dlg',
    template: `
        <!-- Modal -->
        <div #dialog class="modal fade" role="dialog">
          <div class="modal-dialog">
        
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-body">
                <p *ngIf="!isVictory">Defeat</p>
                <p *ngIf="isVictory">Victory</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" (click)="onExit()">Thoát</button>
                <button type="button" class="btn btn-default" data-dismiss="modal" (click)="onContinue()">Chơi tiếp</button>
              </div>
            </div>
        
          </div>
        </div>
  `,
    styles: [
        `
        .modal-body {
            text-align: center;
            padding: 40px 20px;
            font-size: 30px;
        }
        `
    ]
})
export class EndGameDialog implements OnInit, AfterViewInit {

    @Input()
    data;

    isVictory = true;

    @ViewChild('dialog')
    dialog:ElementRef;

    constructor(private commandService:CommandService,
                private stateService:StateService,
                private dialogService:DialogService,
                private userService:UserService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        window.$(this.dialog.nativeElement).modal();
    }

    onExit() {
        this.dialogService.pop();
        this.stateService.showLogin();
    }

    onContinue() {
        this.dialogService.pop();
        this.stateService.showLogin();
        this.commandService.autoJoinRoom(this.userService.getMyName());
    }
}