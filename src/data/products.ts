export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    casePrice: number;
    unitPrice: number;
    weightPerCase: number;
    minOrderQty: number;
    image: string;
    packSize: string;
    inStock: boolean;
    brand: string;
    packagingType: 'Pallet' | 'Case';
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Premium Soft Bath Tissue',
        sku: 'HT-1021',
        category: 'Paper & Tissue',
        casePrice: 48.00,
        unitPrice: 1.00,
        weightPerCase: 24.5,
        minOrderQty: 10,
        packSize: '48 Rolls / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmQSXWE5_DR1AJbQ1430HyXcFs4L4JVObeMRJ4RZ9dw-zd_F9A5Zj4vRy3XO_neNgSq_bc7Qwh-XU5HLsuiybl-Vm82HLhP-p7XwajMe1KRoRMU5oXeTqPCE4QFH6FqWJWJfId5mVHgltYKxy5TOZ9UGNZiLhTBoFpg8bNi3nKaTu5bNkkLaa0ZGYSFWlOxfmsr6m1W3UMjpEtwwRVhjEsbDXQSELqt0py6O8ZhJUeMKXYWS4u7BkzLwpkCP0UhnSrTI9W0U4fgo',
        inStock: true,
        brand: 'Heidi Essential',
        packagingType: 'Case'
    },
    {
        id: '2',
        name: 'Industrial Paper Towels',
        sku: 'HT-1022',
        category: 'Paper & Tissue',
        casePrice: 54.00,
        unitPrice: 1.50,
        weightPerCase: 32.0,
        minOrderQty: 12,
        packSize: '36 Rolls / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmQSXWE5_DR1AJbQ1430HyXcFs4L4JVObeMRJ4RZ9dw-zd_F9A5Zj4vRy3XO_neNgSq_bc7Qwh-XU5HLsuiybl-Vm82HLhP-p7XwajMe1KRoRMU5oXeTqPCE4QFH6FqWJWJfId5mVHgltYKxy5TOZ9UGNZiLhTBoFpg8bNi3nKaTu5bNkkLaa0ZGYSFWlOxfmsr6m1W3UMjpEtwwRVhjEsbDXQSELqt0py6O8ZhJUeMKXYWS4u7BkzLwpkCP0UhnSrTI9W0U4fgo',
        inStock: true,
        brand: 'Heidi Essential',
        packagingType: 'Case'
    },
    {
        id: '3',
        name: 'Heavy Duty Scrub Sponges',
        sku: 'HT-2110',
        category: 'Supplies',
        casePrice: 110.88,
        unitPrice: 0.77,
        weightPerCase: 12.4,
        minOrderQty: 2,
        packSize: '144 ct / Master Pack',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4YbtLE2-zN7OcCTYRB4Xc1GgVnNYzbwHTXuSarwQ8lYd5WdVBnWoan2W4YnRPOS63e5ER5OnnE95nFNmDqipfq71B7Gouv-VYDK-JzjkllVP-FDrYniFR3AiIa-kUh1GQsh2vodeZn8UGbGycq3qQYrFoaA7Og_XTQq5QxDkfoJJbGD5pfOKQTI1pzIxosH3O7omALvrvTllQP4NMGMEzF6Qb1812xXmlQ8Z80MqrQtHuFyGHWYeM1-7E6JGYezDNxrzzl4OI4Zw',
        inStock: false,
        brand: 'Pro-Sanitize',
        packagingType: 'Case'
    },
    {
        id: '4',
        name: 'Eco-Clean Liquid Detergent',
        sku: 'HT-4492',
        category: 'Cleaning',
        casePrice: 59.96,
        unitPrice: 14.99,
        weightPerCase: 45.0,
        minOrderQty: 4,
        packSize: '4 x 5L / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvY6C6oJp0FsqYP01D4guQn-7bruYNEqcwdRXUT0i4Wq1ictVys8DI2iWJoE9TcbX5vA0CLpwxOBTSJ1CcMYreros6U-ykTzWTI2z7woD08RrDe4hqBH6Sfr-vGOn0oVssbLeKZZd270u2idITD0T_ewN6_B7nF76u5e3J_JKmFajWa0n8aKLRdZIhbhzi2OtLeFm42pfgFYWnxzG26sLDmnAdw3ZiZllbQGvZqrS1RXCrQZBPrFWVY64Vnkd3dQmKaO9S6nUrxFk',
        inStock: true,
        brand: 'BulkHouse',
        packagingType: 'Case'
    },
    {
        id: '5',
        name: 'Bulk Facial Tissue',
        sku: 'HT-1023',
        category: 'Paper & Tissue',
        casePrice: 42.00,
        unitPrice: 0.84,
        weightPerCase: 18.2,
        minOrderQty: 10,
        packSize: '50 Boxes / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmQSXWE5_DR1AJbQ1430HyXcFs4L4JVObeMRJ4RZ9dw-zd_F9A5Zj4vRy3XO_neNgSq_bc7Qwh-XU5HLsuiybl-Vm82HLhP-p7XwajMe1KRoRMU5oXeTqPCE4QFH6FqWJWJfId5mVHgltYKxy5TOZ9UGNZiLhTBoFpg8bNi3nKaTu5bNkkLaa0ZGYSFWlOxfmsr6m1W3UMjpEtwwRVhjEsbDXQSELqt0py6O8ZhJUeMKXYWS4u7BkzLwpkCP0UhnSrTI9W0U4fgo',
        inStock: true,
        brand: 'Heidi Essential',
        packagingType: 'Case'
    },
    {
        id: '6',
        name: 'White Beverage Napkins',
        sku: 'HT-1024',
        category: 'Paper & Tissue',
        casePrice: 38.50,
        unitPrice: 0.01,
        weightPerCase: 15.0,
        minOrderQty: 5,
        packSize: '4000 ct / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmQSXWE5_DR1AJbQ1430HyXcFs4L4JVObeMRJ4RZ9dw-zd_F9A5Zj4vRy3XO_neNgSq_bc7Qwh-XU5HLsuiybl-Vm82HLhP-p7XwajMe1KRoRMU5oXeTqPCE4QFH6FqWJWJfId5mVHgltYKxy5TOZ9UGNZiLhTBoFpg8bNi3nKaTu5bNkkLaa0ZGYSFWlOxfmsr6m1W3UMjpEtwwRVhjEsbDXQSELqt0py6O8ZhJUeMKXYWS4u7BkzLwpkCP0UhnSrTI9W0U4fgo',
        inStock: true,
        brand: 'Heidi Essential',
        packagingType: 'Case'
    },
    {
        id: '7',
        name: 'Standard Fluoride Toothpaste',
        sku: 'HT-3001',
        category: 'Personal Care',
        casePrice: 144.00,
        unitPrice: 2.00,
        weightPerCase: 28.5,
        minOrderQty: 2,
        packSize: '72 Tubes / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4YbtLE2-zN7OcCTYRB4Xc1GgVnNYzbwHTXuSarwQ8lYd5WdVBnWoan2W4YnRPOS63e5ER5OnnE95nFNmDqipfq71B7Gouv-VYDK-JzjkllVP-FDrYniFR3AiIa-kUh1GQsh2vodeZn8UGbGycq3qQYrFoaA7Og_XTQq5QxDkfoJJbGD5pfOKQTI1pzIxosH3O7omALvrvTllQP4NMGMEzF6Qb1812xXmlQ8Z80MqrQtHuFyGHWYeM1-7E6JGYezDNxrzzl4OI4Zw',
        inStock: true,
        brand: 'Pro-Sanitize',
        packagingType: 'Case'
    },
    {
        id: '8',
        name: 'Soft Bristle Toothbrushes',
        sku: 'HT-3002',
        category: 'Personal Care',
        casePrice: 72.00,
        unitPrice: 0.50,
        weightPerCase: 8.2,
        minOrderQty: 1,
        packSize: '144 ct / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4YbtLE2-zN7OcCTYRB4Xc1GgVnNYzbwHTXuSarwQ8lYd5WdVBnWoan2W4YnRPOS63e5ER5OnnE95nFNmDqipfq71B7Gouv-VYDK-JzjkllVP-FDrYniFR3AiIa-kUh1GQsh2vodeZn8UGbGycq3qQYrFoaA7Og_XTQq5QxDkfoJJbGD5pfOKQTI1pzIxosH3O7omALvrvTllQP4NMGMEzF6Qb1812xXmlQ8Z80MqrQtHuFyGHWYeM1-7E6JGYezDNxrzzl4OI4Zw',
        inStock: true,
        brand: 'Heidi Essential',
        packagingType: 'Case'
    },
    {
        id: '9',
        name: 'Microfiber Cleaning Cloths',
        sku: 'HT-2120',
        category: 'Supplies',
        casePrice: 85.00,
        unitPrice: 1.70,
        weightPerCase: 10.5,
        minOrderQty: 2,
        packSize: '50 ct / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDal4sYWY4KVhccKOmLlKUb277KqlhcSHv8PqvflGT6fSyZUl_BODMaTakFGCoc1qPMIHvxOuIfGlzb9iBjclVJ6fpKqwbbvltsaa1ubwUliNEpoxGD9LTCMkK4ix_b5clfjN073MAjvoZCz_jJJdI-qL49cDy6pBhzOfHU6G1s25H1nc0Sa3RhyqvBgY9EpzFBPAAupgD5oWXiJBzc6xRferBZWVTaN9uPL2X3skExPexanEdlUmWARoc93ysTF6clY--8XuaR-iE',
        inStock: true,
        brand: 'BulkHouse',
        packagingType: 'Case'
    },
    {
        id: '10',
        name: 'Premium Adult Dog Food',
        sku: 'HT-5001',
        category: 'Pet Food',
        casePrice: 320.00,
        unitPrice: 40.00,
        weightPerCase: 320.0,
        minOrderQty: 1,
        packSize: '8 x 40lb Bags / Pallet Layer',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWULmphKU5TGS6LVurQDHRIr-5Pn7gjDNfGxw2kD74aFk03Zx1Zyg2gRDJSVW2xiaU4jGbT5MsWvkVWeLeZAlSwTUll7MuJffWfeUHjBY2iwRP_4N6mkBfKZ9sHgffoYe0KEDAYyfRQvy2ZE-OMiMSCpdYw386vy1XeOYKuft7Oj5OSlxKewKmA4DbH83rB5jUbVHuEjAVDhTlbECcDVwB2YujTWDyXtxrefbrZTU2GPAbGkciVLozSbS9HfOZKJ8jqGWQrkG4Y3c',
        inStock: true,
        brand: 'BulkHouse',
        packagingType: 'Pallet'
    },
    {
        id: '11',
        name: 'Premium Trash Liners',
        sku: 'HT-9923',
        category: 'Cleaning',
        casePrice: 72.00,
        unitPrice: 0.18,
        weightPerCase: 26.0,
        minOrderQty: 5,
        packSize: '400 ct / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDal4sYWY4KVhccKOmLlKUb277KqlhcSHv8PqvflGT6fSyZUl_BODMaTakFGCoc1qPMIHvxOuIfGlzb9iBjclVJ6fpKqwbbvltsaa1ubwUliNEpoxGD9LTCMkK4ix_b5clfjN073MAjvoZCz_jJJdI-qL49cDy6pBhzOfHU6G1s25H1nc0Sa3RhyqvBgY9EpzFBPAAupgD5oWXiJBzc6xRferBZWVTaN9uPL2X3skExPexanEdlUmWARoc93ysTF6clY--8XuaR-iE',
        inStock: true,
        brand: 'Pro-Sanitize',
        packagingType: 'Case'
    },
    {
        id: '12',
        name: 'Disinfecting Wipes',
        sku: 'HT-7721',
        category: 'Cleaning',
        casePrice: 192.00,
        unitPrice: 16.00,
        weightPerCase: 42.0,
        minOrderQty: 4,
        packSize: '12 Tubs / Case',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWULmphKU5TGS6LVurQDHRIr-5Pn7gjDNfGxw2kD74aFk03Zx1Zyg2gRDJSVW2xiaU4jGbT5MsWvkVWeLeZAlSwTUll7MuJffWfeUHjBY2iwRP_4N6mkBfKZ9sHgffoYe0KEDAYyfRQvy2ZE-OMiMSCpdYw386vy1XeOYKuft7Oj5OSlxKewKmA4DbH83rB5jUbVHuEjAVDhTlbECcDVwB2YujTWDyXtxrefbrZTU2GPAbGkciVLozSbS9HfOZKJ8jqGWQrkG4Y3c',
        inStock: true,
        brand: 'Pro-Sanitize',
        packagingType: 'Case'
    }
];
