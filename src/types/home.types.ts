export type PetType = 'Dog' | 'Cat';
export type Gender = 'Male' | 'Female';
export type Location = 'Ahmedabad' | 'Gandhinagar' | 'Rajkot' | 'Surat' | 'Vadodara';

export interface PetPost {
  id: number;
  type: PetType;
  breed: string;
  gender: Gender;
  age: number;
  location: Location | string;
  price: number;
  image: string;
  adopt: boolean;
}
