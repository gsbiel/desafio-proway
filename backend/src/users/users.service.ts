import { Injectable, HttpException, HttpStatus} from "@nestjs/common"
import { CreateUserDto } from "./users.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity"
import { Repository} from "typeorm"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findUserById(id: string): Promise<User[]> {
        let user = null
        if(id){
            user = await this.usersRepository.find({ where: { id: id} });
        }
        else{
            user = await this.usersRepository.find();
        }
        return user
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {

        // Checa se o usuário já existe
        const userFound = await this.usersRepository.find({
            where: [
                { login : createUserDto.login },
                { email : createUserDto.email }
            ]
        })
        if(userFound.length > 0){

            let errorMessage = ""

            if(userFound[0].login == createUserDto.login){
                errorMessage = "The user already exists."
            }

            if(userFound[0].email == createUserDto.email){
                errorMessage += " The e-mail is already in use."
            }

            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: errorMessage
            }, HttpStatus.CONFLICT);  
        }

        const user = new User()
        user.name = createUserDto.name
        user.email = createUserDto.email
        user.login = createUserDto.login
        user.password = createUserDto.password
        await this.usersRepository.save(user)
        return user
    }

    async deleteUserById(id: string){
        
        const userFound = await this.usersRepository.find({
            where: {id:id}
        })

        if(userFound.length > 0){
            return await this.usersRepository.delete(userFound[0])
        }
        
        return {}
    }
}