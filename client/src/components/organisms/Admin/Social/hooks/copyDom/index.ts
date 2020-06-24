import domtoimage from "dom-to-image";
import { MutableRefObject } from "react";

const copyDom = (ref: MutableRefObject<HTMLElement>) => () => {
  const el = ref.current;
  // todo refactoring avec mailing
  try {
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
        domtoimage
          .toPng(el)
          .then(function (dataUrl) {
            var img = document.createElement("img");
            img.src = dataUrl;
            document.getElementById("cache-clipboard").appendChild(img);

            var r = document.createRange();
            r.setStartBefore(img);
            r.setEndAfter(img);
            r.selectNode(img);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
            document.execCommand("copy");
            window.setTimeout(() => {
              document
                .getElementById("data-content")
                .removeChild(document.getElementById("cache-clipboard"));
              var cache = document.createElement("div");
              cache.id = "cache-clipboard";
              document.getElementById("data-content").appendChild(cache);
            }, 100);
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      });
  } catch (err) {
    console.log(err);
  }
};

export default copyDom;
