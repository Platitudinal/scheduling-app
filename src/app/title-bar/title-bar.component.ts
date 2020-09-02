import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(private _electronService: ElectronService) {
  }

  ngOnInit(): void {
  }

  isMaximized = false;

  closeFunction() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('close-window');
    }
  }

  maximizeFunction() {
    if (this._electronService.isElectronApp) {
      if (!this.isMaximized) {
        this._electronService.ipcRenderer.send('maximize-window');
        this.isMaximized = true;
      } else {
        this._electronService.ipcRenderer.send('unmaximize-window');
        this.isMaximized = false;
      }
    }
  }

  minimizeFunction() {
    if (this._electronService.isElectronApp) {
      this._electronService.ipcRenderer.send('minimize-window');
    }
  }
}
