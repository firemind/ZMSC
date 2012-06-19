Validator = {
  tests: {
    id: function(attr) {
      return checkID(attr, "id");
    },

    name: function(attr) {
      if(!attr.name) {
        return "name is needed";
      } else if(!isString(attr.name)) {
        return "the name must be a string";
      }
    },

    date: function(attr, name){
    },

    start_time: function(attr){
    },

    project_id: function(attr){
      return checkID(attr, "project_id");
    },

    activity_id: function(attr){
      return checkID(attr, "activity_id");
    }
  },

  run: function(attr, to_run) {
    for(i in to_run) {
      var test = this.tests[to_run[i]];
      if(!test) {
        console.error(to_run[i] + " is not defined in Validator");
      } else {
        var result = test(attr);
        if(result) { return result; }
      }
    }
  }
}

function checkID(attr, me) {
  if(!attr[me]) {
    return me + " is needed";
  } else if(!isNumber(attr[me])) {
    return me + " must be a number";
  } else if(attr[me] < 0) {
    return me + " must be bigger than 0";
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(input){
  return typeof(input)=='string';
}
