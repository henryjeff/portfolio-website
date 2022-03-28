const UIEventBus = {
    on(event: string, callback: (...args: any[]) => any) {
        // @ts-ignore
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event: string, data: any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event: string, callback: (...args: any[]) => any) {
        document.removeEventListener(event, callback);
    },
};

export default UIEventBus;
