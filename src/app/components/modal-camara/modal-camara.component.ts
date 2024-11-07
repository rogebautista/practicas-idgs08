import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-camara',
  templateUrl: './modal-camara.component.html',
  styleUrls: ['./modal-camara.component.scss'],
})
export class ModalCamaraComponent  implements OnInit {

  imageUrl: string | undefined;
  isDesktop: boolean = false;

  constructor(private modalController: ModalController) {}
  ngOnInit() {}


  async takePhoto() {
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
