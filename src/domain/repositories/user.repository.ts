import { EntityRepository, Repository } from 'typeorm';
import { User } from 'Domain/entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
