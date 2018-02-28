export default class Exception {
  constructor(code, message) {
    this.code = code;
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
      this.stack = this.stack.split('\n');
      this.stack[0] = ['Error', this.code, this.message].join(' ');
      this.stack = this.stack.join('\n');
    }
  }
}
