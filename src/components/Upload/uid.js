const now = + new Date();
let index = 0;

export default function () {
  return `sd-upload-${now}-${++ index}`;
}
