import { DataValidator } from "../types"

export class DataValidators {
    static Title(title: string) {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "title",
                target, 
                property, 
                value: title ?? property 
            }
            DataValidatorManager.Add(data);
        }
    }

    static Require(message: string = "وارد کردن فیلد اجباری می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "require",
                target, 
                property, 
                message 
            }
        }
    }

    static MaxLength(max: number, message: string = "طول فیلد بیشتر از حد مجاز می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "max",
                target, 
                property, 
                message,
                value: max
            }
        }
    }

    static MinLength(min: number, message: string = "طول فیلد کمتر از حد مجاز می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "min",
                target, 
                property, 
                message,
                value: min
            }
        }
    }

    static Range(startNum: number, endNum: number, message: string = "عدد وارد شده معتبر نمی باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "range",
                target, 
                property, 
                message,
                value: {
                    startNum,
                    endNum
                }
            }
        }
    }

    static Compare(otherProp: string, message: string = "مقادیر این فیلد با فیلد مقایسه شده برابر نمی باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "compare",
                target, 
                property, 
                message,
                value: otherProp
            };
        }
    }

    static Email(message: string = "پست الکترونیک وارد شده معتبر نمی باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "email",
                target, 
                property, 
                message,
            };
        }
    }

    static Phone(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "phone",
                target, 
                property, 
                message,
            };
        }
    }

    static Mobile(message: string = "شماره همراه وارد شده معتبر نمی باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "mobile",
                target, 
                property, 
                message,
            };
        }
    }

    static Url(message: string = "پیوند وارد شده نامعتبر می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "url",
                target, 
                property, 
                message,
            };
        }
    }

    static PostalCode(message: string = "کدپستی وارد شده نامعتبر می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "postalCode",
                target, 
                property, 
                message,
            };
        }
    }

    static MeliCode(message: string = "کدملی وارد شده نامعتبر می باشد") {
        return function (target: Object, property: string | symbol) {
            const data: DataValidator = {
                key: "meliCode",
                target, 
                property, 
                message,
            };
        }
    }
    
}

export class DataValidatorManager {
    static Decorators: Array<DataValidator> = [];
  
    static Add(decorator: DataValidator): void {
        DataValidatorManager.Decorators.push(decorator);
    }
  }
