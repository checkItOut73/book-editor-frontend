export const SettablePromise = () => {
    let resolve;
    let reject;

    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    // @ts-ignore
    promise.resolve = resolve;
    // @ts-ignore
    promise.reject = reject;

    return promise;
};
