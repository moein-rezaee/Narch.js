import { FieldDecorator } from 'narch/src/decorators/fieldDecorator';
const { 
    Title,
    Require,
    MaxLength
 } = FieldDecorator;

export class Blog {
    @Require()
    @Title("شناسه")
    id: string = "";
    
    @Require()
    @Title("عنوان پست")
    @MaxLength(50)
    title: string = "";
    
    @Require()
    @Title("محتوا")
    @MaxLength(250)
    content: string = "";
    
    @Require()
    @Title("فعال")
    isEnabled: boolean = false;
}