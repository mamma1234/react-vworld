import loadJs from 'load-js';
// import invariant from 'invariant';

const _loadScript = (paramUrl) => {
  // invariant(clientId || ncpClientId, 'clientId or ncpClientId is required');

  // build naver maps v3 api url
  let requestUrl = paramUrl;


  return loadJs(requestUrl).then(() => {
    const maps = window.vw;

    console.log(`maps=`, maps);

    if (maps.jsContentLoaded) {
      return maps;
    }

    const loadingJsContent = new Promise(resolve => {
      maps.onJSContentLoaded = () => {
        resolve(maps);
      };
    });

    return loadingJsContent;
  });
};

let loadScriptPromise = null;

const loadScript = (paramUrl) => {
  // invariant(
  //   clientId || ncpClientId,
  //   'loadNavermapsScript: clientId or ncpClientId is required',
  // );

  if (loadScriptPromise) {
    return loadScriptPromise;
  }

  loadScriptPromise = _loadScript(paramUrl);

  return loadScriptPromise;
};
export default loadScript;
