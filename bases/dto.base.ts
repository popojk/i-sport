export class DTOBase {
  public readonly id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(dto: DTOBase) {
    this.id = dto.id;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }

}