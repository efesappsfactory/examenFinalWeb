import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";
import {EventoEntity} from "../evento/evento.entity";

@Entity('evento_por_libro')
export class EventoPorLibroEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => LibroEntity,
        libro => libro.eventosPorLibro
    )
    libro: LibroEntity;

    @ManyToOne(
        type => EventoEntity,
        evento => evento.librosPorEvento
    )
    evento: EventoEntity;

}