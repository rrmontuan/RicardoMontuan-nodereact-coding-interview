import people_data from '../data/people_data.json';

export class PeopleProcessing {
    getById(id: number) {
        return people_data.find((p) => p.id === id);
    }

    getAll(term?: string, offset?: number) {
        if(term) {
          return people_data
            .filter(person => person.first_name.toLowerCase().includes(term.toLowerCase()) || person.title?.toLowerCase()?.includes(term.toLowerCase()))
            .slice(offset || 0, 10);
        }

        return people_data.slice(offset || 0, 10);
    }
}
