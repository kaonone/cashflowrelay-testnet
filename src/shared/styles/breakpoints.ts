
export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const breakpointKeys: BreakpointType[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const values: { [key: string]: number } = {
  xs: 0,
  sm: 660,
  md: 1100,
  lg: 1920,
};
const unit = 'px';
const step = 5;

function up(key: BreakpointType) {
  const value = typeof values[key] === 'number' ? values[key] : key;
  return `@media (min-width:${value}${unit})`;
}

function down(key: BreakpointType): string {
  const endIndex = breakpointKeys.indexOf(key);
  const upperbound = values[breakpointKeys[endIndex]];

  const value = typeof upperbound === 'number' && endIndex >= 0 ? upperbound : key;

  if (typeof value === 'number') {
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  return value;
}

function between(start: BreakpointType, end: BreakpointType) {
  const endIndex = breakpointKeys.indexOf(end) + 1;

  if (endIndex === breakpointKeys.length) {
    return up(start);
  }

  return (
    `@media (min-width:${values[start]}${unit}) and ` +
    `(max-width:${values[end] - step / 100}${unit})`
  );
}

function only(key: BreakpointType) {
  return between(key, key);
}

function width(key: BreakpointType) {
  return values[key];
}

export default {
  keys: breakpointKeys,
  values,
  up,
  down,
  between,
  only,
  width,
};
