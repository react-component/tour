export let inline = false;

export function inlineMock(nextInline?: boolean) {
  if (typeof nextInline === 'boolean') {
    inline = nextInline;
  }
  return inline;
}
