"use strict";

/**************** 
 Matrix Functions
****************/

class Matrix {
  constructor(rows, cols, data = []) { // Corrected opening and closing brackets
    this._rows = rows;
    this._cols = cols;
    this._data = data;

    // initialise with zeros if no data provided
    if (data == null || data.length == 0) {
      this._data = [];
      for (let i = 0; i < this._rows; i++) {
        this._data[i] = [];
        for (let j = 0; j < this._cols; j++) {
          this._data[i][j] = 0;
        }
      }
    } else {
      //check data integrity
      if (data.length != this._rows || data[0].length != cols) { // Corrected parentheses
        throw new Error("Incorrect data dimensions!"); // Corrected error message format
      }
    }
  }

  get rows() {
    return this._rows;
  }
  get cols() {
    return this._cols;
  }
  get data() {
    return this._data;
  }


  // apply random weights between -1 and 1 
  randomWeights(){
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }   
    }
  }
}
