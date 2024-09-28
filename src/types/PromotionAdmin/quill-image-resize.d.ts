declare module 'quill-image-resize' {
    import Quill from 'quill';
  
    export interface ImageResizeOptions {
      // 필요에 따라 옵션 추가
    }
  
    export default class ImageResize {
      constructor(quill: Quill, options?: ImageResizeOptions);
    }
  }