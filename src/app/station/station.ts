export class Sncf{
    disruptions:any;
    links:Link[];
    places:Place[];
    journeys:Journey[];
    feed_publishers: any;
    tickets : any;
    notes:any;
    context: Context;
    exception:any;
}

export class Context{
    car_direct_path: Co2Emission;
}

export class Journey{
    arrival_date_time:string;
    departure_date_time:string;
    duration:number;
    nb_transfers:number;
    requested_date_time:string;
    sections:any[];
    type:string;
    from:any;
    to:any;
    links:Link[];
}

export class StopDateTimes{
    stop_point:any;
    links: Link[];
    arrival_date_time: string;
    additional_informations: any[];
    departure_date_time:string;
    base_arrival_date_time: string;
    base_departure_date_time: string;
}

export class Section{
    from : StopArea;
    links:Link[];
    arrival_date_time : string;
    co2_emission:Co2Emission;
    to : StopArea;
    departure_date_time : string;
    duration:number;
    type:string;
    id:string;
    mode:string;

}

export class Calendar{
    exceptions:Exception[];
    active_periods:ActivePeriod[];
    week_pattern:WeekPattern;
}

export class ActivePeriod{
    begin:string;
    end:string;
}

export class Exception{
    type:string;
    datetime:string;
}

export class WeekPattern{
    monday:boolean;
    tuesday:boolean;
    friday:boolean;
    wednesday:boolean;
    thursday:boolean;
    sunday:boolean;
    saturday:boolean;
}

export class Durations{
    walking:number;
    total:number;
}

export class Fare{
    found:boolean;
    total:Total;
    links:Link[];
    status:string;
}

export class Total{
    currency:string;
    value:string;
}

export class Co2Emission{
    value:number;
    unit:string;
}

export class Place{
    embedded_type:string;
    stop_area:StopArea;
    quality:number;
    name:string;
    id:string;
}

export class StopArea{
    codes:Code[];
    name:string;
    links:string;
    coord:Coord;
    label:string;
    administrative_regions:AdministrativeRegion[];
    timezone:string;
    id:string;
}

export class Code{
    type:string;
    value:string;
}

export class Coord{
    lat : string;
    long: string;
}

export class AdministrativeRegion{
    insee:string;
    name:string;
    level:number;
    coord:Coord;
    label:string;
    id:string;
    zip_code:string;
}

export class Link{
    href:string;
    type:string;
    rel:string;
    templated:boolean;
}