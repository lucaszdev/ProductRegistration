import { NativeModules, Reactotron } from '@modules';

declare global {
    interface Console {
        tron: any;
    }
}

if (__DEV__) {
    const { scriptURL } = NativeModules.SourceCode;
    const scriptHostname = scriptURL.split('://')[1].split(':')[0];

    const tron = Reactotron.configure({ host: scriptHostname })
        .useReactNative()
        .connect();

    console.tron = tron;
}
