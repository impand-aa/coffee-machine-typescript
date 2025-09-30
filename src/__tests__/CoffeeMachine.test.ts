import { Drink } from '../Drink';
import { CoffeeMachine } from '../CoffeeMachine';

describe("CoffeeMachine", () => {
  it("should serve coffee if exact money inserted", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("should serve coffee and give change if too much money inserted", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 3, false, 10);

    expect(result).toBe("Serving Coffee (small) with change 1.00");
  });

  it("should not serve coffee if too few money inserted", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 1, false, 10);

    expect(result).toBe("Not enough money");
  });

  it("should not allow a cost less than 0", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", -1, false, 0, "small");
    
    const result = machine.serve(drink, 1, false, 10);

    expect(result).toBe("Error: invalid price");
  });

  it("should increase price of product that is medium size", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "medium");

    const result = machine.serve(drink, 2.5, true, 10);

    expect(result).toBe("Serving Coffee (medium)");
  });

  it("should increase price of product that is large size", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "large");

    const result = machine.serve(drink, 3, true, 10);

    expect(result).toBe("Serving Coffee (large)");
  });

  it("should make every fifth non-large drink free with a loyalty card", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");
    const freeDrink = new Drink("Coffee", 2, false, 0, "small");

    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);
    machine.serve(drink, 2, false, 10);
    const result = machine.serve(freeDrink, 1, true, 10);

    expect(result).toBe("Serving Coffee (small) with change 1.00");
  });

  it("should make every fifth large drink not free with a loyalty card", () => {
    const machine = new CoffeeMachine();
    new Drink("Coffee", 2, false, 0, "small");
    new Drink("Coffee", 2, false, 0, "small");
    new Drink("Coffee", 2, false, 0, "small");
    new Drink("Coffee", 2, false, 0, "small");
    const freeDrink = new Drink("Coffee", 2, false, 0, "large");

    const result = machine.serve(freeDrink, 3, true, 10);

    expect(result).toBe("Serving Coffee (large)");
  });

  it("should discount prices during happy hour", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 0, "small");

    const result = machine.serve(drink, 2, true, 16);

    expect(result).toBe("Serving Coffee (small) with change 0.40");
  });

  it("should increase price of product with milk", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, true, 0, "small");

    const result = machine.serve(drink, 2.2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("should increase price of product with over 2 sugar cubes", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 3, "small");

    const result = machine.serve(drink, 2.1, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("should not increase price of product with 2 or less sugar cubes", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 2, "small");

    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Serving Coffee (small)");
  });

  it("should not serve product with over 5 sugar cubes", () => {
    const machine = new CoffeeMachine();
    const drink = new Drink("Coffee", 2, false, 6, "small");

    const result = machine.serve(drink, 2, false, 10);

    expect(result).toBe("Error: too much sugar");
  });
});
