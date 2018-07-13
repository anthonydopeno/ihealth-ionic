import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-print',
  templateUrl: 'print.html',
})
export class PrintPage {

  platform: any;

  dfname;
  dlname;
  dloc;
  pfname;
  plname;
  full: String;

  constructor(private plt:Platform, private file:File, private fileOpener: FileOpener, public navCtrl: NavController, public navParams: NavParams) {
  
    this.dfname = this.navParams.get('dfname');
    this.dlname = this.navParams.get('dlname');
    this.dloc = this.navParams.get('dloc');
    this.pfname = this.navParams.get('pfname');
    this.plname = this.navParams.get('plname');

    this.full = this.pfname + ' ' + this.plname;
    console.log(this.full);

  }


  letterObj = {

    From:'',
    to:'',
    text:'',

  }

  pdfObj=null;

  createPdf(){
    
    var docDefinition = {

      content: [

        { text: 'Dr. ' + this.letterObj.From, style: 'header' },
        { text: new Date().toLocaleString(), alignment: 'center' },
        { text: this.dloc, alignment:'center'},
        { text: 'TEL: (631) 22431243  FAX:(631) 1325423', alignment: 'center'},
        { text: '__________________________________________________________', alignment: 'center'},
        { text: 'Name:', style: 'subheader' },
        this.full,
        {text: 'Rx', style: 'rx'},
        // { text: 'From', style: 'subheader' },
        // { text: this.letterObj.From },

        

        { text:this.letterObj.text, style: 'story', margin:[0,20,0,20] },

        {

        }
      ],

        styles: {

          header: {

            fontSize: 12,
            bold: true,
            alignment: 'center',
          
          },

        subheader: {

          fontSize:11,
          margin:[0, 15, 0, 0]

        },

        story:{

          ilatic: true,
          alignment: 'center',
          width: '50%',
        },

        rx: {
          fontSize:65,
          bold: true,

        }
      }
    }

      this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }


  // End
}
