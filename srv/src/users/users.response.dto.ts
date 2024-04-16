import {UsersEntity} from "./users.entity";

export class UsersResponseDto {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  updatedAt: Date;

  static fromUsersEntity(user: UsersEntity) {
    const dto = new UsersResponseDto();

    dto.id = user.id;
    dto.firstname = user.firstname;
    dto.lastname = user.lastname;
    dto.phone = user.phone;
    dto.email = user.email;
    dto.updatedAt = user.updatedAt;

    return dto;
  }
}
