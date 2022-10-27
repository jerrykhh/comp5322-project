// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AdoptionStatus = {
  "REQUEST": "REQUEST",
  "CONFIRM": "CONFIRM",
  "REJECT": "REJECT",
  "WAITING": "WAITING"
};

const PetAdoptionStatus = {
  "SBO": "SBO",
  "HOLD": "HOLD",
  "PENDING": "PENDING"
};

const PetType = {
  "CAT": "CAT",
  "DOG": "DOG",
  "RABBIT": "RABBIT",
  "OTHER": "OTHER"
};

const DisplayStatus = {
  "SHOW": "SHOW",
  "HIDDEN": "HIDDEN"
};

const ProductType = {
  "FOOD": "FOOD",
  "TREATS": "TREATS",
  "TOYS": "TOYS",
  "GROOMING": "GROOMING",
  "FASHION": "FASHION"
};

const { Adoption, Pet, OrderItem, Order, Product } = initSchema(schema);

export {
  Adoption,
  Pet,
  OrderItem,
  Order,
  Product,
  AdoptionStatus,
  PetAdoptionStatus,
  PetType,
  DisplayStatus,
  ProductType
};