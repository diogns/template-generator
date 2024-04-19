export class UserEntity {
      readonly id?: number;
      readonly username!: string;
    readonly name!: string;
    
  constructor(
  username: string,
    name: string,
    id?: number,) {
  this.username = username;
    this.name = name;
    this.id = id;
      }
    }
    