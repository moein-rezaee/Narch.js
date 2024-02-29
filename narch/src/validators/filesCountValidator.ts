import { FilesCountData, FilesCountDetails, ValidateResult } from "../types";

export class FilesCountValidator {
    private _details: FilesCountDetails;
    constructor(info: FilesCountData) {
        this._details = this.getDetails(info);
    }

    public validate(): ValidateResult {
        const result: ValidateResult = {
            isValid: true,
            error: this.error
        };
        if (this.hasValidate && !this.isValid) {
            result.isValid = false;
        }
        return result;
    }

    private get error(): string {
        return `files count must be ${this.hasStaticCount ? this.staticCountError : this.noneStaticCountError}`;
    }
    private get staticCountError(): string {
        return `equals to ${this.staticCount}`;
    }
    private get noneStaticCountError(): string {
        return `between ${this.minCount} & ${this.maxCount}`;
    }

    private get hasValidate(): boolean {
        return this._details.isRequired || this.hasFileForValidate;
    }
    private get hasStaticCount(): boolean {
        return this._details.minValidCount == this._details.maxValidCount;
    }

    private get staticCount(): number {
        return this._details.minValidCount;
    }
    private get minCount(): number {
        return this._details.minValidCount;
    }
    private get maxCount(): number {
        return this._details.maxValidCount;
    }

    private get isValid(): boolean {
        return this.maxCountIsValid && this.minCountIsValid;
    }
    private get maxCountIsValid(): boolean {
        return this._details.maxValidCount > this._details.filesCount;
    }
    private get minCountIsValid(): boolean {
        return this._details.minValidCount < this._details.filesCount;
    }

    private get hasFileForValidate(): boolean {
        return this._details.filesCount > 0;
    }
    private getDetails(info: FilesCountData): FilesCountDetails {
        return {
            maxValidCount: info.schema.maxValidCount ?? 1,
            minValidCount: info.schema.minValidCount ?? 1,
            filesCount: info.files[info.schema.key]?.length ?? 0,
            isRequired: info.isRequired
        } as FilesCountDetails;
    }
}
