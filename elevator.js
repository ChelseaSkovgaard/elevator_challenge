export default class Elevator {
  constructor(options) {
    options = options || {}
    this.start = 0;
    this.currentFloor = options.floor || 0;
    this.stops = options.stops || 0;
    this.currentRequests = [];
    this.currentRiders = [];
    this.state = "idle" || "moving" || "broken";
    this.floors = options.floors || 0;
  }

  requestFloor(person, floor) {
      this.currentRequests.push({person: person.name, pickUpFloor: person.currentFloor, dropOffFloor: floor});
      this.calculateFloorsTraversed(floor)
      this.moveToFloor(floor)
      this.calculateStops()
  };

  addressAllRequests() {
    for (var i = 0; i < currentRequests.length; i++) {
      floor = currentRequests.floor[i]
      this.calculateFloorsTraversed(floor)
      this.moveToFloor(floor)
      this.calculateStops()
    }
  }

  moveToFloor(floor) {
    if (floor > this.currentFloor) {
      for (var i = 0; i < floor; i++) {
        this.currentFloor++
      }
    }
     if (floor < this.currentFloor) {
      for (var i = 0; i < (this.currentFloor - floor); i++) {
        this.currentFloor--
      }
    }
    return this.currentFloor
  }

  calculateFloorsTraversed(floor) {
  var floorDifference = Math.abs(this.currentFloor - floor)
    for (var i = 0; i < floorDifference; i++) {
      this.floors++
    }
    return this.floors
  }

  calculateStops() {
    this.stops = this.currentRequests.length + 1
  }

  stopElevator() {

  }

  reset() {
    this.constructor()
  }
}
