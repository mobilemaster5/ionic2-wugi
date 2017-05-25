import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, ToastController } from 'ionic-angular';
import { Services } from "../../providers/services";
import { SocialSharing } from '@ionic-native/social-sharing';



@IonicPage()
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetail {

  @ViewChild(Slides) slides: Slides;

  title: any;
  selectedPhoto: any;
  selectedIndex: any;
  photoTileList: any;

  constructor(
    public navCtrl: NavController, 
    private toastCtrl: ToastController, 
    public navParams: NavParams,
    private services: Services, 
    private viewCtrl: ViewController,
    private socialSharing: SocialSharing,

    ) {
      this.selectedPhoto = this.navParams.get("selectedPhoto");
      this.selectedIndex = this.navParams.get("index");
      this.title = this.navParams.get("title");
      console.log(this.selectedPhoto);
      this.photoTileList = this.services.getPhotoTileList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoDetail');
  }
  showToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  slideHasChanged(slide){
    let index = slide._activeIndex;
    console.log(index);
    if(index < this.photoTileList.length)
     this.selectedPhoto = this.photoTileList[index];
  }
  closePhotoDetail(){
    this.viewCtrl.dismiss();
  }
  shareImg(){
    var i = this.slides.getActiveIndex();
    console.log(i);
    console.log(this.photoTileList[i - 1].filename);
    // window.plugins.socialsharing.shareViaInstagram('', $scope.photoTileList[$ionicSlideBoxDelegate.currentIndex()].filename, function() {console.log('share ok')}, function(errormsg){console.log(errormsg)});
    this.socialSharing.shareViaInstagram('wugi', this.photoTileList[i].filename).then(()=> {
      this.showToast("Success !");
    }).catch(()=> {
      this.showToast("Failed !");
    })
  }
  goSliderDetail(slider){

  }

}
