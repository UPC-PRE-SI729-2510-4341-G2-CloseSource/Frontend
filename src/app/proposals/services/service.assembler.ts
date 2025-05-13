import { Service } from '../model/service.entity';
import { ServiceResponse } from './service.response';

export class ServiceAssembler {
    static toEntity(response: ServiceResponse): Service {
        const entity = new Service();
        entity.service_id = response.service_id;
        entity.producer_id = response.producer_id;
        entity.name = response.name;
        entity.description = response.description;
        entity.price = response.price;
        return entity;
    }

    static toResponse(entity: Service): ServiceResponse {
        return {
            service_id: entity.service_id,
            producer_id: entity.producer_id,
            name: entity.name,
            description: entity.description,
            price: entity.price
        };
    }

    static toEntityList(responses: ServiceResponse[]): Service[] {
        return responses.map(response => this.toEntity(response));
    }

    static toResponseList(entities: Service[]): ServiceResponse[] {
        return entities.map(entity => this.toResponse(entity));
    }
}
