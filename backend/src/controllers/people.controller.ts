import {
    JsonController,
    Get,
    HttpCode,
    NotFoundError,
    Param,
    QueryParam,
} from 'routing-controllers';
import { PeopleProcessing } from '../services/people_processing.service';

const peopleProcessing = new PeopleProcessing();

@JsonController('/people', { transformResponse: false })
export default class PeopleController {
    @HttpCode(200)
    @Get('/all')
    getAllPeople(@QueryParam("term") term: string) {
        const people = peopleProcessing.getAll(term);

        if (!people) {
            throw new NotFoundError('No people found');
        }

        return {
            data: people,
        };
    }

    @HttpCode(200)
    @Get('/:id')
    getPerson(@Param('id') id: number) {
        const person = peopleProcessing.getById(id);

        if (!person) {
            throw new NotFoundError('No person found');
        }

        return {
            data: person,
        };
    }
}
