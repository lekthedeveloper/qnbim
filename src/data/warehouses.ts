export interface Warehouse {
    id: string;
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    hours: string;
    dockPickup: boolean;
    mapCoordinates: { x: number; y: number };
}

export const warehouses: Warehouse[] = [
    {
        id: '1',
        code: 'E1-NJ',
        name: 'Jersey City Hub',
        address: '888 Industrial Way',
        city: 'Jersey City',
        state: 'NJ',
        zip: '07302',
        phone: '(201) 555-0192',
        hours: 'Mon-Fri: 06:00 - 20:00, Sat: 08:00 - 14:00',
        dockPickup: true,
        mapCoordinates: { x: 88, y: 32 }
    },
    {
        id: '2',
        code: 'W1-WA',
        name: 'Seattle North',
        address: '4200 Logistics Blvd',
        city: 'Kent',
        state: 'WA',
        zip: '98032',
        phone: '(253) 555-0841',
        hours: 'Mon-Fri: 05:30 - 22:00, Sat: 07:00 - 16:00',
        dockPickup: true,
        mapCoordinates: { x: 12, y: 18 }
    },
    {
        id: '3',
        code: 'S2-TX',
        name: 'Houston South',
        address: '10200 Port Terminal Dr',
        city: 'Houston',
        state: 'TX',
        zip: '77029',
        phone: '(713) 555-0322',
        hours: 'Mon-Fri: 08:00 - 18:00',
        dockPickup: false,
        mapCoordinates: { x: 48, y: 78 }
    },
    {
        id: '4',
        code: 'M1-IL',
        name: 'Chicago Central',
        address: '5500 Logistics Way',
        city: 'Chicago',
        state: 'IL',
        zip: '60609',
        phone: '(312) 555-0922',
        hours: 'Mon-Fri: 06:00 - 22:00, Sat: 08:00 - 18:00',
        dockPickup: true,
        mapCoordinates: { x: 62, y: 35 }
    },
    {
        id: '5',
        code: 'E3-GA',
        name: 'Atlanta Southeast',
        address: '3200 Distribution Pkwy',
        city: 'Forest Park',
        state: 'GA',
        zip: '30297',
        phone: '(404) 555-0733',
        hours: 'Mon-Fri: 07:00 - 19:00',
        dockPickup: true,
        mapCoordinates: { x: 78, y: 68 }
    },
    {
        id: '6',
        code: 'W4-CO',
        name: 'Denver Rockies',
        address: '15500 Tower Rd',
        city: 'Aurora',
        state: 'CO',
        zip: '80011',
        phone: '(303) 555-0188',
        hours: 'Mon-Fri: 08:00 - 17:00',
        dockPickup: false,
        mapCoordinates: { x: 35, y: 45 }
    }
];
