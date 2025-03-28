export interface IDashBoard {
  office_id: string;
}

export interface IPopup {
  page: number;
  size: number;
}

interface User {
  id: string;
  full_name: string;
  designation: string;
}

export interface UserFilter {
  office_condition: string,
  desk_condition: string,
  office_id: string,
}

interface Status {
  id: string;
  display_name: string;
}
interface Desk {
  id: string;
  desk_num: string;
}

interface Office {
  id: string;
  branch: string;
}

export interface ApiResponse {
  user: User;
  status: Status;
  desk: Desk;
  office: Office;
}
