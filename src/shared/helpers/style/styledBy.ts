export function styledBy<Props extends {[key in K]: string}, K extends keyof Props>(
  property: K, mapping: Record<Props[K], string | number>,
): (props: Props) => string | number;
export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props>(
  property: K, mapping: Record<NonNullable<Props[K]>, string | number>, defaultProp: NonNullable<Props[K]>,
): (props: Props) => string | number;
export function styledBy<Props extends {[key in K]?: string}, K extends keyof Props>(
  property: K, mapping: Record<NonNullable<Props[K]>, string | number>, defaultProp?: NonNullable<Props[K]>,
): (props: Props) => string | number {
  return (props: Props) => mapping[(props[property] || defaultProp) as NonNullable<Props[K]>];
}
