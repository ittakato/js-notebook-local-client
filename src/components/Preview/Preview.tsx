import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
    <!DOCTYPE html>
    <html>
      <head></head>
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    iframeRef.current!.contentWindow!.postMessage(props.code, '*');
  }, [props.code]);

  return (
    <iframe
      title="preview"
      sandbox="allow-scripts"
      srcDoc={html}
      ref={iframeRef}
    />
  );
}

export default Preview;
