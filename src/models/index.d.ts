import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum AdoptionStatus {
  REQUEST = "REQUEST",
  CONFIRM = "CONFIRM",
  REJECT = "REJECT",
  WAITING = "WAITING"
}

export enum PetAdoptionStatus {
  SBO = "SBO",
  HOLD = "HOLD",
  PENDING = "PENDING"
}

export enum PetType {
  CAT = "CAT",
  DOG = "DOG",
  RABBIT = "RABBIT",
  OTHER = "OTHER"
}

export enum DisplayStatus {
  SHOW = "SHOW",
  HIDDEN = "HIDDEN"
}

export enum ProductType {
  FOOD = "FOOD",
  TREATS = "TREATS",
  TOYS = "TOYS",
  GROOMING = "GROOMING",
  FASHION = "FASHION"
}

type AdoptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerAdoption = {
  readonly id: string;
  readonly userId?: string | null;
  readonly Pet?: Pet | null;
  readonly contact: string;
  readonly status: AdoptionStatus | keyof typeof AdoptionStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly adoptionPetId?: string | null;
}

type LazyAdoption = {
  readonly id: string;
  readonly userId?: string | null;
  readonly Pet: AsyncItem<Pet | undefined>;
  readonly contact: string;
  readonly status: AdoptionStatus | keyof typeof AdoptionStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly adoptionPetId?: string | null;
}

export declare type Adoption = LazyLoading extends LazyLoadingDisabled ? EagerAdoption : LazyAdoption

export declare const Adoption: (new (init: ModelInit<Adoption, AdoptionMetaData>) => Adoption) & {
  copyOf(source: Adoption, mutator: (draft: MutableModel<Adoption, AdoptionMetaData>) => MutableModel<Adoption, AdoptionMetaData> | void): Adoption;
}

type EagerPet = {
  readonly id: string;
  readonly name: string;
  readonly breed: string;
  readonly size?: string | null;
  readonly gender?: string | null;
  readonly birthday?: string | null;
  readonly note?: string | null;
  readonly adoption_status?: PetAdoptionStatus | keyof typeof PetAdoptionStatus | null;
  readonly type?: PetType | keyof typeof PetType | null;
  readonly microchip?: string | null;
  readonly description: string;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPet = {
  readonly id: string;
  readonly name: string;
  readonly breed: string;
  readonly size?: string | null;
  readonly gender?: string | null;
  readonly birthday?: string | null;
  readonly note?: string | null;
  readonly adoption_status?: PetAdoptionStatus | keyof typeof PetAdoptionStatus | null;
  readonly type?: PetType | keyof typeof PetType | null;
  readonly microchip?: string | null;
  readonly description: string;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pet = LazyLoading extends LazyLoadingDisabled ? EagerPet : LazyPet

export declare const Pet: (new (init: ModelInit<Pet, PetMetaData>) => Pet) & {
  copyOf(source: Pet, mutator: (draft: MutableModel<Pet, PetMetaData>) => MutableModel<Pet, PetMetaData> | void): Pet;
}

type EagerOrderItem = {
  readonly id: string;
  readonly qty: number;
  readonly productID: string;
  readonly orderID: string;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderItem = {
  readonly id: string;
  readonly qty: number;
  readonly productID: string;
  readonly orderID: string;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderItem = LazyLoading extends LazyLoadingDisabled ? EagerOrderItem : LazyOrderItem

export declare const OrderItem: (new (init: ModelInit<OrderItem, OrderItemMetaData>) => OrderItem) & {
  copyOf(source: OrderItem, mutator: (draft: MutableModel<OrderItem, OrderItemMetaData>) => MutableModel<OrderItem, OrderItemMetaData> | void): OrderItem;
}

type EagerOrder = {
  readonly id: string;
  readonly userID: string;
  readonly OrderItems?: (OrderItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly id: string;
  readonly userID: string;
  readonly OrderItems: AsyncCollection<OrderItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order, OrderMetaData>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

type EagerProduct = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly image?: string | null;
  readonly remark?: string | null;
  readonly type: ProductType | keyof typeof ProductType;
  readonly OrderItems?: (OrderItem | null)[] | null;
  readonly display_status: DisplayStatus | keyof typeof DisplayStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly image?: string | null;
  readonly remark?: string | null;
  readonly type: ProductType | keyof typeof ProductType;
  readonly OrderItems: AsyncCollection<OrderItem>;
  readonly display_status: DisplayStatus | keyof typeof DisplayStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product, ProductMetaData>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}