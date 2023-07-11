import {useRouter} from "next/router";

export const useRedirect = (path) => {
    const router = useRouter();

    setTimeout(() => {
        router.push(path);
    }, 0);
}

export const useParseJWT = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}