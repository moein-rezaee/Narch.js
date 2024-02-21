import { DataValidators } from 'narch/src/decorators/dataValidators';
const { 
    Title,
    Require,
    MaxLength,
    MinLength,
    Range,
    Compare,
    Email,
    Mobile,
    Url,
    PostalCode,
    MeliCode,
 } = DataValidators;

export class User {
    @Require()
    @Title("شناسه")
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
    
    @MeliCode()
    meliCode: string = "";
    
    @Title("پیوند وبسایت")
    @Url()
    website: string = "";
    
    @Title("امتیاز")
    @Range(10, 20)
    point: number = 0;
    
    @Mobile()
    mobile: string = "";
    
    @PostalCode()
    postalCode: string = "";
}