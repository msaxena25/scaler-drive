
/*
@ What is constructor and example?

A constructor is a special type of member function that is called automatically when an object is created.
A Constructor is only function that does not have any return type.
The name 'constructor' is given because the constructor function constructs the values of class data members.


@ Use of constructor?

It is used to initialize the data members of new objects generally.

@ Why Constructor name same as Class name?

Every class object is created using the same new keyword, so it must have information about the class to which it must create an object. For this reason, the constructor name should be the same as the class name.

@ Why is constructor not static?

The constructors in Java can not be static because if the constructors are marked as static, they can not be called from the child class.

@ Can we overload a constructor?

Constructors can be overloaded in a similar way as function overloading. Overloaded constructors have the same name (name of the class) but the different number of arguments. Depending upon the number and type of arguments passed, the corresponding constructor is called.

*/


//! Class Rectangle

/*
Construct a class Rectangle that represents a rectangle.
The class should support the following functionalities:-
perimeter() -> returns the perimeter of the rectangle
area() -> returns the area of the rectangle
You may define any properties in the class as you see appropriate. */


/*
@ What is permiter?

Since the perimeter is equal to the sum of all the sides of the polygon. Hence, in the case of a rectangle, the perimeter (P) is;
P = sum of all its four sides. P = a + b + a + b = 2 (a + b)

@ what is area?

Area of a Rectangle. A = l × b. The area of any rectangle is calculated, once its length and width are known. By multiplying length and ? breadth, the rectangle's area will obtain in a square-unit dimension. In the case of a square, the area will become side^2.

@Is the width the same as breadth?

In mathematics, breadth is used to describe the distance from the right side to the left side of a shape. You may be thinking that the definition of breadth sounds an awful lot like the definition of width. Well, you're correct! The words breadth and width are synonyms!

@ Does JavaScript have constructor overloading?

Constructor overloading is the ability to create multiple constructors for a class and use different constructors in different contexts. As you may already know, real overloading is not supported by JavaScript due to its design.

*/


class Rectangle {
    length;
    breadth;
    constructor(length, breadth) {
        this.length = length;
        this.breadth = breadth;
        // return this; - unused line, Constructor dont have return statement.
    }

    perimeter() {
        // P = 2(l+w)
        return 2 * (this.length + this.breadth);

    }
    area() {
        // A = wl
        return this.length * this.breadth;
    }
}

let obj1 = new Rectangle(2, 3);
console.log(obj1.perimeter())
console.log(obj1.area())

//! Class Circle

/*
@ What is area of circle?

The area of a circle is pi times the radius squared (A = π r²)

@ How do we find perimeter of a circle?

The circle perimeter formula is: p = 2πr , where p is the circle's perimeter, r is the radius, and π is a constant equal to approximately 3.14

*/

class Circle {
    radious;
    pi = 3.14;

    constructor(radious) {
        this.radious = radious;
    }

    perimeter() {
        return (2 * this.pi * this.radious).toFixed(2);
    }
    area() {
        return (this.pi * this.radious * this.radious).toFixed(2);
    }
}

let obj2 = new Circle(3);
console.log(obj2.perimeter())
console.log(obj2.area())


//! See Constrctor Overloading in JavaScript
//? A class may only have one constructor. But Other Languages like Java and C have Multiple Constructor.

class Employee {
    name;
    empNumber;

    constructor(name) {
        this.name = name;
    }

    constructor(name, empNumber) {
        this.name = name;
        this.empNumber = empNumber;
    }
}

let obj3 = new Employee('mohit'); // ERROR: A class may only have one constructor
console.log(obj3);


