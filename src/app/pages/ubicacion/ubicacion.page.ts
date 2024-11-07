import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { GoogleMap } from '@capacitor/google-maps';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement> | undefined;
  //newMap: GoogleMap | undefined;
  constructor() { }


  /*async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyCsDaw9gnv5b_pK1oI7Z0RYfAT2pcCYmNM',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }*/


}
