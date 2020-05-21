export default {
  domain:
    process.env.NODE_ENV === "development"
      ? "http://localhost:12085"
      : "http://www.secdra.com",
  host: process.env.NODE_ENV === "development" ? "/api" : "/",
  qiniuImg: "http://secdraimg.secdra.com",
  qiniuHead: "http://secdrahead.secdra.com",
  qiniuBack: "http://secdraback.secdra.com",
  qiniuSeparator: "-"
}
