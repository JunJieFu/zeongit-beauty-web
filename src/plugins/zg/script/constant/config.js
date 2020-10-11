export const DOMAIN =
  process.env.NODE_ENV === "development" ? "localhost" : ".zeongit.cn"

export const API_HOST = process.env.NODE_ENV === "development" ? "/api" : "/api"

export const ACCOUNT_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:12180"
    : "http://account.zeongit.cn"

export const BEAUTY_HOST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:12181"
    : "http://beauty.zeongit.cn"

export const QINIU_PICTURE = "http://beauty.picture.zeongit.cn"

export const QINIU_AVATAR = "http://avatar.zeongit.cn"

export const QINIU_BACKGROUND = "http://background.zeongit.cn"

export const QINIU_SEPARATOR = "-"

export const QINIU_UPLOAD_ADDRESS =
  process.env.NODE_ENV === "development"
    ? "http://upload-z2.qiniup.com"
    : "http://upload-z2.qiniup.com"

export default {
  DOMAIN,
  API_HOST,
  ACCOUNT_HOST,
  BEAUTY_HOST,
  QINIU_PICTURE,
  QINIU_AVATAR,
  QINIU_BACKGROUND,
  QINIU_SEPARATOR,
  QINIU_UPLOAD_ADDRESS
}
