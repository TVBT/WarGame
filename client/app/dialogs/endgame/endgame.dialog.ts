/**
 * Created by thinhth2 on 2/20/2017.
 */

import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input} from '@angular/core';
import {CommandService} from "../../services/command.service";
import {StateService} from "../../services/state.service";
import {DialogService} from "../../services/dialog.service";
import {UserService} from "../../services/user.service";
import {KeyExchange} from "../../../../share/keyexchange";

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
        this.commandService.onMessage.subscribe((msg) => {
            switch (msg.command) {
                case KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM:
                    var status = msg.data[KeyExchange.KEY_DATA.STATUS];
                    if (status) {
                        var user = this.userService.myUser();
                        user.roomId = msg.data[KeyExchange.KEY_DATA.ROOM_ID];
                        user.playerInfo = msg.data[KeyExchange.KEY_DATA.PLAYER_INFO];
                        this.stateService.showLobby();
                    } else {
                        this.stateService.showLogin();
                    }
                    break;
            }
        });
    }

    ngOnInit() {
        var teamWin = this.data[KeyExchange.KEY_DATA.TEAM_ID_WIN];
        var myTeam = this.userService.getMyTeamId();
        this.isVictory = myTeam == teamWin;
    }

    ngAfterViewInit() {
        window.$(this.dialog.nativeElement).modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    onExit() {
        this.dialogService.pop();
        this.stateService.showLogin();
    }

    onContinue() {
        this.dialogService.pop();
        this.commandService.autoJoinRoom(this.userService.getMyName());
    }
}