import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PhotoService } from '../../services/photo.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-camara',
  templateUrl: './modal-camara.component.html',
  styleUrls: ['./modal-camara.component.scss'],
})
export class ModalCamaraComponent  implements AfterViewInit {

  imageUrl: string | undefined;
  isDesktop: boolean = false;
  videoStreamActive = false;

  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  constructor(private modalController: ModalController) {
    this.isDesktop = !this.isMobile();
  }
  ngAfterViewInit() {
    // Solo llama a la cámara si es escritorio
    if (this.isDesktop) {
      this.takePhotoWithWebCamera();
    }
  }

  isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  async takePhoto() {
    if (this.isDesktop) {
      await this.takePhotoWithWebCamera();
    } else {
      await this.takePhotoWithCapacitorCamera();
    }
  }

  // Para PWA en computadoras
  async takePhotoWithWebCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      this.videoStreamActive = true;
      this.video.nativeElement.srcObject = stream;

      // Esperar un poco antes de capturar la imagen
      setTimeout(() => {
        this.captureImageFromVideo(stream);
      }, 1000);

    } catch (error) {
      console.error('Error accediendo a la cámara:', error);
    }
  }

  captureImageFromVideo(stream: MediaStream) {
    const canvas = document.createElement('canvas');
    const video = this.video.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageUrl = canvas.toDataURL('image/png'); // Capturar la imagen como DataURL
    }

    // Detener el stream de la cámara
    stream.getTracks().forEach(track => track.stop());
    this.videoStreamActive = false;
  }
  async takePhotoWithCapacitorCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.imageUrl = image.dataUrl;
  }
  dismissModal() {
    this.modalController.dismiss();
  }
}
