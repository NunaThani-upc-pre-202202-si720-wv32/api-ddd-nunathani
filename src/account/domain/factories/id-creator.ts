export class IdCreator {
    //create an object of SingleObject
      private static instance: IdCreator;
      instance = new IdCreator();
      private static id: number;
      id = 0;

      //make the constructor private so that this class cannot be
      //instantiated
      private constructor(){}

      //Get the only object available
      public static getInstance(): IdCreator{
         return this.instance;
      }

      public static createID(): number{
        this.id = this.id + 1;
        return this.id;         
      }
}