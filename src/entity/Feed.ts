import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Feed {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @Column()
    description: string

    @Column()
    dateLastEdited: Date

}
