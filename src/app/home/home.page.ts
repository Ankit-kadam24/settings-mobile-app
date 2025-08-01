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
  capturedImage: string | null = null;
  contacts: any[] = [];
  showContacts: boolean = false;
  isRecording: boolean = false;
  currentRecording: any = null;
  currentRecordingFile: any | null = null;
  recordings: string[] = [];

  constructor(private commonService: CommonService) {}

  async ngOnInit() {
    this.deviceInfo = await this.commonService.printDeviceInfo();
    this.commonService.requestAllPermissions();
  }

  copyToClipboard(value: any) {
    navigator.clipboard.writeText(String(value));
  }

  async onOpenCamera() {
    const status = await this.commonService.androidPermissions.checkPermission(
      this.commonService.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    );
    if (!status.hasPermission) {
      await this.commonService.androidPermissions.requestPermission(
        this.commonService.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      );
    }
    this.capturedImage = await this.commonService.openCamera();
  }

  async onRecordAudio() {
    if (!this.isRecording) {
      // Start recording
      this.isRecording = true;
      this.currentRecording = await this.commonService.recordAudio();
      // this.currentRecordingFile = this.currentRecording?.src || null; // store file path if available
    } else {
      // Stop recording
      this.isRecording = false;
      if (this.currentRecording) {
        this.currentRecording.stopRecord();
        // Store the file path in the recordings list
        if (this.currentRecording.getSrc) {
          this.recordings.push(this.currentRecording.getSrc());
        } else if (this.currentRecording.src) {
          this.recordings.push(this.currentRecording.src);
        }
        this.currentRecording = null;
      }
    }
  }
  playRecording(filePath: string) {
    this.commonService.playAudio(filePath);
  }
  async onGetContacts() {
    if (!this.showContacts) {
      this.contacts = await this.commonService.getContacts();
    }
    this.showContacts = !this.showContacts;
  }

  PermissionsClick() {
    this.commonService.checkManageExternalStorage();
  }
}
