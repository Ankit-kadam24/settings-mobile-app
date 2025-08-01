import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Media } from '@awesome-cordova-plugins/media/ngx';
import { Contacts } from '@capacitor-community/contacts';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    public androidPermissions: AndroidPermissions,
    private media: Media
  ) {}

  async printDeviceInfo(): Promise<any> {
    try {
      const info = await Device.getInfo();

      // Get or generate UUID
      const storedUUID = await Preferences.get({ key: 'device_uuid' });
      let uuid = storedUUID.value;
      if (!uuid) {
        uuid = crypto.randomUUID();
        await Preferences.set({ key: 'device_uuid', value: uuid });
      }

      // Logging (keep existing logs)
      console.log('--- Device Information ---');
      console.log('All Info:', info);
      console.log('Model:', info.model);
      console.log('Platform:', info.platform);
      console.log('Operating System:', info.operatingSystem);
      console.log('OS Version:', info.osVersion);
      console.log('Manufacturer:', info.manufacturer);
      console.log('Is Virtual:', info.isVirtual);
      console.log('Memory Used (bytes):', info.memUsed);
      // console.log('Disk Free (bytes):', info.diskFree);
      // console.log('Disk Total (bytes):', info.diskTotal);
      console.log('WebView Version:', info.webViewVersion || 'N/A');
      console.log('Generated UUID:', uuid);
      console.log('--------------------------');

      // Return info for UI
      return {
        ...info,
        uuid,
      };
    } catch (error) {
      console.error('Error fetching device info:', error);
      return {};
    }
  }


  // 🚨 Function to check and request multiple Android permissions at runtime
  // ✅ Uses AndroidPermissions Cordova plugin to handle all types of permissions
  // 📌 It goes one-by-one and opens system popup only for permissions that are not already granted

async requestAllPermissions() {
  // List of permissions we want to check/request
  // These include camera, audio, contacts, calendar, location, phone state, SMS, storage, etc.
  const permissions = [
    this.androidPermissions.PERMISSION.CAMERA,                    // For accessing device camera
    this.androidPermissions.PERMISSION.RECORD_AUDIO,             // For recording audio via mic
    this.androidPermissions.PERMISSION.READ_CONTACTS,            // To read saved contacts
    this.androidPermissions.PERMISSION.WRITE_CONTACTS,           // To write/update contacts
    this.androidPermissions.PERMISSION.READ_CALENDAR,            // To read calendar events
    this.androidPermissions.PERMISSION.WRITE_CALENDAR,           // To add/update calendar events
    this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,     // High-accuracy GPS location
    this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,   // Approximate location (e.g., via Wi-Fi or cell tower)
    this.androidPermissions.PERMISSION.READ_PHONE_STATE,         // For reading phone status and identity (e.g., IMEI)
    this.androidPermissions.PERMISSION.SEND_SMS,                 // To send SMS from the device
    this.androidPermissions.PERMISSION.READ_SMS,                 // To read incoming SMS
    this.androidPermissions.PERMISSION.RECEIVE_SMS,              // To detect when SMS is received
    this.androidPermissions.PERMISSION.READ_CALL_LOG,            // To read call history
    this.androidPermissions.PERMISSION.WRITE_CALL_LOG,           // To modify call history
    this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE,  // Full access to external storage (Android 11+)
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,    // Read files from storage (deprecated in Android 13+)
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE    // Write files to storage (deprecated in Android 11+)
  ];

  // Loop through each permission and check if already granted
  for (const perm of permissions) {
    const status = await this.androidPermissions.checkPermission(perm);

    // If not granted, request the permission (system popup will appear)
    if (!status.hasPermission) {
      const result = await this.androidPermissions.requestPermission(perm);
      console.log(`📛 Requested ${perm} → Result:`, result);
    } else {
      // Already granted, skip
      console.log(`✅ ${perm} → Already granted`);
    }
  }
}

  async openCamera(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      return image.dataUrl ?? null;
    } catch (e) {
      return null;
    }
  }

  async recordAudio(): Promise<string | null> {
    try {
      // Create a unique filename for the recording
      const timestamp = new Date().getTime();
      const filename = `recording_${timestamp}.wav`;
      
      // Start recording
      const media = this.media.create(`/storage/emulated/0/${filename}`);
      media.startRecord();
      
      // Return the filename for later use
      return filename;
    } catch (e) {
      console.error('Error recording audio:', e);
      return null;
    }
  }

  async getContacts(): Promise<any[]> {
    try {
      const result = await Contacts.getContacts({
        projection: {
          name: true,
          phones: true,
          emails: true
        }
      });
      return result.contacts || [];
    } catch (e) {
      console.error('Error fetching contacts:', e);
      return [];
    }
  }

  playAudio(filePath: string) {
    const media = this.media.create(filePath);
    media.play();
  }


  async checkManageExternalStorage(): Promise<boolean> {
    try {
      // For Android 11+ (API 30+)
      // const info = await Device.getInfo();
      // if (parseInt(info.osVersion) >= 30) {
        // Step 1: Try normal permission request
        let hasPermission = await this.androidPermissions.checkPermission(
          'android.permission.MANAGE_EXTERNAL_STORAGE'
        );
  
        console.log("hasPermission --->",hasPermission);
        if (!hasPermission.hasPermission) {
          // Try requesting via plugin
          const result = await this.androidPermissions.requestPermission(
            'android.permission.MANAGE_EXTERNAL_STORAGE'
          );
        console.log("result ---->",result);

          if (result.hasPermission) {
            return true;
          }
          // Step 2: If still not granted, open Settings
          await this.requestManageExternalStorage();
          return false;
        }
        return true;
      // }
      // return true; // For older Android versions
    } catch (e) {
      console.error('Error checking MANAGE_EXTERNAL_STORAGE:', e);
      return false;
    }
  }
  
  async requestManageExternalStorage(): Promise<void> {
    try {
      // Open Settings to let user manually grant permission
      const { App } = await import('@capacitor/app');
      // await App.openAppSettings();
      alert('Please grant \"All files access\" permission in Settings, then return to the app.');
    } catch (e) {
      console.error('Error opening settings:', e);
    }
  }
  
} 