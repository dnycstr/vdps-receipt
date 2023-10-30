/*
 * classNames is a function that takes an array of classes and returns a string of classes
 */

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
