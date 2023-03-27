import React, { useEffect, useRef } from 'react';

import './Preview.scss';

interface PreviewProps {
  code: string;
}

const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html {
            background-color: white;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener(
            'message',
            (event) => {
              try {
                eval(event.data);
              } catch(err) {
                const root = document.getElementById('root');
                root.innerHTML = '<div>' + err + '</div>';
                console.error(err);
              }
            },
            false
          );
        </script>
      </body>
    </html>
  `;

function Preview(props: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    iframeRef.current!.srcdoc = html;

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      iframeRef.current!.contentWindow!.postMessage(props.code, '*');
    }, 50);
  }, [props.code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
        ref={iframeRef}
      />
    </div>
  );
}

export default Preview;
