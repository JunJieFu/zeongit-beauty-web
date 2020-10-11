export class QueryForm {
  constructor(params) {
    this.precise = eval(params?.precise)
    this.name = params?.name
    this.startDate = params?.startDate
    this.endDate = params?.endDate
    this.aspectRatio = params?.aspectRatio
  }
}
