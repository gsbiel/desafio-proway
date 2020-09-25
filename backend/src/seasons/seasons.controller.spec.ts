import { SeasonsController } from "./seasons.controller"
import { SeasonsService } from "./seasons.service";
import { Test } from "@nestjs/testing";

describe('SeasonsController', () => {
    let seasonsController: SeasonsController;
    let seasonsService: SeasonsService;

    beforeEach(async () =>{
        const moduleRef = await Test.createTestingModule({
            controllers: [SeasonsController],
            providers: [SeasonsService],
        }).compile();

        seasonsService = moduleRef.get<SeasonsService>(SeasonsService)
        seasonsController = moduleRef.get<SeasonsController>(SeasonsController)
    })

    describe('findAllSeasons', () => {

        it('should return a feedback string', async () => {

            const result = "Returning all seasons...."

            jest.spyOn(seasonsService, 'findAllSeasons').mockImplementation(() => {
                return result
            })

            expect(await seasonsController.findAll()).toBe(result)
        })
    })
})