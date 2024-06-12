// Hono
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { decode, sign, verify,jwt } from 'hono/jwt'
import { prettyJSON } from 'hono/pretty-json'
import { jsxRenderer } from "hono/jsx-renderer";
import { etag } from 'hono/etag'
import { setCookie } from 'hono/cookie'
import { logger } from 'hono/logger'
//end
import { sendMail } from './sendemail'
import { nanoid } from 'nanoid'
import { SHA256, SHA512 } from './hash'
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { title?: string }): Response;
  }
}

const app = new Hono()
// useコーナー
app.use('*', cors())
// app.use('*', csrf({ origin: 'myapp.example.com' }))
app.use('*',secureHeaders({}))
app.use('*', etag())
app.use('*', prettyJSON())
app.use(logger())//デバッグ用
// 終り

app.get(
  "*",
  jsxRenderer(({ children, title }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);
app.onError(async (e,c) => {
  return c.render(
    <div style="text-align: center">
      <h1>エラーが発生しました</h1>
      <p>以下の文章を管理者に送り付けてください</p>
      <textarea readonly cols={35} rows={5} style="font-size: 130%">TITLE:{e.name}\nVELUE:{e.message}\nURL:{c.req.url}</textarea>
    </div>,{title: "エラー | YSNETS"}
  )
})
app.notFound(async (c) => {
  return c.render(
    <div style="text-align:  center;">
      <h1>404 Not Found</h1>
      <p>ページがないよ</p>
    </div>,{title: "ページがないよ | YSNETS"}
  )
})


export default app