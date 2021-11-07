/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    public readonly type: CurrencyType;
    public readonly name: string;
    public readonly unit: string;
    private  _value: number;


    constructor(name: string, value: number, unit: string, type?: CurrencyType) {
        Currency.validateString(name);
        Currency.validateValue(value);
        Currency.validateString(unit);

        this.name = name;
        this._value = value;
        this.unit = unit;
        this.type = type;
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        Currency.validateValue(value);
        this._value = value;
    }

    private static validateString(value: string): void{
        if (!value){
            throw new Error('String param must not be empty.');
        }
    }

    private static validateValue(value: number): void{
        if (!isFinite(value) || value < 0){
            throw new RangeError('Value must be a not negative number.');
        }
    }
}

export enum CurrencyType {
    Real,
    Crypto,
    MetalDeposit
}
