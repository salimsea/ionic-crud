import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from "axios"

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public npm: any = "";
  public nama_mahasiswa: any = "";
  public jenis_kelamin: any = "";
  public jurusan: any = "";
  public foto_siswa: any = "";

  constructor(public toastCtrl: ToastController) {
  }

  async imageUpload(e:any) {
    const file = e.target.files[0];
    this.foto_siswa = file;
  }

  async addData() {
    const formData = new FormData();
    formData.append('npm', this.npm);
    formData.append('nama_mahasiswa', this.nama_mahasiswa);
    formData.append('jenis_kelamin', this.jenis_kelamin);
    formData.append('jurusan', this.jurusan);
    formData.append('foto_siswa', this.foto_siswa);

    try {
      const res = await axios.post('http://localhost/crud-api/?action=insert', formData);
      
      var data = res.data;
      if (data.status) {
        const toast = await this.toastCtrl.create({
          message: 'Data berhasil ditambahkan',
          duration: 2000
        });
        toast.present()
      } else {
        const toast = await this.toastCtrl.create({
          message: `GAGAL : ${data.message}`,
          duration: 2000
        });
        toast.present()
      }
      
    } catch (error) {
      const toast = await this.toastCtrl.create({
          message: `GAGAL : ${error}`,
          duration: 2000
        });
        toast.present()
    }
  }

}
