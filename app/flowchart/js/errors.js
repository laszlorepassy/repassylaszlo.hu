export class RuntimeError extends Error {
  constructor(message, blockId = null) {
    super(message);
    this.name = 'RuntimeError';
    this.blockId = blockId;
  }
}
