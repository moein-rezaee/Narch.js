import { DataValidator } from "../types"
import { DataValidatorManager } from "./dataValidatorManager";

export class DataValidators {
    static Title(title: string) {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "title",
                context,
                property,
                value: title ?? property
            }
            DataValidatorManager.Add(data);
        }
    }

    static Require(message: string = "وارد کردن فیلد اجباری می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "require",
                context,
                property,
                message
            }
            DataValidatorManager.Add(data);
        }
    }

    static MaxLength(max: number, message: string = "طول فیلد بیشتر از حد مجاز می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "max",
                context,
                property,
                message,
                value: max
            }
            DataValidatorManager.Add(data);
        }
    }

    static MinLength(min: number, message: string = "طول فیلد کمتر از حد مجاز می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "min",
                context,
                property,
                message,
                value: min
            }
            DataValidatorManager.Add(data);
        }
    }

    static Range(startNum: number, endNum: number, message: string = "عدد وارد شده معتبر نمی باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "range",
                context,
                property,
                message,
                value: {
                    startNum,
                    endNum
                }
            }
            DataValidatorManager.Add(data);
        }
    }

    static Compare(otherProp: string, message: string = "مقادیر این فیلد با فیلد مقایسه شده برابر نمی باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "compare",
                context,
                property,
                message,
                value: otherProp
            };
            DataValidatorManager.Add(data);
        }
    }

    static Email(message: string = "پست الکترونیک وارد شده معتبر نمی باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "email",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static Phone(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "phone",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static Mobile(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "mobile",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static Url(message: string = "پیوند وارد شده نامعتبر می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "url",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static PostalCode(message: string = "کدپستی وارد شده نامعتبر می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "postalCode",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

    static MeliCode(message: string = "کدملی وارد شده نامعتبر می باشد") {
        return function (context: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "meliCode",
                context,
                property,
                message,
            };
            DataValidatorManager.Add(data);
        }
    }

}


