import { DataValidator } from "../types"
import { DataValidatorManager } from "./dataValidatorManager";
import { CompareValidator, EmailValidator, MaxLengthValidator, MeliCodeValidator, MobileValidator, RangeValidator, RequireValidator, UrlValidator } from "./validators/reqireValidator";

export class DataValidators {
    static Title(title: string) {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "title",
                context: target.constructor,
                property,
                value: title ?? property,
            }
            DataValidatorManager.Add(data);
        }
    }

    static Require(message: string = "وارد کردن فیلد اجباری می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "require",
                context: target.constructor,
                property,
                message,
                validator: new RequireValidator(message)
            }
            DataValidatorManager.Add(data);
        }
    }

    static MaxLength(max: number, message: string = "طول فیلد بیشتر از حد مجاز می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "max",
                context: target.constructor,
                property,
                message,
                value: max,
                validator: new MaxLengthValidator(max, message)
            }
            DataValidatorManager.Add(data);
        }
    }

    static MinLength(min: number, message: string = "طول فیلد کمتر از حد مجاز می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "min",
                context: target.constructor,
                property,
                message,
                value: min,
                validator: new MaxLengthValidator(min, message)
            }
            DataValidatorManager.Add(data);
        }
    }

    static Range(startNum: number, endNum: number, message: string = "عدد وارد شده معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const value = {
                startNum,
                endNum
            }
            const data: DataValidator = {
                key: "range",
                context: target.constructor,
                property,
                message,
                value,
                validator: new RangeValidator(value, message)
            }
            DataValidatorManager.Add(data);
        }
    }

    static Compare(otherProp: string, message: string = "مقادیر این فیلد با فیلد مقایسه شده برابر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "compare",
                context: target.constructor,
                property,
                message,
                value: otherProp,
                validator: new CompareValidator(otherProp, message)
            };
            DataValidatorManager.Add(data);
        }
    }

    static Email(message: string = "پست الکترونیک وارد شده معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "email",
                context: target.constructor,
                property,
                message,
                validator: new EmailValidator(message)
            };
            DataValidatorManager.Add(data);
        }
    }

    static Phone(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "phone",
                context: target.constructor,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static Mobile(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "mobile",
                context: target.constructor,
                property,
                message,
                validator: new MobileValidator(message)
            };
            DataValidatorManager.Add(data);
        }
    }

    static Url(message: string = "پیوند وارد شده نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "url",
                context: target.constructor,
                property,
                message,
                validator: new UrlValidator(message)
            };
            DataValidatorManager.Add(data);
        }
    }

    static PostalCode(message: string = "کدپستی وارد شده نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "postalCode",
                context: target.constructor,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static MeliCode(message: string = "کدملی وارد شده نامعتبر می باشد") {
        return function (target: any, property: string | symbol) {
            const data: DataValidator = {
                key: "meliCode",
                context: target.constructor,
                property,
                message,
                validator: new MeliCodeValidator(message)
            };
            DataValidatorManager.Add(data);
        }
    }

}


