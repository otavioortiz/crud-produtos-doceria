export class Product {
    id: number;
    name: string; 
    manufacture: any; 
    perishable: boolean; 
    validity: any;
    price: number;
   
    constructor(id: number, name: string, manufacture: any, perishable: boolean, validity: any, price: number) {
        this.id = id;
        this.name = name; 
        this.manufacture = manufacture; 
        this.perishable = perishable; 
        this.validity = validity;
        this.price = price;
    }
   

  }