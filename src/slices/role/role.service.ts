import { Injectable, OnModuleInit } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService implements OnModuleInit {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>,) { }

    async onModuleInit() {
        const adminRole = await this.roleRepository.findOneBy({ name: 'ADMINISTRADOR' });
        if (!adminRole) {
            await this.roleRepository.save(this.roleRepository.create({ name: 'ADMINISTRADOR' }));
        }
        const repartidorRole = await this.roleRepository.findOneBy({ name: 'REPARTIDOR' });
        if (!repartidorRole) {
            await this.roleRepository.save(this.roleRepository.create({ name: 'REPARTIDOR' }));
        }
    }

    async getRoleByName(name: string): Promise<Role | null> {
        return this.roleRepository.findOneBy({ name });
    }

    async getRoleById(id: string): Promise<Role> {
        const role = await this.roleRepository.findOneBy({ id });
        if (!role) {
            throw new NotFoundException(`Rol con id ${id} no encontrado`);
        }
        return role;
    }
}
