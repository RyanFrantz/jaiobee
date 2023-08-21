// Lifted from https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
// This is a hack.
export default function GoogleAnalytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-LHEJMM1KN6"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
      
            gtag('config', 'G-LHEJMM1KN6');
        `
        }}
      >
      </script>
  </>
  );
};
