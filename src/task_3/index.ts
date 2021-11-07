/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from '../task_1';

export class Vault implements ISecureVaultRequisites{
	public readonly id: number;
	public readonly store: Set<Currency> = new Set<Currency>()

	constructor(id?: number) {
		this.id = id || Vault.getRandomInt();
	}

	public withdraw(currency: Currency): void {
		Vault.validateCurrency(currency);
		this.store.forEach(currencyInStore => {
			if (currencyInStore.unit === currency.unit){
				if (currencyInStore.value >= currency.value){
					currencyInStore.value -= currency.value;
				} else {
					throw new Error(`Not enough currency of this type in the store of Vault with id:${this.id}.`);
				}
			}
		})
	}

	public deposit(currency: Currency): void{
		Vault.validateCurrency(currency);
		let isDeposited = false;
		this.store.forEach(currencyInStore => {
			if (currencyInStore.unit === currency.unit){
				currencyInStore.value += currency.value;
				isDeposited = true;
			}
		})

		if (!isDeposited){
			this.store.add(currency);
		}
	}

	public transfer(currency: Currency, toVault: ISecureVaultRequisites): void{
		Vault.validateCurrency(currency);
		if (toVault === undefined || toVault === null){
			throw new Error('ToVault must not be undefined or null.');
		}
		this.withdraw(currency);
		toVault.deposit(currency);
	}

	private static getRandomInt(min= 1, max: number = 10**10): number {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	private static validateCurrency(currency: Currency){
		if (currency === undefined || currency === null){
			throw new Error('Currency must not be undefined or null.');
		}
	}
}


export interface ISecureVaultRequisites{
	id: number
	withdraw?: (currency: Currency) => void;
	deposit?: (currency: Currency) => void;
	transfer?: (currency: Currency, toVault: ISecureVaultRequisites) => void;
}
