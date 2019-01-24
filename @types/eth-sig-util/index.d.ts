declare module 'eth-sig-util' {
  interface IMsgParams {
    data: string;
    sig: string;
  }

  export function recoverTypedSignature(props: IMsgParams): string;
  export function recoverPersonalSignature(props: IMsgParams): string;
}
