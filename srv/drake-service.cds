using {flexso.htf as datamodel} from '../db/schema';

service DrakeService {
    function calculateDrakeValue(galaxyId: UUID) returns Decimal;
}