import { CreateAnimalDto } from './DTOS/animal.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Animal } from './entities/animals.entity';
import { UpdateAnimalDTO } from './DTOS/update-animal.dto';
import { Species } from './entities/species.entity';

@Injectable()
export class AnimalsService {
  constructor(private connection: Connection) {}

  async createAnimal(pet: CreateAnimalDto) {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const animal = await queryRunner.manager
          .getRepository('Animal')
          .createQueryBuilder()
          .insert()
          .into(Animal)
          .values([
            {
              name: pet.name,
              species: pet.species,
              breed: pet.breed,
              age: pet.age,
              adopted: pet.adopted,
              health_problems: pet.health_problems,
              birthday: new Date(pet.birthday),
            },
          ])
          .execute();

        await queryRunner.commitTransaction();

        return animal;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAnimals() {
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const animals = await queryRunner.manager
          .getRepository('Animal')
          .createQueryBuilder('animals')
          .getMany();

        return animals;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAnimalById(id: number) {
    try {
      try {
        const animal = await this.connection
          .getRepository(Animal)
          .createQueryBuilder('animals')
          .select()
          .where('animal_id = :id', { id: id })
          .getOne();

        return animal;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAnimalsBySpecies(species: number) {
    try {
      try {
        const animals = await this.connection
          .getRepository(Animal)
          .createQueryBuilder('animals')
          .select()
          .where('species = :species', { species: species })
          .getMany();

        return animals;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAnimalsByBreed(breed: any) {
    try {
      try {
        const animals = await this.connection
          .getRepository(Animal)
          .createQueryBuilder('animals')
          .select()
          .where('breed = :breed', { breed: breed })
          .getMany();

        return animals;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAnimalsByStatus(status: number) {
    try {
      try {
        const animals = await this.connection
          .getRepository(Animal)
          .createQueryBuilder('animals')
          .select()
          .where('adopted = :adopted', { adopted: status })
          .getMany();

        return animals;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getSpecies(){
    try {
      try {
        const species = await this.connection
          .getRepository(Species)
          .createQueryBuilder('species')
          .select()
          .getMany();

        return species;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAnimal(id: number, pet: UpdateAnimalDTO){
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const animal = await queryRunner.manager
          .getRepository('Animal')
          .createQueryBuilder()
          .update(Animal)
          .set({
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age,
            adopted: pet.adopted,
            health_problems: pet.health_problems,
            birthday: new Date(pet.birthday),
            size: pet.size
          })
          .where('animal_id = :id', { id: id })
          .execute();

        await queryRunner.commitTransaction();

        return animal;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
