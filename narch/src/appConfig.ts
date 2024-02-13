
export class AppConfig {
    private static _data: any;
    public static Set(config: any): void {
        AppConfig._data = config;
    }
    public static Get(): any {
        return AppConfig._data;
    }
}