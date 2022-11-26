export class IdCreator {
      private static instance: IdCreator;
      instance = new IdCreator();
      private static id: number;
      id = 0;

      private constructor(){}

      public static getInstance(): IdCreator{
         return this.instance;
      }

      public static createID(): number{
        this.id = this.id + 1;
        return this.id;         
      }
}