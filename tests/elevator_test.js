require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', function() {
  const elevator = new Elevator()
  const alex = new Person("Alex", 2)
  const bob = new Person("Bob", 3)
  const sue = new Person("Sue", 6)


  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 5)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 2)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 5)
  });

  it('should bring a rider to a floor below their current floor', () => {
    elevator.currentFloor = 5

    elevator.requestFloor(alex, 4)

    assert.equal(elevator.currentFloor, 4)

    assert.equal(elevator.state, 'idle')

    assert.equal(elevator.stops, 2)

    assert.equal(elevator.floors, 1)
  });

  it('should move the floor', () => {
    elevator.currentFloor = 4

    elevator.moveToFloor(3)

    assert.equal(elevator.currentFloor, 3)
  });

  it(' should calculate the floors traversed', () => {
    elevator.currentFloor = 3
    assert.equal(elevator.floors, 0)

    elevator.calculateFloorsTraversed(1)

    assert.equal(elevator.floors, 2)
  });

  it('should caculate the number of stops', () =>{
    elevator.currentRequests = 2

    elevator.calculateStops()

    elevator.stops = 2
  });

  it('should drop off multiple people at multiple floors', () => {
    // const alex = new Person("Alex", 2)
    // const bob = new Person("Bob", 3)
    // const sue = new Person("Sue", 6)

    elevator.requestFloor(bob, 9)

    assert.equal(elevator.currentFloor, 9)

    assert.equal(elevator.state, 'idle')

    assert.equal(elevator.stops, 2)

    assert.equal(elevator.floors, 9)

    elevator.requestFloor(sue, 2)

    assert.equal(elevator.currentFloor, 3)

    assert.equal(elevator.state, 'idle')

    assert.equal(elevator.stops, 3)

    assert.equal(elevator.floors, 19)
  });

  
});
