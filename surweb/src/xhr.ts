export async function resolveUrl(url: string,
                                 onProgress?: (progress: number) => void): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.overrideMimeType("text/plain; charset=x-user-defined");
        request.addEventListener("error", (evt) => {
            reject(new Error("Network error, can't download " + url));
        });
        request.addEventListener("abort", () => {
            reject(new Error("Request canceled for url " + url));
        }, false);
        request.responseType = "arraybuffer";
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (onProgress !== undefined) {
                        onProgress(100);
                    }
                    resolve(new Uint8Array(request.response));
                } else {
                    reject(new Error("Network error, can't download " + url));
                }
            }
        };
        if (onProgress !== undefined) {
            request.onprogress = (event) => {
                if (event.total && event.total > 0) {
                    const porgress = Math.round(event.loaded * 10000 / event.total) / 100;
                    onProgress(porgress);
                }
            }
        }
        request.send();
    });
}
