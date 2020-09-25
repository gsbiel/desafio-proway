import { SeasonsController } from "./seasons.controller"
import { SeasonsService } from "./seasons.service";

describe('SeasonsController', () => {
    let seasonsController: SeasonsController;
    let seasonsService: SeasonsService;

    beforeEach(() =>{
        seasonsService = new SeasonsService()
        seasonsController = new SeasonsController(seasonsService)
    })

    describe('findAllSeasons', () => {

        it('should return a feedback string', async () => {
            const result = "Returning all seasons..."
            jest.spyOn(seasonsService, 'findAllSeasons').mockImplementation(() => {
                return result
            })
            expect(await seasonsController.findAll()).toBe(result)
        })
    })
})