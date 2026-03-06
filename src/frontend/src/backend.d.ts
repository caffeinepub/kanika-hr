import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Employee {
    id: bigint;
    xpPoints: bigint;
    name: string;
    badges: Array<string>;
    role: string;
    attritionRiskScore: bigint;
    level: bigint;
    department: string;
}
export type Time = bigint;
export interface backendInterface {
    addContactMessage(name: string, email: string, message: string): Promise<void>;
    addEmployee(name: string, department: string, role: string): Promise<Employee>;
    deleteEmployee(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllEmployees(): Promise<Array<Employee>>;
    getContactMessage(name: string): Promise<ContactMessage | null>;
    getEmployee(id: bigint): Promise<Employee | null>;
    updateEmployee(id: bigint, name: string, department: string, role: string): Promise<Employee>;
}
