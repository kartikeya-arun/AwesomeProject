import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { consoleTransport, fileAsyncTransport, logger } from 'react-native-logs';
import FileSystem from 'react-native-fs';

export default function App(){
  const webviewRef = useRef(null);

  const log = logger.createLogger({
    transport:[fileAsyncTransport,consoleTransport],
    levels:{
      custom: 0,
      debug: 1,
      info: 2,
      warn: 3,
      error: 4,
      devNotice: 5,
    },
    transportOptions:{
      FS:FileSystem,
      fileName:'logs.txt',
      filePath: FileSystem.DocumentDirectoryPath,
    },
  });

  log.custom('This is a custom log');
  log.info('This is a test information');
  log.warn('This is some test warning in App.js');
  log.error('This is some test error in App.js');
  log.debug('We are testing in App.js');
  log.devNotice('The developer needs to look at this urgently');

  const INJECTED_JAVASCRIPT = `
    window.env={...window.env,appEnv:'420 - react native environment'};
true;`;

const requestAndroidPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save logs.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    console.log('permission:',granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permission granted');
    } else {
      console.log('Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

useEffect(() => {
  if (Platform.OS === 'android') {
    requestAndroidPermissions();
  }
}, []);

return(
    <WebView
    ref={webviewRef}
    // source={{uri:'http://10.0.2.2:3000/'}}
    // source={{uri:'https://unsplash.com/photos/a-large-wheel-on-the-side-of-a-building-HlwQXlKkokk'}}
    source={{uri:'https://.google.com/'}}
    injectedJavaScript={INJECTED_JAVASCRIPT}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    allowFileAccess={true}
    allowUniversalAccessFromFileURLs={true}
    mixedContentMode={'always'}
    allowingReadAccessToURL={'always'}
    // onLoadEnd={sendEnvToWebView}
    onMessage={(e)=>{
      console.log(e.nativeEvent.data);
    }}
    />
  );
}
