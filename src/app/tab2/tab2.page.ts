import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public mahasiswaData: any = [];

  public npm: any = "";
  public nama_mahasiswa: any = "";
  public jenis_kelamin: any = "";
  public jurusan: any = "";
  public foto_siswa: any = "";

  constructor(
    public modalCtrl: ModalController
  ) {
    this.getData();
  }

  async getData() {
    try {
      const res = await axios.get('http://localhost/crud-api/?action=getAll')
      this.mahasiswaData = res.data.data;
    } catch (error) {
      console.log(error)
    }
  }

  async deleteData(id:any) {
    const fd = new FormData();
    try {
      const res = await axios.post(`http://localhost/crud-api/?action=delete&kd=${id}`)
      var data = res.data;
      if (data.status) {
        alert("Berhasil Menghapus Data")
        this.getData()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getDataMahasiswa(id:any) {
    const modal = await this.modalCtrl.create({
      component: Tab3Page,
      componentProps: {
        "id": id
      }
    })
    return await modal.present();
  }

}
