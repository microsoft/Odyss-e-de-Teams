import domtoimage from "dom-to-image";
import { MutableRefObject } from "react";

const copyDom = (ref: MutableRefObject<HTMLElement>) => () => {
  const el = ref.current;
  domtoimage
    .toBlob(el)
    .then(function (dataUrl) {
      try {
        // @ts-ignore
        navigator.clipboard.write([
          new ClipboardItem({
            "image/png": dataUrl,
          }),
        ]);
      } catch (error) {
        console.error(error);
      }
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};

export default copyDom;
