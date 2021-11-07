/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract } from "../task_4";
import {ISecureVaultRequisites, Vault} from "../task_3";

export class BankController{
    public readonly vaultStore: Vault[];

    private static instance: BankController;

    private constructor(vaultStore: Vault[]) {
        this.vaultStore = vaultStore;
    }

    public static getInstance(vaultStore: Vault[]): BankController {
        if (!BankController.instance) {
            BankController.instance = new BankController(vaultStore);
        }

        return BankController.instance;
    }


    public registerVault(): ISecureVaultRequisites{
        const vault = new Vault()
        this.vaultStore.push(vault)

        return vault;
    }

    public proceedContract(contract: IContract) {
        const sender = this.vaultStore.find(vault => vault.id === contract.sender.id);
        const receiver = this.vaultStore.find(vault => vault.id === contract.receiver.id);

        contract.signAndTransfer();
        let timerId: NodeJS.Timeout;
        try {
            sender.withdraw(contract.value);
            timerId = setTimeout(()=> {
                receiver.deposit(contract.value);
                contract.closeTransfer();
            }, contract.pendingTime);
        } catch {
            clearInterval(timerId);
            contract.rejectTransfer();
        }
    }
}

