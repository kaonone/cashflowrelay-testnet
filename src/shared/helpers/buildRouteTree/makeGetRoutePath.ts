import { IPathItem } from './namespace';

export default function makeGetRoutePath(path: IPathItem[]): () => string {
  return (
    () => '/' + path.map(
      ({ isParam, value }) => `${isParam ? ':' : ''}${value}`,
    ).join('/')
  );
}
