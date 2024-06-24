import {getBlob} from 'firebase/storage';

 export function imageToDataURL(url, callback) {
    // fetch image

    return getBlob(url).then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })});
  }
    
