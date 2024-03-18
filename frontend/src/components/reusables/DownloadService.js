import * as htmlToImage from 'html-to-image';
import { toast } from 'sonner';

function Download(ref,name){
 
      htmlToImage.toJpeg(document.getElementById(ref), { quality: 0.95 })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = `${name}.jpeg`;
    link.href = dataUrl;
    link.click();
    toast.success('Generated');
  })
}

export default Download;