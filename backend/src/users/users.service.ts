import { Injectable, HttpException, HttpStatus} from "@nestjs/common"
import { CreateUserDto, UserFindByIdDto, UserDeleteDto } from "./users.dto"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/entities/user.entity"
import { Repository} from "typeorm"

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findUserById(userFindByIdDto: UserFindByIdDto): Promise<User[]> {
        if(userFindByIdDto.userId){
            return await this.usersRepository.find({ where: { id: userFindByIdDto.userId} });
        }
        else{
            return await this.usersRepository.find();
        }
    }

    async findUserByLogin(username: string): Promise<User>{
        const user = await this.usersRepository.find({
            where: {login:username}
        })
        return user.length ? user[0] : null
    }

    async createUser(createUserDto: CreateUserDto): Promise<any> {

        try{
            await this.validateNewUser(createUserDto, this.usersRepository)
        }catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: error.message
            }, HttpStatus.CONFLICT);
        }

        const brcrypt = require('bcrypt')
        // Criptografa a senha passada pelo usuário
        const hashedPassword = await brcrypt.hash(createUserDto.password, 10)

        const user = new User()
        user.name = createUserDto.name
        user.email = createUserDto.email
        user.login = createUserDto.login
        user.password = hashedPassword

        await this.usersRepository.save(user)
        
        const {password, ...result} = user
        return result
    }

    async deleteUserById(userDeleteDto: UserDeleteDto){
        
        const userFound = await this.usersRepository.find({
            where: {id: userDeleteDto.userId}
        })

        if(userFound.length > 0){
            return await this.usersRepository.delete(userFound[0])
        }
        
        return {}
    }


    async validateNewUser(createUserDto: CreateUserDto, repository: Repository<User>){

        // Checa se o usuário já existe
        const userFound = await repository.find({
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

            throw new Error(errorMessage)
        }
    }
}