export interface Truck {
    objectid: string;
    applicant: string;
    locationdescription: string;
    fooditems: string;
    latitude: string;
    longitude: string;
    dayshours: string
}

export interface ApiResponse {
    data: Truck[];
    meta: {
        results: number;
    }
}

export type MapRefType<T> = {
    current: T;
}

export type GoogleMapInDocumentType = google.maps.Map | null;
export interface TruckMarker {
    truck: Truck
    mapRef: MapRefType<GoogleMapInDocumentType>
}
