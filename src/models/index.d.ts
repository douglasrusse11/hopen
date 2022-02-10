import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ResourceType {
  ACCOMODATION = "Accomodation",
  FOOD = "Food",
  CLOTHING = "Clothing",
  HEALTH = "Health",
  SPORT = "Sport",
  LEGAL = "Legal",
  EDUCATION = "Education"
}



type ResourceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Resource {
  readonly id: string;
  readonly category: ResourceType | keyof typeof ResourceType;
  readonly name: string;
  readonly address?: string;
  readonly description?: string;
  readonly phoneNumber?: string;
  readonly emailAddress?: string;
  readonly openingHours?: string;
  readonly latlng?: (number | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Resource, ResourceMetaData>);
  static copyOf(source: Resource, mutator: (draft: MutableModel<Resource, ResourceMetaData>) => MutableModel<Resource, ResourceMetaData> | void): Resource;
}