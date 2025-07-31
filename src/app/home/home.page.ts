import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  deviceInfo: any = {};

  constructor(private commonService: CommonService) {}

  async ngOnInit() {
    this.deviceInfo = await this.commonService.printDeviceInfo();
    this.commonService.requestAllPermissions();
  }

  copyToClipboard(value: any) {
    navigator.clipboard.writeText(String(value));
  }
}
