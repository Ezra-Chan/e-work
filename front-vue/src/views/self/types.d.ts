declare type AutoCompleteSuggestions = {
  value: string;
}[];

declare type Nation = {
  id: number;
  name: string;
};

declare type SelfInfoFormRule = {
  realName?: string;
  sex?: string;
  email?: string;
  phoneNumber?: string;
  idCard?: string;
  maritalStatus?: string;
  politicalStatus?: string;
  nation?: string;
  nativePlace?: string;
  accountLocation?: string;
  address?: string;

  education?: string;
  graduateSchool?: string;
  graduateTime?: string;

  bankCard?: string;
  socialSecurity?: string;
  accumulationFund?: string;
};
