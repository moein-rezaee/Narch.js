import { FieldDecoratorType, FormFilesDecoratorType } from './../../types';
export class FieldDecoratorManager {
    static Decorators: Array<FieldDecoratorType> = [];

    static Add(decorator: FieldDecoratorType): void {
        FieldDecoratorManager.Decorators.push(decorator);
    }
}
