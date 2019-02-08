import {Injectable} from "@nestjs/common";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./usuario.controller";


@Injectable()

export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)

        private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }


    buscar(parametros?: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros)
    }


    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);
        return usuarioCreado;
    }


    borrar(id: number): Promise<UsuarioEntity> {
        const usuarioEntityEliminar = this._usuarioRepository.create({
            id: id
        });
        return this._usuarioRepository.remove(usuarioEntityEliminar)
    }

    buscarPorId(id: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(id)
    }

    async autenticar(correo: string, password: string): Promise<UsuarioEntity> {

        //console.log("adddddddddddddddddddddddddddfadfqqqqqqqqqqqqqqqqqqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+correo+password)
        const consulta: FindManyOptions<UsuarioEntity> = {
            where: {
                correo: correo,
                password: password
            },
        };
//console.log("sddddddddddddddddddddddddddddddddddZZZZZZZZZZZZZZZZZZZZZZZZZ"+this._usuarioRepository.findOne(consulta))
        return await this._usuarioRepository.findOne(consulta)

    }



}







