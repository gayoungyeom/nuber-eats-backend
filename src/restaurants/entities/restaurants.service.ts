import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dtos/update-restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    //create로 생성한 restaurant은 javascript에서만 존재하고 실제 DB에 저장되지 않는다.
    //실제 DB에 저장하려면 save를 해야한다.
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);
  }
  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    //update는 DB에 값의 존재 여부와 상관없이 실행한다.
    return this.restaurants.update(id, { ...data });
  }
}
