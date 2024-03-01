import { ValidateResult } from "../types";

export class FileStream {
    private _size: number = 0;
    private _err: any = null;
    private _stream: any;
    private _emitter: any;
    constructor(stream: any, emitter: any) {
        this._stream = stream;
        this._emitter = emitter;
    }

    public start(): Promise<ValidateResult> {
        return new Promise((resolve: Function, reject: Function) => {
            this._stream
                .on('data', this.onStream)
                .on('close', () => {
                    const result: ValidateResult = this.onEndStream();
                    if (result.isValid) resolve(result);
                    else reject(result);
                });
        });
    }

    private onStream(chunk: string) {
        this._size += chunk.length;
        try {
            this._emitter.callStream(chunk, this._size);
        } catch (error) {
            this._stream.destroy();
            this._err = error;
        }
    }
    private onEndStream() {
        try {
            this._emitter.callEndStream(this._size);
        } catch (error) {
            this._err = error
        }
        return this.getResult();
    }

    private getResult(): ValidateResult {
        if (this._err) {
            return this.failed();
        }
        return this.ok();
    }
    private ok(): ValidateResult {
        return {
            isValid: true,
            data: this._size,
        } as ValidateResult;
    }
    private failed(): ValidateResult {
        return {
            isValid: false,
            error: this._err
        } as ValidateResult;
    }
}