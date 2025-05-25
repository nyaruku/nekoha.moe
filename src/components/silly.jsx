import { useEffect } from 'react';

function SillyRingWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://silly.possiblyaxolotl.com/ring/webstring.js";
    script.async = true;
    document.getElementById('sillyring-container')?.appendChild(script);
  }, []);

  return <div id="sillyring-container" class="text-center" />;
}

export default SillyRingWidget;
