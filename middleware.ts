import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    //クッキーから'curentUser'を取得
    const curentUser = request.cookies.get('currentUser')?.value;

    //ユーザが認証されてなく、'/login'ページにいない場合、ログインページへリダイレクト
    if (!curentUser && !request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [],
};