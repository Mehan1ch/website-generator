import {deflateRaw, inflateRaw} from "pako";

export async function compressAndEncodeBase64(data: string) {
    const utf8Data = new TextEncoder().encode(data);
    const compressedData = deflateRaw(utf8Data);
    return btoa(String.fromCharCode(...compressedData));
}

export async function decodeBase64AndDecompress(base64String: string) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decompressedData = inflateRaw(bytes);
    return new TextDecoder().decode(decompressedData);
}