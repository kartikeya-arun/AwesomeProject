import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs'; // For file handling
import DocumentPicker from 'react-native-document-picker'; // For file uploads

export default function App(){
  const webviewRef = useRef(null);

  const INJECTED_JAVASCRIPT = `
    window.env={...window.env,appEnv:'420 - react native environment'};
true;`;
  return(
    <WebView
    ref={webviewRef}
    source={{uri:'http://10.0.2.2:3000/'}}
    // source={{uri:'https://unsplash.com/photos/a-large-wheel-on-the-side-of-a-building-HlwQXlKkokk'}}
    // source={{uri:'https://mail.google.com/'}}
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
