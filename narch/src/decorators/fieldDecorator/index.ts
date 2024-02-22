import { FieldDecoratorType } from "../../types";
import { CompareValidator, EmailValidator, LengthValidator, MaxLengthValidator, MeliCodeValidator, MinLengthValidator, MobileValidator, PostalCodeValidator, RangeValidator, RequireValidator, UrlValidator } from "../../validators/dataValidators";
import { FieldDecoratorManager } from "./manager";

export class FieldDecorator {
    static Title(title: string) {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "title",
                context: target.constructor,
                property,
                value: title,
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static Require(message: string = "وارد کردن [field] اجباری می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "require",
                context: target.constructor,
                property,
                message,
                validator: new RequireValidator(message)
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static MaxLength(max: number, message: string = "طول فیلد [field] بیشتر از حد مجاز می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "max",
                context: target.constructor,
                property,
                message,
                value: max,
                validator: new MaxLengthValidator(max, message)
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static MinLength(min: number, message: string = "طول فیلد کمتر از حد مجاز می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "min",
                context: target.constructor,
                property,
                message,
                value: min,
                validator: new MinLengthValidator(min, message)
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static Length(strLength: number, message: string = "طول فیلد غیرمجاز می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "min",
                context: target.constructor,
                property,
                message,
                value: strLength,
                validator: new LengthValidator(strLength, message)
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static Range(startNum: number, endNum: number, message: string = "عدد معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const value = {
                startNum,
                endNum
            }
            const data: FieldDecoratorType = {
                key: "range",
                context: target.constructor,
                property,
                message,
                value,
                validator: new RangeValidator(value, message)
            }
            FieldDecoratorManager.Add(data);
        }
    }

    static Compare(otherProp: string, message: string = "مقادیر این فیلد با فیلد مقایسه شده برابر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "compare",
                context: target.constructor,
                property,
                message,
                value: otherProp,
                validator: new CompareValidator(otherProp, message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static Email(message: string = "پست الکترونیک معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "email",
                context: target.constructor,
                property,
                message,
                validator: new EmailValidator(message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static LengthValidator(strLength: number, message: string = "شماره همراه معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "phone",
                context: target.constructor,
                property,
                message,
                validator: new LengthValidator(strLength, message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static Mobile(message: string = "شماره همراه معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "mobile",
                context: target.constructor,
                property,
                message,
                validator: new MobileValidator(message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static Url(message: string = "پیوند نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "url",
                context: target.constructor,
                property,
                message,
                validator: new UrlValidator(message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static PostalCode(message: string = "کدپستی نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "postalCode",
                context: target.constructor,
                property,
                message,
                validator: new PostalCodeValidator(message)
            };
            FieldDecoratorManager.Add(data);
        }
    }

    static MeliCode(message: string = "کدملی نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: FieldDecoratorType = {
                key: "meliCode",
                context: target.constructor,
                property,
                message,
                validator: new MeliCodeValidator(message)
            };
            FieldDecoratorManager.Add(data);
        }
    }
}


