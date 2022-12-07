import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public mahasiswaData: any = [];
  public npm: any = "";
  public nama_mahasiswa: any = "";
  public jenis_kelamin: any = "";
  public jurusan: any = "";
  public foto_siswa: any = "";

  foto: any;
  mahasiswaId: any;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    this.mahasiswaId = this.navParams.get('id');
    this.getData();
  }

  async imageUpload(e: any) {
    const file = e.target.files[0];
    this.foto = file;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async getData() {
    try {
      const res = await axios.post(`http://localhost/crud-api/?action=get&kd=${this.mahasiswaId}`);
      var data = res.data;
      this.npm = data.data.npm;
      this.nama_mahasiswa = data.data.nama_mahasiswa;
      this.jenis_kelamin = data.data.jenis_kelamin;
      this.jurusan = data.data.jurusan;
      this.foto_siswa = data.data.foto_siswa;
    } catch (error) {
      
    }
  }

  async updateData() {
    const fd = new FormData();
    fd.append('npm', this.npm);
    fd.append('nama_mahasiswa', this.nama_mahasiswa);
    fd.append('jenis_kelamin', this.jenis_kelamin);
    fd.append('jurusan', this.jurusan);
    if (this.foto != undefined) {
      fd.append('foto_siswa', this.foto);
    } else {
      fd.append('foto_siswa', this.foto_siswa);
    }

    try {
      const res = await axios.post(`http://localhost/crud-api/?action=update&kd=${this.mahasiswaId}`, fd)
      var data = res.data;
      if (data.status) {
        alert("Berhasil Update Data");
        this.dismiss();
        this.navCtrl.navigateRoot('/tabs/tab2');
      } else {
        alert(data.message)
      }
    } catch (error) {
      
    }
  }





}
