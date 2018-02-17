const connection = require("../config/connection.js");

let printQuestionMarks = (num) => {
    let array = [];

    for (let i = 0; i < num; i++) {
        array.push("?");
    }
    return array.toString();
}
let objectToSql = (ob) => {
    let array = [];

    for (let key in ob) {
        array.push(key + "=" + ob[key]);

    }
    return array.toString();
}

let orm = {
    all: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    },
    create: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    },

    update: (table, objColVals, condition, cb) => {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objectToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, (error, result) => {
            if (error) {
                throw error;
            }
            cb(result);
        });
    },
    // didnt get to finish the delete portion
    // delete: (table, condition, cb) =>{
    //     let queryString = "DELETE FROM " + table;
    //     queryString += " WHERE ";
    //     queryString += condition;
    
    //     connection.query(queryString, (error, result) => {
    //       if (error) {
    //         throw error;
    //       }
    
    //       cb(result);
    //     });
    //   }
};

module.exports = orm;