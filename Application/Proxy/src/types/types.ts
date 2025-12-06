export type Page = {
    path: string; // example: "/", "/about", "/info"
    htmlUrl: string;  // direct MinIO bucket URL to the file (html)
};

export type DefaultResource = {
    name: string;
    namespace?: string;
}
