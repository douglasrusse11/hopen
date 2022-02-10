// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ResourceType = {
  "ACCOMODATION": "Accomodation",
  "FOOD": "Food",
  "CLOTHING": "Clothing",
  "HEALTH": "Health",
  "SPORT": "Sport",
  "LEGAL": "Legal",
  "EDUCATION": "Education"
};

const { Resource } = initSchema(schema);

export {
  Resource,
  ResourceType
};