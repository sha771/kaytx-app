declare module 'qrcode' {
  export interface QRCodeToDataURLOptions {
    errorCorrectionLevel?: string;
    type?: string;
    quality?: number;
    margin?: number;
    width?: number;
    color?: { dark?: string; light?: string };
  }

  export interface QRCodeToStringOptions extends QRCodeToDataURLOptions {
    type?: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/svg+xml';
  }

  export function toDataURL(text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<string>;
  export function toString(text: string | Buffer, options?: QRCodeToStringOptions): Promise<string>;
  export function toFile(path: string, text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<void>;
  export function toCanvas(canvas: any, text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<void>;
  
  namespace QRCode {
    export function toDataURL(text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<string>;
    export function toString(text: string | Buffer, options?: QRCodeToStringOptions): Promise<string>;
    export function toFile(path: string, text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<void>;
    export function toCanvas(canvas: any, text: string | Buffer, options?: QRCodeToDataURLOptions): Promise<void>;
  }

  export default QRCode;
}
