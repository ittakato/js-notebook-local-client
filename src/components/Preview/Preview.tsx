import React, { useEffect, useRef } from 'react';

import './Preview.scss';

interface PreviewProps {
  code: string;
  error: string;
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

          function handleError(err) {
            const root = document.getElementById('root');
            root.innerHTML = '<div><h4 style="color: red; font: 700 16px monospace;">' + err + '</h4></div>';
    
            console.error(err);
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error)
          });

          window.addEventListener(
            'message',
            (event) => {
              try {
                eval(event.data);
              } catch(err) {
                handleError(err);
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
      {props.error && <div className='preview-error'>{props.error}</div>}
    </div>
  );
}

export default Preview;
