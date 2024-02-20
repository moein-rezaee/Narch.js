import { DataValidators } from 'narch/src/decorators/dataValidators';
const { 
    Title,
    Require,
    MaxLength,
    MinLength,
    Range,
    Compare,
    Email,
    Phone,
    Mobile,
    Url,
    PostalCode,
    MeliCode,
 } = DataValidators;

export class User {
    @Require()
    id: string = "";
    
    @Require()
    @Title("نام کاربری")
    username: string = "";
    
    @Require()
    @Title("گذرواژه")
    @MinLength(15)
    @MaxLength(250)
    @Compare("passwordCompare")
    password: string = "";
    
    @Title("تکرار گذرواژه")
    passwordCompare: string = "";
    
    @Require()
    @Email()
    email: string = "";
    
    @Title("کدملی")
    @MeliCode()
    meliCode: string = "";
    
    @Title("پیوند وبسایت")
    @Url()
    website: string = "";
    
    @Title("امتیاز")
    @Range(10, 20)
    point: number = 0;
    
    @Title("شماره منزل")
    @Phone()
    phone: string = "";
    
    @Mobile()
    mobile: string = "";
    
    @PostalCode()
    postalCode: string = "";
}