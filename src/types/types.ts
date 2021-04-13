export interface Base64Image {
  base64Image: string;
  filename: string;
}

export interface GenericMail {
  to: string;
  subject: string;
  user: string;
  message: string;
  images?: Array<Base64Image>;
}
