/**
💎 GOOD CODE QUALITY -
1. Extensible
2. Readable
3. Maintainable
4. Testable
5. Scalable (Data Structures & Algorithms & Infrastructure)

 */

/**
💎 SOLID Principles -  Designed by  Robert C. Martin - Uncle Bob (nick name)

Single Responsibility Principle
Open/Close Principle
Liskov's substitution Principle
Interface Segregation
Dependency Inversion
*/

// General class structure - It contains attributes and behaviors

class AnimalGeneral {
  // [attributes] properties
  weight: number;
  species: string;
  color: string;
  numerOfLegs: number;
  hasWings: boolean;

  // [Behavior] Methods

  eat() {}
  fly() {}
  swim() {}
  hunt() {}
  run() {}
}

// Let's Implement one method in this class...

/**
 * SOME SPECIES EXAMPLES ARE  ---

    mammals include rats, cats, dogs, deer, monkeys, apes, bats, whales, dolphins, and humans.
    fish - Tuna, salmon, goldfish,  whales are mammals, not fish.
    birds - Parrot, Crow, Kite, Eagle, cock
    amphibians - frog, wood frog, toad
    reptiles - turtle, lizard, crocodiles, snakes

 */

class Animal {
  species: string;
  // other properties...

  swim() {
    if (this.species === 'fish' || this.species === 'reptiles' || this.species === 'amphibians') {
      console.log(this.species + ' can swim');
    } else if (this.species === 'mammals') {
      console.log('I cannot swim, I am not like a fish!');
    } else {
      console.log('Sorry I cannot swim');
    }
  }
}

// Pseudo Code for Animal Class test cases --

class AnimalTestCases {
  animalObj = new Animal();
  testFishSwim() {
    this.animalObj.species = 'fish';
    this.animalObj.swim();
  }
  testReptilesSwim() {
    this.animalObj.species = 'reptiles';
    this.animalObj.swim();
  }
  // PROBLEM - fish can swim fast than reptiles so if we console.log like 'fish can swim fast'.
  // This code change for just only one species can break other test cases.
}

/**
 💎 LETS MEASURE ABOVE CODE QUALITY -

 If there are 100 different species, we will need to implement 100 if-else cases. So what!? We
have many if-elses. Why is that a problem?

❓ Readable Yes. I can read & understand it. But actually no! As the number of species
grows, the complexity is growing as well - becomes harder to read and understand

❓ Testable Seems like it. I can write a testcase for each species. However, the test cases
and the code is coupled - changing code for one species will effect the behavior of other
species - nightmare to correctly test

❓ Extensible Yes. If a new species gets added tomorrow - all I have to do is add a new ifelse condition. More on this later.

❓ Maintainable If there are multiple devs working on different species, will there be any
issues? Common issue - Merge Conflicts


 */

// ⭐ Single Responsibility Principle ⭐

/**
 1. If some unit of code is serving multiple responsibilities - split it up into multiple units of code.
 2. Every function/class/module should have a simple, well-defined responsibility.
 3. Every unit of code should have exactly 1 reason to change.
 */

class AnimalBase {
  species: string;
  // other properties...

  // This is common method for every animal.
  eat() {}
}

class Bird extends AnimalBase {
  swim() {
    console.log('I am from Bird group, Cannot swim!');
  }
}
class Fish extends AnimalBase {
  swim() {
    console.log('I can swim fast. wooh...');
  }
}
class Mammals extends AnimalBase {
  swim() {
    console.log('I am not like Fish. Sorry!');
  }
}

/**
    We created different classes based on species and extends it from animal base class.
    Every above child class has it own swim method and responsible for it only.
    Also If later, you change message of Fish class swim method, other test case will not break.
 */

/**
 * 💎 LETS MEASURE ABOVE CODE QUALITY -

Readable We have a lot of classes/files now - readability is poor - But Let's look at
individual files I have a lot of units of code, but each unit is individually highly readable!

Testable Better testability - because changing the behavior of Fish does NOT effect the
bheavior of other.

Extensible Seems like no change.

Maintainable At least the merge conflicts will be reduced

 */

// 🐦 Desing a Bird Library

// [ Library: Bird ]
class Birds extends AnimalBase {
  // species inherited from the parent class AnimalBase
  bird: string = '';

  fly() {
    if (this.bird === 'peacocks') {
      console.log('I can cover short distances only by flying.');
    } else if (this.bird === 'Penguins') {
      console.log('I am a bird but cannot fly.');
    } else if (this.bird === 'Crow') {
      console.log('I can fly high.');
    } else {
      console.log('No idea..');
    }
  }
}

// To use this Bird Library, we can import this library into out code..
// import Birds from 'BirdLibrary';

/**
 💎 PROBLEM WITH ABOVE LIBRARY -

 1. Not extendable -  I want to "extend" this Bird functionality in my code to add a new bird but can not do.
 2. This library will be available as compiled code so can not modify this.
 */

// Lets solve above problem with Open close principle.

// ⭐ Open/Close Principle ⭐

/* Your code should be closed for modification, however, it should still be open for
extension! */

/*
❔ Why is modifying existing code bad?

▶️ Let'see How does code development cycle work in big comapanies...

Step 1 - Developer write code. And test in on own machine.
Step 2 - Send to QA team for testing. - Manual testing, regression testing, integration testing etc..
Step 3 - If all testing well then deployment cycle starts
Step 4 - Deployment Cycle -
            1. Deployed code on Staging server to test changes.
            2. If all well from 1 then deploy to Prod server but only for few users (5% users), not for every one.
            3. Monitor changes, feedbacks and errors for 5% users. Test code for those.
            4. Once all well, then finally deployed for all users.
*/

// So its a very big process to deploy changes, If we modify in existing code..
// Other teams also use same library, so modification can break other projects functionalities as well.

abstract class Birds1 extends AnimalBase {
  // species inherited from the parent class AnimalBase
  bird: string = '';

  abstract fly(); // This is abstract method so cannot implement this here..
}

// Concrete class - A class which extends abstract class.

class Peacocks extends Birds1 {
  fly(): void {
    console.log('I can cover short distances only by flying.');
  }
}
class Duck extends Birds1 {
  fly(): void {
    console.log('Generally don\'t fly. I found in places where there is water like ponds, rivers');
  }
}

/**
Modification. Closed for modification
Extension - Yes, Now we can add fly method as per our need in client code.
 */

// ❓ Didn't we make the exact same change for both Single Responsibility & Open Close?

// Yes, we did! In both cases we converted the if-else ladder to class inheritance.

/**
 ✔️ Is the SRP == Open/Close Principle? No. The solution was same, but the intention was different.
🔗 The SOLID principles are inherently linked together.
 */

// ✋ Analogy: if you speak the truth, you're being honest. If you're being honest, you're obviously
// speaking the truth.

// ▶️ Let's see problem with above code --

// 😒 Kiwi or Penguin cannot fly but still It needs to implement fly method because that is abstract.

class Kiwi extends Birds1 {
  // Concrete class
  fly() {
    // this is unused here..
  }
}
//👀 If we don't implement fly method, we will get compile error because of abstract.

// abstract -  Abstract class says that you can do something (like Bird can fly), ok, but How you can do thatone,
// it need to tell in child class.

// 💻 Lets throw some exception from fly method

class Kiwi1 extends Birds1 {
  // Concreate class
  fly() {
    throw new Error('Kiwi dont fly'); // throw exception.
  }
}

// Run typescript code  - https://www.typescriptlang.org/play

// Run below class - That is before extension.
class Main {
  main() {
    var birdObj = new Birds();
    birdObj.bird = 'peacocks'; // it is User choice.
    birdObj.fly();
    birdObj.bird = 'kiwi';
    birdObj.fly();
  }
}

const mainObj = new Main();
mainObj.main();
// [LOG]: "I can cover short distances only by flying."
// [LOG]: "No idea.."

// Before extension , above code is working fine as we have all if else in one place.
// But after extension, Kiwi throws error so code will get error. It could be the case that throwing exception could break someone's code.

// Lets solve above problem of exception and error --

// ⭐ Liskov Substitution Principle

/**

1. Any functionality in the parent class must also work for the child class

2. If some piece of code works with a parent class P, then it should continue working,
without modifications, with any child class C extends P

3. Any extension to existing code should not break existing code / violate expectations

*/

// 🎨 How should we re-design it?

abstract class Bird2 extends AnimalBase {
  // species inherited from AnimalBase
  bird: string = '';

  // every bird can speak or eat so put these method here..
  speak() {}
  eat() {}

  // don'\t define abstract method here like fly or swim etc...
}

// Create Interface for Fly

interface IFly {
  fly(): void;
}

// Now We know Eagle can fly so implement IFly interface

class Eagle extends Bird2 implements IFly {
  fly() {
    // fly
  }
}

// As Dodo bird cannot fly so no need to implement IFly interface here.
// no compile error

class Dudo extends Bird2 {}

// Lets create another interface ICanFly

interface ICanFly {
  flapWings(): void;
  kickOffGroundToTakeOff(): void;
  fly(): void;
}

class Shaktiman implements ICanFly {
  flapWings() {} // Shaktiman dont have wings so this method is unused here
  fly() {
    console.log('With one hand up, Shaktimaan spines & then fly away');
  }
  kickOffGroundToTakeOff() {}
}

class Airplane implements ICanFly {
  flapWings(): void {} // unused method implementation because Airplane does not flap wings
  fly(): void {
    console.log('I can fly');
  }
  kickOffGroundToTakeOff(): void {
    console.log('ready for take off..');
  }
}

/** PROBLEM IN ABOVE CODE -

 Classes implement interface thats why It required to implement all its methods either class needs it or not.

*/

// ⭐ Interface Segregation Principle ⭐

/**
1. Keep your interfaces minimal
2. No code should be forced to implement a method that it does not need.

To fix the previous code, we can split the ICanFly interface into multiple interfaces
ICanFly , IHasWings , IHasLegs
 */

// 💻 Now Move forward and Lets see Model of zoo. 💻

/**
 1. There are Cages in the zoo.
 2. There are Guards in the zoo.
 3. There are Humans in the zoo.
 4. There are Food zone in the zoo.
 5. There are Animals in the zoo.
 6. There are Vehicles in the zoo.
 7. There are Trees and Plants in the zoo.
 8. There are nest for several birds.
 and many more things...
 */

// 💡 Now Design one of the thing that is Cage structure.

/**
 * Cages have  -
 *
 * 1. Bars (सलाखों)> Wooden , Iron  bars, small bars
 * 2. Feeding Bowl - Fruits, water, meat.
 * 3. size - height , width
 */

// Lets first create interface and classes for above properties.

interface IBars {}
class WoodenBars implements IBars {}
class IronBars implements IBars {}
class SmallGapBars implements IBars {}

interface IFeedingBowl {}
class MeatFeedingBowl implements IFeedingBowl {}
class FruitFeedingBowl implements IFeedingBowl {}
class WaterFeedingBowl implements IFeedingBowl {}

interface ISize {}
class CageSize implements ISize {}

// carnivorous animals -मांसाहारी जानवर
// herbivorous animals - शाकाहारी जानवर

class CarnivorousCage {
  meetFeedingBowl: MeatFeedingBowl;
  waterBowl: WaterFeedingBowl;
  ironBars: IronBars;
  smallGapBars: SmallGapBars;
  listOfAnimals = new Array(5);

  putAnimals() {
    for (let i = 0; i < 5; i++) {
      this.listOfAnimals.push('carnivorous animal' + i);
    }
  }
}

class HerbivorousCage {
  fruitsFeedingBowl: FruitFeedingBowl;
  waterBowl: WaterFeedingBowl;
  woodenBars: WoodenBars;
  listOfAnimals = new Array(5);

  putAnimals() {
    for (let i = 0; i < 5; i++) {
      this.listOfAnimals.push('herbivorous animal' + i);
    }
  }
}

// Same way we will create other Cage designs...

// ✔️ Composite Class -  Classes that made upon several other classes. CarnivorousCage & HerbivorousCage
// are composite class because they are created with other classes.

// ✔️ Utility Class - FruitFeedingBowl, WoodenBars, IronBars etc - are utility classes.

/**
 PROBLEM WITH ABOVE CODE -

1. For each type of cages, we have to create new class.
2. Maximum code are common in both the classes, so this is code duplicate.
 */

// Lets try to understand Dependencies in this structure -

/**
 💡 First Understand what is High level and low level design -

 High Level -  They are generic, abstract and it may be contain several things in self.
 Low level - They are very specific and very details to one thing. It may be talk only one thing.

 Example -
 College - High level design
 Medical college - low level (specific to medical studies only)
 Eng College - low level

 Clothes -  High level
 Jacket - low level
 coats - low level
 */

// So in the above code - find out low level and high level -

/**
1. IFeedingBowl -  High level
2. IBars -  High level
3. FruitFeedingBowl -  Low level (specific to fruits only)
4. MeatFeedingBowl - Low level
5. HerbivorousCage -  High level
6. CarnivorousCage -  High level

interfaces -  High level (IBars, IFeedingBowl)
Implementations - Low level  (FruitFeedingBowl, MeatFeedingBowl, WoodenBars)
Class -  High level (HerbivorousCage, CarnivorousCage) -  It seems like specific but they are composite class.

CarnivorousCage depends on three classes MeatFeedingBowl, WaterFeedingBowl, IronBars and
they internally depends on other interfaces.

*/

// 👀 Issue is here -

// High level modules or Classes are depends on Low level modules or details.

// ⭐ Dependency Inversion Principle ⭐

/**
 1. High-level modules should NOT depend on low-level modules/details.
2.  Instead, they should depend on Abstractions (interfaces)

 */

// How can we achieve dependency inversion - by 💉 Dependency Injection

// 💉 Dependency Injection

// This Cage class now depends on directly abstractions (interfaces) not the low level classes.
class Cage {
  // dependency inversion
  bowl: IFeedingBowl;
  bars: IBars;
  listOfAnimals: string[] = [];

  // inject the dependencies in the constructor
  constructor(bowl: IFeedingBowl, bars: IBars, animals: string[]) {
    this.bowl = bowl;
    this.bars = bars;
    this.listOfAnimals = animals;
  }
}

// Client will pass dependencies.

class Client {
  main() {
    var CarnivorousCage = new Cage(new MeatFeedingBowl(), new IronBars(), ['Tiger', 'Cheetah']);
    var HerbivorousCage = new Cage(new FruitFeedingBowl(), new WoodenBars(), ['Horse', 'Monkey', 'Peecock']);
  }
}
