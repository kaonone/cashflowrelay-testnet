import * as React from 'react';
import * as ReactQRCode from 'qrcode.react';
import { Omit } from '_helpers';

type IProps = Omit<ReactQRCode.QRCodeProps, 'bgColor' | 'fgColor' | 'level'>;

function QRCode(props: IProps) {
  return (
    <ReactQRCode bgColor="#fff" fgColor="#000" level="M" {...props} />
  );
}

export default QRCode;
