/**
 * Задание 4 - Гарантия доставки
 * Денежки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интерфейс IContract
 * Опишите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency } from '../task_1';
import { ISecureVaultRequisites } from '../task_3';

abstract class ContractBase implements IContract{
    public readonly id: number;
    public receiver: ISecureVaultRequisites;
    public value: Currency;
    public sender: ISecureVaultRequisites;
    private _state: ContractState
    public readonly pendingTime: number = 0;

    constructor(pendingTime: number) {
        this.id = ContractBase.getRandomInt();
        this.pendingTime = pendingTime;
        this._state = ContractState.pending
    }

    public get state(){
        return this._state;
    }

    public signAndTransfer(): void {
        this._state = ContractState.transfer;
    }

    public closeTransfer(): void {
        this._state = ContractState.close;
    }

    public rejectTransfer(): void {
        this._state = ContractState.rejected;
    }

    private static getRandomInt(min = 1, max: number = 10**10): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export class BankingContract extends ContractBase{
}

export class SmartContract extends ContractBase{
    constructor() {
        super(3000);
    }
}

export class LogisticContract extends ContractBase{
    constructor() {
        super(6000);
    }
}


export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number;
    /**
     * Время перевода
     */
    pendingTime: number;
    /**
     * Текущее состояние контракта
     */
    state: ContractState;
    /**
     * Предмет контракта
     */
    value: Currency;
    /**
     * Реквизиты отправителя
     */
    sender: ISecureVaultRequisites;
    /**
     * Реквизиты получателя
     */
    receiver: ISecureVaultRequisites;
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void;
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void;
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void;
}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}
