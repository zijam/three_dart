function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["millisecondsSinceEpoch?", "isUtc"],
 super: "Object",
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Date))
    return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 compareTo$1: function(other) {
  return $.compareTo(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
},
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.call$1(this.get$year());
  var m = t3.call$1(this.get$month());
  var d = t3.call$1(this.get$day());
  var h = t3.call$1(this.get$hour());
  var min = t3.call$1(this.get$minute());
  var sec = t3.call$1(this.get$second());
  var ms = t2.call$1(this.get$millisecond());
  if (this.isUtc === true)
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  else
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
},
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
},
 get$year: function() {
  return $.Primitives_getYear(this);
},
 get$month: function() {
  return $.Primitives_getMonth(this);
},
 get$day: function() {
  return $.Primitives_getDay(this);
},
 get$hour: function() {
  return $.Primitives_getHours(this);
},
 get$minute: function() {
  return $.Primitives_getMinutes(this);
},
 get$second: function() {
  return $.Primitives_getSeconds(this);
},
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000))
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null)
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
},
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
},
 is$Date: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib2_value?", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 super: "Object",
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib2_value;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    this._successListeners.push(onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    this._exceptionHandlers.push(onException);
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib2_value = value;
  this._complete$0();
},
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 get$future: function() {
  return this._futureImpl;
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 super: "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC14 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC14 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListImplementation_List(newCapacity);
  var t4 = $.ListImplementation_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC14)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListImplementation_List(newCapacity);
      var t4 = $.ListImplementation_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC14)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (index < 0 || index >= t1.length)
      throw $.ioore(index);
    var t2 = t1[index] === $.CTC14;
    t1 = t2;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC14;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC14);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 length$0: function() { return this.get$length().call$0(); },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC14))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC14))
      f.call$2(key, $.index(this._values, i));
  }
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListImplementation_List(8);
  var t1 = $.ListImplementation_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_list", "_map"],
 super: "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 length$0: function() { return this.get$length().call$0(); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'KeyValuePair<K, V>'});
  this._list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 super: "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  t1._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 super: "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC13);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure(this, 'first$0'); },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 length$0: function() { return this.get$length().call$0(); },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, {E: 'E'});
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 super: "Object",
 get$length: function() {
  return this._length;
},
 length$0: function() { return this.get$length().call$0(); },
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 clear$0: function() {
  var t1 = $.ListImplementation_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 super: "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$._Random = {"":
 [],
 super: "Object",
 nextInt$1: function(max) {
  if (max < 0)
    throw $.captureStackTrace($.IllegalArgumentException$('negative max: ' + $.S(max)));
  if (max > 4294967295)
    max = 4294967295;
  return (Math.random() * max) >>> 0;
},
 nextDouble$0: function() {
  return Math.random();
}
};

$$.ListIterator = {"":
 ["i", "list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["_start", "str", "pattern"],
 super: "Object",
 operator$index$1: function(g) {
  return this.group$1(g);
},
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
}
};

$$.Canvas_Camera_Orthographic = {"":
 ["container", "camera", "scene", "renderer", "windowHalfX", "windowHalfY"],
 super: "Object",
 run$0: function() {
  this.init$0();
  this.animate$1(0);
},
 init$0: function() {
  this.windowHalfX = $.div($.window().get$innerWidth(), 2);
  this.windowHalfY = $.div($.window().get$innerHeight(), 2);
  this.container = $._ElementFactoryProvider_Element$tag('div');
  $.add$1($.document().get$body().get$nodes(), this.container);
  var info = $._ElementFactoryProvider_Element$tag('div');
  info.get$style().set$position('absolute');
  info.get$style().set$top('10px');
  info.get$style().set$width('100%');
  info.get$style().set$textAlign('center');
  info.set$innerHTML('three.dart - orthographic view');
  $.add$1(this.container.get$nodes(), info);
  var t1 = $.neg(this.windowHalfX);
  var t2 = this.windowHalfX;
  var t3 = this.windowHalfY;
  this.camera = $.OrthographicCamera$(t1, t2, t3, $.neg(t3), -2000, 1000);
  this.camera.get$position().set$x(200);
  this.camera.get$position().set$y(100);
  this.camera.get$position().set$z(200);
  this.scene = $.Scene$();
  var geometry = $.Geometry$();
  $.add$1(geometry.vertices, $.Vertex$($.Vector3$(-500, 0, 0)));
  $.add$1(geometry.vertices, $.Vertex$($.Vector3$(500, 0, 0)));
  for (var i = 0; i <= 20; ++i) {
    var line = $.Line$(geometry, $.LineBasicMaterial$($.makeLiteralMap(['color', 0, 'opacity', 0.2])), 0);
    t1 = i * 50 - 500;
    line.position.set$z(t1);
    $.add$1(this.scene, line);
    line = $.Line$(geometry, $.LineBasicMaterial$($.makeLiteralMap(['color', 0, 'opacity', 0.2])), 0);
    line.position.set$x(t1);
    line.rotation.set$y(1.5707963267948966);
    $.add$1(this.scene, line);
  }
  geometry = $.CubeGeometry$(50, 50, 50, null, null, null, null, null);
  var material = $.MeshLambertMaterial$($.makeLiteralMap(['color', 16777215, 'overdraw', true]));
  var rnd = $.Random_Random(null);
  for (i = 0; i < 100; ++i) {
    var cube = $.Mesh$(geometry, material);
    t1 = $.add(rnd.nextInt$1(2), 1);
    t2 = cube.scale;
    t2.set$y(t1);
    t1 = $.add($.mul($.floor($.div($.sub(rnd.nextInt$1(1000), 500), 50)), 50), 25);
    cube.position.set$x(t1);
    t1 = $.div($.mul(t2.get$y(), 50), 2);
    cube.position.set$y(t1);
    t1 = $.add($.mul($.floor($.div($.sub(rnd.nextInt$1(1000), 500), 50)), 50), 25);
    cube.position.set$z(t1);
    $.add$1(this.scene, cube);
  }
  var ambientLight = $.AmbientLight$($.mul(rnd.nextDouble$0(), 16));
  $.add$1(this.scene, ambientLight);
  var directionalLight = $.DirectionalLight$($.mul(rnd.nextDouble$0(), 16777215), 1, 0);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$x(t1);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$y(t1);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$z(t1);
  directionalLight.position.normalize$0();
  $.add$1(this.scene, directionalLight);
  directionalLight = $.DirectionalLight$($.mul(rnd.nextDouble$0(), 16777215), 1, 0);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$x(t1);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$y(t1);
  t1 = $.sub(rnd.nextDouble$0(), 0.5);
  directionalLight.position.set$z(t1);
  directionalLight.position.normalize$0();
  $.add$1(this.scene, directionalLight);
  this.renderer = $.CanvasRenderer$(null);
  this.renderer.setSize$2($.window().get$innerWidth(), $.window().get$innerHeight());
  $.add$1(this.container.get$nodes(), this.renderer.get$domElement());
  $.add$1($.window().get$on().get$resize(), this.get$onWindowResize());
},
 onWindowResize$1: function(e) {
  this.windowHalfX = $.div($.window().get$innerWidth(), 2);
  this.windowHalfY = $.div($.window().get$innerHeight(), 2);
  var t1 = $.neg(this.windowHalfX);
  this.camera.set$left(t1);
  t1 = this.windowHalfX;
  this.camera.set$right(t1);
  t1 = this.windowHalfY;
  this.camera.set$top(t1);
  t1 = $.neg(this.windowHalfY);
  this.camera.set$bottom(t1);
  this.camera.updateProjectionMatrix$0();
  this.renderer.setSize$2($.window().get$innerWidth(), $.window().get$innerHeight());
},
 get$onWindowResize: function() { return new $.BoundClosure0(this, 'onWindowResize$1'); },
 animate$1: function(time) {
  $.window().requestAnimationFrame$1(this.get$animate());
  this.render$0();
},
 get$animate: function() { return new $.BoundClosure0(this, 'animate$1'); },
 render$0: function() {
  var timer = $.mul($.DateImplementation$now().millisecondsSinceEpoch, 0.0001);
  var t1 = $.cos(timer) * 200;
  this.camera.get$position().set$x(t1);
  t1 = $.sin(timer) * 200;
  this.camera.get$position().set$z(t1);
  this.camera.lookAt$1(this.scene.get$position());
  this.renderer.render$2(this.scene, this.camera);
},
 get$render: function() { return new $.BoundClosure(this, 'render$0'); }
};

$$._Default = {"":
 [],
 super: "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$copy: function() {
  return this.operator$index$1('copy');
},
 copy$1: function(arg0) { return this.get$copy().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); }
};

$$.FilteredElementList = {"":
 ["_node", "_childNodes"],
 super: "Object",
 get$_filtered: function() {
  return $.ListImplementation_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC17);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure0(this, 'add$1'); },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 length$0: function() { return this.get$length().call$0(); },
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return $.last(this.get$_filtered());
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_lib_element?", "_childElements"],
 super: "Object",
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListImplementation_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListImplementation_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 isEmpty$0: function() {
  return this._lib_element.get$$$dom_firstElementChild() == null;
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 length$0: function() { return this.get$length().call$0(); },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC16);
},
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC19);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC23);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  this._lib_element.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._lib_element.$dom_removeChild$1(result);
  return result;
},
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 length$0: function() { return this.get$length().call$0(); },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC16);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC16);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC16);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC16);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 last$0: function() {
  return $.last(this._nodeList);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_list", "_index"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._lib_list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$copy: function() {
  return this.operator$index$1('copy');
},
 copy$1: function(arg0) { return this.get$copy().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._EventsImpl = {"":
 ["_ptr"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_ptr", "_type"],
 super: "Object",
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 length$0: function() { return this.get$length().call$0(); },
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 iterator$0: function() {
  return $.iterator(this._lib_list);
},
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
},
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
},
 get$length: function() {
  return $.get$length(this._lib_list);
},
 length$0: function() { return this.get$length().call$0(); },
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
},
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
},
 sort$1: function(compare) {
  return $.sort(this._lib_list, compare);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  return $.clear(this._lib_list);
},
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
},
 last$0: function() {
  return $.last(this._lib_list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib_list, start, rangeLength);
},
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._lib_list, start, rangeLength);
},
 get$first: function() {
  return $.index(this._lib_list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._lib_list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$copy: function() {
  return this.operator$index$1('copy');
},
 copy$1: function(arg0) { return this.get$copy().call$1(arg0); },
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TypedImageData = {"":
 ["data?", "height?", "width?"],
 super: "Object",
 is$ImageData: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId?", "nextManagerId", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
 super: "Object",
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["id?", "ports?", "isolateStatics"],
 super: "Object",
 initGlobals$0: function() {
$initGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

}
};

$$._IsolateEvent = {"":
 ["isolate", "fn", "message"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 get$id: function() {
  return 0;
},
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 hashCode$0: function() {
  return this._receivePort.get$_lib1_id();
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_lib1_id?", "_callback?"],
 super: "Object",
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._lib1_id);
},
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._lib1_id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitSendPort$1: function(port) {
  if (!!port.is$_BufferingSendPort && port._port == null)
    this.ports.push(port.get$_futurePort());
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port._isolateId, port._receivePort.get$_lib1_id()];
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port._receivePort, port._isolateId);
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port._workerId, port._isolateId, port._receivePortId);
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 reset$0: function() {
  this.tagged = $.ListImplementation_List(null);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 operator$index$1: function(object) {
  return;
},
 operator$indexSet$2: function(object, info) {
},
 reset$0: function() {
},
 cleanup$0: function() {
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  return this.visitObject$1(x);
},
 visitObject$1: function(x) {
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListImplementation_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListImplementation_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_10 = $.index(t2, map);
  var t3 = t1.copy_10;
  if (!(t3 == null))
    return t3;
  t1.copy_10 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_10);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_10;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListImplementation_List(len);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListImplementation_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      return this.deserializeObject$1(x);
  }
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    var t1 = this._deserializeHelper$1(dartList[i]);
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    dartList[i] = t1;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 deserializeObject$1: function(x) {
  throw $.captureStackTrace('Unexpected serialized object');
}
};

$$._Timer = {"":
 ["_once", "_handle"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
}
};

$$.Camera = {"":
 ["matrixWorldInverse?", "projectionMatrix?", "near?", "far?"],
 super: "Object3D",
 lookAt$1: function(vector) {
  var t1 = this.matrix;
  t1.lookAt$3(this.position, vector, this.up);
  if (this.rotationAutoUpdate === true)
    this.rotation.setRotationFromMatrix$1(t1);
},
 Camera$2: function(near, far) {
  this.matrixWorldInverse = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this.projectionMatrix = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this.projectionMatrixInverse = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
},
 is$Camera: true
};

$$.OrthographicCamera = {"":
 ["left!", "right!", "top!", "bottom!", "matrixWorldInverse", "projectionMatrix", "projectionMatrixInverse", "near", "far", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Camera",
 updateProjectionMatrix$0: function() {
  this.projectionMatrix = $.Matrix4_makeOrtho(this.left, this.right, this.top, this.bottom, this.near, this.far);
},
 OrthographicCamera$6: function(left, right, top$, bottom, near, far) {
  this.updateProjectionMatrix$0();
}
};

$$.Vector3 = {"":
 ["_x", "_y", "_z"],
 super: "Object",
 get$x: function() {
  return this._x;
},
 get$y: function() {
  return this._y;
},
 get$z: function() {
  return this._z;
},
 set$x: function(value) {
  this._x = value;
},
 set$y: function(value) {
  this._y = value;
},
 set$z: function(value) {
  this._z = value;
},
 setValues$3: function(x, y, z) {
  this._x = x;
  this._y = y;
  this._z = z;
  return this;
},
 copy$1: function(v) {
  this._x = v.get$x();
  this._y = v.get$y();
  this._z = v.get$z();
  return this;
},
 clone$0: function() {
  return $.Vector3$(this._x, this._y, this._z);
},
 addSelf$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.addSelf$1$bailout(1, v, t1, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.addSelf$1$bailout(2, v, t1, t3);
  this._x = t1 + t3;
  var t5 = this._y;
  if (typeof t5 !== 'number')
    return this.addSelf$1$bailout(3, v, t5, 0);
  var t7 = v.get$y();
  if (typeof t7 !== 'number')
    return this.addSelf$1$bailout(4, v, t7, t5);
  this._y = t5 + t7;
  var t9 = this._z;
  if (typeof t9 !== 'number')
    return this.addSelf$1$bailout(5, t9, v, 0);
  var t11 = v.get$z();
  if (typeof t11 !== 'number')
    return this.addSelf$1$bailout(6, t9, t11, 0);
  this._z = t9 + t11;
  return this;
},
 addSelf$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      v = env0;
      t5 = env1;
      break;
    case 4:
      v = env0;
      t7 = env1;
      t5 = env2;
      break;
    case 5:
      t9 = env0;
      v = env1;
      break;
    case 6:
      t9 = env0;
      t11 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      this._x = $.add(t1, t3);
      var t5 = this._y;
    case 3:
      state = 0;
      var t7 = v.get$y();
    case 4:
      state = 0;
      this._y = $.add(t5, t7);
      var t9 = this._z;
    case 5:
      state = 0;
      var t11 = v.get$z();
    case 6:
      state = 0;
      this._z = $.add(t9, t11);
      return this;
  }
},
 sub$2: function(v1, v2) {
  var t1 = v1.get$x();
  if (typeof t1 !== 'number')
    return this.sub$2$bailout(1, v1, v2, t1, 0);
  var t3 = v2.get$x();
  if (typeof t3 !== 'number')
    return this.sub$2$bailout(2, v1, v2, t1, t3);
  this._x = t1 - t3;
  var t5 = v1.get$y();
  if (typeof t5 !== 'number')
    return this.sub$2$bailout(3, v1, v2, t5, 0);
  var t7 = v2.get$y();
  if (typeof t7 !== 'number')
    return this.sub$2$bailout(4, v1, v2, t5, t7);
  this._y = t5 - t7;
  var t9 = v1.get$z();
  if (typeof t9 !== 'number')
    return this.sub$2$bailout(5, v2, t9, 0, 0);
  var t11 = v2.get$z();
  if (typeof t11 !== 'number')
    return this.sub$2$bailout(6, t9, t11, 0, 0);
  this._z = t9 - t11;
  return this;
},
 sub$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      t1 = env2;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      v1 = env0;
      v2 = env1;
      t5 = env2;
      break;
    case 4:
      v1 = env0;
      v2 = env1;
      t5 = env2;
      t7 = env3;
      break;
    case 5:
      v2 = env0;
      t9 = env1;
      break;
    case 6:
      t9 = env0;
      t11 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = v1.get$x();
    case 1:
      state = 0;
      var t3 = v2.get$x();
    case 2:
      state = 0;
      this._x = $.sub(t1, t3);
      var t5 = v1.get$y();
    case 3:
      state = 0;
      var t7 = v2.get$y();
    case 4:
      state = 0;
      this._y = $.sub(t5, t7);
      var t9 = v1.get$z();
    case 5:
      state = 0;
      var t11 = v2.get$z();
    case 6:
      state = 0;
      this._z = $.sub(t9, t11);
      return this;
  }
},
 multiply$2: function(a, b) {
  var t1 = a.get$x();
  if (typeof t1 !== 'number')
    return this.multiply$2$bailout(1, a, b, t1, 0);
  var t3 = b.get$x();
  if (typeof t3 !== 'number')
    return this.multiply$2$bailout(2, a, b, t1, t3);
  this._x = t1 * t3;
  var t5 = a.get$y();
  if (typeof t5 !== 'number')
    return this.multiply$2$bailout(3, a, b, t5, 0);
  var t7 = b.get$y();
  if (typeof t7 !== 'number')
    return this.multiply$2$bailout(4, a, b, t5, t7);
  this._y = t5 * t7;
  var t9 = a.get$z();
  if (typeof t9 !== 'number')
    return this.multiply$2$bailout(5, b, t9, 0, 0);
  var t11 = b.get$z();
  if (typeof t11 !== 'number')
    return this.multiply$2$bailout(6, t9, t11, 0, 0);
  this._z = t9 * t11;
  return this;
},
 multiply$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var b = env1;
      t1 = env2;
      break;
    case 2:
      a = env0;
      b = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      a = env0;
      b = env1;
      t5 = env2;
      break;
    case 4:
      a = env0;
      b = env1;
      t5 = env2;
      t7 = env3;
      break;
    case 5:
      b = env0;
      t9 = env1;
      break;
    case 6:
      t9 = env0;
      t11 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = a.get$x();
    case 1:
      state = 0;
      var t3 = b.get$x();
    case 2:
      state = 0;
      this._x = $.mul(t1, t3);
      var t5 = a.get$y();
    case 3:
      state = 0;
      var t7 = b.get$y();
    case 4:
      state = 0;
      this._y = $.mul(t5, t7);
      var t9 = a.get$z();
    case 5:
      state = 0;
      var t11 = b.get$z();
    case 6:
      state = 0;
      this._z = $.mul(t9, t11);
      return this;
  }
},
 multiplyScalar$1: function(s) {
  this._x = $.mul(this._x, s);
  this._y = $.mul(this._y, s);
  this._z = $.mul(this._z, s);
  return this;
},
 divideScalar$1: function(s) {
  if (typeof s !== 'number')
    return this.divideScalar$1$bailout(1, s, 0);
  if (!(s === 0)) {
    var t1 = this._x;
    if (typeof t1 !== 'number')
      return this.divideScalar$1$bailout(2, s, t1);
    this._x = t1 / s;
    var t3 = this._y;
    if (typeof t3 !== 'number')
      return this.divideScalar$1$bailout(3, s, t3);
    this._y = t3 / s;
    var t5 = this._z;
    if (typeof t5 !== 'number')
      return this.divideScalar$1$bailout(4, s, t5);
    this._z = t5 / s;
  } else {
    this._x = 0;
    this._y = 0;
    this._z = 0;
  }
  return this;
},
 divideScalar$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var s = env0;
      break;
    case 2:
      s = env0;
      t1 = env1;
      break;
    case 3:
      s = env0;
      t3 = env1;
      break;
    case 4:
      s = env0;
      t5 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 4 || state === 3 || state === 2 || state === 0 && !$.eqB(s, 0))
        switch (state) {
          case 0:
            var t1 = this._x;
          case 2:
            state = 0;
            this._x = $.div(t1, s);
            var t3 = this._y;
          case 3:
            state = 0;
            this._y = $.div(t3, s);
            var t5 = this._z;
          case 4:
            state = 0;
            this._z = $.div(t5, s);
        }
      else {
        this._x = 0;
        this._y = 0;
        this._z = 0;
      }
      return this;
  }
},
 dot$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(1, v, t1, 0, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.dot$1$bailout(2, v, t3, t1, 0);
  t3 = t1 * t3;
  t1 = this._y;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(3, v, t3, t1, 0);
  var t6 = v.get$y();
  if (typeof t6 !== 'number')
    return this.dot$1$bailout(4, v, t6, t3, t1);
  t3 += t1 * t6;
  var t8 = this._z;
  if (typeof t8 !== 'number')
    return this.dot$1$bailout(5, v, t3, t8, 0);
  var t10 = v.get$z();
  if (typeof t10 !== 'number')
    return this.dot$1$bailout(6, t3, t10, t8, 0);
  return t3 + t8 * t10;
},
 dot$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 3:
      v = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 4:
      v = env0;
      t6 = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 5:
      v = env0;
      t3 = env1;
      t8 = env2;
      break;
    case 6:
      t3 = env0;
      t10 = env1;
      t8 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = this._y;
    case 3:
      state = 0;
      var t6 = v.get$y();
    case 4:
      state = 0;
      t3 = $.add(t3, $.mul(t1, t6));
      var t8 = this._z;
    case 5:
      state = 0;
      var t10 = v.get$z();
    case 6:
      state = 0;
      return $.add(t3, $.mul(t8, t10));
  }
},
 lengthSq$0: function() {
  var t1 = this._x;
  t1 = $.mul(t1, t1);
  var t2 = this._y;
  t1 = $.add(t1, $.mul(t2, t2));
  var t3 = this._z;
  return $.add(t1, $.mul(t3, t3));
},
 length$0: function() {
  return $.sqrt(this.lengthSq$0());
},
 get$length: function() { return new $.BoundClosure(this, 'length$0'); },
 normalize$0: function() {
  return this.divideScalar$1(this.length$0());
},
 cross$2: function(a, b) {
  this._x = $.sub($.mul(a.get$y(), b.get$z()), $.mul(a.get$z(), b.get$y()));
  this._y = $.sub($.mul(a.get$z(), b.get$x()), $.mul(a.get$x(), b.get$z()));
  this._z = $.sub($.mul(a.get$x(), b.get$y()), $.mul(a.get$y(), b.get$x()));
  return this;
},
 distanceTo$1: function(v) {
  return $.sqrt(this.distanceToSquared$1(v));
},
 distanceToSquared$1: function(v) {
  return $.Vector3$(0, 0, 0).sub$2(this, v).lengthSq$0();
},
 setRotationFromMatrix$1: function(m) {
  var cosY = $.cos(this._y);
  this._y = $.asin(m.get$n13());
  if ($.gtB($.abs(cosY), 0.00001)) {
    this._x = $.atan2($.div($.neg(m.get$n23()), cosY), $.div(m.get$n33(), cosY));
    this._z = $.atan2($.div($.neg(m.get$n12()), cosY), $.div(m.get$n11(), cosY));
  } else {
    this._x = 0;
    this._z = $.atan2(m.get$n21(), m.get$n22());
  }
},
 Vector3$3: function(x, y, z) {
  this._x = !(null == x) ? x : 0;
  this._y = !(null == y) ? y : 0;
  this._z = !(null == z) ? z : 0;
},
 is$Vector3: true
};

$$.Matrix3 = {"":
 ["_m"],
 super: "Object",
 get$m: function() {
  return this._m;
},
 getInverse$1: function(matrix) {
  var me = $.ListImplementation_List(16);
  matrix.flattenToArray$1(me);
  var t1 = me.length;
  if (10 >= t1)
    throw $.ioore(10);
  var t2 = me[10];
  if (5 >= t1)
    throw $.ioore(5);
  t2 = $.mul(t2, me[5]);
  var t3 = me.length;
  if (6 >= t3)
    throw $.ioore(6);
  var t4 = me[6];
  if (9 >= t3)
    throw $.ioore(9);
  var a11 = $.sub(t2, $.mul(t4, me[9]));
  if (10 >= me.length)
    throw $.ioore(10);
  t2 = $.neg(me[10]);
  if (1 >= me.length)
    throw $.ioore(1);
  t2 = $.mul(t2, me[1]);
  var t5 = me.length;
  if (2 >= t5)
    throw $.ioore(2);
  var t6 = me[2];
  if (9 >= t5)
    throw $.ioore(9);
  var a21 = $.add(t2, $.mul(t6, me[9]));
  t2 = me.length;
  if (6 >= t2)
    throw $.ioore(6);
  var t7 = me[6];
  if (1 >= t2)
    throw $.ioore(1);
  t7 = $.mul(t7, me[1]);
  var t8 = me.length;
  if (2 >= t8)
    throw $.ioore(2);
  var t9 = me[2];
  if (5 >= t8)
    throw $.ioore(5);
  var a31 = $.sub(t7, $.mul(t9, me[5]));
  if (10 >= me.length)
    throw $.ioore(10);
  t7 = $.neg(me[10]);
  if (4 >= me.length)
    throw $.ioore(4);
  t7 = $.mul(t7, me[4]);
  var t10 = me.length;
  if (6 >= t10)
    throw $.ioore(6);
  var t11 = me[6];
  if (8 >= t10)
    throw $.ioore(8);
  var a12 = $.add(t7, $.mul(t11, me[8]));
  t7 = me.length;
  if (10 >= t7)
    throw $.ioore(10);
  var t12 = me[10];
  if (0 >= t7)
    throw $.ioore(0);
  t12 = $.mul(t12, me[0]);
  var t13 = me.length;
  if (2 >= t13)
    throw $.ioore(2);
  var t14 = me[2];
  if (8 >= t13)
    throw $.ioore(8);
  var a22 = $.sub(t12, $.mul(t14, me[8]));
  if (6 >= me.length)
    throw $.ioore(6);
  t12 = $.neg(me[6]);
  if (0 >= me.length)
    throw $.ioore(0);
  t12 = $.mul(t12, me[0]);
  var t15 = me.length;
  if (2 >= t15)
    throw $.ioore(2);
  var t16 = me[2];
  if (4 >= t15)
    throw $.ioore(4);
  var a32 = $.add(t12, $.mul(t16, me[4]));
  t12 = me.length;
  if (9 >= t12)
    throw $.ioore(9);
  var t17 = me[9];
  if (4 >= t12)
    throw $.ioore(4);
  t17 = $.mul(t17, me[4]);
  var t18 = me.length;
  if (5 >= t18)
    throw $.ioore(5);
  var t19 = me[5];
  if (8 >= t18)
    throw $.ioore(8);
  var a13 = $.sub(t17, $.mul(t19, me[8]));
  if (9 >= me.length)
    throw $.ioore(9);
  t17 = $.neg(me[9]);
  if (0 >= me.length)
    throw $.ioore(0);
  t17 = $.mul(t17, me[0]);
  var t20 = me.length;
  if (1 >= t20)
    throw $.ioore(1);
  var t21 = me[1];
  if (8 >= t20)
    throw $.ioore(8);
  var a23 = $.add(t17, $.mul(t21, me[8]));
  t17 = me.length;
  if (5 >= t17)
    throw $.ioore(5);
  var t22 = me[5];
  if (0 >= t17)
    throw $.ioore(0);
  t22 = $.mul(t22, me[0]);
  var t23 = me.length;
  if (1 >= t23)
    throw $.ioore(1);
  var t24 = me[1];
  if (4 >= t23)
    throw $.ioore(4);
  var a33 = $.sub(t22, $.mul(t24, me[4]));
  if (0 >= me.length)
    throw $.ioore(0);
  t22 = $.mul(me[0], a11);
  if (1 >= me.length)
    throw $.ioore(1);
  t22 = $.add(t22, $.mul(me[1], a12));
  if (2 >= me.length)
    throw $.ioore(2);
  var det = $.add(t22, $.mul(me[2], a13));
  if (det === 0)
    $.print('Matrix3.getInverse(): determinant == 0');
  if (typeof det !== 'number')
    throw $.iae(det);
  var idet = 1.0 / det;
  t1 = this.get$m();
  if (typeof a11 !== 'number')
    throw $.iae(a11);
  $.indexSet(t1, 0, idet * a11);
  t1 = this.get$m();
  if (typeof a21 !== 'number')
    throw $.iae(a21);
  $.indexSet(t1, 1, idet * a21);
  t1 = this.get$m();
  if (typeof a31 !== 'number')
    throw $.iae(a31);
  $.indexSet(t1, 2, idet * a31);
  t1 = this.get$m();
  if (typeof a12 !== 'number')
    throw $.iae(a12);
  $.indexSet(t1, 3, idet * a12);
  t1 = this.get$m();
  if (typeof a22 !== 'number')
    throw $.iae(a22);
  $.indexSet(t1, 4, idet * a22);
  t1 = this.get$m();
  if (typeof a32 !== 'number')
    throw $.iae(a32);
  $.indexSet(t1, 5, idet * a32);
  t1 = this.get$m();
  if (typeof a13 !== 'number')
    throw $.iae(a13);
  $.indexSet(t1, 6, idet * a13);
  t1 = this.get$m();
  if (typeof a23 !== 'number')
    throw $.iae(a23);
  $.indexSet(t1, 7, idet * a23);
  t1 = this.get$m();
  if (typeof a33 !== 'number')
    throw $.iae(a33);
  $.indexSet(t1, 8, idet * a33);
  return this;
},
 get$elements: function() {
  return $._TypedArrayFactoryProvider_Float32Array$fromList(this._m);
},
 Matrix3$0: function() {
  var t1 = $.ListImplementation_List(9);
  $.setRuntimeTypeInfo(t1, {E: 'num'});
  this._m = t1;
}
};

$$.Matrix4 = {"":
 ["_flat", "_m33", "n11?", "n12?", "n13?", "n14?", "n21?", "n22?", "n23?", "n24?", "n31?", "n32?", "n33?", "n34?", "n41?", "n42?", "n43?", "n44?"],
 super: "Object",
 setValues$16: function(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
  this.n11 = this.n11;
  this.n12 = this.n12;
  this.n13 = this.n13;
  this.n14 = this.n14;
  this.n21 = this.n21;
  this.n22 = this.n22;
  this.n23 = this.n23;
  this.n24 = this.n24;
  this.n31 = this.n31;
  this.n32 = this.n32;
  this.n33 = this.n33;
  this.n34 = this.n34;
  this.n41 = this.n41;
  this.n42 = this.n42;
  this.n43 = this.n43;
  this.n44 = this.n44;
  return this;
},
 copy$1: function(m) {
  this.setValues$16(m.get$n11(), m.get$n12(), m.get$n13(), m.get$n14(), m.get$n21(), m.get$n22(), m.get$n23(), m.get$n24(), m.get$n31(), m.get$n32(), m.get$n33(), m.get$n34(), m.get$n41(), m.get$n42(), m.get$n43(), m.get$n44());
  return this;
},
 lookAt$3: function(eye, center, up) {
  var x = $.Matrix4___v1;
  var y = $.Matrix4___v2;
  var z = $.Matrix4___v3;
  z.sub$2(eye, center).normalize$0();
  if (z.length$0() === 0)
    z.set$z(1);
  x.cross$2(up, z).normalize$0();
  if (x.length$0() === 0) {
    z.set$x($.add(z.get$x(), 0.0001));
    x.cross$2(up, z).normalize$0();
  }
  y.cross$2(z, x).normalize$0();
  this.n11 = x.get$x();
  this.n12 = y.get$x();
  this.n13 = z.get$x();
  this.n21 = x.get$y();
  this.n22 = y.get$y();
  this.n23 = z.get$y();
  this.n31 = x.get$z();
  this.n32 = y.get$z();
  this.n33 = z.get$z();
  return this;
},
 multiply$2: function(a, b) {
  var a11 = a.get$n11();
  if (typeof a11 !== 'number')
    return this.multiply$2$bailout(1, a, b, a11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a12 = a.get$n12();
  if (typeof a12 !== 'number')
    return this.multiply$2$bailout(2, a, b, a11, a12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a13 = a.get$n13();
  if (typeof a13 !== 'number')
    return this.multiply$2$bailout(3, a, b, a11, a12, a13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a14 = a.get$n14();
  if (typeof a14 !== 'number')
    return this.multiply$2$bailout(4, a, b, a11, a12, a13, a14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a21 = a.get$n21();
  if (typeof a21 !== 'number')
    return this.multiply$2$bailout(5, a, b, a11, a12, a13, a14, a21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a22 = a.get$n22();
  if (typeof a22 !== 'number')
    return this.multiply$2$bailout(6, a, b, a11, a12, a13, a14, a21, a22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a23 = a.get$n23();
  if (typeof a23 !== 'number')
    return this.multiply$2$bailout(7, a, b, a11, a12, a13, a14, a21, a22, a23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a24 = a.get$n24();
  if (typeof a24 !== 'number')
    return this.multiply$2$bailout(8, a, b, a11, a12, a13, a14, a21, a22, a23, a24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a31 = a.get$n31();
  if (typeof a31 !== 'number')
    return this.multiply$2$bailout(9, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a32 = a.get$n32();
  if (typeof a32 !== 'number')
    return this.multiply$2$bailout(10, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a33 = a.get$n33();
  if (typeof a33 !== 'number')
    return this.multiply$2$bailout(11, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a34 = a.get$n34();
  if (typeof a34 !== 'number')
    return this.multiply$2$bailout(12, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a41 = a.get$n41();
  if (typeof a41 !== 'number')
    return this.multiply$2$bailout(13, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a42 = a.get$n42();
  if (typeof a42 !== 'number')
    return this.multiply$2$bailout(14, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a43 = a.get$n43();
  if (typeof a43 !== 'number')
    return this.multiply$2$bailout(15, a, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var a44 = a.get$n44();
  if (typeof a44 !== 'number')
    return this.multiply$2$bailout(16, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b11 = b.get$n11();
  if (typeof b11 !== 'number')
    return this.multiply$2$bailout(17, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b12 = b.get$n12();
  if (typeof b12 !== 'number')
    return this.multiply$2$bailout(18, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b13 = b.get$n13();
  if (typeof b13 !== 'number')
    return this.multiply$2$bailout(19, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b14 = b.get$n14();
  if (typeof b14 !== 'number')
    return this.multiply$2$bailout(20, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b21 = b.get$n21();
  if (typeof b21 !== 'number')
    return this.multiply$2$bailout(21, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b22 = b.get$n22();
  if (typeof b22 !== 'number')
    return this.multiply$2$bailout(22, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var b23 = b.get$n23();
  if (typeof b23 !== 'number')
    return this.multiply$2$bailout(23, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, 0, 0, 0, 0, 0, 0, 0, 0);
  var b24 = b.get$n24();
  if (typeof b24 !== 'number')
    return this.multiply$2$bailout(24, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, 0, 0, 0, 0, 0, 0, 0);
  var b31 = b.get$n31();
  if (typeof b31 !== 'number')
    return this.multiply$2$bailout(25, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, 0, 0, 0, 0, 0, 0);
  var b32 = b.get$n32();
  if (typeof b32 !== 'number')
    return this.multiply$2$bailout(26, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, 0, 0, 0, 0, 0);
  var b33 = b.get$n33();
  if (typeof b33 !== 'number')
    return this.multiply$2$bailout(27, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, 0, 0, 0, 0);
  var b34 = b.get$n34();
  if (typeof b34 !== 'number')
    return this.multiply$2$bailout(28, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, 0, 0, 0);
  var b41 = b.get$n41();
  if (typeof b41 !== 'number')
    return this.multiply$2$bailout(29, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, b41, 0, 0);
  var b42 = b.get$n42();
  if (typeof b42 !== 'number')
    return this.multiply$2$bailout(30, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, b41, b42, 0);
  var b43 = b.get$n43();
  if (typeof b43 !== 'number')
    return this.multiply$2$bailout(31, b, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, b41, b42, b43);
  var b44 = b.get$n44();
  if (typeof b44 !== 'number')
    return this.multiply$2$bailout(32, a11, a12, a13, a14, a21, a22, a23, a24, a31, a32, a33, a34, a41, a42, a43, a44, b11, b12, b13, b14, b21, b22, b23, b24, b31, b32, b33, b34, b41, b42, b43, b44);
  this.n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
  this.n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
  this.n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
  this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
  this.n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
  this.n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
  this.n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
  this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
  this.n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
  this.n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
  this.n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
  this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
  this.n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
  this.n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
  this.n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
  this.n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
  return this;
},
 multiply$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28, env29, env30, env31) {
  switch (state) {
    case 1:
      var a = env0;
      var b = env1;
      a11 = env2;
      break;
    case 2:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      break;
    case 3:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      break;
    case 4:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      break;
    case 5:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      break;
    case 6:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      break;
    case 7:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      break;
    case 8:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      break;
    case 9:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      break;
    case 10:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      break;
    case 11:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      a33 = env12;
      break;
    case 12:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      a33 = env12;
      a34 = env13;
      break;
    case 13:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      a33 = env12;
      a34 = env13;
      a41 = env14;
      break;
    case 14:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      a33 = env12;
      a34 = env13;
      a41 = env14;
      a42 = env15;
      break;
    case 15:
      a = env0;
      b = env1;
      a11 = env2;
      a12 = env3;
      a13 = env4;
      a14 = env5;
      a21 = env6;
      a22 = env7;
      a23 = env8;
      a24 = env9;
      a31 = env10;
      a32 = env11;
      a33 = env12;
      a34 = env13;
      a41 = env14;
      a42 = env15;
      a43 = env16;
      break;
    case 16:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      break;
    case 17:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      break;
    case 18:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      break;
    case 19:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      break;
    case 20:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      break;
    case 21:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      break;
    case 22:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      break;
    case 23:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      break;
    case 24:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      break;
    case 25:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      break;
    case 26:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      break;
    case 27:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      b33 = env27;
      break;
    case 28:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      b33 = env27;
      b34 = env28;
      break;
    case 29:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      b33 = env27;
      b34 = env28;
      b41 = env29;
      break;
    case 30:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      b33 = env27;
      b34 = env28;
      b41 = env29;
      b42 = env30;
      break;
    case 31:
      b = env0;
      a11 = env1;
      a12 = env2;
      a13 = env3;
      a14 = env4;
      a21 = env5;
      a22 = env6;
      a23 = env7;
      a24 = env8;
      a31 = env9;
      a32 = env10;
      a33 = env11;
      a34 = env12;
      a41 = env13;
      a42 = env14;
      a43 = env15;
      a44 = env16;
      b11 = env17;
      b12 = env18;
      b13 = env19;
      b14 = env20;
      b21 = env21;
      b22 = env22;
      b23 = env23;
      b24 = env24;
      b31 = env25;
      b32 = env26;
      b33 = env27;
      b34 = env28;
      b41 = env29;
      b42 = env30;
      b43 = env31;
      break;
    case 32:
      a11 = env0;
      a12 = env1;
      a13 = env2;
      a14 = env3;
      a21 = env4;
      a22 = env5;
      a23 = env6;
      a24 = env7;
      a31 = env8;
      a32 = env9;
      a33 = env10;
      a34 = env11;
      a41 = env12;
      a42 = env13;
      a43 = env14;
      a44 = env15;
      b11 = env16;
      b12 = env17;
      b13 = env18;
      b14 = env19;
      b21 = env20;
      b22 = env21;
      b23 = env22;
      b24 = env23;
      b31 = env24;
      b32 = env25;
      b33 = env26;
      b34 = env27;
      b41 = env28;
      b42 = env29;
      b43 = env30;
      b44 = env31;
      break;
  }
  switch (state) {
    case 0:
      var a11 = a.get$n11();
    case 1:
      state = 0;
      var a12 = a.get$n12();
    case 2:
      state = 0;
      var a13 = a.get$n13();
    case 3:
      state = 0;
      var a14 = a.get$n14();
    case 4:
      state = 0;
      var a21 = a.get$n21();
    case 5:
      state = 0;
      var a22 = a.get$n22();
    case 6:
      state = 0;
      var a23 = a.get$n23();
    case 7:
      state = 0;
      var a24 = a.get$n24();
    case 8:
      state = 0;
      var a31 = a.get$n31();
    case 9:
      state = 0;
      var a32 = a.get$n32();
    case 10:
      state = 0;
      var a33 = a.get$n33();
    case 11:
      state = 0;
      var a34 = a.get$n34();
    case 12:
      state = 0;
      var a41 = a.get$n41();
    case 13:
      state = 0;
      var a42 = a.get$n42();
    case 14:
      state = 0;
      var a43 = a.get$n43();
    case 15:
      state = 0;
      var a44 = a.get$n44();
    case 16:
      state = 0;
      var b11 = b.get$n11();
    case 17:
      state = 0;
      var b12 = b.get$n12();
    case 18:
      state = 0;
      var b13 = b.get$n13();
    case 19:
      state = 0;
      var b14 = b.get$n14();
    case 20:
      state = 0;
      var b21 = b.get$n21();
    case 21:
      state = 0;
      var b22 = b.get$n22();
    case 22:
      state = 0;
      var b23 = b.get$n23();
    case 23:
      state = 0;
      var b24 = b.get$n24();
    case 24:
      state = 0;
      var b31 = b.get$n31();
    case 25:
      state = 0;
      var b32 = b.get$n32();
    case 26:
      state = 0;
      var b33 = b.get$n33();
    case 27:
      state = 0;
      var b34 = b.get$n34();
    case 28:
      state = 0;
      var b41 = b.get$n41();
    case 29:
      state = 0;
      var b42 = b.get$n42();
    case 30:
      state = 0;
      var b43 = b.get$n43();
    case 31:
      state = 0;
      var b44 = b.get$n44();
    case 32:
      state = 0;
      this.n11 = $.add($.add($.add($.mul(a11, b11), $.mul(a12, b21)), $.mul(a13, b31)), $.mul(a14, b41));
      this.n12 = $.add($.add($.add($.mul(a11, b12), $.mul(a12, b22)), $.mul(a13, b32)), $.mul(a14, b42));
      this.n13 = $.add($.add($.add($.mul(a11, b13), $.mul(a12, b23)), $.mul(a13, b33)), $.mul(a14, b43));
      this.n14 = $.add($.add($.add($.mul(a11, b14), $.mul(a12, b24)), $.mul(a13, b34)), $.mul(a14, b44));
      this.n21 = $.add($.add($.add($.mul(a21, b11), $.mul(a22, b21)), $.mul(a23, b31)), $.mul(a24, b41));
      this.n22 = $.add($.add($.add($.mul(a21, b12), $.mul(a22, b22)), $.mul(a23, b32)), $.mul(a24, b42));
      this.n23 = $.add($.add($.add($.mul(a21, b13), $.mul(a22, b23)), $.mul(a23, b33)), $.mul(a24, b43));
      this.n24 = $.add($.add($.add($.mul(a21, b14), $.mul(a22, b24)), $.mul(a23, b34)), $.mul(a24, b44));
      this.n31 = $.add($.add($.add($.mul(a31, b11), $.mul(a32, b21)), $.mul(a33, b31)), $.mul(a34, b41));
      this.n32 = $.add($.add($.add($.mul(a31, b12), $.mul(a32, b22)), $.mul(a33, b32)), $.mul(a34, b42));
      this.n33 = $.add($.add($.add($.mul(a31, b13), $.mul(a32, b23)), $.mul(a33, b33)), $.mul(a34, b43));
      this.n34 = $.add($.add($.add($.mul(a31, b14), $.mul(a32, b24)), $.mul(a33, b34)), $.mul(a34, b44));
      this.n41 = $.add($.add($.add($.mul(a41, b11), $.mul(a42, b21)), $.mul(a43, b31)), $.mul(a44, b41));
      this.n42 = $.add($.add($.add($.mul(a41, b12), $.mul(a42, b22)), $.mul(a43, b32)), $.mul(a44, b42));
      this.n43 = $.add($.add($.add($.mul(a41, b13), $.mul(a42, b23)), $.mul(a43, b33)), $.mul(a44, b43));
      this.n44 = $.add($.add($.add($.mul(a41, b14), $.mul(a42, b24)), $.mul(a43, b34)), $.mul(a44, b44));
      return this;
  }
},
 multiplyScalar$1: function(s) {
  this.n11 = $.mul(this.n11, s);
  this.n12 = $.mul(this.n12, s);
  this.n13 = $.mul(this.n13, s);
  this.n14 = $.mul(this.n14, s);
  this.n21 = $.mul(this.n21, s);
  this.n22 = $.mul(this.n22, s);
  this.n23 = $.mul(this.n23, s);
  this.n24 = $.mul(this.n24, s);
  this.n31 = $.mul(this.n31, s);
  this.n32 = $.mul(this.n32, s);
  this.n33 = $.mul(this.n33, s);
  this.n34 = $.mul(this.n34, s);
  this.n41 = $.mul(this.n41, s);
  this.n42 = $.mul(this.n42, s);
  this.n43 = $.mul(this.n43, s);
  this.n44 = $.mul(this.n44, s);
  return this;
},
 multiplyVector3$1: function(v) {
  var vx = v.get$x();
  if (typeof vx !== 'number')
    return this.multiplyVector3$1$bailout(1, v, vx, 0, 0, 0, 0, 0);
  var vy = v.get$y();
  if (typeof vy !== 'number')
    return this.multiplyVector3$1$bailout(2, v, vx, vy, 0, 0, 0, 0);
  var vz = v.get$z();
  if (typeof vz !== 'number')
    return this.multiplyVector3$1$bailout(3, v, vx, vy, vz, 0, 0, 0);
  var t4 = this.n41;
  if (typeof t4 !== 'number')
    return this.multiplyVector3$1$bailout(4, v, vx, vy, vz, t4, 0, 0);
  t4 *= vx;
  var t6 = this.n42;
  if (typeof t6 !== 'number')
    return this.multiplyVector3$1$bailout(5, v, vx, vy, vz, t6, t4, 0);
  t4 += t6 * vy;
  var t8 = this.n43;
  if (typeof t8 !== 'number')
    return this.multiplyVector3$1$bailout(6, v, vx, vy, vz, t8, t4, 0);
  t4 += t8 * vz;
  var t10 = this.n44;
  if (typeof t10 !== 'number')
    return this.multiplyVector3$1$bailout(7, v, vx, vy, vz, t4, t10, 0);
  var d = 1 / (t4 + t10);
  var t12 = this.n11;
  if (typeof t12 !== 'number')
    return this.multiplyVector3$1$bailout(8, v, vx, vy, vz, d, t12, 0);
  t12 *= vx;
  var t14 = this.n12;
  if (typeof t14 !== 'number')
    return this.multiplyVector3$1$bailout(9, v, vx, vy, vz, d, t14, t12);
  t12 += t14 * vy;
  var t16 = this.n13;
  if (typeof t16 !== 'number')
    return this.multiplyVector3$1$bailout(10, v, t12, vx, vy, vz, d, t16);
  t12 += t16 * vz;
  var t18 = this.n14;
  if (typeof t18 !== 'number')
    return this.multiplyVector3$1$bailout(11, v, vx, vy, vz, t12, d, t18);
  v.set$x((t12 + t18) * d);
  var t20 = this.n21;
  if (typeof t20 !== 'number')
    return this.multiplyVector3$1$bailout(12, v, vx, vy, vz, d, t20, 0);
  t20 *= vx;
  var t22 = this.n22;
  if (typeof t22 !== 'number')
    return this.multiplyVector3$1$bailout(13, v, vx, vy, vz, d, t22, t20);
  t20 += t22 * vy;
  var t24 = this.n23;
  if (typeof t24 !== 'number')
    return this.multiplyVector3$1$bailout(14, v, vx, vy, vz, t20, d, t24);
  t20 += t24 * vz;
  var t26 = this.n24;
  if (typeof t26 !== 'number')
    return this.multiplyVector3$1$bailout(15, v, vx, vy, vz, d, t20, t26);
  v.set$y((t20 + t26) * d);
  var t28 = this.n31;
  if (typeof t28 !== 'number')
    return this.multiplyVector3$1$bailout(16, v, t28, vx, vy, vz, d, 0);
  t28 *= vx;
  var t30 = this.n32;
  if (typeof t30 !== 'number')
    return this.multiplyVector3$1$bailout(17, v, t28, t30, vy, vz, d, 0);
  t28 += t30 * vy;
  var t32 = this.n33;
  if (typeof t32 !== 'number')
    return this.multiplyVector3$1$bailout(18, v, d, t32, vz, t28, 0, 0);
  t28 += t32 * vz;
  var t34 = this.n34;
  if (typeof t34 !== 'number')
    return this.multiplyVector3$1$bailout(19, v, d, t28, t34, 0, 0, 0);
  v.set$z((t28 + t34) * d);
  return v;
},
 multiplyVector3$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var v = env0;
      vx = env1;
      break;
    case 2:
      v = env0;
      vx = env1;
      vy = env2;
      break;
    case 3:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      break;
    case 4:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t4 = env4;
      break;
    case 5:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t6 = env4;
      t4 = env5;
      break;
    case 6:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t8 = env4;
      t4 = env5;
      break;
    case 7:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t4 = env4;
      t10 = env5;
      break;
    case 8:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      d = env4;
      t10 = env5;
      break;
    case 9:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      d = env4;
      t12 = env5;
      t10 = env6;
      break;
    case 10:
      v = env0;
      t10 = env1;
      vx = env2;
      vy = env3;
      vz = env4;
      d = env5;
      t14 = env6;
      break;
    case 11:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t10 = env4;
      d = env5;
      t16 = env6;
      break;
    case 12:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      d = env4;
      t18 = env5;
      break;
    case 13:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      d = env4;
      t20 = env5;
      t18 = env6;
      break;
    case 14:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      t18 = env4;
      d = env5;
      t22 = env6;
      break;
    case 15:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      d = env4;
      t18 = env5;
      t24 = env6;
      break;
    case 16:
      v = env0;
      t26 = env1;
      vx = env2;
      vy = env3;
      vz = env4;
      d = env5;
      break;
    case 17:
      v = env0;
      t26 = env1;
      t28 = env2;
      vy = env3;
      vz = env4;
      d = env5;
      break;
    case 18:
      v = env0;
      d = env1;
      t30 = env2;
      vz = env3;
      t26 = env4;
      break;
    case 19:
      v = env0;
      d = env1;
      t26 = env2;
      t32 = env3;
      break;
  }
  switch (state) {
    case 0:
      var vx = v.get$x();
    case 1:
      state = 0;
      var vy = v.get$y();
    case 2:
      state = 0;
      var vz = v.get$z();
    case 3:
      state = 0;
      var t4 = this.n41;
    case 4:
      state = 0;
      t4 = $.mul(t4, vx);
      var t6 = this.n42;
    case 5:
      state = 0;
      t4 = $.add(t4, $.mul(t6, vy));
      var t8 = this.n43;
    case 6:
      state = 0;
      t4 = $.add(t4, $.mul(t8, vz));
      var t10 = this.n44;
    case 7:
      state = 0;
      t10 = $.add(t4, t10);
      if (typeof t10 !== 'number')
        throw $.iae(t10);
      var d = 1 / t10;
      t10 = this.n11;
    case 8:
      state = 0;
      t10 = $.mul(t10, vx);
      var t12 = this.n12;
    case 9:
      state = 0;
      t10 = $.add(t10, $.mul(t12, vy));
      var t14 = this.n13;
    case 10:
      state = 0;
      t10 = $.add(t10, $.mul(t14, vz));
      var t16 = this.n14;
    case 11:
      state = 0;
      v.set$x($.mul($.add(t10, t16), d));
      var t18 = this.n21;
    case 12:
      state = 0;
      t18 = $.mul(t18, vx);
      var t20 = this.n22;
    case 13:
      state = 0;
      t18 = $.add(t18, $.mul(t20, vy));
      var t22 = this.n23;
    case 14:
      state = 0;
      t18 = $.add(t18, $.mul(t22, vz));
      var t24 = this.n24;
    case 15:
      state = 0;
      v.set$y($.mul($.add(t18, t24), d));
      var t26 = this.n31;
    case 16:
      state = 0;
      t26 = $.mul(t26, vx);
      var t28 = this.n32;
    case 17:
      state = 0;
      t26 = $.add(t26, $.mul(t28, vy));
      var t30 = this.n33;
    case 18:
      state = 0;
      t26 = $.add(t26, $.mul(t30, vz));
      var t32 = this.n34;
    case 19:
      state = 0;
      v.set$z($.mul($.add(t26, t32), d));
      return v;
  }
},
 multiplyVector4$1: function(v) {
  var vx = v.get$x();
  if (typeof vx !== 'number')
    return this.multiplyVector4$1$bailout(1, v, vx, 0, 0, 0, 0, 0);
  var vy = v.get$y();
  if (typeof vy !== 'number')
    return this.multiplyVector4$1$bailout(2, v, vx, vy, 0, 0, 0, 0);
  var vz = v.get$z();
  if (typeof vz !== 'number')
    return this.multiplyVector4$1$bailout(3, v, vx, vy, vz, 0, 0, 0);
  var vw = v.get$w();
  if (typeof vw !== 'number')
    return this.multiplyVector4$1$bailout(4, v, vx, vy, vz, vw, 0, 0);
  var t5 = this.n11;
  if (typeof t5 !== 'number')
    return this.multiplyVector4$1$bailout(5, v, vx, vy, vz, vw, t5, 0);
  t5 *= vx;
  var t7 = this.n12;
  if (typeof t7 !== 'number')
    return this.multiplyVector4$1$bailout(6, v, vx, vy, vz, vw, t7, t5);
  t5 += t7 * vy;
  var t9 = this.n13;
  if (typeof t9 !== 'number')
    return this.multiplyVector4$1$bailout(7, v, vx, vy, vz, vw, t9, t5);
  t5 += t9 * vz;
  var t11 = this.n14;
  if (typeof t11 !== 'number')
    return this.multiplyVector4$1$bailout(8, v, vx, vy, vz, vw, t11, t5);
  v.set$x(t5 + t11 * vw);
  var t13 = this.n21;
  if (typeof t13 !== 'number')
    return this.multiplyVector4$1$bailout(9, v, vx, vy, vz, vw, t13, 0);
  t13 *= vx;
  var t15 = this.n22;
  if (typeof t15 !== 'number')
    return this.multiplyVector4$1$bailout(10, v, vx, vy, vz, vw, t15, t13);
  t13 += t15 * vy;
  var t17 = this.n23;
  if (typeof t17 !== 'number')
    return this.multiplyVector4$1$bailout(11, v, t13, vx, vy, vz, vw, t17);
  t13 += t17 * vz;
  var t19 = this.n24;
  if (typeof t19 !== 'number')
    return this.multiplyVector4$1$bailout(12, v, vx, vy, vz, vw, t13, t19);
  v.set$y(t13 + t19 * vw);
  var t21 = this.n31;
  if (typeof t21 !== 'number')
    return this.multiplyVector4$1$bailout(13, v, vx, vy, vz, vw, t21, 0);
  t21 *= vx;
  var t23 = this.n32;
  if (typeof t23 !== 'number')
    return this.multiplyVector4$1$bailout(14, v, vx, vy, vz, vw, t23, t21);
  t21 += t23 * vy;
  var t25 = this.n33;
  if (typeof t25 !== 'number')
    return this.multiplyVector4$1$bailout(15, v, vx, vy, vz, vw, t21, t25);
  t21 += t25 * vz;
  var t27 = this.n34;
  if (typeof t27 !== 'number')
    return this.multiplyVector4$1$bailout(16, v, t27, vx, vy, vz, vw, t21);
  v.set$z(t21 + t27 * vw);
  var t29 = this.n41;
  if (typeof t29 !== 'number')
    return this.multiplyVector4$1$bailout(17, v, t29, vx, vy, vz, vw, 0);
  t29 *= vx;
  var t31 = this.n42;
  if (typeof t31 !== 'number')
    return this.multiplyVector4$1$bailout(18, v, t29, t31, vy, vz, vw, 0);
  t29 += t31 * vy;
  var t33 = this.n43;
  if (typeof t33 !== 'number')
    return this.multiplyVector4$1$bailout(19, v, t33, vz, vw, t29, 0, 0);
  t29 += t33 * vz;
  var t35 = this.n44;
  if (typeof t35 !== 'number')
    return this.multiplyVector4$1$bailout(20, v, t29, t35, vw, 0, 0, 0);
  v.set$w(t29 + t35 * vw);
  return v;
},
 multiplyVector4$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var v = env0;
      vx = env1;
      break;
    case 2:
      v = env0;
      vx = env1;
      vy = env2;
      break;
    case 3:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      break;
    case 4:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      break;
    case 5:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t5 = env5;
      break;
    case 6:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t7 = env5;
      t5 = env6;
      break;
    case 7:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t9 = env5;
      t5 = env6;
      break;
    case 8:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t11 = env5;
      t5 = env6;
      break;
    case 9:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t13 = env5;
      break;
    case 10:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t15 = env5;
      t13 = env6;
      break;
    case 11:
      v = env0;
      t13 = env1;
      vx = env2;
      vy = env3;
      vz = env4;
      vw = env5;
      t17 = env6;
      break;
    case 12:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t13 = env5;
      t19 = env6;
      break;
    case 13:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t21 = env5;
      break;
    case 14:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t23 = env5;
      t21 = env6;
      break;
    case 15:
      v = env0;
      vx = env1;
      vy = env2;
      vz = env3;
      vw = env4;
      t21 = env5;
      t25 = env6;
      break;
    case 16:
      v = env0;
      t27 = env1;
      vx = env2;
      vy = env3;
      vz = env4;
      vw = env5;
      t21 = env6;
      break;
    case 17:
      v = env0;
      t29 = env1;
      vx = env2;
      vy = env3;
      vz = env4;
      vw = env5;
      break;
    case 18:
      v = env0;
      t29 = env1;
      t31 = env2;
      vy = env3;
      vz = env4;
      vw = env5;
      break;
    case 19:
      v = env0;
      t33 = env1;
      vz = env2;
      vw = env3;
      t29 = env4;
      break;
    case 20:
      v = env0;
      t29 = env1;
      t35 = env2;
      vw = env3;
      break;
  }
  switch (state) {
    case 0:
      var vx = v.get$x();
    case 1:
      state = 0;
      var vy = v.get$y();
    case 2:
      state = 0;
      var vz = v.get$z();
    case 3:
      state = 0;
      var vw = v.get$w();
    case 4:
      state = 0;
      var t5 = this.n11;
    case 5:
      state = 0;
      t5 = $.mul(t5, vx);
      var t7 = this.n12;
    case 6:
      state = 0;
      t5 = $.add(t5, $.mul(t7, vy));
      var t9 = this.n13;
    case 7:
      state = 0;
      t5 = $.add(t5, $.mul(t9, vz));
      var t11 = this.n14;
    case 8:
      state = 0;
      v.set$x($.add(t5, $.mul(t11, vw)));
      var t13 = this.n21;
    case 9:
      state = 0;
      t13 = $.mul(t13, vx);
      var t15 = this.n22;
    case 10:
      state = 0;
      t13 = $.add(t13, $.mul(t15, vy));
      var t17 = this.n23;
    case 11:
      state = 0;
      t13 = $.add(t13, $.mul(t17, vz));
      var t19 = this.n24;
    case 12:
      state = 0;
      v.set$y($.add(t13, $.mul(t19, vw)));
      var t21 = this.n31;
    case 13:
      state = 0;
      t21 = $.mul(t21, vx);
      var t23 = this.n32;
    case 14:
      state = 0;
      t21 = $.add(t21, $.mul(t23, vy));
      var t25 = this.n33;
    case 15:
      state = 0;
      t21 = $.add(t21, $.mul(t25, vz));
      var t27 = this.n34;
    case 16:
      state = 0;
      v.set$z($.add(t21, $.mul(t27, vw)));
      var t29 = this.n41;
    case 17:
      state = 0;
      t29 = $.mul(t29, vx);
      var t31 = this.n42;
    case 18:
      state = 0;
      t29 = $.add(t29, $.mul(t31, vy));
      var t33 = this.n43;
    case 19:
      state = 0;
      t29 = $.add(t29, $.mul(t33, vz));
      var t35 = this.n44;
    case 20:
      state = 0;
      v.set$w($.add(t29, $.mul(t35, vw)));
      return v;
  }
},
 rotateAxis$1: function(v) {
  var vx = v.get$x();
  var vy = v.get$y();
  var vz = v.get$z();
  v.set$x($.add($.add($.mul(vx, this.n11), $.mul(vy, this.n12)), $.mul(vz, this.n13)));
  v.set$y($.add($.add($.mul(vx, this.n21), $.mul(vy, this.n22)), $.mul(vz, this.n23)));
  v.set$z($.add($.add($.mul(vx, this.n31), $.mul(vy, this.n32)), $.mul(vz, this.n33)));
  v.normalize$0();
  return v;
},
 determinant$0: function() {
  var m11 = this.n11;
  var m12 = this.n12;
  var m13 = this.n13;
  var m14 = this.n14;
  var m21 = this.n21;
  var m22 = this.n22;
  var m23 = this.n23;
  var m24 = this.n24;
  var m31 = this.n31;
  var m32 = this.n32;
  var m33 = this.n33;
  var m34 = this.n34;
  var m41 = this.n41;
  var m42 = this.n42;
  var m43 = this.n43;
  var m44 = this.n44;
  return $.add($.sub($.sub($.add($.add($.sub($.sub($.add($.add($.sub($.sub($.add($.add($.sub($.sub($.add($.add($.sub($.sub($.add($.add($.sub($.sub($.mul($.mul($.mul(m14, m23), m32), m41), $.mul($.mul($.mul(m13, m24), m32), m41)), $.mul($.mul($.mul(m14, m22), m33), m41)), $.mul($.mul($.mul(m12, m24), m33), m41)), $.mul($.mul($.mul(m13, m22), m34), m41)), $.mul($.mul($.mul(m12, m23), m34), m41)), $.mul($.mul($.mul(m14, m23), m31), m42)), $.mul($.mul($.mul(m13, m24), m31), m42)), $.mul($.mul($.mul(m14, m21), m33), m42)), $.mul($.mul($.mul(m11, m24), m33), m42)), $.mul($.mul($.mul(m13, m21), m34), m42)), $.mul($.mul($.mul(m11, m23), m34), m42)), $.mul($.mul($.mul(m14, m22), m31), m43)), $.mul($.mul($.mul(m12, m24), m31), m43)), $.mul($.mul($.mul(m14, m21), m32), m43)), $.mul($.mul($.mul(m11, m24), m32), m43)), $.mul($.mul($.mul(m12, m21), m34), m43)), $.mul($.mul($.mul(m11, m22), m34), m43)), $.mul($.mul($.mul(m13, m22), m31), m44)), $.mul($.mul($.mul(m12, m23), m31), m44)), $.mul($.mul($.mul(m13, m21), m32), m44)), $.mul($.mul($.mul(m11, m23), m32), m44)), $.mul($.mul($.mul(m12, m21), m33), m44)), $.mul($.mul($.mul(m11, m22), m33), m44));
},
 flattenToArray$1: function(flat) {
  $.indexSet(flat, 0, this.n11);
  $.indexSet(flat, 1, this.n21);
  $.indexSet(flat, 2, this.n31);
  $.indexSet(flat, 3, this.n41);
  $.indexSet(flat, 4, this.n12);
  $.indexSet(flat, 5, this.n22);
  $.indexSet(flat, 6, this.n32);
  $.indexSet(flat, 7, this.n42);
  $.indexSet(flat, 8, this.n13);
  $.indexSet(flat, 9, this.n23);
  $.indexSet(flat, 10, this.n33);
  $.indexSet(flat, 11, this.n43);
  $.indexSet(flat, 12, this.n14);
  $.indexSet(flat, 13, this.n24);
  $.indexSet(flat, 14, this.n34);
  $.indexSet(flat, 15, this.n44);
  return flat;
},
 get$elements: function() {
  var array = $._TypedArrayFactoryProvider_Float32Array(16);
  this.flattenToArray$1(array);
  return array;
},
 setPosition$1: function(v) {
  this.n14 = v.get$x();
  this.n24 = v.get$y();
  this.n34 = v.get$z();
  return this;
},
 getPosition$0: function() {
  return $.Matrix4___v1.setValues$3(this.n14, this.n24, this.n34);
},
 getColumnX$0: function() {
  return $.Matrix4___v1.setValues$3(this.n11, this.n21, this.n31);
},
 getColumnY$0: function() {
  return $.Matrix4___v1.setValues$3(this.n12, this.n22, this.n32);
},
 getColumnZ$0: function() {
  return $.Matrix4___v1.setValues$3(this.n13, this.n23, this.n33);
},
 getInverse$1: function(m) {
  var _n11 = m.get$n11();
  var _n12 = m.get$n12();
  var _n13 = m.get$n13();
  var _n14 = m.get$n14();
  var _n21 = m.get$n21();
  var _n22 = m.get$n22();
  var _n23 = m.get$n23();
  var _n24 = m.get$n24();
  var _n31 = m.get$n31();
  var _n32 = m.get$n32();
  var _n33 = m.get$n33();
  var _n34 = m.get$n34();
  var _n41 = m.get$n41();
  var _n42 = m.get$n42();
  var _n43 = m.get$n43();
  var _n44 = m.get$n44();
  this.n11 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n23, _n34), _n42), $.mul($.mul(_n24, _n33), _n42)), $.mul($.mul(_n24, _n32), _n43)), $.mul($.mul(_n22, _n34), _n43)), $.mul($.mul(_n23, _n32), _n44)), $.mul($.mul(_n22, _n33), _n44));
  this.n12 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n14, _n33), _n42), $.mul($.mul(_n13, _n34), _n42)), $.mul($.mul(_n14, _n32), _n43)), $.mul($.mul(_n12, _n34), _n43)), $.mul($.mul(_n13, _n32), _n44)), $.mul($.mul(_n12, _n33), _n44));
  this.n13 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n13, _n24), _n42), $.mul($.mul(_n14, _n23), _n42)), $.mul($.mul(_n14, _n22), _n43)), $.mul($.mul(_n12, _n24), _n43)), $.mul($.mul(_n13, _n22), _n44)), $.mul($.mul(_n12, _n23), _n44));
  this.n14 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n14, _n23), _n32), $.mul($.mul(_n13, _n24), _n32)), $.mul($.mul(_n14, _n22), _n33)), $.mul($.mul(_n12, _n24), _n33)), $.mul($.mul(_n13, _n22), _n34)), $.mul($.mul(_n12, _n23), _n34));
  this.n21 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n24, _n33), _n41), $.mul($.mul(_n23, _n34), _n41)), $.mul($.mul(_n24, _n31), _n43)), $.mul($.mul(_n21, _n34), _n43)), $.mul($.mul(_n23, _n31), _n44)), $.mul($.mul(_n21, _n33), _n44));
  this.n22 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n13, _n34), _n41), $.mul($.mul(_n14, _n33), _n41)), $.mul($.mul(_n14, _n31), _n43)), $.mul($.mul(_n11, _n34), _n43)), $.mul($.mul(_n13, _n31), _n44)), $.mul($.mul(_n11, _n33), _n44));
  this.n23 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n14, _n23), _n41), $.mul($.mul(_n13, _n24), _n41)), $.mul($.mul(_n14, _n21), _n43)), $.mul($.mul(_n11, _n24), _n43)), $.mul($.mul(_n13, _n21), _n44)), $.mul($.mul(_n11, _n23), _n44));
  this.n24 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n13, _n24), _n31), $.mul($.mul(_n14, _n23), _n31)), $.mul($.mul(_n14, _n21), _n33)), $.mul($.mul(_n11, _n24), _n33)), $.mul($.mul(_n13, _n21), _n34)), $.mul($.mul(_n11, _n23), _n34));
  this.n31 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n22, _n34), _n41), $.mul($.mul(_n24, _n32), _n41)), $.mul($.mul(_n24, _n31), _n42)), $.mul($.mul(_n21, _n34), _n42)), $.mul($.mul(_n22, _n31), _n44)), $.mul($.mul(_n21, _n32), _n44));
  this.n32 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n14, _n32), _n41), $.mul($.mul(_n12, _n34), _n41)), $.mul($.mul(_n14, _n31), _n42)), $.mul($.mul(_n11, _n34), _n42)), $.mul($.mul(_n12, _n31), _n44)), $.mul($.mul(_n11, _n32), _n44));
  this.n33 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n12, _n24), _n41), $.mul($.mul(_n14, _n22), _n41)), $.mul($.mul(_n14, _n21), _n42)), $.mul($.mul(_n11, _n24), _n42)), $.mul($.mul(_n12, _n21), _n44)), $.mul($.mul(_n11, _n22), _n44));
  this.n34 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n14, _n22), _n31), $.mul($.mul(_n12, _n24), _n31)), $.mul($.mul(_n14, _n21), _n32)), $.mul($.mul(_n11, _n24), _n32)), $.mul($.mul(_n12, _n21), _n34)), $.mul($.mul(_n11, _n22), _n34));
  this.n41 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n23, _n32), _n41), $.mul($.mul(_n22, _n33), _n41)), $.mul($.mul(_n23, _n31), _n42)), $.mul($.mul(_n21, _n33), _n42)), $.mul($.mul(_n22, _n31), _n43)), $.mul($.mul(_n21, _n32), _n43));
  this.n42 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n12, _n33), _n41), $.mul($.mul(_n13, _n32), _n41)), $.mul($.mul(_n13, _n31), _n42)), $.mul($.mul(_n11, _n33), _n42)), $.mul($.mul(_n12, _n31), _n43)), $.mul($.mul(_n11, _n32), _n43));
  this.n43 = $.sub($.add($.add($.sub($.sub($.mul($.mul(_n13, _n22), _n41), $.mul($.mul(_n12, _n23), _n41)), $.mul($.mul(_n13, _n21), _n42)), $.mul($.mul(_n11, _n23), _n42)), $.mul($.mul(_n12, _n21), _n43)), $.mul($.mul(_n11, _n22), _n43));
  this.n44 = $.add($.sub($.sub($.add($.sub($.mul($.mul(_n12, _n23), _n31), $.mul($.mul(_n13, _n22), _n31)), $.mul($.mul(_n13, _n21), _n32)), $.mul($.mul(_n11, _n23), _n32)), $.mul($.mul(_n12, _n21), _n33)), $.mul($.mul(_n11, _n22), _n33));
  var t1 = m.determinant$0();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  this.multiplyScalar$1(1 / t1);
  return this;
},
 setRotationFromEuler$2: function(v, order) {
  var x = v.get$x();
  var y = v.get$y();
  var z = v.get$z();
  var a = $.cos(x);
  var b = $.sin(x);
  var c = $.cos(y);
  var d = $.sin(y);
  var e = $.cos(z);
  var f = $.sin(z);
  switch (order) {
    case 'YXZ':
      var ce = c * e;
      var cf = c * f;
      var de = d * e;
      var df = d * f;
      this.n11 = ce + df * b;
      this.n12 = de * b - cf;
      this.n13 = a * d;
      this.n21 = a * f;
      this.n22 = a * e;
      this.n23 = -b;
      this.n31 = cf * b - de;
      this.n32 = df + ce * b;
      this.n33 = a * c;
      break;
    case 'ZXY':
      ce = c * e;
      cf = c * f;
      de = d * e;
      df = d * f;
      this.n11 = ce - df * b;
      var t1 = -a;
      this.n12 = t1 * f;
      this.n13 = de + cf * b;
      this.n21 = cf + de * b;
      this.n22 = a * e;
      this.n23 = df - ce * b;
      this.n31 = t1 * d;
      this.n32 = b;
      this.n33 = a * c;
      break;
    case 'ZYX':
      var ae = a * e;
      var af = a * f;
      var be = b * e;
      var bf = b * f;
      this.n11 = c * e;
      this.n12 = be * d - af;
      this.n13 = ae * d + bf;
      this.n21 = c * f;
      this.n22 = bf * d + ae;
      this.n23 = af * d - be;
      this.n31 = -d;
      this.n32 = b * c;
      this.n33 = a * c;
      break;
    case 'YZX':
      var ac = a * c;
      var ad = a * d;
      var bc = b * c;
      var bd = b * d;
      this.n11 = c * e;
      this.n12 = bd - ac * f;
      this.n13 = bc * f + ad;
      this.n21 = f;
      this.n22 = a * e;
      this.n23 = -b * e;
      this.n31 = -d * e;
      this.n32 = ad * f + bc;
      this.n33 = ac - bd * f;
      break;
    case 'XZY':
      ac = a * c;
      ad = a * d;
      bc = b * c;
      bd = b * d;
      this.n11 = c * e;
      this.n12 = -f;
      this.n13 = d * e;
      this.n21 = ac * f + bd;
      this.n22 = a * e;
      this.n23 = ad * f - bc;
      this.n31 = bc * f - ad;
      this.n32 = b * e;
      this.n33 = bd * f + ac;
      break;
    default:
      ae = a * e;
      af = a * f;
      be = b * e;
      bf = b * f;
      this.n11 = c * e;
      this.n12 = -c * f;
      this.n13 = d;
      this.n21 = af + be * d;
      this.n22 = ae - bf * d;
      this.n23 = -b * c;
      this.n31 = bf - ae * d;
      this.n32 = be + af * d;
      this.n33 = a * c;
      break;
  }
  return this;
},
 setRotationFromQuaternion$1: function(q) {
  var x = q.get$x();
  var y = q.get$y();
  var z = q.get$z();
  var w = q.get$w();
  var x2 = $.add(x, x);
  var y2 = $.add(y, y);
  var z2 = $.add(z, z);
  var xx = $.mul(x, x2);
  var xy = $.mul(x, y2);
  var xz = $.mul(x, z2);
  var yy = $.mul(y, y2);
  var yz = $.mul(y, z2);
  var zz = $.mul(z, z2);
  var wx = $.mul(w, x2);
  var wy = $.mul(w, y2);
  var wz = $.mul(w, z2);
  var t1 = $.add(yy, zz);
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  this.n11 = 1 - t1;
  this.n12 = $.sub(xy, wz);
  this.n13 = $.add(xz, wy);
  this.n21 = $.add(xy, wz);
  var t2 = $.add(xx, zz);
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  this.n22 = 1 - t2;
  this.n23 = $.sub(yz, wx);
  this.n31 = $.sub(xz, wy);
  this.n32 = $.add(yz, wx);
  var t3 = $.add(xx, yy);
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  this.n33 = 1 - t3;
  return this;
},
 scale$1: function(v) {
  var x = v.get$x();
  var y = v.get$y();
  var z = v.get$z();
  this.n11 = $.mul(this.n11, x);
  this.n12 = $.mul(this.n12, y);
  this.n13 = $.mul(this.n13, z);
  this.n21 = $.mul(this.n21, x);
  this.n22 = $.mul(this.n22, y);
  this.n23 = $.mul(this.n23, z);
  this.n31 = $.mul(this.n31, x);
  this.n32 = $.mul(this.n32, y);
  this.n33 = $.mul(this.n33, z);
  this.n41 = $.mul(this.n41, x);
  this.n42 = $.mul(this.n42, y);
  this.n43 = $.mul(this.n43, z);
  return this;
},
 get$scale: function() { return new $.BoundClosure0(this, 'scale$1'); },
 extractRotation$1: function(m) {
  var vector = $.Matrix4___v1;
  var t1 = vector.setValues$3(m.get$n11(), m.get$n21(), m.get$n31()).length$0();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var scaleX = 1 / t1;
  t1 = vector.setValues$3(m.get$n12(), m.get$n22(), m.get$n32()).length$0();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var scaleY = 1 / t1;
  t1 = vector.setValues$3(m.get$n13(), m.get$n23(), m.get$n33()).length$0();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var scaleZ = 1 / t1;
  t1 = m.get$n11();
  if (typeof t1 !== 'number')
    return this.extractRotation$1$bailout(1, m, scaleZ, scaleY, t1, scaleX);
  this.n11 = t1 * scaleX;
  var t3 = m.get$n21();
  if (typeof t3 !== 'number')
    return this.extractRotation$1$bailout(2, m, scaleZ, scaleY, scaleX, t3);
  this.n21 = t3 * scaleX;
  var t5 = m.get$n31();
  if (typeof t5 !== 'number')
    return this.extractRotation$1$bailout(3, m, scaleZ, scaleY, t5, scaleX);
  this.n31 = t5 * scaleX;
  var t7 = m.get$n12();
  if (typeof t7 !== 'number')
    return this.extractRotation$1$bailout(4, m, scaleZ, scaleY, t7, 0);
  this.n12 = t7 * scaleY;
  var t9 = m.get$n22();
  if (typeof t9 !== 'number')
    return this.extractRotation$1$bailout(5, m, scaleZ, scaleY, t9, 0);
  this.n22 = t9 * scaleY;
  var t11 = m.get$n32();
  if (typeof t11 !== 'number')
    return this.extractRotation$1$bailout(6, m, scaleZ, scaleY, t11, 0);
  this.n32 = t11 * scaleY;
  var t13 = m.get$n13();
  if (typeof t13 !== 'number')
    return this.extractRotation$1$bailout(7, m, scaleZ, t13, 0, 0);
  this.n13 = t13 * scaleZ;
  var t15 = m.get$n23();
  if (typeof t15 !== 'number')
    return this.extractRotation$1$bailout(8, m, scaleZ, t15, 0, 0);
  this.n23 = t15 * scaleZ;
  var t17 = m.get$n33();
  if (typeof t17 !== 'number')
    return this.extractRotation$1$bailout(9, scaleZ, t17, 0, 0, 0);
  this.n33 = t17 * scaleZ;
  return this;
},
 extractRotation$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var m = env0;
      scaleZ = env1;
      scaleY = env2;
      t1 = env3;
      scaleX = env4;
      break;
    case 2:
      m = env0;
      scaleZ = env1;
      scaleY = env2;
      scaleX = env3;
      t3 = env4;
      break;
    case 3:
      m = env0;
      scaleZ = env1;
      scaleY = env2;
      t5 = env3;
      scaleX = env4;
      break;
    case 4:
      m = env0;
      scaleZ = env1;
      scaleY = env2;
      t7 = env3;
      break;
    case 5:
      m = env0;
      scaleZ = env1;
      scaleY = env2;
      t9 = env3;
      break;
    case 6:
      m = env0;
      scaleZ = env1;
      scaleY = env2;
      t11 = env3;
      break;
    case 7:
      m = env0;
      scaleZ = env1;
      t13 = env2;
      break;
    case 8:
      m = env0;
      scaleZ = env1;
      t15 = env2;
      break;
    case 9:
      scaleZ = env0;
      t17 = env1;
      break;
  }
  switch (state) {
    case 0:
      var vector = $.Matrix4___v1;
      var t1 = vector.setValues$3(m.get$n11(), m.get$n21(), m.get$n31()).length$0();
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      var scaleX = 1 / t1;
      t1 = vector.setValues$3(m.get$n12(), m.get$n22(), m.get$n32()).length$0();
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      var scaleY = 1 / t1;
      t1 = vector.setValues$3(m.get$n13(), m.get$n23(), m.get$n33()).length$0();
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      var scaleZ = 1 / t1;
      t1 = m.get$n11();
    case 1:
      state = 0;
      this.n11 = $.mul(t1, scaleX);
      var t3 = m.get$n21();
    case 2:
      state = 0;
      this.n21 = $.mul(t3, scaleX);
      var t5 = m.get$n31();
    case 3:
      state = 0;
      this.n31 = $.mul(t5, scaleX);
      var t7 = m.get$n12();
    case 4:
      state = 0;
      this.n12 = $.mul(t7, scaleY);
      var t9 = m.get$n22();
    case 5:
      state = 0;
      this.n22 = $.mul(t9, scaleY);
      var t11 = m.get$n32();
    case 6:
      state = 0;
      this.n32 = $.mul(t11, scaleY);
      var t13 = m.get$n13();
    case 7:
      state = 0;
      this.n13 = $.mul(t13, scaleZ);
      var t15 = m.get$n23();
    case 8:
      state = 0;
      this.n23 = $.mul(t15, scaleZ);
      var t17 = m.get$n33();
    case 9:
      state = 0;
      this.n33 = $.mul(t17, scaleZ);
      return this;
  }
},
 Matrix4$createMatrices$16: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  this._flat = $.ListImplementation_List(null);
  this._m33 = $.Matrix3$();
},
 Matrix4$16: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  this._flat = $.ListImplementation_List(null);
  this._m33 = $.Matrix3$();
  if ($.Matrix4___v1 == null)
    $.Matrix4___v1 = $.Vector3$(0, 0, 0);
  if ($.Matrix4___v2 == null)
    $.Matrix4___v2 = $.Vector3$(0, 0, 0);
  if ($.Matrix4___v3 == null)
    $.Matrix4___v3 = $.Vector3$(0, 0, 0);
  if ($.Matrix4___m1 == null)
    $.Matrix4___m1 = $.Matrix4$createMatrices(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  if ($.Matrix4___m2 == null)
    $.Matrix4___m2 = $.Matrix4$createMatrices(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
}
};

$$.Quaternion = {"":
 ["x=", "y=", "z=", "w="],
 super: "Object",
 setValues$4: function(newX, newY, newZ, newW) {
  this.x = newX;
  this.y = newY;
  this.z = newZ;
  this.w = newW;
  return this;
},
 copy$1: function(q) {
  this.x = q.get$x();
  this.y = q.get$y();
  this.z = q.get$z();
  this.w = q.get$w();
  return this;
},
 length$0: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  t1 = $.add(t1, $.mul(t2, t2));
  var t3 = this.z;
  t1 = $.add(t1, $.mul(t3, t3));
  var t4 = this.w;
  return $.sqrt($.add(t1, $.mul(t4, t4)));
},
 get$length: function() { return new $.BoundClosure(this, 'length$0'); },
 normalize$0: function() {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.normalize$0$bailout(1, t1, 0);
  t1 *= t1;
  var t3 = this.y;
  if (typeof t3 !== 'number')
    return this.normalize$0$bailout(2, t1, t3);
  t1 += t3 * t3;
  var t5 = this.z;
  if (typeof t5 !== 'number')
    return this.normalize$0$bailout(3, t5, t1);
  t1 += t5 * t5;
  var t7 = this.w;
  if (typeof t7 !== 'number')
    return this.normalize$0$bailout(4, t1, t7);
  var l = $.sqrt(t1 + t7 * t7);
  if (l === 0) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  } else {
    l = 1 / l;
    t1 = this.x;
    if (typeof t1 !== 'number')
      return this.normalize$0$bailout(5, t1, l);
    this.x = t1 * l;
    t3 = this.y;
    if (typeof t3 !== 'number')
      return this.normalize$0$bailout(6, t3, l);
    this.y = t3 * l;
    t5 = this.z;
    if (typeof t5 !== 'number')
      return this.normalize$0$bailout(7, t5, l);
    this.z = t5 * l;
    t7 = this.w;
    if (typeof t7 !== 'number')
      return this.normalize$0$bailout(8, t7, l);
    this.w = t7 * l;
  }
  return this;
},
 normalize$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
    case 3:
      t5 = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      t7 = env1;
      break;
    case 5:
      t1 = env0;
      l = env1;
      break;
    case 6:
      t3 = env0;
      l = env1;
      break;
    case 7:
      t5 = env0;
      l = env1;
      break;
    case 8:
      t7 = env0;
      l = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      t1 = $.mul(t1, t1);
      var t3 = this.y;
    case 2:
      state = 0;
      t1 = $.add(t1, $.mul(t3, t3));
      var t5 = this.z;
    case 3:
      state = 0;
      t1 = $.add(t1, $.mul(t5, t5));
      var t7 = this.w;
    case 4:
      state = 0;
      var l = $.sqrt($.add(t1, $.mul(t7, t7)));
    default:
      if (state === 0 && l === 0) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
      } else
        switch (state) {
          case 0:
            l = 1 / l;
            t1 = this.x;
          case 5:
            state = 0;
            this.x = $.mul(t1, l);
            t3 = this.y;
          case 6:
            state = 0;
            this.y = $.mul(t3, l);
            t5 = this.z;
          case 7:
            state = 0;
            this.z = $.mul(t5, l);
            t7 = this.w;
          case 8:
            state = 0;
            this.w = $.mul(t7, l);
        }
      return this;
  }
},
 multiply$2: function(q1, q2) {
  var t1 = q1.get$x();
  if (typeof t1 !== 'number')
    return this.multiply$2$bailout(1, q1, q2, t1, 0, 0);
  var t3 = q2.get$w();
  if (typeof t3 !== 'number')
    return this.multiply$2$bailout(2, q1, q2, t1, t3, 0);
  t3 = t1 * t3;
  t1 = q1.get$y();
  if (typeof t1 !== 'number')
    return this.multiply$2$bailout(3, q1, q2, t1, t3, 0);
  var t6 = q2.get$z();
  if (typeof t6 !== 'number')
    return this.multiply$2$bailout(4, q1, q2, t6, t1, t3);
  t3 += t1 * t6;
  var t8 = q1.get$z();
  if (typeof t8 !== 'number')
    return this.multiply$2$bailout(5, q1, q2, t3, t8, 0);
  var t10 = q2.get$y();
  if (typeof t10 !== 'number')
    return this.multiply$2$bailout(6, q1, q2, t3, t8, t10);
  t3 -= t8 * t10;
  var t12 = q1.get$w();
  if (typeof t12 !== 'number')
    return this.multiply$2$bailout(7, q1, q2, t3, t12, 0);
  var t14 = q2.get$x();
  if (typeof t14 !== 'number')
    return this.multiply$2$bailout(8, q1, q2, t3, t12, t14);
  this.x = t3 + t12 * t14;
  var t16 = q1.get$x();
  if (typeof t16 !== 'number')
    return this.multiply$2$bailout(9, q1, q2, t16, 0, 0);
  t16 = -t16;
  var t18 = q2.get$z();
  if (typeof t18 !== 'number')
    return this.multiply$2$bailout(10, q1, q2, t16, t18, 0);
  t18 = t16 * t18;
  t16 = q1.get$y();
  if (typeof t16 !== 'number')
    return this.multiply$2$bailout(11, q1, q2, t16, t18, 0);
  var t21 = q2.get$w();
  if (typeof t21 !== 'number')
    return this.multiply$2$bailout(12, q1, q2, t16, t18, t21);
  t18 += t16 * t21;
  var t23 = q1.get$z();
  if (typeof t23 !== 'number')
    return this.multiply$2$bailout(13, q1, q2, t18, t23, 0);
  var t25 = q2.get$x();
  if (typeof t25 !== 'number')
    return this.multiply$2$bailout(14, q1, q2, t25, t18, t23);
  t18 += t23 * t25;
  var t27 = q1.get$w();
  if (typeof t27 !== 'number')
    return this.multiply$2$bailout(15, q1, q2, t18, t27, 0);
  var t29 = q2.get$y();
  if (typeof t29 !== 'number')
    return this.multiply$2$bailout(16, q1, q2, t18, t27, t29);
  this.y = t18 + t27 * t29;
  var t31 = q1.get$x();
  if (typeof t31 !== 'number')
    return this.multiply$2$bailout(17, q1, q2, t31, 0, 0);
  var t33 = q2.get$y();
  if (typeof t33 !== 'number')
    return this.multiply$2$bailout(18, q1, q2, t31, t33, 0);
  t33 = t31 * t33;
  t31 = q1.get$y();
  if (typeof t31 !== 'number')
    return this.multiply$2$bailout(19, q1, q2, t31, t33, 0);
  var t36 = q2.get$x();
  if (typeof t36 !== 'number')
    return this.multiply$2$bailout(20, q1, q2, t36, t31, t33);
  t33 -= t31 * t36;
  var t38 = q1.get$z();
  if (typeof t38 !== 'number')
    return this.multiply$2$bailout(21, q1, q2, t33, t38, 0);
  var t40 = q2.get$w();
  if (typeof t40 !== 'number')
    return this.multiply$2$bailout(22, q1, q2, t33, t38, t40);
  t33 += t38 * t40;
  var t42 = q1.get$w();
  if (typeof t42 !== 'number')
    return this.multiply$2$bailout(23, q1, q2, t33, t42, 0);
  var t44 = q2.get$z();
  if (typeof t44 !== 'number')
    return this.multiply$2$bailout(24, q1, q2, t33, t42, t44);
  this.z = t33 + t42 * t44;
  var t46 = q1.get$x();
  if (typeof t46 !== 'number')
    return this.multiply$2$bailout(25, q1, q2, t46, 0, 0);
  t46 = -t46;
  var t48 = q2.get$x();
  if (typeof t48 !== 'number')
    return this.multiply$2$bailout(26, q1, q2, t46, t48, 0);
  t48 = t46 * t48;
  t46 = q1.get$y();
  if (typeof t46 !== 'number')
    return this.multiply$2$bailout(27, q1, q2, t46, t48, 0);
  var t51 = q2.get$y();
  if (typeof t51 !== 'number')
    return this.multiply$2$bailout(28, q1, q2, t46, t48, t51);
  t48 -= t46 * t51;
  var t53 = q1.get$z();
  if (typeof t53 !== 'number')
    return this.multiply$2$bailout(29, q1, q2, t48, t53, 0);
  var t55 = q2.get$z();
  if (typeof t55 !== 'number')
    return this.multiply$2$bailout(30, q1, q2, t55, t48, t53);
  t48 -= t53 * t55;
  var t57 = q1.get$w();
  if (typeof t57 !== 'number')
    return this.multiply$2$bailout(31, q2, t48, t57, 0, 0);
  var t59 = q2.get$w();
  if (typeof t59 !== 'number')
    return this.multiply$2$bailout(32, t48, t57, t59, 0, 0);
  this.w = t48 + t57 * t59;
  return this;
},
 multiply$2$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var q1 = env0;
      var q2 = env1;
      t1 = env2;
      break;
    case 2:
      q1 = env0;
      q2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      q1 = env0;
      q2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 4:
      q1 = env0;
      q2 = env1;
      t6 = env2;
      t1 = env3;
      t3 = env4;
      break;
    case 5:
      q1 = env0;
      q2 = env1;
      t3 = env2;
      t8 = env3;
      break;
    case 6:
      q1 = env0;
      q2 = env1;
      t3 = env2;
      t8 = env3;
      t10 = env4;
      break;
    case 7:
      q1 = env0;
      q2 = env1;
      t3 = env2;
      t12 = env3;
      break;
    case 8:
      q1 = env0;
      q2 = env1;
      t3 = env2;
      t12 = env3;
      t14 = env4;
      break;
    case 9:
      q1 = env0;
      q2 = env1;
      t16 = env2;
      break;
    case 10:
      q1 = env0;
      q2 = env1;
      t16 = env2;
      t18 = env3;
      break;
    case 11:
      q1 = env0;
      q2 = env1;
      t16 = env2;
      t18 = env3;
      break;
    case 12:
      q1 = env0;
      q2 = env1;
      t16 = env2;
      t18 = env3;
      t21 = env4;
      break;
    case 13:
      q1 = env0;
      q2 = env1;
      t18 = env2;
      t23 = env3;
      break;
    case 14:
      q1 = env0;
      q2 = env1;
      t25 = env2;
      t18 = env3;
      t23 = env4;
      break;
    case 15:
      q1 = env0;
      q2 = env1;
      t18 = env2;
      t27 = env3;
      break;
    case 16:
      q1 = env0;
      q2 = env1;
      t18 = env2;
      t27 = env3;
      t29 = env4;
      break;
    case 17:
      q1 = env0;
      q2 = env1;
      t31 = env2;
      break;
    case 18:
      q1 = env0;
      q2 = env1;
      t31 = env2;
      t33 = env3;
      break;
    case 19:
      q1 = env0;
      q2 = env1;
      t31 = env2;
      t33 = env3;
      break;
    case 20:
      q1 = env0;
      q2 = env1;
      t36 = env2;
      t31 = env3;
      t33 = env4;
      break;
    case 21:
      q1 = env0;
      q2 = env1;
      t33 = env2;
      t38 = env3;
      break;
    case 22:
      q1 = env0;
      q2 = env1;
      t33 = env2;
      t38 = env3;
      t40 = env4;
      break;
    case 23:
      q1 = env0;
      q2 = env1;
      t33 = env2;
      t42 = env3;
      break;
    case 24:
      q1 = env0;
      q2 = env1;
      t33 = env2;
      t42 = env3;
      t44 = env4;
      break;
    case 25:
      q1 = env0;
      q2 = env1;
      t46 = env2;
      break;
    case 26:
      q1 = env0;
      q2 = env1;
      t46 = env2;
      t48 = env3;
      break;
    case 27:
      q1 = env0;
      q2 = env1;
      t46 = env2;
      t48 = env3;
      break;
    case 28:
      q1 = env0;
      q2 = env1;
      t46 = env2;
      t48 = env3;
      t51 = env4;
      break;
    case 29:
      q1 = env0;
      q2 = env1;
      t48 = env2;
      t53 = env3;
      break;
    case 30:
      q1 = env0;
      q2 = env1;
      t55 = env2;
      t48 = env3;
      t53 = env4;
      break;
    case 31:
      q2 = env0;
      t48 = env1;
      t57 = env2;
      break;
    case 32:
      t48 = env0;
      t57 = env1;
      t59 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = q1.get$x();
    case 1:
      state = 0;
      var t3 = q2.get$w();
    case 2:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = q1.get$y();
    case 3:
      state = 0;
      var t6 = q2.get$z();
    case 4:
      state = 0;
      t3 = $.add(t3, $.mul(t1, t6));
      var t8 = q1.get$z();
    case 5:
      state = 0;
      var t10 = q2.get$y();
    case 6:
      state = 0;
      t3 = $.sub(t3, $.mul(t8, t10));
      var t12 = q1.get$w();
    case 7:
      state = 0;
      var t14 = q2.get$x();
    case 8:
      state = 0;
      this.x = $.add(t3, $.mul(t12, t14));
      var t16 = q1.get$x();
    case 9:
      state = 0;
      t16 = $.neg(t16);
      var t18 = q2.get$z();
    case 10:
      state = 0;
      t18 = $.mul(t16, t18);
      t16 = q1.get$y();
    case 11:
      state = 0;
      var t21 = q2.get$w();
    case 12:
      state = 0;
      t18 = $.add(t18, $.mul(t16, t21));
      var t23 = q1.get$z();
    case 13:
      state = 0;
      var t25 = q2.get$x();
    case 14:
      state = 0;
      t18 = $.add(t18, $.mul(t23, t25));
      var t27 = q1.get$w();
    case 15:
      state = 0;
      var t29 = q2.get$y();
    case 16:
      state = 0;
      this.y = $.add(t18, $.mul(t27, t29));
      var t31 = q1.get$x();
    case 17:
      state = 0;
      var t33 = q2.get$y();
    case 18:
      state = 0;
      t33 = $.mul(t31, t33);
      t31 = q1.get$y();
    case 19:
      state = 0;
      var t36 = q2.get$x();
    case 20:
      state = 0;
      t33 = $.sub(t33, $.mul(t31, t36));
      var t38 = q1.get$z();
    case 21:
      state = 0;
      var t40 = q2.get$w();
    case 22:
      state = 0;
      t33 = $.add(t33, $.mul(t38, t40));
      var t42 = q1.get$w();
    case 23:
      state = 0;
      var t44 = q2.get$z();
    case 24:
      state = 0;
      this.z = $.add(t33, $.mul(t42, t44));
      var t46 = q1.get$x();
    case 25:
      state = 0;
      t46 = $.neg(t46);
      var t48 = q2.get$x();
    case 26:
      state = 0;
      t48 = $.mul(t46, t48);
      t46 = q1.get$y();
    case 27:
      state = 0;
      var t51 = q2.get$y();
    case 28:
      state = 0;
      t48 = $.sub(t48, $.mul(t46, t51));
      var t53 = q1.get$z();
    case 29:
      state = 0;
      var t55 = q2.get$z();
    case 30:
      state = 0;
      t48 = $.sub(t48, $.mul(t53, t55));
      var t57 = q1.get$w();
    case 31:
      state = 0;
      var t59 = q2.get$w();
    case 32:
      state = 0;
      this.w = $.add(t48, $.mul(t57, t59));
      return this;
  }
}
};

$$.Vector4 = {"":
 ["_x", "_y", "_z", "_w"],
 super: "Object",
 get$x: function() {
  return this._x;
},
 set$x: function(value) {
  this._x = value;
},
 get$y: function() {
  return this._y;
},
 set$y: function(value) {
  this._y = value;
},
 get$z: function() {
  return this._z;
},
 set$z: function(value) {
  this._z = value;
},
 get$w: function() {
  return this._w;
},
 set$w: function(value) {
  this._w = value;
},
 setValues$4: function(x, y, z, w) {
  this._x = x;
  this._y = y;
  this._z = z;
  this._w = w;
  return this;
},
 copy$1: function(v) {
  this._x = v.get$x();
  this._y = v.get$y();
  this._z = v.get$z();
  if (typeof v === 'object' && v !== null && !!v.is$IVector4)
    this._w = v.get$w();
  else
    this._w = 1;
},
 addSelf$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.addSelf$1$bailout(1, v, t1, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.addSelf$1$bailout(2, v, t1, t3);
  this._x = t1 + t3;
  var t5 = this._y;
  if (typeof t5 !== 'number')
    return this.addSelf$1$bailout(3, v, t5, 0);
  var t7 = v.get$y();
  if (typeof t7 !== 'number')
    return this.addSelf$1$bailout(4, v, t7, t5);
  this._y = t5 + t7;
  var t9 = this._z;
  if (typeof t9 !== 'number')
    return this.addSelf$1$bailout(5, v, t9, 0);
  var t11 = v.get$z();
  if (typeof t11 !== 'number')
    return this.addSelf$1$bailout(6, v, t9, t11);
  this._z = t9 + t11;
  var t13 = this._w;
  if (typeof t13 !== 'number')
    return this.addSelf$1$bailout(7, v, t13, 0);
  var t15 = v.get$w();
  if (typeof t15 !== 'number')
    return this.addSelf$1$bailout(8, t15, t13, 0);
  this._w = t13 + t15;
  return this;
},
 addSelf$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      v = env0;
      t5 = env1;
      break;
    case 4:
      v = env0;
      t7 = env1;
      t5 = env2;
      break;
    case 5:
      v = env0;
      t9 = env1;
      break;
    case 6:
      v = env0;
      t9 = env1;
      t11 = env2;
      break;
    case 7:
      v = env0;
      t13 = env1;
      break;
    case 8:
      t15 = env0;
      t13 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      this._x = $.add(t1, t3);
      var t5 = this._y;
    case 3:
      state = 0;
      var t7 = v.get$y();
    case 4:
      state = 0;
      this._y = $.add(t5, t7);
      var t9 = this._z;
    case 5:
      state = 0;
      var t11 = v.get$z();
    case 6:
      state = 0;
      this._z = $.add(t9, t11);
      var t13 = this._w;
    case 7:
      state = 0;
      var t15 = v.get$w();
    case 8:
      state = 0;
      this._w = $.add(t13, t15);
      return this;
  }
},
 sub$2: function(v1, v2) {
  var t1 = v1.get$x();
  if (typeof t1 !== 'number')
    return this.sub$2$bailout(1, v1, v2, t1, 0);
  var t3 = v2.get$x();
  if (typeof t3 !== 'number')
    return this.sub$2$bailout(2, v1, v2, t1, t3);
  this._x = t1 - t3;
  var t5 = v1.get$y();
  if (typeof t5 !== 'number')
    return this.sub$2$bailout(3, v1, v2, t5, 0);
  var t7 = v2.get$y();
  if (typeof t7 !== 'number')
    return this.sub$2$bailout(4, v1, v2, t5, t7);
  this._y = t5 - t7;
  var t9 = v1.get$z();
  if (typeof t9 !== 'number')
    return this.sub$2$bailout(5, v1, v2, t9, 0);
  var t11 = v2.get$z();
  if (typeof t11 !== 'number')
    return this.sub$2$bailout(6, v1, v2, t9, t11);
  this._z = t9 - t11;
  var t13 = v1.get$w();
  if (typeof t13 !== 'number')
    return this.sub$2$bailout(7, v2, t13, 0, 0);
  var t15 = v2.get$w();
  if (typeof t15 !== 'number')
    return this.sub$2$bailout(8, t13, t15, 0, 0);
  this._w = t13 - t15;
  return this;
},
 sub$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      t1 = env2;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      v1 = env0;
      v2 = env1;
      t5 = env2;
      break;
    case 4:
      v1 = env0;
      v2 = env1;
      t5 = env2;
      t7 = env3;
      break;
    case 5:
      v1 = env0;
      v2 = env1;
      t9 = env2;
      break;
    case 6:
      v1 = env0;
      v2 = env1;
      t9 = env2;
      t11 = env3;
      break;
    case 7:
      v2 = env0;
      t13 = env1;
      break;
    case 8:
      t13 = env0;
      t15 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = v1.get$x();
    case 1:
      state = 0;
      var t3 = v2.get$x();
    case 2:
      state = 0;
      this._x = $.sub(t1, t3);
      var t5 = v1.get$y();
    case 3:
      state = 0;
      var t7 = v2.get$y();
    case 4:
      state = 0;
      this._y = $.sub(t5, t7);
      var t9 = v1.get$z();
    case 5:
      state = 0;
      var t11 = v2.get$z();
    case 6:
      state = 0;
      this._z = $.sub(t9, t11);
      var t13 = v1.get$w();
    case 7:
      state = 0;
      var t15 = v2.get$w();
    case 8:
      state = 0;
      this._w = $.sub(t13, t15);
      return this;
  }
},
 multiplyScalar$1: function(s) {
  if (typeof s !== 'number')
    return this.multiplyScalar$1$bailout(1, s, 0);
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.multiplyScalar$1$bailout(2, s, t1);
  this._x = t1 * s;
  var t3 = this._y;
  if (typeof t3 !== 'number')
    return this.multiplyScalar$1$bailout(3, s, t3);
  this._y = t3 * s;
  var t5 = this._z;
  if (typeof t5 !== 'number')
    return this.multiplyScalar$1$bailout(4, s, t5);
  this._z = t5 * s;
  var t7 = this._w;
  if (typeof t7 !== 'number')
    return this.multiplyScalar$1$bailout(5, s, t7);
  this._w = t7 * s;
  return this;
},
 multiplyScalar$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var s = env0;
      break;
    case 2:
      s = env0;
      t1 = env1;
      break;
    case 3:
      s = env0;
      t3 = env1;
      break;
    case 4:
      s = env0;
      t5 = env1;
      break;
    case 5:
      s = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this._x;
    case 2:
      state = 0;
      this._x = $.mul(t1, s);
      var t3 = this._y;
    case 3:
      state = 0;
      this._y = $.mul(t3, s);
      var t5 = this._z;
    case 4:
      state = 0;
      this._z = $.mul(t5, s);
      var t7 = this._w;
    case 5:
      state = 0;
      this._w = $.mul(t7, s);
      return this;
  }
},
 divideScalar$1: function(s) {
  if (typeof s !== 'number')
    return this.divideScalar$1$bailout(1, s, 0);
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.divideScalar$1$bailout(2, s, t1);
  this._x = t1 / s;
  var t3 = this._y;
  if (typeof t3 !== 'number')
    return this.divideScalar$1$bailout(3, s, t3);
  this._y = t3 / s;
  var t5 = this._z;
  if (typeof t5 !== 'number')
    return this.divideScalar$1$bailout(4, s, t5);
  this._z = t5 / s;
  var t7 = this._w;
  if (typeof t7 !== 'number')
    return this.divideScalar$1$bailout(5, s, t7);
  this._w = t7 / s;
  return this;
},
 divideScalar$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var s = env0;
      break;
    case 2:
      s = env0;
      t1 = env1;
      break;
    case 3:
      s = env0;
      t3 = env1;
      break;
    case 4:
      s = env0;
      t5 = env1;
      break;
    case 5:
      s = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && !(s == null))
        switch (state) {
          case 0:
            var t1 = this._x;
          case 2:
            state = 0;
            this._x = $.div(t1, s);
            var t3 = this._y;
          case 3:
            state = 0;
            this._y = $.div(t3, s);
            var t5 = this._z;
          case 4:
            state = 0;
            this._z = $.div(t5, s);
            var t7 = this._w;
          case 5:
            state = 0;
            this._w = $.div(t7, s);
        }
      else {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      }
      return this;
  }
},
 dot$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(1, v, t1, 0, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.dot$1$bailout(2, v, t1, t3, 0);
  t3 = t1 * t3;
  t1 = this._y;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(3, v, t1, t3, 0);
  var t6 = v.get$y();
  if (typeof t6 !== 'number')
    return this.dot$1$bailout(4, v, t6, t1, t3);
  t3 += t1 * t6;
  var t8 = this._z;
  if (typeof t8 !== 'number')
    return this.dot$1$bailout(5, v, t3, t8, 0);
  var t10 = v.get$z();
  if (typeof t10 !== 'number')
    return this.dot$1$bailout(6, v, t3, t8, t10);
  t3 += t8 * t10;
  var t12 = this._w;
  if (typeof t12 !== 'number')
    return this.dot$1$bailout(7, v, t3, t12, 0);
  var t14 = v.get$w();
  if (typeof t14 !== 'number')
    return this.dot$1$bailout(8, t3, t14, t12, 0);
  return t3 + t12 * t14;
},
 dot$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      v = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 4:
      v = env0;
      t6 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 5:
      v = env0;
      t3 = env1;
      t8 = env2;
      break;
    case 6:
      v = env0;
      t3 = env1;
      t8 = env2;
      t10 = env3;
      break;
    case 7:
      v = env0;
      t3 = env1;
      t12 = env2;
      break;
    case 8:
      t3 = env0;
      t14 = env1;
      t12 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = this._y;
    case 3:
      state = 0;
      var t6 = v.get$y();
    case 4:
      state = 0;
      t3 = $.add(t3, $.mul(t1, t6));
      var t8 = this._z;
    case 5:
      state = 0;
      var t10 = v.get$z();
    case 6:
      state = 0;
      t3 = $.add(t3, $.mul(t8, t10));
      var t12 = this._w;
    case 7:
      state = 0;
      var t14 = v.get$w();
    case 8:
      state = 0;
      return $.add(t3, $.mul(t12, t14));
  }
},
 lengthSq$0: function() {
  return this.dot$1(this);
},
 length$0: function() {
  return $.sqrt(this.lengthSq$0());
},
 get$length: function() { return new $.BoundClosure(this, 'length$0'); },
 normalize$0: function() {
  return this.divideScalar$1(this.length$0());
},
 lerpSelf$2: function(v, alpha) {
  this._x = $.add(this._x, $.mul($.sub(v.get$x(), this._x), alpha));
  this._y = $.add(this._y, $.mul($.sub(v.get$y(), this._y), alpha));
  this._z = $.add(this._z, $.mul($.sub(v.get$z(), this._z), alpha));
  this._w = $.add(this._w, $.mul($.sub(v.get$w(), this._w), alpha));
  return this;
},
 Vector4$4: function(x, y, z, w) {
  this._x = !(x == null) ? x : 0;
  this._y = !(y == null) ? y : 0;
  this._z = !(z == null) ? z : 0;
  this._w = !(w == null) ? w : 1;
},
 is$IVector4: true
};

$$.Object3D = {"":
 ["_name", "id?", "parent=", "children?", "up", "position=", "rotation!", "scale?", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld?", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible=", "castShadow", "receiveShadow", "frustumCulled?", "_vector", "__data"],
 super: "Object",
 scale$1: function(arg0) { return this.scale.call$1(arg0); },
 scale$2: function(arg0, arg1) { return this.scale.call$2(arg0, arg1); },
 get$name: function() {
  return this._name;
},
 translate$2: function(distance, axis) {
  this.matrix.rotateAxis$1(axis);
  this.position.addSelf$1(axis.multiplyScalar$1(distance));
},
 lookAt$1: function(vector) {
  var t1 = this.matrix;
  t1.lookAt$3(vector, this.position, this.up);
  if (this.rotationAutoUpdate === true)
    this.rotation.setRotationFromMatrix$1(t1);
},
 add$1: function(object) {
  var t1 = this.children;
  if ($.indexOf$1(t1, object) === -1) {
    if (!(object.get$parent() == null))
      object.get$parent().remove$1(object);
    object.set$parent(this);
    t1.push(object);
    for (var scene = this; !(scene.get$parent() == null);)
      scene = scene.get$parent();
    if (typeof scene === 'object' && scene !== null && !!scene.is$Scene)
      scene.addObject$1(object);
  }
},
 remove$1: function(object) {
  var t1 = this.children;
  var index = $.indexOf$1(t1, object);
  if (!(index === -1)) {
    object.set$parent(null);
    $.removeRange(t1, index, 1);
    for (var scene = this; !(scene.get$parent() == null);)
      scene = scene.get$parent();
    if (typeof scene === 'object' && scene !== null && !!scene.is$Scene)
      scene.removeObject$1(object);
  }
},
 updateMatrix$0: function() {
  var t1 = this.matrix;
  t1.setPosition$1(this.position);
  if (this.useQuaternion === true)
    t1.setRotationFromQuaternion$1(this.quaternion);
  else
    t1.setRotationFromEuler$2(this.rotation, this.eulerOrder);
  var t2 = this.scale;
  if (!(t2.get$x() === 1) || !(t2.get$y() === 1) || !(t2.get$z() === 1)) {
    t1.scale$1(t2);
    this.boundRadiusScale = $.max(t2.get$x(), $.max(t2.get$y(), t2.get$z()));
  }
  this.matrixWorldNeedsUpdate = true;
},
 updateMatrixWorld$1: function(force) {
  if (typeof force !== 'boolean')
    return this.updateMatrixWorld$1$bailout(1, force);
  if (this.matrixAutoUpdate)
    this.updateMatrix$0();
  if (!this.matrixWorldNeedsUpdate)
    var t1 = force;
  else
    t1 = true;
  if (t1) {
    t1 = this.parent;
    var t2 = !(t1 == null);
    var t3 = this.matrixWorld;
    var t4 = this.matrix;
    if (t2)
      t3.multiply$2(t1.get$matrixWorld(), t4);
    else
      t3.copy$1(t4);
    this.matrixWorldNeedsUpdate = false;
    force = true;
  }
  for (var t1 = this.children, l = t1.length, i = 0; i < l; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i].updateMatrixWorld$1(force);
  }
},
 updateMatrixWorld$1$bailout: function(state, force) {
  if (this.matrixAutoUpdate === true)
    this.updateMatrix$0();
  if (this.matrixWorldNeedsUpdate === true || force === true) {
    var t1 = this.parent;
    var t2 = !(t1 == null);
    var t3 = this.matrixWorld;
    var t4 = this.matrix;
    if (t2)
      t3.multiply$2(t1.get$matrixWorld(), t4);
    else
      t3.copy$1(t4);
    this.matrixWorldNeedsUpdate = false;
    force = true;
  }
  for (var t1 = this.children, l = t1.length, i = 0; i < l; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i].updateMatrixWorld$1(force);
  }
},
 updateMatrixWorld$0: function() {
  return this.updateMatrixWorld$1(false)
},
 get$_data: function() {
  if (this.__data == null)
    this.__data = $.makeLiteralMap([]);
  return this.__data;
},
 operator$index$1: function(key) {
  return $.index(this.get$_data(), key);
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.get$_data(), key, value);
  return value;
},
 Object3D$0: function() {
  this._name = '';
  var t1 = $.Three_Object3DCount;
  $.Three_Object3DCount = $.add(t1, 1);
  this.id = t1;
  this.parent = null;
  this.children = [];
  this.up = $.Vector3$(0, 1, 0);
  this.position = $.Vector3$(0, 0, 0);
  this.rotation = $.Vector3$(0, 0, 0);
  this.eulerOrder = 'XYZ';
  this.scale = $.Vector3$(1, 1, 1);
  this._dynamic = false;
  this.doubleSided = false;
  this.flipSided = false;
  this.renderDepth = null;
  this.rotationAutoUpdate = true;
  this.matrix = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this.matrixWorld = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this.matrixRotationWorld = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this.matrixAutoUpdate = true;
  this.matrixWorldNeedsUpdate = true;
  this.quaternion = $.Quaternion$(0, 0, 0, 1);
  this.useQuaternion = false;
  this.boundRadius = 0.0;
  this.boundRadiusScale = 1.0;
  this.visible = true;
  this.castShadow = false;
  this.receiveShadow = false;
  this.frustumCulled = true;
  this._vector = $.Vector3$(0, 0, 0);
}
};

$$.Color = {"":
 ["r=", "g=", "b="],
 super: "Object",
 get$_rr: function() {
  return $.toInt($.floor($.mul(this.r, 255)));
},
 get$_gg: function() {
  return $.toInt($.floor($.mul(this.g, 255)));
},
 get$_bb: function() {
  return $.toInt($.floor($.mul(this.b, 255)));
},
 copy$1: function(color) {
  this.r = color.get$r();
  this.g = color.get$g();
  this.b = color.get$b();
  return this;
},
 setRGB$3: function(newR, newG, newB) {
  this.r = newR;
  this.g = newG;
  this.b = newB;
  return this;
},
 setHex$1: function(hex) {
  var h = $.toInt($.floor(hex));
  this.r = $.div($.shr($.and(h, 16711680), 16), 255);
  this.g = $.div($.shr($.and(h, 65280), 8), 255);
  this.b = $.div($.and(h, 255), 255);
  return this;
},
 getContextStyle$0: function() {
  return 'rgb(' + $.S(this.get$_rr()) + ',' + $.S(this.get$_gg()) + ',' + $.S(this.get$_bb()) + ')';
},
 Color$1: function(hex) {
  this.r = 1.0;
  this.g = 1.0;
  this.b = 1.0;
  if (typeof hex === 'number')
    this.setHex$1(hex);
},
 is$Color: true
};

$$.Face4 = {"":
 ["_a", "_b", "_c", "_d", "_normal", "_vertexNormals", "_vertexColors", "_vertexTangents", "_color", "_materialIndex", "_centroid"],
 super: "Object",
 get$centroid: function() {
  return this._centroid;
},
 get$normal: function() {
  return this._normal;
},
 get$vertexNormals: function() {
  return this._vertexNormals;
},
 set$materialIndex: function(value) {
  this._materialIndex = value;
},
 get$materialIndex: function() {
  return this._materialIndex;
},
 get$a: function() {
  return this._a;
},
 set$a: function(value) {
  this._a = value;
},
 get$b: function() {
  return this._b;
},
 set$b: function(value) {
  this._b = value;
},
 get$c: function() {
  return this._c;
},
 set$c: function(value) {
  this._c = value;
},
 get$d: function() {
  return this._d;
},
 set$d: function(value) {
  this._d = value;
},
 Face4$7: function(a, b, c, d, normal, color, materialIndex) {
  this._a = a;
  this._b = b;
  this._c = c;
  this._d = d;
  this._normal = typeof normal === 'object' && normal !== null && !!normal.is$Vector3 ? normal : $.Vector3$(0, 0, 0);
  this._vertexNormals = typeof normal === 'object' && normal !== null && (normal.constructor === Array || normal.is$List()) ? normal : [];
  this._color = typeof color === 'object' && color !== null && !!color.is$Color ? color : $.Color$(null);
  this._vertexColors = typeof color === 'object' && color !== null && (color.constructor === Array || color.is$List()) ? color : [];
  this._vertexTangents = [];
  this._materialIndex = materialIndex;
  this._centroid = $.Vector3$(0, 0, 0);
},
 is$Face4: true
};

$$.Frustum = {"":
 ["_planes"],
 super: "Object",
 setFromMatrix$1: function(m) {
  var planes = this._planes;
  if (0 < 0 || 0 >= planes.length)
    throw $.ioore(0);
  planes[0].setValues$4($.sub(m.get$n41(), m.get$n11()), $.sub(m.get$n42(), m.get$n12()), $.sub(m.get$n43(), m.get$n13()), $.sub(m.get$n44(), m.get$n14()));
  if (1 < 0 || 1 >= planes.length)
    throw $.ioore(1);
  planes[1].setValues$4($.add(m.get$n41(), m.get$n11()), $.add(m.get$n42(), m.get$n12()), $.add(m.get$n43(), m.get$n13()), $.add(m.get$n44(), m.get$n14()));
  if (2 < 0 || 2 >= planes.length)
    throw $.ioore(2);
  planes[2].setValues$4($.add(m.get$n41(), m.get$n21()), $.add(m.get$n42(), m.get$n22()), $.add(m.get$n43(), m.get$n23()), $.add(m.get$n44(), m.get$n24()));
  if (3 < 0 || 3 >= planes.length)
    throw $.ioore(3);
  planes[3].setValues$4($.sub(m.get$n41(), m.get$n21()), $.sub(m.get$n42(), m.get$n22()), $.sub(m.get$n43(), m.get$n23()), $.sub(m.get$n44(), m.get$n24()));
  if (4 < 0 || 4 >= planes.length)
    throw $.ioore(4);
  planes[4].setValues$4($.sub(m.get$n41(), m.get$n31()), $.sub(m.get$n42(), m.get$n32()), $.sub(m.get$n43(), m.get$n33()), $.sub(m.get$n44(), m.get$n34()));
  if (5 < 0 || 5 >= planes.length)
    throw $.ioore(5);
  var plane = planes[5];
  plane.setValues$4($.add(m.get$n41(), m.get$n31()), $.add(m.get$n42(), m.get$n32()), $.add(m.get$n43(), m.get$n33()), $.add(m.get$n44(), m.get$n34()));
  for (var i = 0; i < 6; ++i) {
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    plane = planes[i];
    plane.divideScalar$1($.sqrt($.add($.add($.mul(plane.get$x(), plane.get$x()), $.mul(plane.get$y(), plane.get$y())), $.mul(plane.get$z(), plane.get$z()))));
  }
},
 contains$1: function(object) {
  var planes = this._planes;
  var matrix = object.get$matrixWorld();
  var scale = $.Frustum___v1.setValues$3(matrix.getColumnX$0().length$0(), matrix.getColumnY$0().length$0(), matrix.getColumnZ$0().length$0());
  var radius = $.mul($.neg(object.get$geometry().get$boundingSphere().get$radius()), $.max(scale.get$x(), $.max(scale.get$y(), scale.get$z())));
  if (typeof radius !== 'number')
    return this.contains$1$bailout(1, radius, planes, matrix);
  for (var distance = null, i = 0; i < 6; ++i) {
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    var t1 = $.mul(planes[i].get$x(), matrix.get$n14());
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    t1 = $.add(t1, $.mul(planes[i].get$y(), matrix.get$n24()));
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    t1 = $.add(t1, $.mul(planes[i].get$z(), matrix.get$n34()));
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    distance = $.add(t1, planes[i].get$w());
    if ($.leB(distance, radius))
      return false;
  }
  return true;
},
 contains$1$bailout: function(state, radius, planes, matrix) {
  for (var distance = null, i = 0; i < 6; ++i) {
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    var t1 = $.mul(planes[i].get$x(), matrix.get$n14());
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    t1 = $.add(t1, $.mul(planes[i].get$y(), matrix.get$n24()));
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    t1 = $.add(t1, $.mul(planes[i].get$z(), matrix.get$n34()));
    if (i < 0 || i >= planes.length)
      throw $.ioore(i);
    distance = $.add(t1, planes[i].get$w());
    if ($.leB(distance, radius))
      return false;
  }
  return true;
},
 Frustum$0: function() {
  if ($.Frustum___v1 == null)
    $.Frustum___v1 = $.Vector3$(0, 0, 0);
  this._planes = [$.Vector4$(0, 0, 0, 1), $.Vector4$(0, 0, 0, 1), $.Vector4$(0, 0, 0, 1), $.Vector4$(0, 0, 0, 1), $.Vector4$(0, 0, 0, 1), $.Vector4$(0, 0, 0, 1)];
}
};

$$.Geometry = {"":
 ["_id?", "vertices=", "colors", "materials?", "faces=", "tan1", "tan2", "faceUvs", "faceVertexUvs?", "morphTargets?", "morphColors", "morphNormals", "skinWeights", "skinIndices", "__tmpVertices", "_boundingBox", "_boundingSphere", "hasTangents", "_dynamic", "geometryGroups", "geometryGroupsList", "verticesNeedUpdate", "morphTargetsNeedUpdate", "elementsNeedUpdate", "uvsNeedUpdate", "normalsNeedUpdate", "tangentsNeedUpdate", "colorsNeedUpdate", "skinVerticesA", "skinVerticesB", "__data"],
 super: "Object",
 get$boundingSphere: function() {
  return this._boundingSphere;
},
 computeCentroids$0: function() {
  var fl = $.get$length(this.faces);
  if (typeof fl !== 'number')
    return this.computeCentroids$0$bailout(1, fl);
  for (var face = null, f = 0; f < fl; ++f) {
    face = $.index(this.faces, f);
    face.get$centroid().setValues$3(0, 0, 0);
    if (typeof face === 'object' && face !== null && !!face.is$Face3) {
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$a()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$b()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$c()));
      face.get$centroid().divideScalar$1(3);
    } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$a()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$b()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$c()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$d()));
      face.get$centroid().divideScalar$1(4);
    }
  }
},
 computeCentroids$0$bailout: function(state, fl) {
  for (var face = null, f = 0; $.ltB(f, fl); ++f) {
    face = $.index(this.faces, f);
    face.get$centroid().setValues$3(0, 0, 0);
    if (typeof face === 'object' && face !== null && !!face.is$Face3) {
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$a()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$b()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$c()));
      face.get$centroid().divideScalar$1(3);
    } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$a()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$b()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$c()));
      face.get$centroid().addSelf$1($.index(this.vertices, face.get$d()));
      face.get$centroid().divideScalar$1(4);
    }
  }
},
 computeBoundingSphere$0: function() {
  var vl = $.get$length(this.vertices);
  if (typeof vl !== 'number')
    return this.computeBoundingSphere$0$bailout(1, vl);
  for (var radius = null, maxRadius = 0, v = 0; v < vl; ++v) {
    radius = $.index(this.vertices, v).length$0();
    if ($.gtB(radius, maxRadius))
      maxRadius = radius;
  }
  this._boundingSphere = $.BoundingSphere$(maxRadius);
},
 computeBoundingSphere$0$bailout: function(state, vl) {
  for (var radius = null, maxRadius = 0, v = 0; $.ltB(v, vl); ++v) {
    radius = $.index(this.vertices, v).length$0();
    if ($.gtB(radius, maxRadius))
      maxRadius = radius;
  }
  this._boundingSphere = $.BoundingSphere$(maxRadius);
},
 mergeVertices$0: function() {
  var verticesMap = $.makeLiteralMap([]);
  var unique = [];
  var changes = [];
  var precision = $.pow(10, 4);
  var il = $.get$length(this.vertices);
  if (typeof il !== 'number')
    return this.mergeVertices$0$bailout(1, precision, verticesMap, unique, changes, il);
  for (var key = null, i = 0; i < il; ++i) {
    var v = $.index(this.vertices, i);
    var vx = $.toInt($.round($.mul(v.get$x(), precision)));
    var vy = $.toInt($.round($.mul(v.get$y(), precision)));
    var vz = $.toInt($.round($.mul(v.get$z(), precision)));
    key = $.S(vx) + '_' + $.S(vy) + '_' + $.S(vz);
    if ($.index(verticesMap, key) == null) {
      $.indexSet(verticesMap, key, i);
      unique.push($.index(this.vertices, i));
      changes.push(unique.length - 1);
    } else {
      var t1 = $.index(verticesMap, key);
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      if (t1 < 0 || t1 >= changes.length)
        throw $.ioore(t1);
      changes.push(changes[t1]);
    }
  }
  il = $.get$length(this.faces);
  if (typeof il !== 'number')
    return this.mergeVertices$0$bailout(2, il, unique, changes, 0, 0);
  for (i = 0; i < il; ++i) {
    var face = $.index(this.faces, i);
    if (typeof face === 'object' && face !== null && !!face.is$Face3) {
      t1 = face.get$a();
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      if (t1 < 0 || t1 >= changes.length)
        throw $.ioore(t1);
      face.set$a(changes[t1]);
      var t2 = face.get$b();
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= changes.length)
        throw $.ioore(t2);
      face.set$b(changes[t2]);
      var t3 = face.get$c();
      if (t3 !== (t3 | 0))
        throw $.iae(t3);
      if (t3 < 0 || t3 >= changes.length)
        throw $.ioore(t3);
      face.set$c(changes[t3]);
    } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
      t1 = face.get$a();
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      if (t1 < 0 || t1 >= changes.length)
        throw $.ioore(t1);
      face.set$a(changes[t1]);
      t2 = face.get$b();
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= changes.length)
        throw $.ioore(t2);
      face.set$b(changes[t2]);
      t3 = face.get$c();
      if (t3 !== (t3 | 0))
        throw $.iae(t3);
      if (t3 < 0 || t3 >= changes.length)
        throw $.ioore(t3);
      face.set$c(changes[t3]);
      var t4 = face.get$d();
      if (t4 !== (t4 | 0))
        throw $.iae(t4);
      if (t4 < 0 || t4 >= changes.length)
        throw $.ioore(t4);
      face.set$d(changes[t4]);
    }
  }
  this.vertices = unique;
},
 mergeVertices$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      precision = env0;
      verticesMap = env1;
      unique = env2;
      changes = env3;
      il = env4;
      break;
    case 2:
      il = env0;
      unique = env1;
      changes = env2;
      break;
  }
  switch (state) {
    case 0:
      var verticesMap = $.makeLiteralMap([]);
      var unique = [];
      var changes = [];
      var precision = $.pow(10, 4);
      var il = $.get$length(this.vertices);
    case 1:
      state = 0;
      for (var key = null, i = 0; $.ltB(i, il); ++i) {
        var v = $.index(this.vertices, i);
        var vx = $.toInt($.round($.mul(v.get$x(), precision)));
        var vy = $.toInt($.round($.mul(v.get$y(), precision)));
        var vz = $.toInt($.round($.mul(v.get$z(), precision)));
        key = $.S(vx) + '_' + $.S(vy) + '_' + $.S(vz);
        if ($.index(verticesMap, key) == null) {
          $.indexSet(verticesMap, key, i);
          unique.push($.index(this.vertices, i));
          changes.push(unique.length - 1);
        } else {
          var t1 = $.index(verticesMap, key);
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= changes.length)
            throw $.ioore(t1);
          changes.push(changes[t1]);
        }
      }
      il = $.get$length(this.faces);
    case 2:
      state = 0;
      for (i = 0; $.ltB(i, il); ++i) {
        var face = $.index(this.faces, i);
        if (typeof face === 'object' && face !== null && !!face.is$Face3) {
          t1 = face.get$a();
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= changes.length)
            throw $.ioore(t1);
          face.set$a(changes[t1]);
          var t2 = face.get$b();
          if (t2 !== (t2 | 0))
            throw $.iae(t2);
          if (t2 < 0 || t2 >= changes.length)
            throw $.ioore(t2);
          face.set$b(changes[t2]);
          var t3 = face.get$c();
          if (t3 !== (t3 | 0))
            throw $.iae(t3);
          if (t3 < 0 || t3 >= changes.length)
            throw $.ioore(t3);
          face.set$c(changes[t3]);
        } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
          t1 = face.get$a();
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= changes.length)
            throw $.ioore(t1);
          face.set$a(changes[t1]);
          t2 = face.get$b();
          if (t2 !== (t2 | 0))
            throw $.iae(t2);
          if (t2 < 0 || t2 >= changes.length)
            throw $.ioore(t2);
          face.set$b(changes[t2]);
          t3 = face.get$c();
          if (t3 !== (t3 | 0))
            throw $.iae(t3);
          if (t3 < 0 || t3 >= changes.length)
            throw $.ioore(t3);
          face.set$c(changes[t3]);
          var t4 = face.get$d();
          if (t4 !== (t4 | 0))
            throw $.iae(t4);
          if (t4 < 0 || t4 >= changes.length)
            throw $.ioore(t4);
          face.set$d(changes[t4]);
        }
      }
      this.vertices = unique;
  }
},
 get$_data: function() {
  if (this.__data == null)
    this.__data = $.makeLiteralMap([]);
  return this.__data;
},
 operator$index$1: function(key) {
  return $.index(this.get$_data(), key);
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.get$_data(), key, value);
  return value;
},
 Geometry$0: function() {
  var t1 = $.Three_GeometryCount;
  $.Three_GeometryCount = $.add(t1, 1);
  this._id = t1;
  this.vertices = [];
  this.colors = [];
  this.materials = [];
  this.faces = [];
  this.faceUvs = [[]];
  this.faceVertexUvs = [];
  this.faceVertexUvs.push($.ListImplementation_List(null));
  this.morphTargets = [];
  this.morphColors = [];
  this.morphNormals = [];
  this.skinWeights = [];
  this.skinIndices = [];
  this._boundingBox = null;
  this._boundingSphere = null;
  this.hasTangents = false;
  this._dynamic = false;
}
};

$$.BoundingSphere = {"":
 ["radius?"],
 super: "Object"
};

$$.Vertex = {"":
 ["position=", "_x", "_y", "_z"],
 super: "Vector3",
 get$x: function() {
  return this.position.get$x();
},
 get$y: function() {
  return this.position.get$y();
},
 get$z: function() {
  return this.position.get$z();
},
 Vertex$1: function(position) {
  $.print('THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead.');
}
};

$$.Projector = {"":
 ["_objectPool", "_vertexPool", "_face4Pool", "_face3Pool", "_linePool", "_particlePool", "_objectCount", "_vertexCount", "_face3Count", "_face4Count", "_lineCount", "_particleCount", "_object", "_vertex", "_line", "_particle", "_vector3", "_vector4", "_clippedVertex1PositionScreen", "_clippedVertex2PositionScreen", "_renderData", "_viewProjectionMatrix", "_modelViewProjectionMatrix", "_frustum"],
 super: "Object",
 projectGraph$2: function(root, sort) {
  this._objectCount = 0;
  var t1 = [];
  this._renderData.set$objects(t1);
  t1 = [];
  this._renderData.set$sprites(t1);
  t1 = [];
  this._renderData.set$lights(t1);
  this.projectObject$1(root);
  if (sort)
    $.sort(this._renderData.get$objects(), this.get$painterSort());
  return this._renderData;
},
 projectObject$1: function(object) {
  if (object.get$visible() === false)
    return;
  if (typeof object === 'object' && object !== null && !!object.is$Mesh || typeof object === 'object' && object !== null && !!object.is$Line)
    var t1 = object.get$frustumCulled() === false || this._frustum.contains$1(object) === true;
  else
    t1 = false;
  if (t1) {
    t1 = this._viewProjectionMatrix;
    var t2 = this._vector3;
    t1.multiplyVector3$1(t2.copy$1(object.get$position()));
    this._object = this.getNextObjectInPool$0();
    this._object.set$object(object);
    t2 = t2.get$z();
    this._object.set$z(t2);
    $.add$1(this._renderData.get$objects(), this._object);
  } else if (typeof object === 'object' && object !== null && !!object.is$Sprite || typeof object === 'object' && object !== null && !!object.is$Particle) {
    t1 = this._viewProjectionMatrix;
    t2 = this._vector3;
    t1.multiplyVector3$1(t2.copy$1(object.get$position()));
    this._object = this.getNextObjectInPool$0();
    this._object.set$object(object);
    t2 = t2.get$z();
    this._object.set$z(t2);
    $.add$1(this._renderData.get$sprites(), this._object);
  } else if (typeof object === 'object' && object !== null && !!object.is$Light)
    $.add$1(this._renderData.get$lights(), object);
  var cl = $.get$length(object.get$children());
  if (typeof cl !== 'number')
    return this.projectObject$1$bailout(1, object, cl, 0, 0);
  for (var c = 0; c < cl; ++c) {
    t1 = object.get$children();
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.projectObject$1$bailout(2, object, c, t1, cl);
    if (c < 0 || c >= t1.length)
      throw $.ioore(c);
    var t3 = object.get$children();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
      return this.projectObject$1$bailout(3, object, c, cl, t3);
    if (c < 0 || c >= t3.length)
      throw $.ioore(c);
    this.projectObject$1(t3[c]);
  }
},
 projectObject$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var object = env0;
      cl = env1;
      break;
    case 2:
      object = env0;
      c = env1;
      t1 = env2;
      cl = env3;
      break;
    case 3:
      object = env0;
      c = env1;
      cl = env2;
      t1 = env3;
      break;
  }
  switch (state) {
    case 0:
      if (object.get$visible() === false)
        return;
      if (typeof object === 'object' && object !== null && !!object.is$Mesh || typeof object === 'object' && object !== null && !!object.is$Line)
        var t1 = object.get$frustumCulled() === false || $.contains$1(this._frustum, object) === true;
      else
        t1 = false;
      if (t1) {
        t1 = this._viewProjectionMatrix;
        var t2 = this._vector3;
        t1.multiplyVector3$1(t2.copy$1(object.get$position()));
        this._object = this.getNextObjectInPool$0();
        this._object.set$object(object);
        t2 = t2.get$z();
        this._object.set$z(t2);
        $.add$1(this._renderData.get$objects(), this._object);
      } else if (typeof object === 'object' && object !== null && !!object.is$Sprite || typeof object === 'object' && object !== null && !!object.is$Particle) {
        t1 = this._viewProjectionMatrix;
        t2 = this._vector3;
        t1.multiplyVector3$1(t2.copy$1(object.get$position()));
        this._object = this.getNextObjectInPool$0();
        this._object.set$object(object);
        t2 = t2.get$z();
        this._object.set$z(t2);
        $.add$1(this._renderData.get$sprites(), this._object);
      } else if (typeof object === 'object' && object !== null && !!object.is$Light)
        $.add$1(this._renderData.get$lights(), object);
      var cl = $.get$length(object.get$children());
    case 1:
      state = 0;
      var c = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(c, cl))
                break L0;
              t1 = object.get$children();
            case 2:
              state = 0;
              $.index(t1, c);
              t1 = object.get$children();
            case 3:
              state = 0;
              this.projectObject$1($.index(t1, c));
              ++c;
          }
  }
},
 projectScene$3: function(scene, camera, sort) {
  var near = camera.get$near();
  if (typeof near !== 'number')
    return this.projectScene$3$bailout(1, scene, camera, sort, near, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var far = camera.get$far();
  if (typeof far !== 'number')
    return this.projectScene$3$bailout(2, scene, camera, sort, near, far, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this._face3Count = 0;
  this._face4Count = 0;
  this._lineCount = 0;
  this._particleCount = 0;
  var t3 = [];
  this._renderData.set$elements(t3);
  scene.updateMatrixWorld$0();
  if (camera.get$parent() == null) {
    $.add$1(scene, camera);
    camera.updateMatrixWorld$0();
  }
  camera.get$matrixWorldInverse().getInverse$1(camera.get$matrixWorld());
  var t1 = this._viewProjectionMatrix;
  t1.multiply$2(camera.get$projectionMatrix(), camera.get$matrixWorldInverse());
  this._frustum.setFromMatrix$1(t1);
  this._renderData = this.projectGraph$2(scene, false);
  var ol = $.get$length(this._renderData.get$objects());
  if (typeof ol !== 'number')
    return this.projectScene$3$bailout(3, camera, sort, t1, near, far, ol, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (var t2 = this._vertexPool, t3 = this._modelViewProjectionMatrix, t4 = this._clippedVertex1PositionScreen, t5 = this._clippedVertex2PositionScreen, v4 = null, o = 0, vl = null, faceVertexUvs = null, u = null, faceVertexNormals = null, modelMatrix = null, _face = null, v = null, v3 = null, c = null, cl = null, object = null, geometry = null, face = null, f = null, ul = null, n = null, fl = null, vertices = null, isFaceMaterial = null, rotationMatrix = null, nl = null, v1 = null, geometryMaterials = null, faces = null, normal = null, v2 = null, material = null; o < ol; ++o) {
    object = $.index(this._renderData.get$objects(), o).get$object();
    modelMatrix = object.get$matrixWorld();
    material = object.get$material();
    this._vertexCount = 0;
    if (typeof object === 'object' && object !== null && !!object.is$Mesh) {
      geometry = object.geometry;
      geometryMaterials = geometry.get$materials();
      if (typeof geometryMaterials !== 'string' && (typeof geometryMaterials !== 'object' || geometryMaterials === null || geometryMaterials.constructor !== Array && !geometryMaterials.is$JavaScriptIndexingBehavior()))
        return this.projectScene$3$bailout(4, t2, camera, sort, face, near, far, ul, n, nl, v1, object, normal, v2, t3, geometry, t4, t5, modelMatrix, material, t1, geometryMaterials, ol, v4, o, u, faceVertexNormals, _face, v3, c, cl, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      vertices = geometry.get$vertices();
      if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior()))
        return this.projectScene$3$bailout(5, t2, camera, sort, face, near, far, ul, n, nl, v1, object, normal, v2, t3, geometry, t4, t5, modelMatrix, material, t1, geometryMaterials, vertices, ol, v4, o, u, faceVertexNormals, _face, v3, c, cl, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      faces = geometry.get$faces();
      if (typeof faces !== 'string' && (typeof faces !== 'object' || faces === null || faces.constructor !== Array && !faces.is$JavaScriptIndexingBehavior()))
        return this.projectScene$3$bailout(6, t2, camera, sort, face, near, far, ul, n, nl, v1, object, normal, v2, t3, geometry, t4, t5, modelMatrix, material, t1, geometryMaterials, vertices, faces, v4, o, ol, u, faceVertexNormals, _face, v3, c, cl, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      faceVertexUvs = geometry.get$faceVertexUvs();
      if (typeof faceVertexUvs !== 'string' && (typeof faceVertexUvs !== 'object' || faceVertexUvs === null || faceVertexUvs.constructor !== Array && !faceVertexUvs.is$JavaScriptIndexingBehavior()))
        return this.projectScene$3$bailout(7, t2, camera, sort, face, near, far, ul, n, nl, v1, object, normal, v2, t3, geometry, t4, t5, modelMatrix, material, t1, geometryMaterials, vertices, faces, faceVertexUvs, v4, o, ol, u, faceVertexNormals, _face, v3, c, cl, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      rotationMatrix = object.matrixRotationWorld.extractRotation$1(modelMatrix);
      var t10 = object.material;
      isFaceMaterial = typeof t10 === 'object' && t10 !== null && !!t10.is$MeshFaceMaterial;
      vl = vertices.length;
      for (v = 0; v < vl; ++v) {
        this._vertex = this.getNextVertexInPool$0();
        var t6 = this._vertex.get$positionWorld();
        if (v < 0 || v >= vertices.length)
          throw $.ioore(v);
        t6.copy$1(vertices[v]);
        modelMatrix.multiplyVector3$1(this._vertex.get$positionWorld());
        this._vertex.get$positionScreen().copy$1(this._vertex.get$positionWorld());
        t1.multiplyVector4$1(this._vertex.get$positionScreen());
        t6 = this._vertex.get$positionScreen();
        t6.set$x($.div(t6.get$x(), this._vertex.get$positionScreen().get$w()));
        t6 = this._vertex.get$positionScreen();
        t6.set$y($.div(t6.get$y(), this._vertex.get$positionScreen().get$w()));
        t6 = $.gtB(this._vertex.get$positionScreen().get$z(), near) && $.ltB(this._vertex.get$positionScreen().get$z(), far);
        this._vertex.set$visible(t6);
      }
      fl = faces.length;
      for (var t6 = !object.doubleSided, t7 = object.flipSided, f = 0; f < fl; ++f) {
        if (f < 0 || f >= faces.length)
          throw $.ioore(f);
        face = faces[f];
        if (isFaceMaterial) {
          var t8 = face.get$materialIndex();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= geometryMaterials.length)
            throw $.ioore(t8);
          material = geometryMaterials[t8];
        } else
          material = object.material;
        if (material == null)
          continue;
        if (typeof face === 'object' && face !== null && !!face.is$Face3) {
          t8 = face.get$a();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v1 = t2[t8];
          t8 = face.get$b();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v2 = t2[t8];
          t8 = face.get$c();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v3 = t2[t8];
          if (v1.get$visible() === true)
            if (v2.get$visible() === true)
              if (v3.get$visible() === true)
                t8 = object.doubleSided || !(t7 === $.lt($.sub($.mul($.sub(v3.get$positionScreen().get$x(), v1.get$positionScreen().get$x()), $.sub(v2.get$positionScreen().get$y(), v1.get$positionScreen().get$y())), $.mul($.sub(v3.get$positionScreen().get$y(), v1.get$positionScreen().get$y()), $.sub(v2.get$positionScreen().get$x(), v1.get$positionScreen().get$x()))), 0));
              else
                t8 = false;
            else
              t8 = false;
          else
            t8 = false;
          if (t8) {
            _face = this.getNextFace3InPool$0();
            _face.get$v1().copy$1(v1);
            _face.get$v2().copy$1(v2);
            _face.get$v3().copy$1(v3);
          } else
            continue;
        } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
          t8 = face.get$a();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v1 = t2[t8];
          t8 = face.get$b();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v2 = t2[t8];
          t8 = face.get$c();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v3 = t2[t8];
          t8 = face.get$d();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= t2.length)
            throw $.ioore(t8);
          v4 = t2[t8];
          var bool1 = $.ltB($.sub($.mul($.sub(v4.get$positionScreen().get$x(), v1.get$positionScreen().get$x()), $.sub(v2.get$positionScreen().get$y(), v1.get$positionScreen().get$y())), $.mul($.sub(v4.get$positionScreen().get$y(), v1.get$positionScreen().get$y()), $.sub(v2.get$positionScreen().get$x(), v1.get$positionScreen().get$x()))), 0);
          var bool2 = $.ltB($.sub($.mul($.sub(v2.get$positionScreen().get$x(), v3.get$positionScreen().get$x()), $.sub(v4.get$positionScreen().get$y(), v3.get$positionScreen().get$y())), $.mul($.sub(v2.get$positionScreen().get$y(), v3.get$positionScreen().get$y()), $.sub(v4.get$positionScreen().get$x(), v3.get$positionScreen().get$x()))), 0);
          var bool3 = bool1 || bool2;
          if (v1.get$visible() === true)
            if (v2.get$visible() === true)
              if (v3.get$visible() === true)
                if (v4.get$visible() === true)
                  t8 = object.doubleSided || !(t7 === bool3);
                else
                  t8 = false;
              else
                t8 = false;
            else
              t8 = false;
          else
            t8 = false;
          if (t8) {
            _face = this.getNextFace4InPool$0();
            _face.get$v1().copy$1(v1);
            _face.get$v2().copy$1(v2);
            _face.get$v3().copy$1(v3);
            _face.get$v4().copy$1(v4);
          } else
            continue;
        }
        _face.get$normalWorld().copy$1(face.get$normal());
        rotationMatrix.multiplyVector3$1(_face.get$normalWorld());
        _face.get$centroidWorld().copy$1(face.get$centroid());
        modelMatrix.multiplyVector3$1(_face.get$centroidWorld());
        _face.get$centroidScreen().copy$1(_face.get$centroidWorld());
        t1.multiplyVector3$1(_face.get$centroidScreen());
        faceVertexNormals = face.get$vertexNormals();
        nl = $.get$length(faceVertexNormals);
        for (n = 0; $.ltB(n, nl); ++n) {
          normal = $.index(_face.get$vertexNormalsWorld(), n);
          normal.copy$1($.index(faceVertexNormals, n));
          rotationMatrix.multiplyVector3$1(normal);
        }
        cl = faceVertexUvs.length;
        for (c = 0; c < cl; ++c) {
          if (c < 0 || c >= faceVertexUvs.length)
            throw $.ioore(c);
          t8 = faceVertexUvs[c];
          if (typeof t8 !== 'string' && (typeof t8 !== 'object' || t8 === null || t8.constructor !== Array && !t8.is$JavaScriptIndexingBehavior()))
            return this.projectScene$3$bailout(8, t2, camera, t8, v, near, far, sort, faceVertexNormals, cl, nl, object, t6, t3, u, face, geometry, t4, t5, t7, c, material, modelMatrix, t1, fl, ul, n, geometryMaterials, vertices, faces, faceVertexUvs, ol, rotationMatrix, o, isFaceMaterial, normal, vl, v4, _face, v3, v1, v2, f);
          if (f < 0 || f >= t8.length)
            throw $.ioore(f);
          var uvs = t8[f];
          if (typeof uvs !== 'string' && (typeof uvs !== 'object' || uvs === null || uvs.constructor !== Array && !uvs.is$JavaScriptIndexingBehavior()))
            return this.projectScene$3$bailout(9, uvs, t2, camera, v, near, far, sort, faceVertexNormals, cl, nl, object, t6, t3, u, face, geometry, t4, t5, t7, c, material, modelMatrix, t1, fl, ul, n, geometryMaterials, vertices, faces, faceVertexUvs, ol, rotationMatrix, o, isFaceMaterial, normal, vl, v4, _face, v3, v1, v2, f);
          ul = uvs.length;
          for (u = 0; u < ul; ++u) {
            var faceUVs = $.index(_face.get$uvs(), c);
            if (u < 0 || u >= uvs.length)
              throw $.ioore(u);
            $.add$1(faceUVs, uvs[u]);
          }
        }
        _face.set$material(material);
        if (!(face.get$materialIndex() == null)) {
          t8 = face.get$materialIndex();
          if (t8 !== (t8 | 0))
            throw $.iae(t8);
          if (t8 < 0 || t8 >= geometryMaterials.length)
            throw $.ioore(t8);
          t8 = geometryMaterials[t8];
        } else
          t8 = null;
        _face.set$faceMaterial(t8);
        _face.set$z(_face.get$centroidScreen().get$z());
        $.add$1(this._renderData.get$elements(), _face);
      }
      object = object;
    } else if (typeof object === 'object' && object !== null && !!object.is$Line) {
      t3.multiply$2(t1, modelMatrix);
      vertices = object.get$geometry().get$vertices();
      if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior()))
        return this.projectScene$3$bailout(10, t2, camera, sort, geometry, face, near, f, ul, n, fl, vertices, isFaceMaterial, rotationMatrix, nl, geometryMaterials, faces, t3, normal, v2, object, t4, t5, far, modelMatrix, material, t1, ol, v4, o, faceVertexUvs, u, faceVertexNormals, _face, v3, c, cl, 0, 0, 0, 0, 0, 0);
      v1 = this.getNextVertexInPool$0();
      t7 = v1.get$positionScreen();
      if (0 >= vertices.length)
        throw $.ioore(0);
      t7.copy$1(vertices[0].get$position());
      t3.multiplyVector4$1(v1.get$positionScreen());
      vl = vertices.length;
      for (v = 1; v < vl; ++v) {
        v1 = this.getNextVertexInPool$0();
        t6 = v1.get$positionScreen();
        if (v < 0 || v >= vertices.length)
          throw $.ioore(v);
        t6.copy$1(vertices[v].get$position());
        t3.multiplyVector4$1(v1.get$positionScreen());
        t6 = $.sub(this._vertexCount, 2);
        if (t6 !== (t6 | 0))
          throw $.iae(t6);
        if (t6 < 0 || t6 >= t2.length)
          throw $.ioore(t6);
        v2 = t2[t6];
        t4.copy$1(v1.get$positionScreen());
        t5.copy$1(v2.get$positionScreen());
        if (this.clipLine$2(t4, t5) === true) {
          t6 = t4.get$w();
          if (typeof t6 !== 'number')
            throw $.iae(t6);
          t4.multiplyScalar$1(1 / t6);
          t7 = t5.get$w();
          if (typeof t7 !== 'number')
            throw $.iae(t7);
          t5.multiplyScalar$1(1 / t7);
          this._line = this.getNextLineInPool$0();
          this._line.get$v1().get$positionScreen().copy$1(t4);
          this._line.get$v2().get$positionScreen().copy$1(t5);
          t8 = $.max(t4.get$z(), t5.get$z());
          this._line.set$z(t8);
          this._line.set$material(material);
          $.add$1(this._renderData.get$elements(), this._line);
        }
      }
      object = object;
    }
  }
  ol = $.get$length(this._renderData.get$sprites());
  if (typeof ol !== 'number')
    return this.projectScene$3$bailout(11, ol, camera, sort, object, t1, modelMatrix, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (t2 = this._vector4, o = 0; o < ol; ++o) {
    object = $.index(this._renderData.get$sprites(), o).get$object();
    modelMatrix = object.get$matrixWorld();
    if (typeof object === 'object' && object !== null && !!object.is$Particle) {
      t2.setValues$4(modelMatrix.get$n14(), modelMatrix.get$n24(), modelMatrix.get$n34(), 1);
      t1.multiplyVector4$1(t2);
      t2.set$z($.div(t2.get$z(), t2.get$w()));
      if ($.gtB(t2.get$z(), 0) && $.ltB(t2.get$z(), 1)) {
        this._particle = this.getNextParticleInPool$0();
        t3 = $.div(t2.get$x(), t2.get$w());
        this._particle.set$x(t3);
        t3 = $.div(t2.get$y(), t2.get$w());
        this._particle.set$y(t3);
        t3 = t2.get$z();
        this._particle.set$z(t3);
        t3 = object.rotation.get$z();
        this._particle.set$rotation(t3);
        t3 = object.scale;
        t4 = $.mul(t3.get$x(), $.abs($.sub(this._particle.get$x(), $.div($.add(t2.get$x(), camera.get$projectionMatrix().get$n11()), $.add(t2.get$w(), camera.get$projectionMatrix().get$n14())))));
        this._particle.get$scale().set$x(t4);
        t4 = $.mul(t3.get$y(), $.abs($.sub(this._particle.get$y(), $.div($.add(t2.get$y(), camera.get$projectionMatrix().get$n22()), $.add(t2.get$w(), camera.get$projectionMatrix().get$n24())))));
        this._particle.get$scale().set$y(t4);
        t4 = object.material;
        this._particle.set$material(t4);
        $.add$1(this._renderData.get$elements(), this._particle);
      }
    }
  }
  if (sort === true)
    $.sort(this._renderData.get$elements(), this.get$painterSort());
  return this._renderData;
},
 projectScene$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28, env29, env30, env31, env32, env33, env34, env35, env36, env37, env38, env39, env40, env41) {
  switch (state) {
    case 1:
      var scene = env0;
      var camera = env1;
      var sort = env2;
      near = env3;
      break;
    case 2:
      scene = env0;
      camera = env1;
      sort = env2;
      near = env3;
      far = env4;
      break;
    case 3:
      camera = env0;
      sort = env1;
      t1 = env2;
      near = env3;
      far = env4;
      ol = env5;
      break;
    case 4:
      t2 = env0;
      camera = env1;
      sort = env2;
      face = env3;
      near = env4;
      far = env5;
      ul = env6;
      n = env7;
      nl = env8;
      v1 = env9;
      object = env10;
      normal = env11;
      v2 = env12;
      t3 = env13;
      geometry = env14;
      t4 = env15;
      t5 = env16;
      modelMatrix = env17;
      material = env18;
      t1 = env19;
      geometryMaterials = env20;
      ol = env21;
      v4 = env22;
      o = env23;
      u = env24;
      faceVertexNormals = env25;
      _face = env26;
      v3 = env27;
      c = env28;
      cl = env29;
      break;
    case 5:
      t2 = env0;
      camera = env1;
      sort = env2;
      face = env3;
      near = env4;
      far = env5;
      ul = env6;
      n = env7;
      nl = env8;
      v1 = env9;
      object = env10;
      normal = env11;
      v2 = env12;
      t3 = env13;
      geometry = env14;
      t4 = env15;
      t5 = env16;
      modelMatrix = env17;
      material = env18;
      t1 = env19;
      geometryMaterials = env20;
      vertices = env21;
      ol = env22;
      v4 = env23;
      o = env24;
      u = env25;
      faceVertexNormals = env26;
      _face = env27;
      v3 = env28;
      c = env29;
      cl = env30;
      break;
    case 6:
      t2 = env0;
      camera = env1;
      sort = env2;
      face = env3;
      near = env4;
      far = env5;
      ul = env6;
      n = env7;
      nl = env8;
      v1 = env9;
      object = env10;
      normal = env11;
      v2 = env12;
      t3 = env13;
      geometry = env14;
      t4 = env15;
      t5 = env16;
      modelMatrix = env17;
      material = env18;
      t1 = env19;
      geometryMaterials = env20;
      vertices = env21;
      faces = env22;
      v4 = env23;
      o = env24;
      ol = env25;
      u = env26;
      faceVertexNormals = env27;
      _face = env28;
      v3 = env29;
      c = env30;
      cl = env31;
      break;
    case 7:
      t2 = env0;
      camera = env1;
      sort = env2;
      face = env3;
      near = env4;
      far = env5;
      ul = env6;
      n = env7;
      nl = env8;
      v1 = env9;
      object = env10;
      normal = env11;
      v2 = env12;
      t3 = env13;
      geometry = env14;
      t4 = env15;
      t5 = env16;
      modelMatrix = env17;
      material = env18;
      t1 = env19;
      geometryMaterials = env20;
      vertices = env21;
      faces = env22;
      faceVertexUvs = env23;
      v4 = env24;
      o = env25;
      ol = env26;
      u = env27;
      faceVertexNormals = env28;
      _face = env29;
      v3 = env30;
      c = env31;
      cl = env32;
      break;
    case 8:
      t2 = env0;
      camera = env1;
      t8 = env2;
      v = env3;
      near = env4;
      far = env5;
      sort = env6;
      faceVertexNormals = env7;
      cl = env8;
      nl = env9;
      object = env10;
      t6 = env11;
      t3 = env12;
      u = env13;
      face = env14;
      geometry = env15;
      t4 = env16;
      t5 = env17;
      t7 = env18;
      c = env19;
      material = env20;
      modelMatrix = env21;
      t1 = env22;
      fl = env23;
      ul = env24;
      n = env25;
      geometryMaterials = env26;
      vertices = env27;
      faces = env28;
      faceVertexUvs = env29;
      ol = env30;
      rotationMatrix = env31;
      o = env32;
      isFaceMaterial = env33;
      normal = env34;
      vl = env35;
      v4 = env36;
      _face = env37;
      v3 = env38;
      v1 = env39;
      v2 = env40;
      f = env41;
      break;
    case 9:
      uvs = env0;
      t2 = env1;
      camera = env2;
      v = env3;
      near = env4;
      far = env5;
      sort = env6;
      faceVertexNormals = env7;
      cl = env8;
      nl = env9;
      object = env10;
      t6 = env11;
      t3 = env12;
      u = env13;
      face = env14;
      geometry = env15;
      t4 = env16;
      t5 = env17;
      t7 = env18;
      c = env19;
      material = env20;
      modelMatrix = env21;
      t1 = env22;
      fl = env23;
      ul = env24;
      n = env25;
      geometryMaterials = env26;
      vertices = env27;
      faces = env28;
      faceVertexUvs = env29;
      ol = env30;
      rotationMatrix = env31;
      o = env32;
      isFaceMaterial = env33;
      normal = env34;
      vl = env35;
      v4 = env36;
      _face = env37;
      v3 = env38;
      v1 = env39;
      v2 = env40;
      f = env41;
      break;
    case 10:
      t2 = env0;
      camera = env1;
      sort = env2;
      geometry = env3;
      face = env4;
      near = env5;
      f = env6;
      ul = env7;
      n = env8;
      fl = env9;
      vertices = env10;
      isFaceMaterial = env11;
      rotationMatrix = env12;
      nl = env13;
      geometryMaterials = env14;
      faces = env15;
      t3 = env16;
      normal = env17;
      v2 = env18;
      object = env19;
      t4 = env20;
      t5 = env21;
      far = env22;
      modelMatrix = env23;
      material = env24;
      t1 = env25;
      ol = env26;
      v4 = env27;
      o = env28;
      faceVertexUvs = env29;
      u = env30;
      faceVertexNormals = env31;
      _face = env32;
      v3 = env33;
      c = env34;
      cl = env35;
      break;
    case 11:
      ol = env0;
      camera = env1;
      sort = env2;
      object = env3;
      t1 = env4;
      modelMatrix = env5;
      break;
  }
  switch (state) {
    case 0:
      var near = camera.get$near();
    case 1:
      state = 0;
      var far = camera.get$far();
    case 2:
      state = 0;
      this._face3Count = 0;
      this._face4Count = 0;
      this._lineCount = 0;
      this._particleCount = 0;
      var t3 = [];
      this._renderData.set$elements(t3);
      scene.updateMatrixWorld$0();
      if (camera.get$parent() == null) {
        $.add$1(scene, camera);
        camera.updateMatrixWorld$0();
      }
      camera.get$matrixWorldInverse().getInverse$1(camera.get$matrixWorld());
      var t1 = this._viewProjectionMatrix;
      t1.multiply$2(camera.get$projectionMatrix(), camera.get$matrixWorldInverse());
      this._frustum.setFromMatrix$1(t1);
      this._renderData = this.projectGraph$2(scene, false);
      var ol = $.get$length(this._renderData.get$objects());
    case 3:
      state = 0;
      var t2 = this._vertexPool;
      t3 = this._modelViewProjectionMatrix;
      var t4 = this._clippedVertex1PositionScreen;
      var t5 = this._clippedVertex2PositionScreen;
      var v4 = null;
      var o = 0;
      var vl = null;
      var faceVertexUvs = null;
      var u = null;
      var faceVertexNormals = null;
      var modelMatrix = null;
      var _face = null;
      var v = null;
      var v3 = null;
      var c = null;
      var cl = null;
      var object = null;
      var geometry = null;
      var face = null;
      var f = null;
      var ul = null;
      var n = null;
      var fl = null;
      var vertices = null;
      var isFaceMaterial = null;
      var rotationMatrix = null;
      var nl = null;
      var v1 = null;
      var geometryMaterials = null;
      var faces = null;
      var normal = null;
      var v2 = null;
      var material = null;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(o, ol))
                break L0;
              object = $.index(this._renderData.get$objects(), o).get$object();
              modelMatrix = object.get$matrixWorld();
              material = object.get$material();
              this._vertexCount = 0;
            default:
              if (state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 0 && typeof object === 'object' && object !== null && !!object.is$Mesh)
                switch (state) {
                  case 0:
                    geometry = object.geometry;
                    geometryMaterials = geometry.get$materials();
                  case 4:
                    state = 0;
                    vertices = geometry.get$vertices();
                  case 5:
                    state = 0;
                    faces = geometry.get$faces();
                  case 6:
                    state = 0;
                    faceVertexUvs = geometry.get$faceVertexUvs();
                  case 7:
                    state = 0;
                    rotationMatrix = object.matrixRotationWorld.extractRotation$1(modelMatrix);
                    var t10 = object.material;
                    isFaceMaterial = typeof t10 === 'object' && t10 !== null && !!t10.is$MeshFaceMaterial;
                    vl = $.get$length(vertices);
                    for (v = 0; $.ltB(v, vl); ++v) {
                      this._vertex = this.getNextVertexInPool$0();
                      this._vertex.get$positionWorld().copy$1($.index(vertices, v));
                      modelMatrix.multiplyVector3$1(this._vertex.get$positionWorld());
                      this._vertex.get$positionScreen().copy$1(this._vertex.get$positionWorld());
                      t1.multiplyVector4$1(this._vertex.get$positionScreen());
                      var t6 = this._vertex.get$positionScreen();
                      t6.set$x($.div(t6.get$x(), this._vertex.get$positionScreen().get$w()));
                      t6 = this._vertex.get$positionScreen();
                      t6.set$y($.div(t6.get$y(), this._vertex.get$positionScreen().get$w()));
                      t6 = $.gtB(this._vertex.get$positionScreen().get$z(), near) && $.ltB(this._vertex.get$positionScreen().get$z(), far);
                      this._vertex.set$visible(t6);
                    }
                    fl = $.get$length(faces);
                    t6 = object.doubleSided !== true;
                    var t7 = object.flipSided;
                    f = 0;
                  default:
                    L1:
                      while (true)
                        switch (state) {
                          case 0:
                            if (!$.ltB(f, fl))
                              break L1;
                          default:
                            c$1: {
                              switch (state) {
                                case 0:
                                  face = $.index(faces, f);
                                  material = isFaceMaterial ? $.index(geometryMaterials, face.get$materialIndex()) : object.material;
                                  if (material == null)
                                    break c$1;
                                  if (typeof face === 'object' && face !== null && !!face.is$Face3) {
                                    var t8 = face.get$a();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v1 = t2[t8];
                                    t8 = face.get$b();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v2 = t2[t8];
                                    t8 = face.get$c();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v3 = t2[t8];
                                    if (v1.get$visible() === true)
                                      if (v2.get$visible() === true)
                                        if (v3.get$visible() === true)
                                          t8 = object.doubleSided === true || !(t7 === $.lt($.sub($.mul($.sub(v3.get$positionScreen().get$x(), v1.get$positionScreen().get$x()), $.sub(v2.get$positionScreen().get$y(), v1.get$positionScreen().get$y())), $.mul($.sub(v3.get$positionScreen().get$y(), v1.get$positionScreen().get$y()), $.sub(v2.get$positionScreen().get$x(), v1.get$positionScreen().get$x()))), 0));
                                        else
                                          t8 = false;
                                      else
                                        t8 = false;
                                    else
                                      t8 = false;
                                    if (t8) {
                                      _face = this.getNextFace3InPool$0();
                                      _face.get$v1().copy$1(v1);
                                      _face.get$v2().copy$1(v2);
                                      _face.get$v3().copy$1(v3);
                                    } else
                                      break c$1;
                                  } else if (typeof face === 'object' && face !== null && !!face.is$Face4) {
                                    t8 = face.get$a();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v1 = t2[t8];
                                    t8 = face.get$b();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v2 = t2[t8];
                                    t8 = face.get$c();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v3 = t2[t8];
                                    t8 = face.get$d();
                                    if (t8 !== (t8 | 0))
                                      throw $.iae(t8);
                                    if (t8 < 0 || t8 >= t2.length)
                                      throw $.ioore(t8);
                                    v4 = t2[t8];
                                    var bool1 = $.ltB($.sub($.mul($.sub(v4.get$positionScreen().get$x(), v1.get$positionScreen().get$x()), $.sub(v2.get$positionScreen().get$y(), v1.get$positionScreen().get$y())), $.mul($.sub(v4.get$positionScreen().get$y(), v1.get$positionScreen().get$y()), $.sub(v2.get$positionScreen().get$x(), v1.get$positionScreen().get$x()))), 0);
                                    var bool2 = $.ltB($.sub($.mul($.sub(v2.get$positionScreen().get$x(), v3.get$positionScreen().get$x()), $.sub(v4.get$positionScreen().get$y(), v3.get$positionScreen().get$y())), $.mul($.sub(v2.get$positionScreen().get$y(), v3.get$positionScreen().get$y()), $.sub(v4.get$positionScreen().get$x(), v3.get$positionScreen().get$x()))), 0);
                                    var bool3 = bool1 || bool2;
                                    if (v1.get$visible() === true)
                                      if (v2.get$visible() === true)
                                        if (v3.get$visible() === true)
                                          if (v4.get$visible() === true)
                                            t8 = object.doubleSided === true || !(t7 === bool3);
                                          else
                                            t8 = false;
                                        else
                                          t8 = false;
                                      else
                                        t8 = false;
                                    else
                                      t8 = false;
                                    if (t8) {
                                      _face = this.getNextFace4InPool$0();
                                      _face.get$v1().copy$1(v1);
                                      _face.get$v2().copy$1(v2);
                                      _face.get$v3().copy$1(v3);
                                      _face.get$v4().copy$1(v4);
                                    } else
                                      break c$1;
                                  }
                                  _face.get$normalWorld().copy$1(face.get$normal());
                                  rotationMatrix.multiplyVector3$1(_face.get$normalWorld());
                                  _face.get$centroidWorld().copy$1(face.get$centroid());
                                  modelMatrix.multiplyVector3$1(_face.get$centroidWorld());
                                  _face.get$centroidScreen().copy$1(_face.get$centroidWorld());
                                  t1.multiplyVector3$1(_face.get$centroidScreen());
                                  faceVertexNormals = face.get$vertexNormals();
                                  nl = $.get$length(faceVertexNormals);
                                  for (n = 0; $.ltB(n, nl); ++n) {
                                    normal = $.index(_face.get$vertexNormalsWorld(), n);
                                    normal.copy$1($.index(faceVertexNormals, n));
                                    rotationMatrix.multiplyVector3$1(normal);
                                  }
                                  cl = $.get$length(faceVertexUvs);
                                  c = 0;
                                default:
                                  L2:
                                    while (true)
                                      switch (state) {
                                        case 0:
                                          if (!$.ltB(c, cl))
                                            break L2;
                                        default:
                                          c$2: {
                                            switch (state) {
                                              case 0:
                                                t8 = $.index(faceVertexUvs, c);
                                              case 8:
                                                state = 0;
                                                var uvs = $.index(t8, f);
                                              case 9:
                                                state = 0;
                                                if (uvs == null)
                                                  break c$2;
                                                ul = $.get$length(uvs);
                                                for (u = 0; $.ltB(u, ul); ++u)
                                                  $.add$1($.index(_face.get$uvs(), c), $.index(uvs, u));
                                            }
                                          }
                                          ++c;
                                      }
                                  _face.set$material(material);
                                  _face.set$faceMaterial(!(face.get$materialIndex() == null) ? $.index(geometryMaterials, face.get$materialIndex()) : null);
                                  _face.set$z(_face.get$centroidScreen().get$z());
                                  $.add$1(this._renderData.get$elements(), _face);
                              }
                            }
                            ++f;
                        }
                    object = object;
                }
              else
                switch (state) {
                  case 0:
                  case 10:
                    if (state === 10 || state === 0 && typeof object === 'object' && object !== null && !!object.is$Line)
                      switch (state) {
                        case 0:
                          t3.multiply$2(t1, modelMatrix);
                          vertices = object.get$geometry().get$vertices();
                        case 10:
                          state = 0;
                          v1 = this.getNextVertexInPool$0();
                          v1.get$positionScreen().copy$1($.index(vertices, 0).get$position());
                          t3.multiplyVector4$1(v1.get$positionScreen());
                          vl = $.get$length(vertices);
                          for (v = 1; $.ltB(v, vl); ++v) {
                            v1 = this.getNextVertexInPool$0();
                            v1.get$positionScreen().copy$1($.index(vertices, v).get$position());
                            t3.multiplyVector4$1(v1.get$positionScreen());
                            t6 = $.sub(this._vertexCount, 2);
                            if (t6 !== (t6 | 0))
                              throw $.iae(t6);
                            if (t6 < 0 || t6 >= t2.length)
                              throw $.ioore(t6);
                            v2 = t2[t6];
                            t4.copy$1(v1.get$positionScreen());
                            t5.copy$1(v2.get$positionScreen());
                            if (this.clipLine$2(t4, t5) === true) {
                              t6 = t4.get$w();
                              if (typeof t6 !== 'number')
                                throw $.iae(t6);
                              t4.multiplyScalar$1(1 / t6);
                              t7 = t5.get$w();
                              if (typeof t7 !== 'number')
                                throw $.iae(t7);
                              t5.multiplyScalar$1(1 / t7);
                              this._line = this.getNextLineInPool$0();
                              this._line.get$v1().get$positionScreen().copy$1(t4);
                              this._line.get$v2().get$positionScreen().copy$1(t5);
                              t8 = $.max(t4.get$z(), t5.get$z());
                              this._line.set$z(t8);
                              this._line.set$material(material);
                              $.add$1(this._renderData.get$elements(), this._line);
                            }
                          }
                          object = object;
                      }
                }
              ++o;
          }
      ol = $.get$length(this._renderData.get$sprites());
    case 11:
      state = 0;
      for (t2 = this._vector4, o = 0; $.ltB(o, ol); ++o) {
        object = $.index(this._renderData.get$sprites(), o).get$object();
        modelMatrix = object.get$matrixWorld();
        if (typeof object === 'object' && object !== null && !!object.is$Particle) {
          t2.setValues$4(modelMatrix.get$n14(), modelMatrix.get$n24(), modelMatrix.get$n34(), 1);
          t1.multiplyVector4$1(t2);
          t2.set$z($.div(t2.get$z(), t2.get$w()));
          if ($.gtB(t2.get$z(), 0) && $.ltB(t2.get$z(), 1)) {
            this._particle = this.getNextParticleInPool$0();
            t3 = $.div(t2.get$x(), t2.get$w());
            this._particle.set$x(t3);
            t3 = $.div(t2.get$y(), t2.get$w());
            this._particle.set$y(t3);
            t3 = t2.get$z();
            this._particle.set$z(t3);
            t3 = object.rotation.get$z();
            this._particle.set$rotation(t3);
            t3 = object.scale;
            t4 = $.mul(t3.get$x(), $.abs($.sub(this._particle.get$x(), $.div($.add(t2.get$x(), camera.get$projectionMatrix().get$n11()), $.add(t2.get$w(), camera.get$projectionMatrix().get$n14())))));
            this._particle.get$scale().set$x(t4);
            t4 = $.mul(t3.get$y(), $.abs($.sub(this._particle.get$y(), $.div($.add(t2.get$y(), camera.get$projectionMatrix().get$n22()), $.add(t2.get$w(), camera.get$projectionMatrix().get$n24())))));
            this._particle.get$scale().set$y(t4);
            t4 = object.material;
            this._particle.set$material(t4);
            $.add$1(this._renderData.get$elements(), this._particle);
          }
        }
      }
      if (sort === true)
        $.sort(this._renderData.get$elements(), this.get$painterSort());
      return this._renderData;
  }
},
 getNextObjectInPool$0: function() {
  var t1 = this._objectCount;
  var t2 = this._objectPool;
  if ($.ltB(t1, t2.length)) {
    t1 = this._objectCount;
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t2.length)
      throw $.ioore(t1);
    if (!(t2[t1] == null)) {
      t1 = this._objectCount;
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      if (t1 < 0 || t1 >= t2.length)
        throw $.ioore(t1);
      var object = t2[t1];
    } else
      object = $.RenderableObject$();
  } else {
    object = $.RenderableObject$();
    t2.push(object);
  }
  this._objectCount = $.add(this._objectCount, 1);
  return object;
},
 getNextVertexInPool$0: function() {
  var t1 = this._vertexCount;
  if (typeof t1 !== 'number')
    return this.getNextVertexInPool$0$bailout(1, t1, 0);
  var t3 = this._vertexPool;
  var t4 = t3.length;
  if (t1 < t4) {
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    if (!(t3[t1] == null)) {
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      var vertex = t3[t1];
    } else
      vertex = $.RenderableVertex$();
  } else {
    vertex = $.RenderableVertex$();
    t3.push(vertex);
  }
  t1 = this._vertexCount;
  if (typeof t1 !== 'number')
    return this.getNextVertexInPool$0$bailout(2, t1, vertex);
  this._vertexCount = t1 + 1;
  return vertex;
},
 getNextVertexInPool$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      vertex = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._vertexCount;
    case 1:
      state = 0;
      var t3 = this._vertexPool;
      if ($.ltB(t1, t3.length)) {
        t1 = this._vertexCount;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= t3.length)
          throw $.ioore(t1);
        if (!(t3[t1] == null)) {
          t1 = this._vertexCount;
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= t3.length)
            throw $.ioore(t1);
          var vertex = t3[t1];
        } else
          vertex = $.RenderableVertex$();
      } else {
        vertex = $.RenderableVertex$();
        t3.push(vertex);
      }
      t1 = this._vertexCount;
    case 2:
      state = 0;
      this._vertexCount = $.add(t1, 1);
      return vertex;
  }
},
 getNextFace3InPool$0: function() {
  var t1 = this._face3Count;
  if (typeof t1 !== 'number')
    return this.getNextFace3InPool$0$bailout(1, t1, 0);
  var t3 = this._face3Pool;
  var t4 = t3.length;
  if (t1 < t4) {
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    if (!(t3[t1] == null)) {
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      var face = t3[t1];
    } else
      face = $.RenderableFace3$();
  } else {
    face = $.RenderableFace3$();
    t3.push(face);
  }
  t1 = this._face3Count;
  if (typeof t1 !== 'number')
    return this.getNextFace3InPool$0$bailout(2, t1, face);
  this._face3Count = t1 + 1;
  return face;
},
 getNextFace3InPool$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      face = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._face3Count;
    case 1:
      state = 0;
      var t3 = this._face3Pool;
      if ($.ltB(t1, t3.length)) {
        t1 = this._face3Count;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= t3.length)
          throw $.ioore(t1);
        if (!(t3[t1] == null)) {
          t1 = this._face3Count;
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= t3.length)
            throw $.ioore(t1);
          var face = t3[t1];
        } else
          face = $.RenderableFace3$();
      } else {
        face = $.RenderableFace3$();
        t3.push(face);
      }
      t1 = this._face3Count;
    case 2:
      state = 0;
      this._face3Count = $.add(t1, 1);
      return face;
  }
},
 getNextFace4InPool$0: function() {
  var t1 = this._face4Count;
  if (typeof t1 !== 'number')
    return this.getNextFace4InPool$0$bailout(1, t1, 0);
  var t3 = this._face4Pool;
  var t4 = t3.length;
  if (t1 < t4) {
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    if (!(t3[t1] == null)) {
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      var face = t3[t1];
    } else
      face = $.RenderableFace4$();
  } else {
    face = $.RenderableFace4$();
    t3.push(face);
  }
  t1 = this._face4Count;
  if (typeof t1 !== 'number')
    return this.getNextFace4InPool$0$bailout(2, t1, face);
  this._face4Count = t1 + 1;
  return face;
},
 getNextFace4InPool$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      face = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._face4Count;
    case 1:
      state = 0;
      var t3 = this._face4Pool;
      if ($.ltB(t1, t3.length)) {
        t1 = this._face4Count;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= t3.length)
          throw $.ioore(t1);
        if (!(t3[t1] == null)) {
          t1 = this._face4Count;
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= t3.length)
            throw $.ioore(t1);
          var face = t3[t1];
        } else
          face = $.RenderableFace4$();
      } else {
        face = $.RenderableFace4$();
        t3.push(face);
      }
      t1 = this._face4Count;
    case 2:
      state = 0;
      this._face4Count = $.add(t1, 1);
      return face;
  }
},
 getNextLineInPool$0: function() {
  var t1 = this._lineCount;
  if (typeof t1 !== 'number')
    return this.getNextLineInPool$0$bailout(1, t1, 0);
  var t3 = this._linePool;
  var t4 = t3.length;
  if (t1 < t4) {
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    if (!(t3[t1] == null)) {
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      var line = t3[t1];
    } else
      line = $.RenderableLine$();
  } else {
    line = $.RenderableLine$();
    t3.push(line);
  }
  t1 = this._lineCount;
  if (typeof t1 !== 'number')
    return this.getNextLineInPool$0$bailout(2, t1, line);
  this._lineCount = t1 + 1;
  return line;
},
 getNextLineInPool$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      line = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lineCount;
    case 1:
      state = 0;
      var t3 = this._linePool;
      if ($.ltB(t1, t3.length)) {
        t1 = this._lineCount;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= t3.length)
          throw $.ioore(t1);
        if (!(t3[t1] == null)) {
          t1 = this._lineCount;
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= t3.length)
            throw $.ioore(t1);
          var line = t3[t1];
        } else
          line = $.RenderableLine$();
      } else {
        line = $.RenderableLine$();
        t3.push(line);
      }
      t1 = this._lineCount;
    case 2:
      state = 0;
      this._lineCount = $.add(t1, 1);
      return line;
  }
},
 getNextParticleInPool$0: function() {
  var t1 = this._particleCount;
  if (typeof t1 !== 'number')
    return this.getNextParticleInPool$0$bailout(1, t1, 0);
  var t3 = this._particlePool;
  var t4 = t3.length;
  if (t1 < t4) {
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    if (!(t3[t1] == null)) {
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      var particle = t3[t1];
    } else
      particle = $.RenderableParticle$();
  } else {
    particle = $.RenderableParticle$();
    t3.push(particle);
  }
  t1 = this._particleCount;
  if (typeof t1 !== 'number')
    return this.getNextParticleInPool$0$bailout(2, t1, particle);
  this._particleCount = t1 + 1;
  return particle;
},
 getNextParticleInPool$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      particle = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._particleCount;
    case 1:
      state = 0;
      var t3 = this._particlePool;
      if ($.ltB(t1, t3.length)) {
        t1 = this._particleCount;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= t3.length)
          throw $.ioore(t1);
        if (!(t3[t1] == null)) {
          t1 = this._particleCount;
          if (t1 !== (t1 | 0))
            throw $.iae(t1);
          if (t1 < 0 || t1 >= t3.length)
            throw $.ioore(t1);
          var particle = t3[t1];
        } else
          particle = $.RenderableParticle$();
      } else {
        particle = $.RenderableParticle$();
        t3.push(particle);
      }
      t1 = this._particleCount;
    case 2:
      state = 0;
      this._particleCount = $.add(t1, 1);
      return particle;
  }
},
 painterSort$2: function(a, b) {
  return $.compareTo(b.get$z(), a.get$z());
},
 get$painterSort: function() { return new $.BoundClosure2(this, 'painterSort$2'); },
 clipLine$2: function(s1, s2) {
  var t1 = s1.get$z();
  if (typeof t1 !== 'number')
    return this.clipLine$2$bailout(1, s1, s2, t1, 0, 0, 0, 0);
  var t3 = s1.get$w();
  if (typeof t3 !== 'number')
    return this.clipLine$2$bailout(2, s1, s2, t1, t3, 0, 0, 0);
  var bc1near = t1 + t3;
  t3 = s2.get$z();
  if (typeof t3 !== 'number')
    return this.clipLine$2$bailout(3, s1, s2, bc1near, t3, 0, 0, 0);
  var t5 = s2.get$w();
  if (typeof t5 !== 'number')
    return this.clipLine$2$bailout(4, s1, s2, bc1near, t3, t5, 0, 0);
  var bc2near = t3 + t5;
  t5 = s1.get$z();
  if (typeof t5 !== 'number')
    return this.clipLine$2$bailout(5, s1, s2, bc1near, bc2near, t5, 0, 0);
  t5 = -t5;
  var t7 = s1.get$w();
  if (typeof t7 !== 'number')
    return this.clipLine$2$bailout(6, s1, s2, t7, t5, bc1near, bc2near, 0);
  var bc1far = t5 + t7;
  t7 = s2.get$z();
  if (typeof t7 !== 'number')
    return this.clipLine$2$bailout(7, s1, s2, bc1far, t7, bc1near, bc2near, 0);
  t7 = -t7;
  var t9 = s2.get$w();
  if (typeof t9 !== 'number')
    return this.clipLine$2$bailout(8, s1, s2, bc1far, t7, t9, bc1near, bc2near);
  var bc2far = t7 + t9;
  if (bc1near >= 0 && bc2near >= 0 && bc1far >= 0 && bc2far >= 0)
    return true;
  else {
    t1 = bc1near < 0;
    if (!(t1 && bc2near < 0))
      var t2 = bc1far < 0 && bc2far < 0;
    else
      t2 = true;
    if (t2)
      return false;
    else {
      if (t1) {
        var alpha1 = $.max(0, bc1near / (bc1near - bc2near));
        var alpha2 = 1;
      } else {
        alpha2 = bc2near < 0 ? $.min(1, bc1near / (bc1near - bc2near)) : 1;
        alpha1 = 0;
      }
      if (bc1far < 0)
        alpha1 = $.max(alpha1, bc1far / (bc1far - bc2far));
      else if (bc2far < 0)
        alpha2 = $.min(alpha2, bc1far / (bc1far - bc2far));
      if (alpha2 < alpha1)
        return false;
      else {
        s1.lerpSelf$2(s2, alpha1);
        s2.lerpSelf$2(s1, 1 - alpha2);
        return true;
      }
    }
  }
},
 clipLine$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var s1 = env0;
      var s2 = env1;
      t1 = env2;
      break;
    case 2:
      s1 = env0;
      s2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      s1 = env0;
      s2 = env1;
      bc1near = env2;
      t3 = env3;
      break;
    case 4:
      s1 = env0;
      s2 = env1;
      bc1near = env2;
      t3 = env3;
      t5 = env4;
      break;
    case 5:
      s1 = env0;
      s2 = env1;
      bc1near = env2;
      bc2near = env3;
      t5 = env4;
      break;
    case 6:
      s1 = env0;
      s2 = env1;
      t7 = env2;
      t5 = env3;
      bc1near = env4;
      bc2near = env5;
      break;
    case 7:
      s1 = env0;
      s2 = env1;
      bc1far = env2;
      t7 = env3;
      bc1near = env4;
      bc2near = env5;
      break;
    case 8:
      s1 = env0;
      s2 = env1;
      bc1far = env2;
      t7 = env3;
      t9 = env4;
      bc1near = env5;
      bc2near = env6;
      break;
  }
  switch (state) {
    case 0:
      var t1 = s1.get$z();
    case 1:
      state = 0;
      var t3 = s1.get$w();
    case 2:
      state = 0;
      var bc1near = $.add(t1, t3);
      t3 = s2.get$z();
    case 3:
      state = 0;
      var t5 = s2.get$w();
    case 4:
      state = 0;
      var bc2near = $.add(t3, t5);
      t5 = s1.get$z();
    case 5:
      state = 0;
      t5 = $.neg(t5);
      var t7 = s1.get$w();
    case 6:
      state = 0;
      var bc1far = $.add(t5, t7);
      t7 = s2.get$z();
    case 7:
      state = 0;
      t7 = $.neg(t7);
      var t9 = s2.get$w();
    case 8:
      state = 0;
      var bc2far = $.add(t7, t9);
      if ($.geB(bc1near, 0) && $.geB(bc2near, 0) && $.geB(bc1far, 0) && $.geB(bc2far, 0))
        return true;
      else {
        if (!($.ltB(bc1near, 0) && $.ltB(bc2near, 0)))
          t1 = $.ltB(bc1far, 0) && $.ltB(bc2far, 0);
        else
          t1 = true;
        if (t1)
          return false;
        else {
          if ($.ltB(bc1near, 0)) {
            var alpha1 = $.max(0, $.div(bc1near, $.sub(bc1near, bc2near)));
            var alpha2 = 1;
          } else {
            alpha2 = $.ltB(bc2near, 0) ? $.min(1, $.div(bc1near, $.sub(bc1near, bc2near))) : 1;
            alpha1 = 0;
          }
          if ($.ltB(bc1far, 0))
            alpha1 = $.max(alpha1, $.div(bc1far, $.sub(bc1far, bc2far)));
          else if ($.ltB(bc2far, 0))
            alpha2 = $.min(alpha2, $.div(bc1far, $.sub(bc1far, bc2far)));
          if (alpha2 < alpha1)
            return false;
          else {
            s1.lerpSelf$2(s2, alpha1);
            s2.lerpSelf$2(s1, 1 - alpha2);
            return true;
          }
        }
      }
  }
},
 Projector$0: function() {
  this._objectPool = [];
  this._vertexPool = [];
  this._face3Pool = [];
  this._face4Pool = [];
  this._linePool = [];
  this._particlePool = [];
  this._renderData = $.ProjectorRenderData$();
  this._vector3 = $.Vector3$(0, 0, 0);
  this._vector4 = $.Vector4$(0, 0, 0, 1);
  this._viewProjectionMatrix = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this._modelViewProjectionMatrix = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  this._frustum = $.Frustum$();
  this._clippedVertex1PositionScreen = $.Vector4$(0, 0, 0, 1);
  this._clippedVertex2PositionScreen = $.Vector4$(0, 0, 0, 1);
}
};

$$.ProjectorRenderData = {"":
 ["objects=", "sprites=", "lights=", "elements="],
 super: "Object",
 ProjectorRenderData$0: function() {
  this.objects = [];
  this.sprites = [];
  this.lights = [];
  this.elements = [];
}
};

$$.Vector2 = {"":
 ["_x", "_y"],
 super: "Object",
 get$x: function() {
  return this._x;
},
 set$x: function(value) {
  this._x = value;
},
 get$y: function() {
  return this._y;
},
 set$y: function(value) {
  this._y = value;
},
 setValues$2: function(x, y) {
  this._x = x;
  this._y = y;
  return this;
},
 copy$1: function(v) {
  this._x = v.get$x();
  this._y = v.get$y();
  return this;
},
 addSelf$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.addSelf$1$bailout(1, v, t1, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.addSelf$1$bailout(2, v, t3, t1);
  this._x = t1 + t3;
  var t5 = this._y;
  if (typeof t5 !== 'number')
    return this.addSelf$1$bailout(3, v, t5, 0);
  var t7 = v.get$y();
  if (typeof t7 !== 'number')
    return this.addSelf$1$bailout(4, t5, t7, 0);
  this._y = t5 + t7;
  return this;
},
 addSelf$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 3:
      v = env0;
      t5 = env1;
      break;
    case 4:
      t5 = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      this._x = $.add(t1, t3);
      var t5 = this._y;
    case 3:
      state = 0;
      var t7 = v.get$y();
    case 4:
      state = 0;
      this._y = $.add(t5, t7);
      return this;
  }
},
 sub$2: function(v1, v2) {
  var t1 = v1.get$x();
  if (typeof t1 !== 'number')
    return this.sub$2$bailout(1, v1, v2, t1, 0);
  var t3 = v2.get$x();
  if (typeof t3 !== 'number')
    return this.sub$2$bailout(2, v1, v2, t1, t3);
  this._x = t1 - t3;
  var t5 = v1.get$y();
  if (typeof t5 !== 'number')
    return this.sub$2$bailout(3, t5, v2, 0, 0);
  var t7 = v2.get$y();
  if (typeof t7 !== 'number')
    return this.sub$2$bailout(4, t5, t7, 0, 0);
  this._y = t5 - t7;
  return this;
},
 sub$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      t1 = env2;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      t5 = env0;
      v2 = env1;
      break;
    case 4:
      t5 = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = v1.get$x();
    case 1:
      state = 0;
      var t3 = v2.get$x();
    case 2:
      state = 0;
      this._x = $.sub(t1, t3);
      var t5 = v1.get$y();
    case 3:
      state = 0;
      var t7 = v2.get$y();
    case 4:
      state = 0;
      this._y = $.sub(t5, t7);
      return this;
  }
},
 multiplyScalar$1: function(s) {
  if (typeof s !== 'number')
    return this.multiplyScalar$1$bailout(1, s, 0);
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.multiplyScalar$1$bailout(2, s, t1);
  this._x = t1 * s;
  var t3 = this._y;
  if (typeof t3 !== 'number')
    return this.multiplyScalar$1$bailout(3, s, t3);
  this._y = t3 * s;
  return this;
},
 multiplyScalar$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var s = env0;
      break;
    case 2:
      s = env0;
      t1 = env1;
      break;
    case 3:
      s = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this._x;
    case 2:
      state = 0;
      this._x = $.mul(t1, s);
      var t3 = this._y;
    case 3:
      state = 0;
      this._y = $.mul(t3, s);
      return this;
  }
},
 divideScalar$1: function(s) {
  if (typeof s !== 'number')
    return this.divideScalar$1$bailout(1, s, 0);
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.divideScalar$1$bailout(2, s, t1);
  this._x = t1 / s;
  var t3 = this._y;
  if (typeof t3 !== 'number')
    return this.divideScalar$1$bailout(3, s, t3);
  this._y = t3 / s;
  return this;
},
 divideScalar$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var s = env0;
      break;
    case 2:
      s = env0;
      t1 = env1;
      break;
    case 3:
      s = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 3 || state === 2 || state === 0 && !(s == null))
        switch (state) {
          case 0:
            var t1 = this._x;
          case 2:
            state = 0;
            this._x = $.div(t1, s);
            var t3 = this._y;
          case 3:
            state = 0;
            this._y = $.div(t3, s);
        }
      else
        this.setValues$2(0, 0);
      return this;
  }
},
 dot$1: function(v) {
  var t1 = this._x;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(1, v, t1, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number')
    return this.dot$1$bailout(2, v, t3, t1);
  t3 = t1 * t3;
  t1 = this._y;
  if (typeof t1 !== 'number')
    return this.dot$1$bailout(3, t1, v, t3);
  var t6 = v.get$y();
  if (typeof t6 !== 'number')
    return this.dot$1$bailout(4, t1, t6, t3);
  return t3 + t1 * t6;
},
 dot$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var v = env0;
      t1 = env1;
      break;
    case 2:
      v = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      v = env1;
      t3 = env2;
      break;
    case 4:
      t1 = env0;
      t6 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._x;
    case 1:
      state = 0;
      var t3 = v.get$x();
    case 2:
      state = 0;
      t3 = $.mul(t1, t3);
      t1 = this._y;
    case 3:
      state = 0;
      var t6 = v.get$y();
    case 4:
      state = 0;
      return $.add(t3, $.mul(t1, t6));
  }
},
 lengthSq$0: function() {
  var t1 = this._x;
  t1 = $.mul(t1, t1);
  var t2 = this._y;
  return $.add(t1, $.mul(t2, t2));
},
 length$0: function() {
  return $.sqrt(this.lengthSq$0());
},
 get$length: function() { return new $.BoundClosure(this, 'length$0'); },
 normalize$0: function() {
  return this.divideScalar$1(this.length$0());
},
 distanceTo$1: function(v) {
  return $.sqrt(this.distanceToSquared$1(v));
},
 distanceToSquared$1: function(v) {
  var dx = $.sub(this._x, v.get$x());
  var dy = $.sub(this._y, v.get$y());
  return $.add($.mul(dx, dx), $.mul(dy, dy));
},
 Vector2$2: function(x, y) {
  this._x = !(x == null) ? x : 0;
  this._y = !(y == null) ? y : 0;
}
};

$$.UV = {"":
 ["_u", "_v"],
 super: "Object",
 get$u: function() {
  return this._u;
},
 get$v: function() {
  return this._v;
},
 copy$1: function(uv) {
  this._u = uv.get$u();
  this._v = uv.get$v();
  return this;
},
 UV$2: function(u, v) {
  this._u = !(u == null) ? u : 0;
  this._v = !(v == null) ? v : 0;
}
};

$$.Rectangle = {"":
 ["_left", "_top", "_right", "_bottom", "_width", "_height", "_isEmpty"],
 super: "Object",
 resize$0: function() {
  this._width = $.sub(this._right, this._left);
  this._height = $.sub(this._bottom, this._top);
},
 get$resize: function() { return new $.BoundClosure(this, 'resize$0'); },
 getX$0: function() {
  return this._left;
},
 getY$0: function() {
  return this._top;
},
 getWidth$0: function() {
  return this._width;
},
 getHeight$0: function() {
  return this._height;
},
 getLeft$0: function() {
  return this._left;
},
 getTop$0: function() {
  return this._top;
},
 getRight$0: function() {
  return this._right;
},
 getBottom$0: function() {
  return this._bottom;
},
 setValues$4: function(left, top$, right, bottom) {
  this._isEmpty = false;
  this._left = left;
  this._top = top$;
  this._right = right;
  this._bottom = bottom;
  this.resize$0();
},
 addPoint$2: function(x, y) {
  if (typeof x !== 'number')
    return this.addPoint$2$bailout(1, x, y, 0);
  if (typeof y !== 'number')
    return this.addPoint$2$bailout(1, x, y, 0);
  if (this._isEmpty) {
    this._isEmpty = false;
    this._left = x;
    this._top = y;
    this._right = x;
    this._bottom = y;
    this.resize$0();
  } else {
    var t1 = this._left;
    if (typeof t1 !== 'number')
      return this.addPoint$2$bailout(2, x, y, t1);
    if (t1 < x)
      ;
    else
      t1 = x;
    this._left = t1;
    t1 = this._top;
    if (typeof t1 !== 'number')
      return this.addPoint$2$bailout(4, x, y, t1);
    if (t1 < y)
      ;
    else
      t1 = y;
    this._top = t1;
    t1 = this._right;
    if (typeof t1 !== 'number')
      return this.addPoint$2$bailout(6, x, y, t1);
    if (t1 > x)
      ;
    else
      t1 = x;
    this._right = t1;
    t1 = this._bottom;
    if (typeof t1 !== 'number')
      return this.addPoint$2$bailout(8, y, t1, 0);
    if (t1 > y)
      ;
    else
      t1 = y;
    this._bottom = t1;
    this.resize$0();
  }
},
 addPoint$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      var y = env1;
      break;
    case 2:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 3:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 4:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 5:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 6:
      x = env0;
      y = env1;
      t1 = env2;
      break;
    case 7:
      t1 = env0;
      y = env1;
      break;
    case 8:
      y = env0;
      t1 = env1;
      break;
    case 9:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 0 && this._isEmpty === true) {
        this._isEmpty = false;
        this._left = x;
        this._top = y;
        this._right = x;
        this._bottom = y;
        this.resize$0();
      } else
        switch (state) {
          case 0:
            var t1 = this._left;
          case 2:
            state = 0;
          case 3:
            if (state === 3 || state === 0 && $.ltB(t1, x))
              switch (state) {
                case 0:
                  t1 = this._left;
                case 3:
                  state = 0;
              }
            else
              t1 = x;
            this._left = t1;
            t1 = this._top;
          case 4:
            state = 0;
          case 5:
            if (state === 5 || state === 0 && $.ltB(t1, y))
              switch (state) {
                case 0:
                  t1 = this._top;
                case 5:
                  state = 0;
              }
            else
              t1 = y;
            this._top = t1;
            t1 = this._right;
          case 6:
            state = 0;
          case 7:
            if (state === 7 || state === 0 && $.gtB(t1, x))
              switch (state) {
                case 0:
                  t1 = this._right;
                case 7:
                  state = 0;
              }
            else
              t1 = x;
            this._right = t1;
            t1 = this._bottom;
          case 8:
            state = 0;
          case 9:
            if (state === 9 || state === 0 && $.gtB(t1, y))
              switch (state) {
                case 0:
                  t1 = this._bottom;
                case 9:
                  state = 0;
              }
            else
              t1 = y;
            this._bottom = t1;
            this.resize$0();
        }
  }
},
 add3Points$6: function(x1, y1, x2, y2, x3, y3) {
  if (typeof x1 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (typeof y1 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (typeof x2 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (typeof y2 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (typeof x3 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (typeof y3 !== 'number')
    return this.add3Points$6$bailout(1, x1, y1, x2, y2, x3, y3, 0);
  if (this._isEmpty) {
    this._isEmpty = false;
    if (x1 < x2)
      if (x1 < x3)
        var t1 = x1;
      else
        t1 = x3;
    else if (x2 < x3)
      t1 = x2;
    else
      t1 = x3;
    this._left = t1;
    if (y1 < y2)
      if (y1 < y3)
        t1 = y1;
      else
        t1 = y3;
    else if (y2 < y3)
      t1 = y2;
    else
      t1 = y3;
    this._top = t1;
    if (x1 > x2)
      if (x1 > x3)
        t1 = x1;
      else
        t1 = x3;
    else if (x2 > x3)
      t1 = x2;
    else
      t1 = x3;
    this._right = t1;
    if (y1 > y2)
      if (y1 > y3)
        t1 = y1;
      else
        t1 = y3;
    else if (y2 > y3)
      t1 = y2;
    else
      t1 = y3;
    this._bottom = t1;
    this.resize$0();
  } else {
    if (x1 < x2)
      if (x1 < x3) {
        t1 = this._left;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(2, x1, y1, x2, y2, x3, y3, t1);
        if (x1 < t1)
          t1 = x1;
      } else {
        t1 = this._left;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(4, x1, y1, x2, y2, x3, y3, t1);
        if (x3 < t1)
          t1 = x3;
      }
    else if (x2 < x3) {
      t1 = this._left;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(6, x1, y1, x2, y2, x3, y3, t1);
      if (x2 < t1)
        t1 = x2;
    } else {
      t1 = this._left;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(8, x1, y1, x2, y2, x3, y3, t1);
      if (x3 < t1)
        t1 = x3;
    }
    this._left = t1;
    if (y1 < y2)
      if (y1 < y3) {
        t1 = this._top;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(10, x1, y1, x2, y2, x3, y3, t1);
        if (y1 < t1)
          t1 = y1;
      } else {
        t1 = this._top;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(12, x1, y1, x2, y2, x3, y3, t1);
        if (y3 < t1)
          t1 = y3;
      }
    else if (y2 < y3) {
      t1 = this._top;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(14, x1, y1, x2, y2, x3, y3, t1);
      if (y2 < t1)
        t1 = y2;
    } else {
      t1 = this._top;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(16, x1, y1, x2, y2, x3, y3, t1);
      if (y3 < t1)
        t1 = y3;
    }
    this._top = t1;
    if (x1 > x2)
      if (x1 > x3) {
        t1 = this._right;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(18, x1, y1, y2, y3, t1, 0, 0);
        if (x1 > t1)
          t1 = x1;
      } else {
        t1 = this._right;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(20, y1, y2, x3, y3, t1, 0, 0);
        if (x3 > t1)
          t1 = x3;
      }
    else if (x2 > x3) {
      t1 = this._right;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(22, y1, x2, y2, y3, t1, 0, 0);
      if (x2 > t1)
        t1 = x2;
    } else {
      t1 = this._right;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(24, y1, t1, y2, x3, y3, 0, 0);
      if (x3 > t1)
        t1 = x3;
    }
    this._right = t1;
    if (y1 > y2)
      if (y1 > y3) {
        t1 = this._bottom;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(26, t1, y1, 0, 0, 0, 0, 0);
        if (y1 > t1)
          t1 = y1;
      } else {
        t1 = this._bottom;
        if (typeof t1 !== 'number')
          return this.add3Points$6$bailout(28, t1, y3, 0, 0, 0, 0, 0);
        if (y3 > t1)
          t1 = y3;
      }
    else if (y2 > y3) {
      t1 = this._bottom;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(30, y2, t1, 0, 0, 0, 0, 0);
      if (y2 > t1)
        t1 = y2;
    } else {
      t1 = this._bottom;
      if (typeof t1 !== 'number')
        return this.add3Points$6$bailout(32, t1, y3, 0, 0, 0, 0, 0);
      if (y3 > t1)
        t1 = y3;
    }
    this._bottom = t1;
    this.resize$0();
  }
},
 add3Points$6$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var x1 = env0;
      var y1 = env1;
      var x2 = env2;
      var y2 = env3;
      var x3 = env4;
      var y3 = env5;
      break;
    case 2:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 3:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 4:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 5:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 6:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 7:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 8:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 9:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 10:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 11:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 12:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 13:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 14:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 15:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 16:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 17:
      x1 = env0;
      y1 = env1;
      x2 = env2;
      y2 = env3;
      x3 = env4;
      y3 = env5;
      t1 = env6;
      break;
    case 18:
      x1 = env0;
      y1 = env1;
      y2 = env2;
      y3 = env3;
      t1 = env4;
      break;
    case 19:
      y1 = env0;
      t1 = env1;
      y2 = env2;
      y3 = env3;
      break;
    case 20:
      y1 = env0;
      y2 = env1;
      x3 = env2;
      y3 = env3;
      t1 = env4;
      break;
    case 21:
      y1 = env0;
      y2 = env1;
      y3 = env2;
      t1 = env3;
      break;
    case 22:
      y1 = env0;
      x2 = env1;
      y2 = env2;
      y3 = env3;
      t1 = env4;
      break;
    case 23:
      y1 = env0;
      t1 = env1;
      y2 = env2;
      y3 = env3;
      break;
    case 24:
      y1 = env0;
      t1 = env1;
      y2 = env2;
      x3 = env3;
      y3 = env4;
      break;
    case 25:
      y1 = env0;
      y2 = env1;
      t1 = env2;
      y3 = env3;
      break;
    case 26:
      t1 = env0;
      y1 = env1;
      break;
    case 27:
      t1 = env0;
      break;
    case 28:
      t1 = env0;
      y3 = env1;
      break;
    case 29:
      t1 = env0;
      break;
    case 30:
      y2 = env0;
      t1 = env1;
      break;
    case 31:
      t1 = env0;
      break;
    case 32:
      t1 = env0;
      y3 = env1;
      break;
    case 33:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 0 && this._isEmpty === true) {
        this._isEmpty = false;
        if ($.ltB(x1, x2))
          var t1 = $.ltB(x1, x3) ? x1 : x3;
        else
          t1 = $.ltB(x2, x3) ? x2 : x3;
        this._left = t1;
        if ($.ltB(y1, y2))
          t1 = $.ltB(y1, y3) ? y1 : y3;
        else
          t1 = $.ltB(y2, y3) ? y2 : y3;
        this._top = t1;
        if ($.gtB(x1, x2))
          t1 = $.gtB(x1, x3) ? x1 : x3;
        else
          t1 = $.gtB(x2, x3) ? x2 : x3;
        this._right = t1;
        if ($.gtB(y1, y2))
          t1 = $.gtB(y1, y3) ? y1 : y3;
        else
          t1 = $.gtB(y2, y3) ? y2 : y3;
        this._bottom = t1;
        this.resize$0();
      } else
        switch (state) {
          case 0:
          default:
            if (state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && $.ltB(x1, x2))
              switch (state) {
                case 0:
                default:
                  if (state === 3 || state === 2 || state === 0 && $.ltB(x1, x3))
                    switch (state) {
                      case 0:
                        t1 = this._left;
                      case 2:
                        state = 0;
                      case 3:
                        if (state === 0 && $.ltB(x1, t1))
                          t1 = x1;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._left;
                            case 3:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._left;
                      case 4:
                        state = 0;
                      case 5:
                        if (state === 0 && $.ltB(x3, t1))
                          t1 = x3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._left;
                            case 5:
                              state = 0;
                          }
                    }
              }
            else
              switch (state) {
                case 0:
                default:
                  if (state === 7 || state === 6 || state === 0 && $.ltB(x2, x3))
                    switch (state) {
                      case 0:
                        t1 = this._left;
                      case 6:
                        state = 0;
                      case 7:
                        if (state === 0 && $.ltB(x2, t1))
                          t1 = x2;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._left;
                            case 7:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._left;
                      case 8:
                        state = 0;
                      case 9:
                        if (state === 0 && $.ltB(x3, t1))
                          t1 = x3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._left;
                            case 9:
                              state = 0;
                          }
                    }
              }
            this._left = t1;
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
            if (state === 13 || state === 12 || state === 11 || state === 10 || state === 0 && $.ltB(y1, y2))
              switch (state) {
                case 0:
                default:
                  if (state === 11 || state === 10 || state === 0 && $.ltB(y1, y3))
                    switch (state) {
                      case 0:
                        t1 = this._top;
                      case 10:
                        state = 0;
                      case 11:
                        if (state === 0 && $.ltB(y1, t1))
                          t1 = y1;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._top;
                            case 11:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._top;
                      case 12:
                        state = 0;
                      case 13:
                        if (state === 0 && $.ltB(y3, t1))
                          t1 = y3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._top;
                            case 13:
                              state = 0;
                          }
                    }
              }
            else
              switch (state) {
                case 0:
                default:
                  if (state === 15 || state === 14 || state === 0 && $.ltB(y2, y3))
                    switch (state) {
                      case 0:
                        t1 = this._top;
                      case 14:
                        state = 0;
                      case 15:
                        if (state === 0 && $.ltB(y2, t1))
                          t1 = y2;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._top;
                            case 15:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._top;
                      case 16:
                        state = 0;
                      case 17:
                        if (state === 0 && $.ltB(y3, t1))
                          t1 = y3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._top;
                            case 17:
                              state = 0;
                          }
                    }
              }
            this._top = t1;
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
            if (state === 21 || state === 20 || state === 19 || state === 18 || state === 0 && $.gtB(x1, x2))
              switch (state) {
                case 0:
                default:
                  if (state === 19 || state === 18 || state === 0 && $.gtB(x1, x3))
                    switch (state) {
                      case 0:
                        t1 = this._right;
                      case 18:
                        state = 0;
                      case 19:
                        if (state === 0 && $.gtB(x1, t1))
                          t1 = x1;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._right;
                            case 19:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._right;
                      case 20:
                        state = 0;
                      case 21:
                        if (state === 0 && $.gtB(x3, t1))
                          t1 = x3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._right;
                            case 21:
                              state = 0;
                          }
                    }
              }
            else
              switch (state) {
                case 0:
                default:
                  if (state === 23 || state === 22 || state === 0 && $.gtB(x2, x3))
                    switch (state) {
                      case 0:
                        t1 = this._right;
                      case 22:
                        state = 0;
                      case 23:
                        if (state === 0 && $.gtB(x2, t1))
                          t1 = x2;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._right;
                            case 23:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._right;
                      case 24:
                        state = 0;
                      case 25:
                        if (state === 0 && $.gtB(x3, t1))
                          t1 = x3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._right;
                            case 25:
                              state = 0;
                          }
                    }
              }
            this._right = t1;
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
            if (state === 29 || state === 28 || state === 27 || state === 26 || state === 0 && $.gtB(y1, y2))
              switch (state) {
                case 0:
                default:
                  if (state === 27 || state === 26 || state === 0 && $.gtB(y1, y3))
                    switch (state) {
                      case 0:
                        t1 = this._bottom;
                      case 26:
                        state = 0;
                      case 27:
                        if (state === 0 && $.gtB(y1, t1))
                          t1 = y1;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._bottom;
                            case 27:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._bottom;
                      case 28:
                        state = 0;
                      case 29:
                        if (state === 0 && $.gtB(y3, t1))
                          t1 = y3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._bottom;
                            case 29:
                              state = 0;
                          }
                    }
              }
            else
              switch (state) {
                case 0:
                default:
                  if (state === 31 || state === 30 || state === 0 && $.gtB(y2, y3))
                    switch (state) {
                      case 0:
                        t1 = this._bottom;
                      case 30:
                        state = 0;
                      case 31:
                        if (state === 0 && $.gtB(y2, t1))
                          t1 = y2;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._bottom;
                            case 31:
                              state = 0;
                          }
                    }
                  else
                    switch (state) {
                      case 0:
                        t1 = this._bottom;
                      case 32:
                        state = 0;
                      case 33:
                        if (state === 0 && $.gtB(y3, t1))
                          t1 = y3;
                        else
                          switch (state) {
                            case 0:
                              t1 = this._bottom;
                            case 33:
                              state = 0;
                          }
                    }
              }
            this._bottom = t1;
            this.resize$0();
        }
  }
},
 addRectangle$1: function(r) {
  if (this._isEmpty) {
    this._isEmpty = false;
    this._left = r.getLeft$0();
    this._top = r.getTop$0();
    this._right = r.getRight$0();
    this._bottom = r.getBottom$0();
    this.resize$0();
  } else {
    var t1 = this._left;
    if (typeof t1 !== 'number')
      return this.addRectangle$1$bailout(1, r, t1, 0);
    var t3 = r.getLeft$0();
    if (typeof t3 !== 'number')
      return this.addRectangle$1$bailout(2, r, t1, t3);
    this._left = t1 < t3 ? this._left : r.getLeft$0();
    t1 = this._top;
    if (typeof t1 !== 'number')
      return this.addRectangle$1$bailout(3, r, t1, 0);
    t3 = r.getTop$0();
    if (typeof t3 !== 'number')
      return this.addRectangle$1$bailout(4, r, t3, t1);
    this._top = t1 < t3 ? this._top : r.getTop$0();
    t1 = this._right;
    if (typeof t1 !== 'number')
      return this.addRectangle$1$bailout(5, r, t1, 0);
    t3 = r.getRight$0();
    if (typeof t3 !== 'number')
      return this.addRectangle$1$bailout(6, r, t1, t3);
    this._right = t1 > t3 ? this._right : r.getRight$0();
    t1 = this._bottom;
    if (typeof t1 !== 'number')
      return this.addRectangle$1$bailout(7, r, t1, 0);
    t3 = r.getBottom$0();
    if (typeof t3 !== 'number')
      return this.addRectangle$1$bailout(8, r, t3, t1);
    this._bottom = t1 > t3 ? this._bottom : r.getBottom$0();
    this.resize$0();
  }
},
 addRectangle$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var r = env0;
      t1 = env1;
      break;
    case 2:
      r = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      r = env0;
      t1 = env1;
      break;
    case 4:
      r = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 5:
      r = env0;
      t1 = env1;
      break;
    case 6:
      r = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 7:
      r = env0;
      t1 = env1;
      break;
    case 8:
      r = env0;
      t3 = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state === 0 && this._isEmpty === true) {
        this._isEmpty = false;
        this._left = r.getLeft$0();
        this._top = r.getTop$0();
        this._right = r.getRight$0();
        this._bottom = r.getBottom$0();
        this.resize$0();
      } else
        switch (state) {
          case 0:
            var t1 = this._left;
          case 1:
            state = 0;
            var t3 = r.getLeft$0();
          case 2:
            state = 0;
            this._left = $.ltB(t1, t3) ? this._left : r.getLeft$0();
            t1 = this._top;
          case 3:
            state = 0;
            t3 = r.getTop$0();
          case 4:
            state = 0;
            this._top = $.ltB(t1, t3) ? this._top : r.getTop$0();
            t1 = this._right;
          case 5:
            state = 0;
            t3 = r.getRight$0();
          case 6:
            state = 0;
            this._right = $.gtB(t1, t3) ? this._right : r.getRight$0();
            t1 = this._bottom;
          case 7:
            state = 0;
            t3 = r.getBottom$0();
          case 8:
            state = 0;
            this._bottom = $.gtB(t1, t3) ? this._bottom : r.getBottom$0();
            this.resize$0();
        }
  }
},
 inflate$1: function(v) {
  this._left = $.sub(this._left, v);
  this._top = $.sub(this._top, v);
  this._right = $.add(this._right, v);
  this._bottom = $.add(this._bottom, v);
  this.resize$0();
},
 minSelf$1: function(r) {
  this._left = $.gtB(this._left, r.getLeft$0()) ? this._left : r.getLeft$0();
  this._top = $.gtB(this._top, r.getTop$0()) ? this._top : r.getTop$0();
  this._right = $.ltB(this._right, r.getRight$0()) ? this._right : r.getRight$0();
  this._bottom = $.ltB(this._bottom, r.getBottom$0()) ? this._bottom : r.getBottom$0();
  this.resize$0();
},
 intersects$1: function(r) {
  var t1 = this._right;
  if (typeof t1 !== 'number')
    return this.intersects$1$bailout(1, r, t1, 0);
  var t3 = r.getLeft$0();
  if (typeof t3 !== 'number')
    return this.intersects$1$bailout(2, r, t1, t3);
  if (t1 < t3)
    return false;
  t1 = this._left;
  if (typeof t1 !== 'number')
    return this.intersects$1$bailout(3, r, t1, 0);
  t3 = r.getRight$0();
  if (typeof t3 !== 'number')
    return this.intersects$1$bailout(4, r, t1, t3);
  if (t1 > t3)
    return false;
  t1 = this._bottom;
  if (typeof t1 !== 'number')
    return this.intersects$1$bailout(5, r, t1, 0);
  t3 = r.getTop$0();
  if (typeof t3 !== 'number')
    return this.intersects$1$bailout(6, r, t3, t1);
  if (t1 < t3)
    return false;
  t1 = this._top;
  if (typeof t1 !== 'number')
    return this.intersects$1$bailout(7, r, t1, 0);
  t3 = r.getBottom$0();
  if (typeof t3 !== 'number')
    return this.intersects$1$bailout(8, t1, t3, 0);
  if (t1 > t3)
    return false;
  return true;
},
 intersects$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var r = env0;
      t1 = env1;
      break;
    case 2:
      r = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      r = env0;
      t1 = env1;
      break;
    case 4:
      r = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 5:
      r = env0;
      t1 = env1;
      break;
    case 6:
      r = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 7:
      r = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._right;
    case 1:
      state = 0;
      var t3 = r.getLeft$0();
    case 2:
      state = 0;
      if ($.ltB(t1, t3))
        return false;
      t1 = this._left;
    case 3:
      state = 0;
      t3 = r.getRight$0();
    case 4:
      state = 0;
      if ($.gtB(t1, t3))
        return false;
      t1 = this._bottom;
    case 5:
      state = 0;
      t3 = r.getTop$0();
    case 6:
      state = 0;
      if ($.ltB(t1, t3))
        return false;
      t1 = this._top;
    case 7:
      state = 0;
      t3 = r.getBottom$0();
    case 8:
      state = 0;
      if ($.gtB(t1, t3))
        return false;
      return true;
  }
},
 empty$0: function() {
  this._isEmpty = true;
  this._left = 0;
  this._top = 0;
  this._right = 0;
  this._bottom = 0;
  this.resize$0();
},
 isEmpty$0: function() {
  return this._isEmpty;
}
};

$$.CubeGeometry = {"":
 ["_sides", "segmentsWidth", "segmentsHeight", "segmentsDepth", "_id", "vertices", "colors", "materials", "faces", "tan1", "tan2", "faceUvs", "faceVertexUvs", "morphTargets", "morphColors", "morphNormals", "skinWeights", "skinIndices", "__tmpVertices", "_boundingBox", "_boundingSphere", "hasTangents", "_dynamic", "geometryGroups", "geometryGroupsList", "verticesNeedUpdate", "morphTargetsNeedUpdate", "elementsNeedUpdate", "uvsNeedUpdate", "normalsNeedUpdate", "tangentsNeedUpdate", "colorsNeedUpdate", "skinVerticesA", "skinVerticesB", "__data"],
 super: "Geometry",
 buildPlane$8: function(u, v, udir, vdir, width, height, depth, material) {
  if (typeof depth !== 'number')
    return this.buildPlane$8$bailout(1, u, v, udir, vdir, width, height, depth, material, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var gridX = this.segmentsWidth;
  gridX = !(gridX == null) ? gridX : 1;
  if (gridX !== (gridX | 0))
    return this.buildPlane$8$bailout(2, u, v, udir, vdir, width, height, depth, material, gridX, 0, 0, 0, 0, 0, 0, 0, 0);
  var gridY = this.segmentsHeight;
  gridY = !(gridY == null) ? gridY : 1;
  if (gridY !== (gridY | 0))
    return this.buildPlane$8$bailout(3, u, v, udir, vdir, width, height, depth, material, gridX, gridY, 0, 0, 0, 0, 0, 0, 0);
  var width_half = $.div(width, 2);
  if (typeof width_half !== 'number')
    return this.buildPlane$8$bailout(4, u, v, udir, vdir, width, height, depth, width_half, material, gridY, gridX, 0, 0, 0, 0, 0, 0);
  var height_half = $.div(height, 2);
  if (typeof height_half !== 'number')
    return this.buildPlane$8$bailout(5, u, v, udir, vdir, width, height, depth, width_half, height_half, gridY, material, gridX, 0, 0, 0, 0, 0);
  var offset = $.get$length(this.vertices);
  var t1 = u === 'x';
  if (!(t1 && v === 'y'))
    var t2 = u === 'y' && v === 'x';
  else
    t2 = true;
  if (t2)
    var w = 'z';
  else {
    if (!(t1 && v === 'z'))
      t2 = u === 'z' && v === 'x';
    else
      t2 = true;
    if (t2) {
      gridY = this.segmentsDepth;
      gridY = !(gridY == null) ? gridY : 1;
      w = 'y';
    } else {
      if (!(u === 'z' && v === 'y'))
        t2 = u === 'y' && v === 'z';
      else
        t2 = true;
      if (t2) {
        gridX = this.segmentsDepth;
        gridX = !(gridX == null) ? gridX : 1;
        w = 'x';
      } else
        w = null;
    }
  }
  if (gridY !== (gridY | 0))
    return this.buildPlane$8$bailout(8, w, gridX, udir, vdir, width, gridY, depth, width_half, height_half, material, offset, u, v, t1, height, 0, 0);
  if (gridX !== (gridX | 0))
    return this.buildPlane$8$bailout(7, w, gridX, udir, vdir, width, gridY, depth, width_half, height_half, material, offset, u, v, t1, height, 0, 0);
  if (typeof w !== 'string')
    return this.buildPlane$8$bailout(6, w, gridX, udir, vdir, width, gridY, depth, width_half, height_half, material, offset, u, v, t1, height, 0, 0);
  var gridX1 = gridX + 1;
  var gridY1 = gridY + 1;
  var segment_width = $.div(width, gridX);
  if (typeof segment_width !== 'number')
    return this.buildPlane$8$bailout(9, w, gridX, udir, vdir, gridX1, gridY, depth, width_half, height_half, segment_width, material, offset, gridY1, u, v, t1, height);
  var segment_height = $.div(height, gridY);
  if (typeof segment_height !== 'number')
    return this.buildPlane$8$bailout(10, w, gridX, udir, vdir, gridX1, gridY, depth, width_half, height_half, segment_width, segment_height, offset, gridY1, material, u, v, t1);
  var normal = $.Vector3$(0, 0, 0);
  t2 = w === 'x';
  if (t2)
    normal.set$x(depth > 0 ? 1 : -1);
  else if (w === 'y')
    normal.set$y(depth > 0 ? 1 : -1);
  else if (w === 'z')
    normal.set$z(depth > 0 ? 1 : -1);
  for (var t3 = u === 'y', t4 = u === 'z', t5 = v === 'x', t6 = v === 'y', t7 = v === 'z', t8 = w === 'y', t9 = w === 'z', iy = 0, ix = null; iy < gridY1; ++iy)
    for (var t10 = (iy * segment_height - height_half) * vdir, ix = 0; ix < gridX1; ++ix) {
      var vector = $.Vector3$(0, 0, 0);
      if (t1)
        vector.set$x((ix * segment_width - width_half) * udir);
      else if (t3)
        vector.set$y((ix * segment_width - width_half) * udir);
      else if (t4)
        vector.set$z((ix * segment_width - width_half) * udir);
      if (t5)
        vector.set$x(t10);
      else if (t6)
        vector.set$y(t10);
      else if (t7)
        vector.set$z(t10);
      if (t2)
        vector.set$x(depth);
      else if (t8)
        vector.set$y(depth);
      else if (t9)
        vector.set$z(depth);
      $.add$1(this.vertices, vector);
    }
  for (t1 = this.faceVertexUvs, iy = 0; iy < gridY; ++iy)
    for (t2 = iy + 1, t3 = gridX1 * iy, t4 = gridX1 * t2, t5 = iy / gridY, t2 /= gridY, ix = 0; ix < gridX; ++ix) {
      var a = ix + t3;
      var b = ix + t4;
      t6 = ix + 1;
      var c = t6 + t4;
      var d = t6 + t3;
      if (typeof offset !== 'number')
        throw $.iae(offset);
      var face = $.Face4$(a + offset, b + offset, c + offset, d + offset, null, null, null);
      face.get$normal().copy$1(normal);
      $.addAll(face.get$vertexNormals(), [normal.clone$0(), normal.clone$0(), normal.clone$0(), normal.clone$0()]);
      face.set$materialIndex(material);
      $.add$1(this.faces, face);
      if (0 >= t1.length)
        throw $.ioore(0);
      var faceVertexUV = t1[0];
      var newUVs = $.ListImplementation_List(null);
      t7 = ix / gridX;
      t8 = $.UV$(t7, t5);
      t7 = $.UV$(t7, t2);
      t6 /= gridX;
      $.addAll(newUVs, [t8, t7, $.UV$(t6, t2), $.UV$(t6, t5)]);
      $.add$1(faceVertexUV, newUVs);
    }
},
 buildPlane$8$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16) {
  switch (state) {
    case 1:
      var u = env0;
      var v = env1;
      var udir = env2;
      var vdir = env3;
      var width = env4;
      var height = env5;
      var depth = env6;
      var material = env7;
      break;
    case 2:
      u = env0;
      v = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      height = env5;
      depth = env6;
      material = env7;
      gridX = env8;
      break;
    case 3:
      u = env0;
      v = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      height = env5;
      depth = env6;
      material = env7;
      gridX = env8;
      gridY = env9;
      break;
    case 4:
      u = env0;
      v = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      height = env5;
      depth = env6;
      width_half = env7;
      material = env8;
      gridY = env9;
      gridX = env10;
      break;
    case 5:
      u = env0;
      v = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      height = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      gridY = env9;
      material = env10;
      gridX = env11;
      break;
    case 8:
      w = env0;
      gridX = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      gridY = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      material = env9;
      offset = env10;
      u = env11;
      v = env12;
      t1 = env13;
      height = env14;
      break;
    case 7:
      w = env0;
      gridX = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      gridY = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      material = env9;
      offset = env10;
      u = env11;
      v = env12;
      t1 = env13;
      height = env14;
      break;
    case 6:
      w = env0;
      gridX = env1;
      udir = env2;
      vdir = env3;
      width = env4;
      gridY = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      material = env9;
      offset = env10;
      u = env11;
      v = env12;
      t1 = env13;
      height = env14;
      break;
    case 9:
      w = env0;
      gridX = env1;
      udir = env2;
      vdir = env3;
      gridX1 = env4;
      gridY = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      segment_width = env9;
      material = env10;
      offset = env11;
      gridY1 = env12;
      u = env13;
      v = env14;
      t1 = env15;
      height = env16;
      break;
    case 10:
      w = env0;
      gridX = env1;
      udir = env2;
      vdir = env3;
      gridX1 = env4;
      gridY = env5;
      depth = env6;
      width_half = env7;
      height_half = env8;
      segment_width = env9;
      segment_height = env10;
      offset = env11;
      gridY1 = env12;
      material = env13;
      u = env14;
      v = env15;
      t1 = env16;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var gridX = this.segmentsWidth;
      gridX = !(gridX == null) ? gridX : 1;
    case 2:
      state = 0;
      var gridY = this.segmentsHeight;
      gridY = !(gridY == null) ? gridY : 1;
    case 3:
      state = 0;
      var width_half = $.div(width, 2);
    case 4:
      state = 0;
      var height_half = $.div(height, 2);
    case 5:
      state = 0;
      var offset = $.get$length(this.vertices);
      var t1 = u === 'x';
      if (!(t1 && v === 'y'))
        var t2 = u === 'y' && v === 'x';
      else
        t2 = true;
      if (t2)
        var w = 'z';
      else {
        if (!(t1 && v === 'z'))
          t2 = u === 'z' && v === 'x';
        else
          t2 = true;
        if (t2) {
          gridY = this.segmentsDepth;
          gridY = !(gridY == null) ? gridY : 1;
          w = 'y';
        } else {
          if (!(u === 'z' && v === 'y'))
            t2 = u === 'y' && v === 'z';
          else
            t2 = true;
          if (t2) {
            gridX = this.segmentsDepth;
            gridX = !(gridX == null) ? gridX : 1;
            w = 'x';
          } else
            w = null;
        }
      }
    case 8:
      state = 0;
    case 7:
      state = 0;
    case 6:
      state = 0;
      var gridX1 = $.add(gridX, 1);
      var gridY1 = $.add(gridY, 1);
      var segment_width = $.div(width, gridX);
    case 9:
      state = 0;
      var segment_height = $.div(height, gridY);
    case 10:
      state = 0;
      var normal = $.Vector3$(0, 0, 0);
      if ($.eqB(w, 'x'))
        normal.set$x($.gtB(depth, 0) ? 1 : -1);
      else if ($.eqB(w, 'y'))
        normal.set$y($.gtB(depth, 0) ? 1 : -1);
      else if ($.eqB(w, 'z'))
        normal.set$z($.gtB(depth, 0) ? 1 : -1);
      for (var t2 = u === 'y', t3 = u === 'z', t4 = v === 'x', t5 = v === 'y', t6 = v === 'z', iy = 0, ix = null; $.ltB(iy, gridY1); ++iy)
        for (ix = 0; $.ltB(ix, gridX1); ++ix) {
          var vector = $.Vector3$(0, 0, 0);
          if (t1) {
            if (typeof segment_width !== 'number')
              throw $.iae(segment_width);
            var t7 = ix * segment_width;
            if (typeof width_half !== 'number')
              throw $.iae(width_half);
            vector.set$x((t7 - width_half) * udir);
          } else if (t2) {
            if (typeof segment_width !== 'number')
              throw $.iae(segment_width);
            t7 = ix * segment_width;
            if (typeof width_half !== 'number')
              throw $.iae(width_half);
            vector.set$y((t7 - width_half) * udir);
          } else if (t3) {
            if (typeof segment_width !== 'number')
              throw $.iae(segment_width);
            t7 = ix * segment_width;
            if (typeof width_half !== 'number')
              throw $.iae(width_half);
            vector.set$z((t7 - width_half) * udir);
          }
          if (t4) {
            if (typeof segment_height !== 'number')
              throw $.iae(segment_height);
            t7 = iy * segment_height;
            if (typeof height_half !== 'number')
              throw $.iae(height_half);
            vector.set$x((t7 - height_half) * vdir);
          } else if (t5) {
            if (typeof segment_height !== 'number')
              throw $.iae(segment_height);
            t7 = iy * segment_height;
            if (typeof height_half !== 'number')
              throw $.iae(height_half);
            vector.set$y((t7 - height_half) * vdir);
          } else if (t6) {
            if (typeof segment_height !== 'number')
              throw $.iae(segment_height);
            t7 = iy * segment_height;
            if (typeof height_half !== 'number')
              throw $.iae(height_half);
            vector.set$z((t7 - height_half) * vdir);
          }
          if ($.eqB(w, 'x'))
            vector.set$x(depth);
          else if ($.eqB(w, 'y'))
            vector.set$y(depth);
          else if ($.eqB(w, 'z'))
            vector.set$z(depth);
          $.add$1(this.vertices, vector);
        }
      for (t1 = this.faceVertexUvs, iy = 0; $.ltB(iy, gridY); ++iy)
        for (t2 = iy + 1, ix = 0; $.ltB(ix, gridX); ++ix) {
          t3 = $.mul(gridX1, iy);
          if (typeof t3 !== 'number')
            throw $.iae(t3);
          var a = ix + t3;
          t3 = $.mul(gridX1, t2);
          if (typeof t3 !== 'number')
            throw $.iae(t3);
          var b = ix + t3;
          t3 = ix + 1;
          t4 = $.mul(gridX1, t2);
          if (typeof t4 !== 'number')
            throw $.iae(t4);
          var c = t3 + t4;
          t4 = $.mul(gridX1, iy);
          if (typeof t4 !== 'number')
            throw $.iae(t4);
          var d = t3 + t4;
          if (typeof offset !== 'number')
            throw $.iae(offset);
          var face = $.Face4$(a + offset, b + offset, c + offset, d + offset, null, null, null);
          face.get$normal().copy$1(normal);
          $.addAll(face.get$vertexNormals(), [normal.clone$0(), normal.clone$0(), normal.clone$0(), normal.clone$0()]);
          face.set$materialIndex(material);
          $.add$1(this.faces, face);
          if (0 < 0 || 0 >= t1.length)
            throw $.ioore(0);
          var faceVertexUV = t1[0];
          var newUVs = $.ListImplementation_List(null);
          if (typeof gridX !== 'number')
            throw $.iae(gridX);
          t4 = ix / gridX;
          if (typeof gridY !== 'number')
            throw $.iae(gridY);
          t5 = iy / gridY;
          t6 = $.UV$(t4, t5);
          t7 = t2 / gridY;
          t4 = $.UV$(t4, t7);
          t3 /= gridX;
          $.addAll(newUVs, [t6, t4, $.UV$(t3, t7), $.UV$(t3, t5)]);
          $.add$1(faceVertexUV, newUVs);
        }
  }
},
 CubeGeometry$8: function(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides) {
  if (typeof sides !== 'string' && (typeof sides !== 'object' || sides === null || sides.constructor !== Array && !sides.is$JavaScriptIndexingBehavior()))
    return this.CubeGeometry$8$bailout(1, width, height, depth, materials, sides);
  var width_half = $.div(width, 2);
  var height_half = $.div(height, 2);
  var depth_half = $.div(depth, 2);
  if (!(materials == null)) {
    if (typeof materials === 'object' && materials !== null && (materials.constructor === Array || materials.is$List()))
      this.materials = materials;
    else {
      this.materials = [];
      for (var t1 = this.materials, i = 0; i < 6; ++i)
        $.add$1(t1, materials);
    }
    var mpx = 0;
    var mnx = 1;
    var mny = 3;
    var mpy = 2;
    var mpz = 4;
    var mnz = 5;
  } else {
    this.materials = [];
    mpx = null;
    mnx = null;
    mny = null;
    mpy = null;
    mpz = null;
    mnz = null;
  }
  this._sides = $.CubeGeomSides$(true, true, true, true, true, true);
  for (var t1 = $.iterator(sides), t2 = this._sides; t1.hasNext$0() === true;) {
    var t3 = t1.next$0();
    if (!($.index($.get$dynamic(t2), t3) == null)) {
      var t4 = $.get$dynamic(t2);
      if (t3 !== (t3 | 0))
        throw $.iae(t3);
      if (t3 < 0 || t3 >= sides.length)
        throw $.ioore(t3);
      $.indexSet(t4, t3, sides[t3]);
    }
  }
  t1 = this._sides;
  if (t1.px === true)
    this.buildPlane$8('z', 'y', -1, -1, depth, height, width_half, mpx);
  if (t1.nx === true)
    this.buildPlane$8('z', 'y', 1, -1, depth, height, $.neg(width_half), mnx);
  if (t1.py === true)
    this.buildPlane$8('x', 'z', 1, 1, width, depth, height_half, mpy);
  if (t1.ny === true)
    this.buildPlane$8('x', 'z', 1, -1, width, depth, $.neg(height_half), mny);
  if (t1.pz === true)
    this.buildPlane$8('x', 'y', 1, -1, width, height, depth_half, mpz);
  if (t1.nz === true)
    this.buildPlane$8('x', 'y', -1, -1, width, height, $.neg(depth_half), mnz);
  this.computeCentroids$0();
  this.mergeVertices$0();
},
 CubeGeometry$8$bailout: function(state, width, height, depth, materials, sides) {
  var width_half = $.div(width, 2);
  var height_half = $.div(height, 2);
  var depth_half = $.div(depth, 2);
  if (!(materials == null)) {
    if (typeof materials === 'object' && materials !== null && (materials.constructor === Array || materials.is$List()))
      this.materials = materials;
    else {
      this.materials = [];
      for (var t1 = this.materials, i = 0; i < 6; ++i)
        $.add$1(t1, materials);
    }
    var mpx = 0;
    var mnx = 1;
    var mny = 3;
    var mpy = 2;
    var mpz = 4;
    var mnz = 5;
  } else {
    this.materials = [];
    mpx = null;
    mnx = null;
    mny = null;
    mpy = null;
    mpz = null;
    mnz = null;
  }
  this._sides = $.CubeGeomSides$(true, true, true, true, true, true);
  if (!(sides == null))
    for (var t1 = $.iterator(sides), t2 = this._sides; t1.hasNext$0() === true;) {
      var t3 = t1.next$0();
      if (!($.index($.get$dynamic(t2), t3) == null))
        $.indexSet($.get$dynamic(t2), t3, $.index(sides, t3));
    }
  t1 = this._sides;
  if (t1.get$px() === true)
    this.buildPlane$8('z', 'y', -1, -1, depth, height, width_half, mpx);
  if (t1.get$nx() === true)
    this.buildPlane$8('z', 'y', 1, -1, depth, height, $.neg(width_half), mnx);
  if (t1.get$py() === true)
    this.buildPlane$8('x', 'z', 1, 1, width, depth, height_half, mpy);
  if (t1.get$ny() === true)
    this.buildPlane$8('x', 'z', 1, -1, width, depth, $.neg(height_half), mny);
  if (t1.get$pz() === true)
    this.buildPlane$8('x', 'y', 1, -1, width, height, depth_half, mpz);
  if (t1.get$nz() === true)
    this.buildPlane$8('x', 'y', -1, -1, width, height, $.neg(depth_half), mnz);
  this.computeCentroids$0();
  this.mergeVertices$0();
}
};

$$.CubeGeomSides = {"":
 ["px?", "nx?", "py?", "ny?", "pz?", "nz?"],
 super: "Object"
};

$$.AmbientLight = {"":
 ["color", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Light",
 is$AmbientLight: true
};

$$.DirectionalLight = {"":
 ["_position", "target", "intensity", "distance", "_castShadow", "onlyShadow", "_shadowCameraLeft", "_shadowCameraRight", "_shadowCameraTop", "_shadowCameraBottom", "_shadowCameraVisible", "_shadowBias", "_shadowDarkness", "_shadowMapWidth", "_shadowMapHeight", "_shadowMap", "_shadowMapSize", "_shadowCamera", "_shadowMatrix", "color", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Light",
 DirectionalLight$3: function(hex, intensity, distance) {
  this._position = $.Vector3$(0, 1, 0);
  this.target = $.Object3D$();
  this._castShadow = false;
  this.onlyShadow = false;
  this._shadowCameraLeft = -500;
  this._shadowCameraRight = 500;
  this._shadowCameraTop = 500;
  this._shadowCameraBottom = -500;
  this._shadowCameraVisible = false;
  this._shadowBias = 0;
  this._shadowDarkness = 0.5;
  this._shadowMapWidth = 512;
  this._shadowMapHeight = 512;
  this._shadowMap = null;
  this._shadowMapSize = null;
  this._shadowCamera = null;
  this._shadowMatrix = null;
},
 is$DirectionalLight: true
};

$$.Light = {"":
 ["color?"],
 super: "Object3D",
 Light$1: function(hex) {
  this.color = $.Color$(hex);
},
 is$Light: true
};

$$.Material = {"":
 ["name?", "id?", "opacity?", "blending?", "overdraw?", "visible=", "needsUpdate="],
 super: "Object",
 get$_data: function() {
  if (this.__data == null)
    this.__data = $.makeLiteralMap([]);
  return this.__data;
},
 operator$index$1: function(key) {
  return $.index(this.get$_data(), key);
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.get$_data(), key, value);
  return value;
},
 Material$1: function(parameters) {
  var _parameters = !(parameters == null) ? parameters : $.makeLiteralMap([]);
  this.name = '';
  var t1 = $.Three_MaterialCount;
  $.Three_MaterialCount = $.add(t1, 1);
  this.id = t1;
  this.side = !($.index(_parameters, 'side') == null) ? $.index(_parameters, 'side') : 0;
  this.opacity = !($.index(_parameters, 'opacity') == null) ? $.index(_parameters, 'opacity') : 1;
  this.transparent = !($.index(_parameters, 'transparent') == null) && $.index(_parameters, 'transparent');
  this.blending = !($.index(_parameters, 'blending') == null) ? $.toInt($.index(_parameters, 'blending')) : 1;
  this.blendSrc = !($.index(_parameters, 'blendSrc') == null) ? $.toInt($.index(_parameters, 'blendSrc')) : 204;
  this.blendDst = !($.index(_parameters, 'blendDst') == null) ? $.toInt($.index(_parameters, 'blendDst')) : 205;
  this.blendEquation = !($.index(_parameters, 'blendEquation') == null) ? $.toInt($.index(_parameters, 'blendEquation')) : 100;
  this.depthTest = $.index(_parameters, 'depthTest') == null || $.index(_parameters, 'depthTest');
  this.depthWrite = $.index(_parameters, 'depthWrite') == null || $.index(_parameters, 'depthWrite');
  this.polygonOffset = !($.index(_parameters, 'polygonOffset') == null) && $.index(_parameters, 'polygonOffset');
  this.polygonOffsetFactor = !($.index(_parameters, 'polygonOffsetFactor') == null) ? $.toInt($.index(_parameters, 'polygonOffsetFactor')) : 0;
  this.polygonOffsetUnits = !($.index(_parameters, 'polygonOffsetUnits') == null) ? $.toInt($.index(_parameters, 'polygonOffsetUnits')) : 0;
  this.alphaTest = !($.index(_parameters, 'alphaTest') == null) ? $.toInt($.index(_parameters, 'alphaTest')) : 0;
  this.overdraw = !($.index(_parameters, 'overdraw') == null) && $.index(_parameters, 'overdraw');
  this.visible = $.index(_parameters, 'visible') == null || $.index(_parameters, 'visible');
  this.needsUpdate = true;
}
};

$$.LineBasicMaterial = {"":
 ["color?", "linewidth", "linecap", "linejoin", "fog", "vertexColors", "name", "id", "side", "opacity", "blending", "blendSrc", "blendDst", "blendEquation", "alphaTest", "polygonOffset", "polygonOffsetFactor", "polygonOffsetUnits", "transparent", "depthTest", "depthWrite", "overdraw", "visible", "needsUpdate", "__data"],
 super: "Material",
 LineBasicMaterial$1: function(parameters) {
  parameters = !(parameters == null) ? parameters : $.makeLiteralMap([]);
  this.color = !($.index(parameters, 'color') == null) ? $.Color$($.index(parameters, 'color')) : $.Color$(16777215);
  this.linewidth = !($.index(parameters, 'linewidth') == null) ? $.index(parameters, 'linewidth') : 1;
  this.linecap = !($.index(parameters, 'linecap') == null) ? $.index(parameters, 'linecap') : 'round';
  this.linejoin = !($.index(parameters, 'linejoin') == null) ? $.index(parameters, 'linejoin') : 'round';
  this.vertexColors = !(null == $.index(parameters, 'vertexColors')) ? $.index(parameters, 'vertexColors') : 0;
  this.fog = $.index(parameters, 'fog') == null || $.index(parameters, 'fog');
},
 is$LineBasicMaterial: true
};

$$.MeshLambertMaterial = {"":
 ["_parameters", "color?", "ambient", "emissive", "wrapAround", "wrapRGB", "map", "lightMap", "specularMap", "envMap", "combine", "reflectivity", "refractionRatio", "shading", "wireframe", "wireframeLinewidth", "wireframeLinecap", "wireframeLinejoin", "skinning", "morphTargets?", "morphNormals", "vertexColors", "fog", "name", "id", "side", "opacity", "blending", "blendSrc", "blendDst", "blendEquation", "alphaTest", "polygonOffset", "polygonOffsetFactor", "polygonOffsetUnits", "transparent", "depthTest", "depthWrite", "overdraw", "visible", "needsUpdate", "__data"],
 super: "Material",
 MeshLambertMaterial$1: function(parameters) {
  this._parameters = !(parameters == null) ? parameters : $.makeLiteralMap([]);
  this.color = !($.index(parameters, 'color') == null) ? $.Color$($.index(parameters, 'color')) : $.Color$(16777215);
  this.ambient = !($.index(parameters, 'ambient') == null) ? $.Color$($.index(parameters, 'ambient')) : $.Color$(16777215);
  this.emissive = !($.index(parameters, 'ambient') == null) ? $.Color$($.index(parameters, 'emissive')) : $.Color$(0);
  this.wrapAround = !($.index(parameters, 'wrapAround') == null) && $.index(parameters, 'wrapAround');
  this.wrapRGB = $.Vector3$(1, 1, 1);
  this.map = !($.index(parameters, 'map') == null) ? $.index(parameters, 'map') : null;
  this.lightMap = !($.index(parameters, 'lightMap') == null) ? $.index(parameters, 'lightMap') : null;
  this.specularMap = !($.index(parameters, 'specularMap') == null) ? $.index(parameters, 'specularMap') : null;
  this.envMap = !($.index(parameters, 'envMap') == null) ? $.index(parameters, 'envMap') : null;
  this.combine = !($.index(parameters, 'combine') == null) ? $.index(parameters, 'combine') : 0;
  this.reflectivity = !($.index(parameters, 'reflectivity') == null) ? $.index(parameters, 'reflectivity') : 1;
  this.refractionRatio = !($.index(parameters, 'refractionRatio') == null) ? $.index(parameters, 'refractionRatio') : 0.98;
  this.fog = $.index(parameters, 'fog') == null || $.index(parameters, 'fog');
  this.shading = !($.index(parameters, 'shading') == null) ? $.index(parameters, 'shading') : 2;
  this.wireframe = !($.index(parameters, 'wireframe') == null) && $.index(parameters, 'wireframe');
  this.wireframeLinewidth = !($.index(parameters, 'wireframeLinewidth') == null) ? $.index(parameters, 'wireframeLinewidth') : 1;
  this.wireframeLinecap = !($.index(parameters, 'wireframeLinecap') == null) ? $.index(parameters, 'wireframeLinecap') : 'round';
  this.wireframeLinejoin = !($.index(parameters, 'wireframeLinejoin') == null) ? $.index(parameters, 'wireframeLinejoin') : 'round';
  this.vertexColors = !($.index(parameters, 'vertexColors') == null) ? $.index(parameters, 'vertexColors') : 0;
  this.skinning = !($.index(parameters, 'skinning') == null) && $.index(parameters, 'skinning');
  this.morphTargets = !($.index(parameters, 'morphTargets') == null) && $.index(parameters, 'morphTargets');
  this.morphNormals = !($.index(parameters, 'morphNormals') == null) && $.index(parameters, 'morphNormals');
},
 is$MeshLambertMaterial: true,
 is$ITextureMapMaterial: true
};

$$.Mesh = {"":
 ["geometry?", "material=", "_boundRadius", "_morphTargetBase", "_morphTargetForcedOrder", "_morphTargetInfluences", "_morphTargetDictionary", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Object3D",
 Mesh$2: function(geometry, material) {
  var t1 = this.material;
  if (typeof t1 === 'object' && t1 !== null && (t1.constructor === Array || t1.is$List()))
    ;
  t1 = this.geometry;
  if (!(t1 == null)) {
    if (t1.get$boundingSphere() == null)
      t1.computeBoundingSphere$0();
    this._boundRadius = t1.get$boundingSphere().get$radius();
    if (!$.eqB($.get$length(t1.get$morphTargets()), 0)) {
      this._morphTargetBase = -1;
      this._morphTargetForcedOrder = [];
      this._morphTargetInfluences = [];
      this._morphTargetDictionary = $.makeLiteralMap([]);
      var t2 = this._morphTargetInfluences;
      var t3 = this._morphTargetDictionary;
      if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
        return this.Mesh$2$bailout(1, t1, t2, t3);
      var m = 0;
      for (; $.ltB(m, $.get$length(t1.get$morphTargets())); ++m) {
        $.add$1(t2, 0);
        var t4 = $.index(t1.get$morphTargets(), m).get$name();
        if (t4 !== (t4 | 0))
          throw $.iae(t4);
        if (t4 < 0 || t4 >= t3.length)
          throw $.ioore(t4);
        t3[t4] = m;
      }
    }
  }
},
 Mesh$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.material;
      if (typeof t1 === 'object' && t1 !== null && (t1.constructor === Array || t1.is$List()))
        ;
      t1 = this.geometry;
    case 1:
      if (state === 1 || state === 0 && !(t1 == null))
        switch (state) {
          case 0:
            if (t1.get$boundingSphere() == null)
              t1.computeBoundingSphere$0();
            this._boundRadius = t1.get$boundingSphere().get$radius();
          case 1:
            if (state === 1 || state === 0 && !$.eqB($.get$length(t1.get$morphTargets()), 0))
              switch (state) {
                case 0:
                  this._morphTargetBase = -1;
                  this._morphTargetForcedOrder = [];
                  this._morphTargetInfluences = [];
                  this._morphTargetDictionary = $.makeLiteralMap([]);
                  var t2 = this._morphTargetInfluences;
                  var t3 = this._morphTargetDictionary;
                case 1:
                  state = 0;
                  var m = 0;
                  for (; $.ltB(m, $.get$length(t1.get$morphTargets())); ++m) {
                    $.add$1(t2, 0);
                    $.indexSet(t3, $.index(t1.get$morphTargets(), m).get$name(), m);
                  }
              }
        }
  }
},
 is$Mesh: true
};

$$.Line = {"":
 ["_geometry", "_material", "_lib0_type", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Object3D",
 get$geometry: function() {
  return this._geometry;
},
 get$material: function() {
  return this._material;
},
 Line$3: function(geometry, material, ltype) {
  this._geometry = geometry;
  this._material = material;
  this._lib0_type = ltype;
  var t1 = this._geometry;
  if (!(t1 == null))
    if (t1.get$boundingSphere() == null)
      t1.computeBoundingSphere$0();
},
 is$Line: true
};

$$.RenderableObject = {"":
 ["object=", "z="],
 super: "Object"
};

$$.RenderableVertex = {"":
 ["positionWorld?", "positionScreen?", "visible="],
 super: "Object",
 copy$1: function(vertex) {
  this.positionWorld.copy$1(vertex.get$positionWorld());
  this.positionScreen.copy$1(vertex.get$positionScreen());
},
 RenderableVertex$0: function() {
  this.positionWorld = $.Vector3$(0, 0, 0);
  this.positionScreen = $.Vector4$(0, 0, 0, 1);
}
};

$$.RenderableFace3 = {"":
 ["_v1", "_v2", "_v3", "_centroidWorld", "_centroidScreen", "_normalWorld", "_vertexNormalsWorld", "_uvs", "_material", "_faceMaterial", "_z"],
 super: "Object",
 get$v1: function() {
  return this._v1;
},
 get$v2: function() {
  return this._v2;
},
 get$v3: function() {
  return this._v3;
},
 get$normalWorld: function() {
  return this._normalWorld;
},
 get$centroidWorld: function() {
  return this._centroidWorld;
},
 get$centroidScreen: function() {
  return this._centroidScreen;
},
 get$vertexNormalsWorld: function() {
  return this._vertexNormalsWorld;
},
 get$uvs: function() {
  return this._uvs;
},
 get$material: function() {
  return this._material;
},
 get$faceMaterial: function() {
  return this._faceMaterial;
},
 get$z: function() {
  return this._z;
},
 RenderableFace3$0: function() {
  this._v1 = $.RenderableVertex$();
  this._v2 = $.RenderableVertex$();
  this._v3 = $.RenderableVertex$();
  this._centroidWorld = $.Vector3$(0, 0, 0);
  this._centroidScreen = $.Vector3$(0, 0, 0);
  this._normalWorld = $.Vector3$(0, 0, 0);
  this._vertexNormalsWorld = [$.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0)];
  this._material = null;
  this._faceMaterial = null;
  this._uvs = [[]];
  this._z = null;
},
 is$RenderableFace3: true
};

$$.RenderableFace4 = {"":
 ["_v1", "_v2", "_v3", "_v4", "_centroidWorld", "_centroidScreen", "_normalWorld", "_vertexNormalsWorld", "_uvs", "_material", "_faceMaterial", "_z"],
 super: "Object",
 get$v1: function() {
  return this._v1;
},
 get$v2: function() {
  return this._v2;
},
 get$v3: function() {
  return this._v3;
},
 get$v4: function() {
  return this._v4;
},
 get$normalWorld: function() {
  return this._normalWorld;
},
 get$centroidWorld: function() {
  return this._centroidWorld;
},
 get$centroidScreen: function() {
  return this._centroidScreen;
},
 get$vertexNormalsWorld: function() {
  return this._vertexNormalsWorld;
},
 get$uvs: function() {
  return this._uvs;
},
 get$material: function() {
  return this._material;
},
 set$material: function(value) {
  this._material = value;
},
 get$faceMaterial: function() {
  return this._faceMaterial;
},
 set$faceMaterial: function(value) {
  this._faceMaterial = value;
},
 get$z: function() {
  return this._z;
},
 set$z: function(value) {
  this._z = value;
},
 RenderableFace4$0: function() {
  this._v1 = $.RenderableVertex$();
  this._v2 = $.RenderableVertex$();
  this._v3 = $.RenderableVertex$();
  this._v4 = $.RenderableVertex$();
  this._centroidWorld = $.Vector3$(0, 0, 0);
  this._centroidScreen = $.Vector3$(0, 0, 0);
  this._normalWorld = $.Vector3$(0, 0, 0);
  this._vertexNormalsWorld = [$.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0), $.Vector3$(0, 0, 0)];
  this._material = null;
  this._faceMaterial = null;
  this._uvs = [];
  this._uvs.push($.ListImplementation_List(null));
  this._z = null;
},
 is$RenderableFace4: true
};

$$.RenderableLine = {"":
 ["z=", "v1?", "v2?", "material="],
 super: "Object",
 RenderableLine$0: function() {
  this.v1 = $.RenderableVertex$();
  this.v2 = $.RenderableVertex$();
},
 is$RenderableLine: true
};

$$.RenderableParticle = {"":
 ["x=", "y=", "z=", "rotation!", "scale?", "material="],
 super: "Object",
 scale$1: function(arg0) { return this.scale.call$1(arg0); },
 scale$2: function(arg0, arg1) { return this.scale.call$2(arg0, arg1); },
 RenderableParticle$0: function() {
  this.scale = $.Vector2$(0, 0);
},
 is$RenderableParticle: true
};

$$.CanvasRenderer = {"":
 ["domElement?", "_autoClear", "_sortObjects", "_sortElements", "_canvasWidth", "_canvasHeight", "_canvasWidthHalf", "_canvasHeightHalf", "_clearColor", "_clearOpacity", "_camera", "_canvas", "_context", "_contextGlobalAlpha", "_contextGlobalCompositeOperation", "_contextStrokeStyle", "_contextFillStyle", "_contextLineCap", "_contextLineJoin", "_contextLineWidth", "_clipRect", "_clearRect", "_bboxRect", "_info", "_renderData", "_elements", "_lights", "_projector", "_v5", "_v6", "_v1x", "_v1y", "_v2x", "_v2y", "_v3x", "_v3y", "_v4x", "_v4y", "_v5x", "_v5y", "_v6x", "_v6y", "_color", "_color1", "_color2", "_color3", "_color4", "_patterns", "_imagedatas", "_near", "_far", "_image", "_uvs", "_uv1x", "_uv1y", "_uv2x", "_uv2y", "_uv3x", "_uv3y", "_enableLighting", "_ambientLight", "_directionalLights", "_pointLights", "_pi2", "_vector3", "_pixelMapImage", "_pixelMapData", "_gradientMapQuality", "_pixelMap", "_pixelMapContext", "_gradientMap", "_gradientMapContext", "debug"],
 super: "Object",
 setSize$2: function(width, height) {
  this._canvasWidth = width;
  this._canvasHeight = height;
  this._canvasWidthHalf = $.floor($.div(this._canvasWidth, 2));
  this._canvasHeightHalf = $.floor($.div(this._canvasHeight, 2));
  var t1 = this._canvasWidth;
  var t2 = this._canvas;
  t2.set$width(t1);
  t2.set$height(this._canvasHeight);
  this._clipRect.setValues$4($.neg(this._canvasWidthHalf), $.neg(this._canvasHeightHalf), this._canvasWidthHalf, this._canvasHeightHalf);
  this._clearRect.setValues$4($.neg(this._canvasWidthHalf), $.neg(this._canvasHeightHalf), this._canvasWidthHalf, this._canvasHeightHalf);
  this._contextGlobalAlpha = 1;
  this._contextGlobalCompositeOperation = 0;
  this._contextStrokeStyle = null;
  this._contextFillStyle = null;
  this._contextLineWidth = null;
  this._contextLineCap = null;
  this._contextLineJoin = null;
},
 clear$0: function() {
  var t1 = this._context;
  t1.setTransform$6(1, 0, 0, -1, this._canvasWidthHalf, this._canvasHeightHalf);
  var t2 = this._clearRect;
  if ($.isEmpty(t2) !== true) {
    t2.minSelf$1(this._clipRect);
    t2.inflate$1(2);
    var t3 = this._clearOpacity;
    if (t3 < 1)
      t1.clearRect$4($.floor(t2.getX$0()), $.floor(t2.getY$0()), $.floor(t2.getWidth$0()), $.floor(t2.getHeight$0()));
    if (t3 > 0) {
      this.setBlending$1(1);
      this.setOpacity$1(1);
      var t4 = this._clearColor;
      this.setFillStyle$1('rgba(' + $.S($.floor($.mul(t4.get$r(), 255))) + ', ' + $.S($.floor($.mul(t4.get$g(), 255))) + ',' + $.S($.floor($.mul(t4.get$b(), 255))) + ',' + $.S(t3) + ')');
      t1.fillRect$4($.floor(t2.getX$0()), $.floor(t2.getY$0()), $.floor(t2.getWidth$0()), $.floor(t2.getHeight$0()));
    }
    t2.empty$0();
  }
},
 render$2: function(scene, camera) {
  this._camera = camera;
  if (this._autoClear)
    this.clear$0();
  else
    this._context.setTransform$6(1, 0, 0, -1, this._canvasWidthHalf, this._canvasHeightHalf);
  this._info.render.reset$0();
  this._renderData = this._projector.projectScene$3(scene, camera, this._sortElements);
  this._elements = this._renderData.get$elements();
  this._lights = this._renderData.get$lights();
  var t1 = this.debug === true;
  if (t1) {
    var t2 = this._context;
    t2.set$fillStyle('rgba( 0, 255, 255, 0.5 )');
    var t3 = this._clipRect;
    t2.fillRect$4(t3.getX$0(), t3.getY$0(), t3.getWidth$0(), t3.getHeight$0());
  }
  this._enableLighting = $.gt($.get$length(this._lights), 0);
  if (this._enableLighting === true)
    this.calculateLights$1(this._lights);
  var el = $.get$length(this._elements);
  if (typeof el !== 'number')
    return this.render$2$bailout(1, scene, t1, el);
  for (var t2 = this._bboxRect, t3 = this._clipRect, t4 = this._v5, t5 = this._v6, t6 = this._context, t7 = this._clearRect, t8 = t4.positionScreen, t9 = t5.positionScreen, e = 0, element = null, material = null; e < el; ++e) {
    element = $.index(this._elements, e);
    material = element.get$material();
    if (typeof material === 'object' && material !== null && !!material.is$MeshFaceMaterial)
      material = element.get$faceMaterial();
    if (material == null || $.eqB(material.get$opacity(), 0))
      continue;
    t2.empty$0();
    if (t1)
      $.print($.S(element));
    if (typeof element === 'object' && element !== null && !!element.is$RenderableParticle) {
      element.x = $.mul(element.x, this._canvasWidthHalf);
      element.y = $.mul(element.y, this._canvasHeightHalf);
      this.renderParticle$4(element, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableLine) {
      var _v1 = element.v1;
      var _v2 = element.v2;
      var t10 = _v1.positionScreen;
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      var t11 = _v2.positionScreen;
      t11.set$x($.mul(t11.get$x(), this._canvasWidthHalf));
      t11.set$y($.mul(t11.get$y(), this._canvasHeightHalf));
      t2.addPoint$2(t10.get$x(), t10.get$y());
      t2.addPoint$2(t11.get$x(), t11.get$y());
      if (t3.intersects$1(t2) === true)
        this.renderLine$5(_v1, _v2, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableFace3) {
      _v1 = element.get$v1();
      _v2 = element.get$v2();
      var _v3 = element.get$v3();
      t10 = _v1.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v1.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t10 = _v2.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v2.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t10 = _v3.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v3.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      if (material.get$overdraw() === true) {
        this.expand$2(_v1.get$positionScreen(), _v2.get$positionScreen());
        this.expand$2(_v2.get$positionScreen(), _v3.get$positionScreen());
        this.expand$2(_v3.get$positionScreen(), _v1.get$positionScreen());
      }
      t2.add3Points$6(_v1.get$positionScreen().get$x(), _v1.get$positionScreen().get$y(), _v2.get$positionScreen().get$x(), _v2.get$positionScreen().get$y(), _v3.get$positionScreen().get$x(), _v3.get$positionScreen().get$y());
      if (t3.intersects$1(t2) === true)
        this.renderFace3$9(_v1, _v2, _v3, 0, 1, 2, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableFace4) {
      _v1 = element.get$v1();
      _v2 = element.get$v2();
      _v3 = element.get$v3();
      var _v4 = element.get$v4();
      t10 = _v1.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v1.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t10 = _v2.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v2.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t10 = _v3.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v3.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t10 = _v4.get$positionScreen();
      t10.set$x($.mul(t10.get$x(), this._canvasWidthHalf));
      t10 = _v4.get$positionScreen();
      t10.set$y($.mul(t10.get$y(), this._canvasHeightHalf));
      t8.copy$1(_v2.get$positionScreen());
      t9.copy$1(_v4.get$positionScreen());
      if (material.get$overdraw() === true) {
        this.expand$2(_v1.get$positionScreen(), _v2.get$positionScreen());
        this.expand$2(_v2.get$positionScreen(), _v4.get$positionScreen());
        this.expand$2(_v4.get$positionScreen(), _v1.get$positionScreen());
        this.expand$2(_v3.get$positionScreen(), t8);
        this.expand$2(_v3.get$positionScreen(), t9);
      }
      t2.addPoint$2(_v1.get$positionScreen().get$x(), _v1.get$positionScreen().get$y());
      t2.addPoint$2(_v2.get$positionScreen().get$x(), _v2.get$positionScreen().get$y());
      t2.addPoint$2(_v3.get$positionScreen().get$x(), _v3.get$positionScreen().get$y());
      t2.addPoint$2(_v4.get$positionScreen().get$x(), _v4.get$positionScreen().get$y());
      if (t3.intersects$1(t2) === true)
        this.renderFace4$9(_v1, _v2, _v3, _v4, t4, t5, element, material, scene);
    }
    if (t1) {
      t6.set$lineWidth(1);
      t6.set$strokeStyle('rgba( 0, 255, 0, 0.5 )');
      t6.strokeRect$4(t2.getX$0(), t2.getY$0(), t2.getWidth$0(), t2.getHeight$0());
    }
    t7.addRectangle$1(t2);
  }
  if (t1) {
    t6.set$lineWidth(1);
    t6.set$strokeStyle('rgba( 255, 0, 0, 0.5 )');
    t6.strokeRect$4(t7.getX$0(), t7.getY$0(), t7.getWidth$0(), t7.getHeight$0());
  }
  t6.setTransform$6(1, 0, 0, 1, 0, 0);
},
 render$2$bailout: function(state, scene, t1, el) {
  for (var t2 = this._bboxRect, t3 = this._clipRect, t4 = this._v5, t5 = this._v6, t6 = this._context, t7 = this._clearRect, e = 0, element = null, material = null; $.ltB(e, el); ++e) {
    element = $.index(this._elements, e);
    material = element.get$material();
    if (typeof material === 'object' && material !== null && !!material.is$MeshFaceMaterial)
      material = element.get$faceMaterial();
    if (material == null || $.eqB(material.get$opacity(), 0))
      continue;
    t2.empty$0();
    if (t1)
      $.print($.S(element));
    if (typeof element === 'object' && element !== null && !!element.is$RenderableParticle) {
      element.x = $.mul(element.x, this._canvasWidthHalf);
      element.y = $.mul(element.y, this._canvasHeightHalf);
      this.renderParticle$4(element, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableLine) {
      var _v1 = element.v1;
      var _v2 = element.v2;
      var t8 = _v1.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v1.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v2.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v2.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t2.addPoint$2(_v1.get$positionScreen().get$x(), _v1.get$positionScreen().get$y());
      t2.addPoint$2(_v2.get$positionScreen().get$x(), _v2.get$positionScreen().get$y());
      if (t3.intersects$1(t2) === true)
        this.renderLine$5(_v1, _v2, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableFace3) {
      _v1 = element.get$v1();
      _v2 = element.get$v2();
      var _v3 = element.get$v3();
      t8 = _v1.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v1.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v2.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v2.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v3.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v3.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      if (material.get$overdraw() === true) {
        this.expand$2(_v1.get$positionScreen(), _v2.get$positionScreen());
        this.expand$2(_v2.get$positionScreen(), _v3.get$positionScreen());
        this.expand$2(_v3.get$positionScreen(), _v1.get$positionScreen());
      }
      t2.add3Points$6(_v1.get$positionScreen().get$x(), _v1.get$positionScreen().get$y(), _v2.get$positionScreen().get$x(), _v2.get$positionScreen().get$y(), _v3.get$positionScreen().get$x(), _v3.get$positionScreen().get$y());
      if (t3.intersects$1(t2) === true)
        this.renderFace3$9(_v1, _v2, _v3, 0, 1, 2, element, material, scene);
    } else if (typeof element === 'object' && element !== null && !!element.is$RenderableFace4) {
      _v1 = element.get$v1();
      _v2 = element.get$v2();
      _v3 = element.get$v3();
      var _v4 = element.get$v4();
      t8 = _v1.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v1.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v2.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v2.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v3.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v3.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t8 = _v4.get$positionScreen();
      t8.set$x($.mul(t8.get$x(), this._canvasWidthHalf));
      t8 = _v4.get$positionScreen();
      t8.set$y($.mul(t8.get$y(), this._canvasHeightHalf));
      t4.get$positionScreen().copy$1(_v2.get$positionScreen());
      t5.get$positionScreen().copy$1(_v4.get$positionScreen());
      if (material.get$overdraw() === true) {
        this.expand$2(_v1.get$positionScreen(), _v2.get$positionScreen());
        this.expand$2(_v2.get$positionScreen(), _v4.get$positionScreen());
        this.expand$2(_v4.get$positionScreen(), _v1.get$positionScreen());
        this.expand$2(_v3.get$positionScreen(), t4.get$positionScreen());
        this.expand$2(_v3.get$positionScreen(), t5.get$positionScreen());
      }
      t2.addPoint$2(_v1.get$positionScreen().get$x(), _v1.get$positionScreen().get$y());
      t2.addPoint$2(_v2.get$positionScreen().get$x(), _v2.get$positionScreen().get$y());
      t2.addPoint$2(_v3.get$positionScreen().get$x(), _v3.get$positionScreen().get$y());
      t2.addPoint$2(_v4.get$positionScreen().get$x(), _v4.get$positionScreen().get$y());
      if (t3.intersects$1(t2) === true)
        this.renderFace4$9(_v1, _v2, _v3, _v4, t4, t5, element, material, scene);
    }
    if (t1) {
      t6.set$lineWidth(1);
      t6.set$strokeStyle('rgba( 0, 255, 0, 0.5 )');
      t6.strokeRect$4(t2.getX$0(), t2.getY$0(), t2.getWidth$0(), t2.getHeight$0());
    }
    t7.addRectangle$1(t2);
  }
  if (t1) {
    t6.set$lineWidth(1);
    t6.set$strokeStyle('rgba( 255, 0, 0, 0.5 )');
    t6.strokeRect$4(t7.getX$0(), t7.getY$0(), t7.getWidth$0(), t7.getHeight$0());
  }
  t6.setTransform$6(1, 0, 0, 1, 0, 0);
},
 get$render: function() { return new $.BoundClosure2(this, 'render$2'); },
 calculateLights$1: function(lights) {
  if (typeof lights !== 'string' && (typeof lights !== 'object' || lights === null || lights.constructor !== Array && !lights.is$JavaScriptIndexingBehavior()))
    return this.calculateLights$1$bailout(1, lights);
  var t1 = this._ambientLight;
  t1.setRGB$3(0, 0, 0);
  var t2 = this._directionalLights;
  t2.setRGB$3(0, 0, 0);
  var t3 = this._pointLights;
  t3.setRGB$3(0, 0, 0);
  var ll = lights.length;
  for (var light = null, lightColor = null, l = 0; l < ll; ++l) {
    if (l < 0 || l >= lights.length)
      throw $.ioore(l);
    light = lights[l];
    lightColor = light.get$color();
    if (typeof light === 'object' && light !== null && !!light.is$AmbientLight) {
      t1.r = $.add(t1.r, lightColor.get$r());
      t1.g = $.add(t1.g, lightColor.get$g());
      t1.b = $.add(t1.b, lightColor.get$b());
    } else if (typeof light === 'object' && light !== null && !!light.is$DirectionalLight) {
      t2.r = $.add(t2.r, lightColor.get$r());
      t2.g = $.add(t2.g, lightColor.get$g());
      t2.b = $.add(t2.b, lightColor.get$b());
    } else if (typeof light === 'object' && light !== null && !!light.is$PointLight) {
      t3.r = $.add(t3.r, lightColor.get$r());
      t3.g = $.add(t3.g, lightColor.get$g());
      t3.b = $.add(t3.b, lightColor.get$b());
    }
  }
},
 calculateLights$1$bailout: function(state, lights) {
  var t1 = this._ambientLight;
  t1.setRGB$3(0, 0, 0);
  var t2 = this._directionalLights;
  t2.setRGB$3(0, 0, 0);
  var t3 = this._pointLights;
  t3.setRGB$3(0, 0, 0);
  var ll = $.get$length(lights);
  for (var light = null, lightColor = null, l = 0; $.ltB(l, ll); ++l) {
    light = $.index(lights, l);
    lightColor = light.get$color();
    if (typeof light === 'object' && light !== null && !!light.is$AmbientLight) {
      t1.set$r($.add(t1.get$r(), lightColor.get$r()));
      t1.set$g($.add(t1.get$g(), lightColor.get$g()));
      t1.set$b($.add(t1.get$b(), lightColor.get$b()));
    } else if (typeof light === 'object' && light !== null && !!light.is$DirectionalLight) {
      t2.set$r($.add(t2.get$r(), lightColor.get$r()));
      t2.set$g($.add(t2.get$g(), lightColor.get$g()));
      t2.set$b($.add(t2.get$b(), lightColor.get$b()));
    } else if (typeof light === 'object' && light !== null && !!light.is$PointLight) {
      t3.set$r($.add(t3.get$r(), lightColor.get$r()));
      t3.set$g($.add(t3.get$g(), lightColor.get$g()));
      t3.set$b($.add(t3.get$b(), lightColor.get$b()));
    }
  }
},
 calculateLight$4: function(lights, position, normal, color) {
  if (typeof lights !== 'string' && (typeof lights !== 'object' || lights === null || lights.constructor !== Array && !lights.is$JavaScriptIndexingBehavior()))
    return this.calculateLight$4$bailout(1, lights, position, normal, color);
  var ll = lights.length;
  for (var t1 = this._vector3, amount = null, lightPosition = null, light = null, lightColor = null, l = 0; l < ll; ++l) {
    if (l < 0 || l >= lights.length)
      throw $.ioore(l);
    light = lights[l];
    lightColor = light.get$color();
    if (typeof light === 'object' && light !== null && !!light.is$DirectionalLight) {
      lightPosition = light.matrixWorld.getPosition$0();
      amount = normal.dot$1(lightPosition);
      if ($.leB(amount, 0))
        continue;
      amount = $.mul(amount, light.intensity);
      color.set$r($.add(color.get$r(), $.mul(lightColor.get$r(), amount)));
      color.set$g($.add(color.get$g(), $.mul(lightColor.get$g(), amount)));
      color.set$b($.add(color.get$b(), $.mul(lightColor.get$b(), amount)));
    } else if (typeof light === 'object' && light !== null && !!light.is$PointLight) {
      lightPosition = light.matrixWorld.getPosition$0();
      amount = normal.dot$1(t1.sub$2(lightPosition, position).normalize$0());
      if ($.leB(amount, 0))
        continue;
      var t2 = light.distance;
      amount = $.mul(amount, $.eqB(t2, 0) ? 1 : 1 - $.min($.div(position.distanceTo$1(lightPosition), t2), 1));
      if ($.eqB(amount, 0))
        continue;
      amount = $.mul(amount, light.intensity);
      color.set$r($.add(color.get$r(), $.mul(lightColor.get$r(), amount)));
      color.set$g($.add(color.get$g(), $.mul(lightColor.get$g(), amount)));
      color.set$b($.add(color.get$b(), $.mul(lightColor.get$b(), amount)));
    }
  }
},
 calculateLight$4$bailout: function(state, lights, position, normal, color) {
  var ll = $.get$length(lights);
  for (var t1 = this._vector3, amount = null, lightPosition = null, light = null, lightColor = null, l = 0; $.ltB(l, ll); ++l) {
    light = $.index(lights, l);
    lightColor = light.get$color();
    if (typeof light === 'object' && light !== null && !!light.is$DirectionalLight) {
      lightPosition = light.matrixWorld.getPosition$0();
      amount = normal.dot$1(lightPosition);
      if ($.leB(amount, 0))
        continue;
      amount = $.mul(amount, light.intensity);
      color.set$r($.add(color.get$r(), $.mul(lightColor.get$r(), amount)));
      color.set$g($.add(color.get$g(), $.mul(lightColor.get$g(), amount)));
      color.set$b($.add(color.get$b(), $.mul(lightColor.get$b(), amount)));
    } else if (typeof light === 'object' && light !== null && !!light.is$PointLight) {
      lightPosition = light.matrixWorld.getPosition$0();
      amount = normal.dot$1(t1.sub$2(lightPosition, position).normalize$0());
      if ($.leB(amount, 0))
        continue;
      var t2 = light.distance;
      amount = $.mul(amount, $.eqB(t2, 0) ? 1 : 1 - $.min($.div(position.distanceTo$1(lightPosition), t2), 1));
      if ($.eqB(amount, 0))
        continue;
      amount = $.mul(amount, light.intensity);
      color.set$r($.add(color.get$r(), $.mul(lightColor.get$r(), amount)));
      color.set$g($.add(color.get$g(), $.mul(lightColor.get$g(), amount)));
      color.set$b($.add(color.get$b(), $.mul(lightColor.get$b(), amount)));
    }
  }
},
 renderParticle$4: function(v1, element, material, scene) {
  this.setOpacity$1(material.get$opacity());
  this.setBlending$1(material.get$blending());
  if (typeof material === 'object' && material !== null && !!material.is$ParticleBasicMaterial) {
    if (material.get$map() === true) {
      var bitmap = material.get$map().get$image();
      var t1 = bitmap.get$width();
      if (t1 !== (t1 | 0))
        return this.renderParticle$4$bailout(1, v1, element, bitmap, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var bitmapWidth = $.shr(t1, 1);
      t1 = bitmap.get$height();
      if (t1 !== (t1 | 0))
        return this.renderParticle$4$bailout(2, v1, element, t1, bitmapWidth, bitmap, 0, 0, 0, 0, 0, 0, 0, 0);
      var bitmapHeight = $.shr(t1, 1);
      t1 = element.scale;
      var t4 = t1.get$x();
      if (typeof t4 !== 'number')
        return this.renderParticle$4$bailout(3, v1, element, bitmap, bitmapWidth, bitmapHeight, t1, t4, 0, 0, 0, 0, 0, 0);
      var t6 = this._canvasWidthHalf;
      if (typeof t6 !== 'number')
        return this.renderParticle$4$bailout(4, v1, element, t4, bitmap, bitmapWidth, bitmapHeight, t1, t6, 0, 0, 0, 0, 0);
      var scaleX = t4 * t6;
      t1 = t1.get$y();
      if (typeof t1 !== 'number')
        return this.renderParticle$4$bailout(5, v1, scaleX, element, t1, bitmap, bitmapWidth, bitmapHeight, 0, 0, 0, 0, 0, 0);
      t4 = this._canvasHeightHalf;
      if (typeof t4 !== 'number')
        return this.renderParticle$4$bailout(6, v1, scaleX, element, t1, bitmap, t4, bitmapWidth, bitmapHeight, 0, 0, 0, 0, 0);
      var scaleY = t1 * t4;
      var width = scaleX * bitmapWidth;
      var height = scaleY * bitmapHeight;
      t4 = this._bboxRect;
      t1 = v1.x;
      if (typeof t1 !== 'number')
        return this.renderParticle$4$bailout(7, v1, scaleX, element, t1, t4, scaleY, width, bitmapWidth, height, bitmap, bitmapHeight, 0, 0);
      var t10 = t1 - width;
      var t11 = v1.y;
      if (typeof t11 !== 'number')
        return this.renderParticle$4$bailout(8, v1, scaleX, element, scaleY, width, height, t10, t4, t11, bitmap, bitmapWidth, bitmapHeight, 0);
      var t13 = t11 - height;
      t1 += width;
      t4.setValues$4(t10, t13, t1, t11 + height);
      if (this._clipRect.intersects$1(t4) !== true)
        return;
      t1 = this._context;
      t1.save$0();
      t1.translate$2(v1.x, v1.y);
      var t2 = element.rotation;
      if (typeof t2 !== 'number')
        return this.renderParticle$4$bailout(11, v1, scaleX, bitmap, scaleY, t1, bitmapWidth, bitmapHeight, t2, 0, 0, 0, 0, 0);
      t1.rotate$1(-t2);
      t1.scale$2(scaleX, -scaleY);
      t1.translate$2(-bitmapWidth, -bitmapHeight);
      t1.drawImage$3(bitmap, 0, 0);
      t1.restore$0();
    }
    t1 = this.debug === true;
    if (t1) {
      t2 = this._context;
      t2.beginPath$0();
      var t3 = v1.x;
      if (typeof t3 !== 'number')
        return this.renderParticle$4$bailout(12, v1, t2, t3, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      t2.moveTo$2(t3 - 10, v1.y);
      var t5 = v1.x;
      if (typeof t5 !== 'number')
        return this.renderParticle$4$bailout(13, v1, t5, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      t2.lineTo$2(t5 + 10, v1.y);
      var t7 = v1.x;
      var t8 = v1.y;
      if (typeof t8 !== 'number')
        return this.renderParticle$4$bailout(14, v1, t2, t7, t8, t1, 0, 0, 0, 0, 0, 0, 0, 0);
      t2.moveTo$2(t7, t8 - 10);
      t7 = v1.x;
      t10 = v1.y;
      if (typeof t10 !== 'number')
        return this.renderParticle$4$bailout(15, v1, t10, t2, t7, t1, 0, 0, 0, 0, 0, 0, 0, 0);
      t2.lineTo$2(t7, t10 + 10);
      t2.closePath$0();
      t2.set$strokeStyle('rgb(255,255,0)');
      t2.stroke$0();
      if (t1)
        $.print('renderParticle ' + $.S(v1) + ' at (' + $.S(v1.x) + ', ' + $.S(v1.y) + ')');
    }
  } else if (typeof material === 'object' && material !== null && !!material.is$ParticleCanvasMaterial) {
    t1 = element.scale;
    t2 = t1.get$x();
    if (typeof t2 !== 'number')
      return this.renderParticle$4$bailout(16, v1, element, material, t1, t2, 0, 0, 0, 0, 0, 0, 0, 0);
    t4 = this._canvasWidthHalf;
    if (typeof t4 !== 'number')
      return this.renderParticle$4$bailout(17, v1, element, t1, t4, t2, material, 0, 0, 0, 0, 0, 0, 0);
    width = t2 * t4;
    t1 = t1.get$y();
    if (typeof t1 !== 'number')
      return this.renderParticle$4$bailout(18, v1, element, width, material, t1, 0, 0, 0, 0, 0, 0, 0, 0);
    t2 = this._canvasHeightHalf;
    if (typeof t2 !== 'number')
      return this.renderParticle$4$bailout(19, v1, element, t2, width, material, t1, 0, 0, 0, 0, 0, 0, 0);
    height = t1 * t2;
    t2 = this._bboxRect;
    t1 = v1.x;
    if (typeof t1 !== 'number')
      return this.renderParticle$4$bailout(20, v1, element, width, material, t1, t2, height, 0, 0, 0, 0, 0, 0);
    t8 = t1 - width;
    var t9 = v1.y;
    if (typeof t9 !== 'number')
      return this.renderParticle$4$bailout(21, v1, element, t8, width, material, t9, t2, height, 0, 0, 0, 0, 0);
    t11 = t9 - height;
    t1 += width;
    t2.setValues$4(t8, t11, t1, t9 + height);
    if (this._clipRect.intersects$1(t2) !== true)
      return;
    t1 = material.color;
    this.setStrokeStyle$1(t1.getContextStyle$0());
    this.setFillStyle$1(t1.getContextStyle$0());
    t2 = this._context;
    t2.save$0();
    t2.translate$2(v1.x, v1.y);
    t3 = element.rotation;
    if (typeof t3 !== 'number')
      return this.renderParticle$4$bailout(24, t2, width, material, t3, height, 0, 0, 0, 0, 0, 0, 0, 0);
    t2.rotate$1(-t3);
    t2.scale$2(width, height);
    material.program$1(t2);
    t2.restore$0();
  }
},
 renderParticle$4$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12) {
  switch (state) {
    case 1:
      var v1 = env0;
      var element = env1;
      bitmap = env2;
      t1 = env3;
      break;
    case 2:
      v1 = env0;
      element = env1;
      t1 = env2;
      bitmapWidth = env3;
      bitmap = env4;
      break;
    case 3:
      v1 = env0;
      element = env1;
      bitmap = env2;
      bitmapWidth = env3;
      bitmapHeight = env4;
      t1 = env5;
      t4 = env6;
      break;
    case 4:
      v1 = env0;
      element = env1;
      t4 = env2;
      bitmap = env3;
      bitmapWidth = env4;
      bitmapHeight = env5;
      t1 = env6;
      t6 = env7;
      break;
    case 5:
      v1 = env0;
      scaleX = env1;
      element = env2;
      t1 = env3;
      bitmap = env4;
      bitmapWidth = env5;
      bitmapHeight = env6;
      break;
    case 6:
      v1 = env0;
      scaleX = env1;
      element = env2;
      t1 = env3;
      bitmap = env4;
      t4 = env5;
      bitmapWidth = env6;
      bitmapHeight = env7;
      break;
    case 7:
      v1 = env0;
      scaleX = env1;
      element = env2;
      t1 = env3;
      t4 = env4;
      scaleY = env5;
      width = env6;
      bitmapWidth = env7;
      height = env8;
      bitmap = env9;
      bitmapHeight = env10;
      break;
    case 8:
      v1 = env0;
      scaleX = env1;
      element = env2;
      scaleY = env3;
      width = env4;
      height = env5;
      t1 = env6;
      t4 = env7;
      t10 = env8;
      bitmap = env9;
      bitmapWidth = env10;
      bitmapHeight = env11;
      break;
    case 9:
      v1 = env0;
      scaleX = env1;
      element = env2;
      scaleY = env3;
      width = env4;
      height = env5;
      t1 = env6;
      t10 = env7;
      t4 = env8;
      bitmap = env9;
      t12 = env10;
      bitmapWidth = env11;
      bitmapHeight = env12;
      break;
    case 10:
      v1 = env0;
      scaleX = env1;
      element = env2;
      scaleY = env3;
      height = env4;
      t1 = env5;
      t10 = env6;
      t4 = env7;
      t12 = env8;
      bitmap = env9;
      t14 = env10;
      bitmapWidth = env11;
      bitmapHeight = env12;
      break;
    case 11:
      v1 = env0;
      scaleX = env1;
      bitmap = env2;
      scaleY = env3;
      t1 = env4;
      bitmapWidth = env5;
      bitmapHeight = env6;
      t2 = env7;
      break;
    case 12:
      v1 = env0;
      t2 = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 13:
      v1 = env0;
      t5 = env1;
      t2 = env2;
      t1 = env3;
      break;
    case 14:
      v1 = env0;
      t2 = env1;
      t7 = env2;
      t8 = env3;
      t1 = env4;
      break;
    case 15:
      v1 = env0;
      t10 = env1;
      t2 = env2;
      t7 = env3;
      t1 = env4;
      break;
    case 16:
      v1 = env0;
      element = env1;
      var material = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 17:
      v1 = env0;
      element = env1;
      t1 = env2;
      t4 = env3;
      t2 = env4;
      material = env5;
      break;
    case 18:
      v1 = env0;
      element = env1;
      width = env2;
      material = env3;
      t1 = env4;
      break;
    case 19:
      v1 = env0;
      element = env1;
      t2 = env2;
      width = env3;
      material = env4;
      t1 = env5;
      break;
    case 20:
      v1 = env0;
      element = env1;
      width = env2;
      material = env3;
      t1 = env4;
      t2 = env5;
      height = env6;
      break;
    case 21:
      v1 = env0;
      element = env1;
      t1 = env2;
      width = env3;
      material = env4;
      t8 = env5;
      t2 = env6;
      height = env7;
      break;
    case 22:
      v1 = env0;
      element = env1;
      t1 = env2;
      t8 = env3;
      width = env4;
      material = env5;
      t2 = env6;
      t10 = env7;
      height = env8;
      break;
    case 23:
      v1 = env0;
      element = env1;
      t1 = env2;
      t8 = env3;
      t10 = env4;
      width = env5;
      material = env6;
      t2 = env7;
      t12 = env8;
      height = env9;
      break;
    case 24:
      t2 = env0;
      width = env1;
      material = env2;
      t3 = env3;
      height = env4;
      break;
  }
  switch (state) {
    case 0:
      this.setOpacity$1(material.get$opacity());
      this.setBlending$1(material.get$blending());
    default:
      if (state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 1 || state === 0 && typeof material === 'object' && material !== null && !!material.is$ParticleBasicMaterial)
        switch (state) {
          case 0:
          default:
            if (state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 1 || state === 0 && material.get$map() === true)
              switch (state) {
                case 0:
                  var bitmap = material.get$map().get$image();
                  var t1 = bitmap.get$width();
                case 1:
                  state = 0;
                  var bitmapWidth = $.shr(t1, 1);
                  t1 = bitmap.get$height();
                case 2:
                  state = 0;
                  var bitmapHeight = $.shr(t1, 1);
                  t1 = element.scale;
                  var t4 = t1.get$x();
                case 3:
                  state = 0;
                  var t6 = this._canvasWidthHalf;
                case 4:
                  state = 0;
                  var scaleX = $.mul(t4, t6);
                  t1 = t1.get$y();
                case 5:
                  state = 0;
                  t4 = this._canvasHeightHalf;
                case 6:
                  state = 0;
                  var scaleY = $.mul(t1, t4);
                  var width = $.mul(scaleX, bitmapWidth);
                  var height = $.mul(scaleY, bitmapHeight);
                  t4 = this._bboxRect;
                  t1 = v1.x;
                case 7:
                  state = 0;
                  t1 = $.sub(t1, width);
                  var t10 = v1.y;
                case 8:
                  state = 0;
                  t10 = $.sub(t10, height);
                  var t12 = v1.x;
                case 9:
                  state = 0;
                  t12 = $.add(t12, width);
                  var t14 = v1.y;
                case 10:
                  state = 0;
                  t4.setValues$4(t1, t10, t12, $.add(t14, height));
                  if (this._clipRect.intersects$1(t4) !== true)
                    return;
                  t1 = this._context;
                  t1.save$0();
                  t1.translate$2(v1.x, v1.y);
                  var t2 = element.rotation;
                case 11:
                  state = 0;
                  t1.rotate$1($.neg(t2));
                  t1.scale$2(scaleX, $.neg(scaleY));
                  t1.translate$2($.neg(bitmapWidth), $.neg(bitmapHeight));
                  t1.drawImage$3(bitmap, 0, 0);
                  t1.restore$0();
              }
            t1 = this.debug === true;
          case 12:
          case 13:
          case 14:
          case 15:
            if (state === 15 || state === 14 || state === 13 || state === 12 || state === 0 && t1)
              switch (state) {
                case 0:
                  t2 = this._context;
                  t2.beginPath$0();
                  var t3 = v1.x;
                case 12:
                  state = 0;
                  t2.moveTo$2($.sub(t3, 10), v1.y);
                  var t5 = v1.x;
                case 13:
                  state = 0;
                  t2.lineTo$2($.add(t5, 10), v1.y);
                  var t7 = v1.x;
                  var t8 = v1.y;
                case 14:
                  state = 0;
                  t2.moveTo$2(t7, $.sub(t8, 10));
                  t7 = v1.x;
                  t10 = v1.y;
                case 15:
                  state = 0;
                  t2.lineTo$2(t7, $.add(t10, 10));
                  t2.closePath$0();
                  t2.set$strokeStyle('rgb(255,255,0)');
                  t2.stroke$0();
                  if (t1)
                    $.print('renderParticle ' + $.S(v1) + ' at (' + $.S(v1.x) + ', ' + $.S(v1.y) + ')');
              }
        }
      else
        switch (state) {
          case 0:
          default:
            if (state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 0 && typeof material === 'object' && material !== null && !!material.is$ParticleCanvasMaterial)
              switch (state) {
                case 0:
                  t1 = element.scale;
                  t2 = t1.get$x();
                case 16:
                  state = 0;
                  t4 = this._canvasWidthHalf;
                case 17:
                  state = 0;
                  width = $.mul(t2, t4);
                  t1 = t1.get$y();
                case 18:
                  state = 0;
                  t2 = this._canvasHeightHalf;
                case 19:
                  state = 0;
                  height = $.mul(t1, t2);
                  t2 = this._bboxRect;
                  t1 = v1.x;
                case 20:
                  state = 0;
                  t1 = $.sub(t1, width);
                  t8 = v1.y;
                case 21:
                  state = 0;
                  t8 = $.sub(t8, height);
                  t10 = v1.x;
                case 22:
                  state = 0;
                  t10 = $.add(t10, width);
                  t12 = v1.y;
                case 23:
                  state = 0;
                  t2.setValues$4(t1, t8, t10, $.add(t12, height));
                  if (this._clipRect.intersects$1(t2) !== true)
                    return;
                  t1 = material.color;
                  this.setStrokeStyle$1(t1.getContextStyle$0());
                  this.setFillStyle$1(t1.getContextStyle$0());
                  t2 = this._context;
                  t2.save$0();
                  t2.translate$2(v1.x, v1.y);
                  t3 = element.rotation;
                case 24:
                  state = 0;
                  t2.rotate$1($.neg(t3));
                  t2.scale$2(width, height);
                  material.program$1(t2);
                  t2.restore$0();
              }
        }
  }
},
 renderLine$5: function(v1, v2, element, material, scene) {
  this.setOpacity$1(material.get$opacity());
  this.setBlending$1(material.get$blending());
  var t1 = this._context;
  t1.beginPath$0();
  t1.moveTo$2(v1.get$positionScreen().get$x(), v1.get$positionScreen().get$y());
  t1.lineTo$2(v2.get$positionScreen().get$x(), v2.get$positionScreen().get$y());
  t1.closePath$0();
  if (typeof material === 'object' && material !== null && !!material.is$LineBasicMaterial) {
    var t2 = material.linewidth;
    if (typeof t2 !== 'number')
      return this.renderLine$5$bailout(1, v1, v2, element, t1, material, t2);
    this.setLineWidth$1(t2);
    this.setLineCap$1(material.linecap);
    this.setLineJoin$1(material.linejoin);
    this.setStrokeStyle$1(material.color.getContextStyle$0());
    t1.stroke$0();
    this._bboxRect.inflate$1(t2 * 2);
  }
  if (this.debug === true)
    $.print('renderLine ' + $.S(element) + ' at (' + $.S(v1.get$positionScreen().get$x()) + ', ' + $.S(v1.get$positionScreen().get$y()) + ') to (' + $.S(v2.get$positionScreen().get$x()) + ', ' + $.S(v2.get$positionScreen().get$y()) + ')');
},
 renderLine$5$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      var element = env2;
      t1 = env3;
      var material = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
      this.setOpacity$1(material.get$opacity());
      this.setBlending$1(material.get$blending());
      var t1 = this._context;
      t1.beginPath$0();
      t1.moveTo$2(v1.get$positionScreen().get$x(), v1.get$positionScreen().get$y());
      t1.lineTo$2(v2.get$positionScreen().get$x(), v2.get$positionScreen().get$y());
      t1.closePath$0();
    case 1:
      if (state === 1 || state === 0 && typeof material === 'object' && material !== null && !!material.is$LineBasicMaterial)
        switch (state) {
          case 0:
            var t2 = material.linewidth;
          case 1:
            state = 0;
            this.setLineWidth$1(t2);
            this.setLineCap$1(material.linecap);
            this.setLineJoin$1(material.linejoin);
            this.setStrokeStyle$1(material.color.getContextStyle$0());
            t1.stroke$0();
            this._bboxRect.inflate$1($.mul(t2, 2));
        }
      if (this.debug === true)
        $.print('renderLine ' + $.S(element) + ' at (' + $.S(v1.get$positionScreen().get$x()) + ', ' + $.S(v1.get$positionScreen().get$y()) + ') to (' + $.S(v2.get$positionScreen().get$x()) + ', ' + $.S(v2.get$positionScreen().get$y()) + ')');
  }
},
 renderFace3$9: function(v1, v2, v3, uv1, uv2, uv3, element, material, scene) {
  var t1 = this._info;
  var t2 = t1.render;
  var t3 = t2.get$vertices();
  if (typeof t3 !== 'number')
    return this.renderFace3$9$bailout(1, v1, v2, v3, uv1, uv2, uv3, element, material, t1, t2, t3, 0, 0, 0, 0, 0);
  t2.set$vertices(t3 + 3);
  var t5 = t2.get$faces();
  if (typeof t5 !== 'number')
    return this.renderFace3$9$bailout(2, v1, v2, v3, uv1, uv2, uv3, element, material, t2, t5, 0, 0, 0, 0, 0, 0);
  t2.set$faces(t5 + 1);
  this.setOpacity$1(material.get$opacity());
  this.setBlending$1(material.get$blending());
  this._v1x = v1.get$positionScreen().get$x();
  this._v1y = v1.get$positionScreen().get$y();
  this._v2x = v2.get$positionScreen().get$x();
  this._v2y = v2.get$positionScreen().get$y();
  this._v3x = v3.get$positionScreen().get$x();
  this._v3y = v3.get$positionScreen().get$y();
  this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y);
  if (typeof material === 'object' && material !== null && !!material.is$MeshBasicMaterial) {
    t1 = material.map;
    if (!(t1 == null)) {
      t2 = t1.get$mapping();
      if (typeof t2 === 'object' && t2 !== null && !!t2.is$UVMapping) {
        t2 = element.get$uvs();
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(3, t2, uv1, uv2, uv3, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (0 >= t2.length)
          throw $.ioore(0);
        this._uvs = t2[0];
        var t4 = this._v1x;
        t5 = this._v1y;
        var t6 = this._v2x;
        var t7 = this._v2y;
        var t8 = this._v3x;
        var t9 = this._v3y;
        var t10 = this._uvs;
        if (typeof t10 !== 'string' && (typeof t10 !== 'object' || t10 === null || t10.constructor !== Array && !t10.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(4, uv1, uv2, uv3, t4, t5, t6, t7, t8, t9, t10, t1, 0, 0, 0, 0, 0);
        if (uv1 < 0 || uv1 >= t10.length)
          throw $.ioore(uv1);
        var t12 = t10[uv1].get$u();
        var t13 = this._uvs;
        if (typeof t13 !== 'string' && (typeof t13 !== 'object' || t13 === null || t13.constructor !== Array && !t13.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(5, uv1, uv2, uv3, t4, t5, t6, t7, t8, t9, t13, t1, t12, 0, 0, 0, 0);
        if (uv1 < 0 || uv1 >= t13.length)
          throw $.ioore(uv1);
        var t15 = t13[uv1].get$v();
        var t16 = this._uvs;
        if (typeof t16 !== 'string' && (typeof t16 !== 'object' || t16 === null || t16.constructor !== Array && !t16.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(6, uv2, uv3, t4, t5, t6, t7, t8, t9, t1, t16, t12, t15, 0, 0, 0, 0);
        if (uv2 < 0 || uv2 >= t16.length)
          throw $.ioore(uv2);
        var t18 = t16[uv2].get$u();
        var t19 = this._uvs;
        if (typeof t19 !== 'string' && (typeof t19 !== 'object' || t19 === null || t19.constructor !== Array && !t19.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(7, uv2, uv3, t4, t5, t6, t7, t8, t9, t1, t19, t12, t15, t18, 0, 0, 0);
        if (uv2 < 0 || uv2 >= t19.length)
          throw $.ioore(uv2);
        var t21 = t19[uv2].get$v();
        var t22 = this._uvs;
        if (typeof t22 !== 'string' && (typeof t22 !== 'object' || t22 === null || t22.constructor !== Array && !t22.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(8, t21, uv3, t4, t5, t6, t7, t8, t9, t1, t22, t12, t15, t18, 0, 0, 0);
        if (uv3 < 0 || uv3 >= t22.length)
          throw $.ioore(uv3);
        var t24 = t22[uv3].get$u();
        var t25 = this._uvs;
        if (typeof t25 !== 'string' && (typeof t25 !== 'object' || t25 === null || t25.constructor !== Array && !t25.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(9, t21, uv3, t24, t4, t5, t6, t7, t8, t9, t1, t25, t12, t15, t18, 0, 0);
        if (uv3 < 0 || uv3 >= t25.length)
          throw $.ioore(uv3);
        this.patternPath$13(t4, t5, t6, t7, t8, t9, t12, t15, t18, t21, t24, t25[uv3].get$v(), t1);
      }
    } else {
      t1 = material.envMap;
      if (!(null == t1)) {
        t2 = t1.get$mapping();
        if (typeof t2 === 'object' && t2 !== null && !!t2.is$SphericalReflectionMapping) {
          var cameraMatrix = this._camera.get$matrixWorldInverse();
          t2 = this._vector3;
          t3 = element.get$vertexNormalsWorld();
          if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
            return this.renderFace3$9$bailout(10, cameraMatrix, t3, uv2, uv3, element, t2, uv1, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          if (uv1 < 0 || uv1 >= t3.length)
            throw $.ioore(uv1);
          t2.copy$1(t3[uv1]);
          t5 = t2.get$x();
          if (typeof t5 !== 'number')
            return this.renderFace3$9$bailout(11, cameraMatrix, uv2, uv3, element, t5, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = cameraMatrix.get$n11();
          if (typeof t7 !== 'number')
            return this.renderFace3$9$bailout(12, cameraMatrix, uv2, uv3, element, t5, t7, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t7 = t5 * t7;
          t5 = t2.get$y();
          if (typeof t5 !== 'number')
            return this.renderFace3$9$bailout(13, cameraMatrix, uv2, uv3, element, t2, t7, t5, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t10 = cameraMatrix.get$n12();
          if (typeof t10 !== 'number')
            return this.renderFace3$9$bailout(14, cameraMatrix, uv2, uv3, element, t2, t7, t5, t10, t1, 0, 0, 0, 0, 0, 0, 0);
          t7 += t5 * t10;
          t12 = t2.get$z();
          if (typeof t12 !== 'number')
            return this.renderFace3$9$bailout(15, cameraMatrix, t7, t12, uv2, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          var t14 = cameraMatrix.get$n13();
          if (typeof t14 !== 'number')
            return this.renderFace3$9$bailout(16, cameraMatrix, t7, t12, uv2, uv3, element, t14, t2, t1, 0, 0, 0, 0, 0, 0, 0);
          this._uv1x = (t7 + t12 * t14) * 0.5 + 0.5;
          t16 = t2.get$x();
          if (typeof t16 !== 'number')
            return this.renderFace3$9$bailout(17, cameraMatrix, t16, uv2, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t18 = cameraMatrix.get$n21();
          if (typeof t18 !== 'number')
            return this.renderFace3$9$bailout(18, cameraMatrix, t16, t18, uv2, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t18 = t16 * t18;
          t16 = t2.get$y();
          if (typeof t16 !== 'number')
            return this.renderFace3$9$bailout(19, cameraMatrix, t18, uv2, uv3, element, t2, t16, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t21 = cameraMatrix.get$n22();
          if (typeof t21 !== 'number')
            return this.renderFace3$9$bailout(20, cameraMatrix, t18, uv2, uv3, element, t21, t16, t2, t1, 0, 0, 0, 0, 0, 0, 0);
          t18 += t16 * t21;
          var t23 = t2.get$z();
          if (typeof t23 !== 'number')
            return this.renderFace3$9$bailout(21, cameraMatrix, uv2, uv3, element, t2, t18, t23, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t25 = cameraMatrix.get$n23();
          if (typeof t25 !== 'number')
            return this.renderFace3$9$bailout(22, cameraMatrix, uv2, uv3, element, t2, t18, t23, t25, t1, 0, 0, 0, 0, 0, 0, 0);
          this._uv1y = -(t18 + t23 * t25) * 0.5 + 0.5;
          var t27 = element.get$vertexNormalsWorld();
          if (typeof t27 !== 'string' && (typeof t27 !== 'object' || t27 === null || t27.constructor !== Array && !t27.is$JavaScriptIndexingBehavior()))
            return this.renderFace3$9$bailout(23, cameraMatrix, uv2, uv3, element, t2, t27, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          if (uv2 < 0 || uv2 >= t27.length)
            throw $.ioore(uv2);
          t2.copy$1(t27[uv2]);
          var t29 = t2.get$x();
          if (typeof t29 !== 'number')
            return this.renderFace3$9$bailout(24, cameraMatrix, t29, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t31 = cameraMatrix.get$n11();
          if (typeof t31 !== 'number')
            return this.renderFace3$9$bailout(25, cameraMatrix, t31, t29, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t31 = t29 * t31;
          t29 = t2.get$y();
          if (typeof t29 !== 'number')
            return this.renderFace3$9$bailout(26, cameraMatrix, t31, t29, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t34 = cameraMatrix.get$n12();
          if (typeof t34 !== 'number')
            return this.renderFace3$9$bailout(27, cameraMatrix, t31, t29, uv3, element, t2, t34, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t31 += t29 * t34;
          var t36 = t2.get$z();
          if (typeof t36 !== 'number')
            return this.renderFace3$9$bailout(28, cameraMatrix, uv3, element, t2, t31, t36, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t38 = cameraMatrix.get$n13();
          if (typeof t38 !== 'number')
            return this.renderFace3$9$bailout(29, cameraMatrix, uv3, element, t2, t31, t36, t38, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          this._uv2x = (t31 + t36 * t38) * 0.5 + 0.5;
          var t40 = t2.get$x();
          if (typeof t40 !== 'number')
            return this.renderFace3$9$bailout(30, cameraMatrix, uv3, element, t2, t40, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t42 = cameraMatrix.get$n21();
          if (typeof t42 !== 'number')
            return this.renderFace3$9$bailout(31, cameraMatrix, uv3, element, t2, t40, t42, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t42 = t40 * t42;
          t40 = t2.get$y();
          if (typeof t40 !== 'number')
            return this.renderFace3$9$bailout(32, cameraMatrix, uv3, element, t2, t42, t40, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t45 = cameraMatrix.get$n22();
          if (typeof t45 !== 'number')
            return this.renderFace3$9$bailout(33, cameraMatrix, uv3, element, t2, t42, t40, t45, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          t42 += t40 * t45;
          var t47 = t2.get$z();
          if (typeof t47 !== 'number')
            return this.renderFace3$9$bailout(34, cameraMatrix, t42, t47, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t49 = cameraMatrix.get$n23();
          if (typeof t49 !== 'number')
            return this.renderFace3$9$bailout(35, cameraMatrix, t42, t47, t49, uv3, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0);
          this._uv2y = -(t42 + t47 * t49) * 0.5 + 0.5;
          var t51 = element.get$vertexNormalsWorld();
          if (typeof t51 !== 'string' && (typeof t51 !== 'object' || t51 === null || t51.constructor !== Array && !t51.is$JavaScriptIndexingBehavior()))
            return this.renderFace3$9$bailout(36, cameraMatrix, t2, t51, uv3, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          if (uv3 < 0 || uv3 >= t51.length)
            throw $.ioore(uv3);
          t2.copy$1(t51[uv3]);
          var t53 = t2.get$x();
          if (typeof t53 !== 'number')
            return this.renderFace3$9$bailout(37, cameraMatrix, t2, t53, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t55 = cameraMatrix.get$n11();
          if (typeof t55 !== 'number')
            return this.renderFace3$9$bailout(38, cameraMatrix, t2, t55, t53, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t55 = t53 * t55;
          t53 = t2.get$y();
          if (typeof t53 !== 'number')
            return this.renderFace3$9$bailout(39, cameraMatrix, t55, t2, t53, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t58 = cameraMatrix.get$n12();
          if (typeof t58 !== 'number')
            return this.renderFace3$9$bailout(40, cameraMatrix, t2, t55, t53, t58, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t55 += t53 * t58;
          var t60 = t2.get$z();
          if (typeof t60 !== 'number')
            return this.renderFace3$9$bailout(41, cameraMatrix, t55, t60, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t62 = cameraMatrix.get$n13();
          if (typeof t62 !== 'number')
            return this.renderFace3$9$bailout(42, cameraMatrix, t55, t60, t62, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          this._uv3x = (t55 + t60 * t62) * 0.5 + 0.5;
          var t64 = t2.get$x();
          if (typeof t64 !== 'number')
            return this.renderFace3$9$bailout(43, cameraMatrix, t2, t64, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t66 = cameraMatrix.get$n21();
          if (typeof t66 !== 'number')
            return this.renderFace3$9$bailout(44, cameraMatrix, t66, t2, t64, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t66 = t64 * t66;
          t64 = t2.get$y();
          if (typeof t64 !== 'number')
            return this.renderFace3$9$bailout(45, cameraMatrix, t66, t2, t64, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t69 = cameraMatrix.get$n22();
          if (typeof t69 !== 'number')
            return this.renderFace3$9$bailout(46, cameraMatrix, t66, t64, t69, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t66 += t64 * t69;
          t2 = t2.get$z();
          if (typeof t2 !== 'number')
            return this.renderFace3$9$bailout(47, cameraMatrix, t66, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          var t72 = cameraMatrix.get$n23();
          if (typeof t72 !== 'number')
            return this.renderFace3$9$bailout(48, t66, t2, t72, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          this._uv3y = -(t66 + t2 * t72) * 0.5 + 0.5;
          this.patternPath$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._uv1x, this._uv1y, this._uv2x, this._uv2y, this._uv3x, this._uv3y, t1);
        }
      } else {
        t1 = material.wireframe === true;
        t2 = material.color;
        if (t1)
          this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
        else
          this.fillPath$1(t2);
      }
    }
  } else if (typeof material === 'object' && material !== null && !!material.is$MeshLambertMaterial) {
    t1 = material.map;
    if (!(t1 == null) && material.wireframe !== true) {
      t2 = t1.get$mapping();
      if (typeof t2 === 'object' && t2 !== null && !!t2.is$UVMapping) {
        t2 = element.get$uvs();
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(49, uv1, uv2, uv3, element, material, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (0 >= t2.length)
          throw $.ioore(0);
        this._uvs = t2[0];
        t4 = this._v1x;
        t5 = this._v1y;
        t6 = this._v2x;
        t7 = this._v2y;
        t8 = this._v3x;
        t9 = this._v3y;
        t10 = this._uvs;
        if (typeof t10 !== 'string' && (typeof t10 !== 'object' || t10 === null || t10.constructor !== Array && !t10.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(50, t4, t5, t6, t7, t8, element, material, uv3, t9, uv2, uv1, t10, t1, 0, 0, 0);
        if (uv1 < 0 || uv1 >= t10.length)
          throw $.ioore(uv1);
        t12 = t10[uv1].get$u();
        t13 = this._uvs;
        if (typeof t13 !== 'string' && (typeof t13 !== 'object' || t13 === null || t13.constructor !== Array && !t13.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(51, t4, t5, t6, t7, t8, element, material, uv3, t9, uv2, t13, uv1, t12, t1, 0, 0);
        if (uv1 < 0 || uv1 >= t13.length)
          throw $.ioore(uv1);
        t15 = t13[uv1].get$v();
        t16 = this._uvs;
        if (typeof t16 !== 'string' && (typeof t16 !== 'object' || t16 === null || t16.constructor !== Array && !t16.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(52, t4, t5, t6, t7, t8, element, material, uv3, t9, t16, uv2, t12, t15, t1, 0, 0);
        if (uv2 < 0 || uv2 >= t16.length)
          throw $.ioore(uv2);
        t18 = t16[uv2].get$u();
        t19 = this._uvs;
        if (typeof t19 !== 'string' && (typeof t19 !== 'object' || t19 === null || t19.constructor !== Array && !t19.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(53, t4, t5, t6, t7, t8, element, material, uv3, t9, t19, uv2, t12, t15, t1, t18, 0);
        if (uv2 < 0 || uv2 >= t19.length)
          throw $.ioore(uv2);
        t21 = t19[uv2].get$v();
        t22 = this._uvs;
        if (typeof t22 !== 'string' && (typeof t22 !== 'object' || t22 === null || t22.constructor !== Array && !t22.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(54, t21, t4, t5, t6, t7, t8, element, material, uv3, t9, t22, t12, t15, t1, t18, 0);
        if (uv3 < 0 || uv3 >= t22.length)
          throw $.ioore(uv3);
        t24 = t22[uv3].get$u();
        t25 = this._uvs;
        if (typeof t25 !== 'string' && (typeof t25 !== 'object' || t25 === null || t25.constructor !== Array && !t25.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(55, t21, t4, t5, t6, t7, t8, element, material, uv3, t9, t24, t25, t12, t15, t1, t18);
        if (uv3 < 0 || uv3 >= t25.length)
          throw $.ioore(uv3);
        this.patternPath$13(t4, t5, t6, t7, t8, t9, t12, t15, t18, t21, t24, t25[uv3].get$v(), t1);
      }
      this.setBlending$1(3);
    }
    if (this._enableLighting === true) {
      t1 = material.wireframe === true;
      if (!t1) {
        t2 = material.shading;
        if (typeof t2 !== 'number')
          return this.renderFace3$9$bailout(56, material, t2, element, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (t2 === 2) {
          t2 = $.get$length(element.get$vertexNormalsWorld());
          if (typeof t2 !== 'number')
            return this.renderFace3$9$bailout(57, material, element, t2, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t2 = t2 === 3;
        } else
          t2 = false;
      } else
        t2 = false;
      t3 = material.color;
      t4 = this._ambientLight;
      t5 = t4.r;
      if (t2) {
        t1 = this._color3;
        t1.r = t5;
        t2 = this._color2;
        t2.r = t5;
        t6 = this._color1;
        t6.r = t5;
        t5 = t4.g;
        t1.g = t5;
        t2.g = t5;
        t6.g = t5;
        t4 = t4.b;
        t1.b = t4;
        t2.b = t4;
        t6.b = t4;
        t4 = this._lights;
        t5 = element.get$v1().get$positionWorld();
        t7 = element.get$vertexNormalsWorld();
        if (typeof t7 !== 'string' && (typeof t7 !== 'object' || t7 === null || t7.constructor !== Array && !t7.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(58, t1, t2, t6, element, t3, t4, t5, t7, 0, 0, 0, 0, 0, 0, 0, 0);
        if (0 >= t7.length)
          throw $.ioore(0);
        this.calculateLight$4(t4, t5, t7[0], t6);
        t5 = this._lights;
        t4 = element.get$v2().get$positionWorld();
        t9 = element.get$vertexNormalsWorld();
        if (typeof t9 !== 'string' && (typeof t9 !== 'object' || t9 === null || t9.constructor !== Array && !t9.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(59, t1, t2, t6, t4, element, t3, t9, t5, 0, 0, 0, 0, 0, 0, 0, 0);
        if (1 >= t9.length)
          throw $.ioore(1);
        this.calculateLight$4(t5, t4, t9[1], t2);
        t4 = this._lights;
        t5 = element.get$v3().get$positionWorld();
        var t11 = element.get$vertexNormalsWorld();
        if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))
          return this.renderFace3$9$bailout(60, t4, t1, t2, t6, t3, t5, t11, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (2 >= t11.length)
          throw $.ioore(2);
        this.calculateLight$4(t4, t5, t11[2], t1);
        t5 = t3.get$r();
        if (typeof t5 !== 'number')
          return this.renderFace3$9$bailout(61, t1, t2, t6, t5, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t13 = t6.r;
        if (typeof t13 !== 'number')
          return this.renderFace3$9$bailout(62, t1, t2, t6, t5, t3, t13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t6.r = $.max(0, $.min(t5 * t13, 1));
        t15 = t3.get$g();
        if (typeof t15 !== 'number')
          return this.renderFace3$9$bailout(63, t1, t2, t6, t15, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t17 = t6.g;
        if (typeof t17 !== 'number')
          return this.renderFace3$9$bailout(64, t1, t2, t6, t17, t15, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t6.g = $.max(0, $.min(t15 * t17, 1));
        t19 = t3.get$b();
        if (typeof t19 !== 'number')
          return this.renderFace3$9$bailout(65, t1, t2, t6, t19, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t21 = t6.b;
        if (typeof t21 !== 'number')
          return this.renderFace3$9$bailout(66, t21, t1, t2, t6, t3, t19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t6.b = $.max(0, $.min(t19 * t21, 1));
        t23 = t3.get$r();
        if (typeof t23 !== 'number')
          return this.renderFace3$9$bailout(67, t1, t2, t6, t23, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t25 = t2.r;
        if (typeof t25 !== 'number')
          return this.renderFace3$9$bailout(68, t1, t2, t6, t3, t23, t25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.r = $.max(0, $.min(t23 * t25, 1));
        t27 = t3.get$g();
        if (typeof t27 !== 'number')
          return this.renderFace3$9$bailout(69, t1, t2, t6, t27, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t29 = t2.g;
        if (typeof t29 !== 'number')
          return this.renderFace3$9$bailout(70, t1, t2, t6, t27, t3, t29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.g = $.max(0, $.min(t27 * t29, 1));
        t31 = t3.get$b();
        if (typeof t31 !== 'number')
          return this.renderFace3$9$bailout(71, t1, t2, t6, t31, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t33 = t2.b;
        if (typeof t33 !== 'number')
          return this.renderFace3$9$bailout(72, t1, t2, t6, t33, t31, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.b = $.max(0, $.min(t31 * t33, 1));
        var t35 = t3.get$r();
        if (typeof t35 !== 'number')
          return this.renderFace3$9$bailout(73, t1, t2, t6, t35, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t37 = t1.r;
        if (typeof t37 !== 'number')
          return this.renderFace3$9$bailout(74, t37, t1, t2, t6, t3, t35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t1.r = $.max(0, $.min(t35 * t37, 1));
        var t39 = t3.get$g();
        if (typeof t39 !== 'number')
          return this.renderFace3$9$bailout(75, t1, t2, t6, t39, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t41 = t1.g;
        if (typeof t41 !== 'number')
          return this.renderFace3$9$bailout(76, t1, t2, t6, t3, t39, t41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t1.g = $.max(0, $.min(t39 * t41, 1));
        t3 = t3.get$b();
        if (typeof t3 !== 'number')
          return this.renderFace3$9$bailout(77, t1, t2, t6, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t44 = t1.b;
        if (typeof t44 !== 'number')
          return this.renderFace3$9$bailout(78, t44, t1, t2, t6, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t1.b = $.max(0, $.min(t3 * t44, 1));
        var t46 = t2.r;
        if (typeof t46 !== 'number')
          return this.renderFace3$9$bailout(79, t46, t1, t2, t6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t48 = t1.r;
        if (typeof t48 !== 'number')
          return this.renderFace3$9$bailout(80, t46, t1, t2, t6, t48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t50 = (t46 + t48) * 0.5;
        t51 = this._color4;
        t51.r = t50;
        t50 = t2.g;
        if (typeof t50 !== 'number')
          return this.renderFace3$9$bailout(81, t1, t2, t6, t50, t51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t53 = t1.g;
        if (typeof t53 !== 'number')
          return this.renderFace3$9$bailout(82, t1, t2, t6, t51, t50, t53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t51.g = (t50 + t53) * 0.5;
        t55 = t2.b;
        if (typeof t55 !== 'number')
          return this.renderFace3$9$bailout(83, t1, t2, t6, t55, t51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var t57 = t1.b;
        if (typeof t57 !== 'number')
          return this.renderFace3$9$bailout(84, t1, t2, t6, t55, t51, t57, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t51.b = (t55 + t57) * 0.5;
        this._image = this.getGradientTexture$4(t6, t2, t1, t51);
        this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, 0, 0, 1, 0, 0, 1, this._image);
      } else {
        t2 = this._color;
        t2.r = t5;
        t2.g = t4.g;
        t2.b = t4.b;
        this.calculateLight$4(this._lights, element.get$centroidWorld(), element.get$normalWorld(), t2);
        t5 = t3.get$r();
        if (typeof t5 !== 'number')
          return this.renderFace3$9$bailout(85, t5, t3, t2, material, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t7 = t2.r;
        if (typeof t7 !== 'number')
          return this.renderFace3$9$bailout(86, t5, t7, t3, t1, t2, material, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.r = $.max(0, $.min(t5 * t7, 1));
        t9 = t3.get$g();
        if (typeof t9 !== 'number')
          return this.renderFace3$9$bailout(87, t3, t2, t9, material, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t11 = t2.g;
        if (typeof t11 !== 'number')
          return this.renderFace3$9$bailout(88, t3, material, t2, t9, t1, t11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.g = $.max(0, $.min(t9 * t11, 1));
        t3 = t3.get$b();
        if (typeof t3 !== 'number')
          return this.renderFace3$9$bailout(89, t3, t2, material, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t14 = t2.b;
        if (typeof t14 !== 'number')
          return this.renderFace3$9$bailout(90, t3, t2, t14, material, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t2.b = $.max(0, $.min(t3 * t14, 1));
        if (t1)
          this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
        else
          this.fillPath$1(t2);
      }
    } else {
      t1 = material.wireframe === true;
      t2 = material.color;
      if (t1)
        this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
      else
        this.fillPath$1(t2);
    }
  } else if (typeof material === 'object' && material !== null && !!material.is$MeshDepthMaterial) {
    this._near = this._camera.get$near();
    this._far = this._camera.get$far();
    t1 = this.smoothstep$3(v1.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t2 = this._color1;
    t2.b = t1;
    t2.g = t1;
    t2.r = t1;
    t1 = this.smoothstep$3(v2.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t3 = this._color2;
    t3.b = t1;
    t3.g = t1;
    t3.r = t1;
    t1 = this.smoothstep$3(v3.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t4 = this._color3;
    t4.b = t1;
    t4.g = t1;
    t4.r = t1;
    t1 = t3.r;
    if (typeof t1 !== 'number')
      return this.renderFace3$9$bailout(91, t4, t1, t3, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t6 = t4.r;
    if (typeof t6 !== 'number')
      return this.renderFace3$9$bailout(92, t4, t1, t3, t6, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t8 = (t1 + t6) * 0.5;
    t9 = this._color4;
    t9.r = t8;
    t8 = t3.g;
    if (typeof t8 !== 'number')
      return this.renderFace3$9$bailout(93, t4, t3, t8, t9, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t11 = t4.g;
    if (typeof t11 !== 'number')
      return this.renderFace3$9$bailout(94, t2, t3, t4, t8, t9, t11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t9.g = (t8 + t11) * 0.5;
    t13 = t3.b;
    if (typeof t13 !== 'number')
      return this.renderFace3$9$bailout(95, t2, t4, t3, t9, t13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t15 = t4.b;
    if (typeof t15 !== 'number')
      return this.renderFace3$9$bailout(96, t3, t13, t4, t15, t9, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t9.b = (t13 + t15) * 0.5;
    this._image = this.getGradientTexture$4(t2, t3, t4, t9);
    this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, 0, 0, 1, 0, 0, 1, this._image);
  } else if (typeof material === 'object' && material !== null && !!material.is$MeshNormalMaterial) {
    t1 = this.normalToComponent$1(element.get$normalWorld().get$x());
    t2 = this._color;
    t2.r = t1;
    t2.g = this.normalToComponent$1(element.get$normalWorld().get$y());
    t2.b = this.normalToComponent$1(element.get$normalWorld().get$z());
    if (material.get$wireframe() === true)
      this.strokePath$4(t2, material.get$wireframeLinewidth(), material.get$wireframeLinecap(), material.get$wireframeLinejoin());
    else
      this.fillPath$1(t2);
  }
},
 renderFace3$9$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      var v3 = env2;
      var uv1 = env3;
      var uv2 = env4;
      var uv3 = env5;
      var element = env6;
      var material = env7;
      t1 = env8;
      t2 = env9;
      t3 = env10;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      v3 = env2;
      uv1 = env3;
      uv2 = env4;
      uv3 = env5;
      element = env6;
      material = env7;
      t1 = env8;
      t2 = env9;
      break;
    case 3:
      t2 = env0;
      uv1 = env1;
      uv2 = env2;
      uv3 = env3;
      t1 = env4;
      break;
    case 4:
      uv1 = env0;
      uv2 = env1;
      uv3 = env2;
      t4 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      t8 = env7;
      t9 = env8;
      t10 = env9;
      t1 = env10;
      break;
    case 5:
      uv1 = env0;
      uv2 = env1;
      uv3 = env2;
      t4 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      t8 = env7;
      t9 = env8;
      t13 = env9;
      t1 = env10;
      t12 = env11;
      break;
    case 6:
      uv2 = env0;
      uv3 = env1;
      t4 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      t8 = env6;
      t9 = env7;
      t1 = env8;
      t16 = env9;
      t12 = env10;
      t15 = env11;
      break;
    case 7:
      uv2 = env0;
      uv3 = env1;
      t4 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      t8 = env6;
      t9 = env7;
      t1 = env8;
      t19 = env9;
      t12 = env10;
      t15 = env11;
      t18 = env12;
      break;
    case 8:
      t21 = env0;
      uv3 = env1;
      t4 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      t8 = env6;
      t9 = env7;
      t1 = env8;
      t22 = env9;
      t12 = env10;
      t15 = env11;
      t18 = env12;
      break;
    case 9:
      t21 = env0;
      uv3 = env1;
      t24 = env2;
      t4 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      t8 = env7;
      t9 = env8;
      t1 = env9;
      t25 = env10;
      t12 = env11;
      t15 = env12;
      t18 = env13;
      break;
    case 10:
      cameraMatrix = env0;
      t3 = env1;
      uv2 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      uv1 = env6;
      t1 = env7;
      break;
    case 11:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t5 = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 12:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t5 = env4;
      t7 = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 13:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t7 = env5;
      t5 = env6;
      t1 = env7;
      break;
    case 14:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t7 = env5;
      t5 = env6;
      t10 = env7;
      t1 = env8;
      break;
    case 15:
      cameraMatrix = env0;
      t7 = env1;
      t12 = env2;
      uv2 = env3;
      uv3 = env4;
      element = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 16:
      cameraMatrix = env0;
      t7 = env1;
      t12 = env2;
      uv2 = env3;
      uv3 = env4;
      element = env5;
      t14 = env6;
      t2 = env7;
      t1 = env8;
      break;
    case 17:
      cameraMatrix = env0;
      t16 = env1;
      uv2 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 18:
      cameraMatrix = env0;
      t16 = env1;
      t18 = env2;
      uv2 = env3;
      uv3 = env4;
      element = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 19:
      cameraMatrix = env0;
      t18 = env1;
      uv2 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t16 = env6;
      t1 = env7;
      break;
    case 20:
      cameraMatrix = env0;
      t18 = env1;
      uv2 = env2;
      uv3 = env3;
      element = env4;
      t21 = env5;
      t16 = env6;
      t2 = env7;
      t1 = env8;
      break;
    case 21:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t18 = env5;
      t23 = env6;
      t1 = env7;
      break;
    case 22:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t18 = env5;
      t23 = env6;
      t25 = env7;
      t1 = env8;
      break;
    case 23:
      cameraMatrix = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t27 = env5;
      t1 = env6;
      break;
    case 24:
      cameraMatrix = env0;
      t29 = env1;
      uv3 = env2;
      element = env3;
      t2 = env4;
      t1 = env5;
      break;
    case 25:
      cameraMatrix = env0;
      t31 = env1;
      t29 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 26:
      cameraMatrix = env0;
      t31 = env1;
      t29 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 27:
      cameraMatrix = env0;
      t31 = env1;
      t29 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t34 = env6;
      t1 = env7;
      break;
    case 28:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t31 = env4;
      t36 = env5;
      t1 = env6;
      break;
    case 29:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t31 = env4;
      t36 = env5;
      t38 = env6;
      t1 = env7;
      break;
    case 30:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t40 = env4;
      t1 = env5;
      break;
    case 31:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t40 = env4;
      t42 = env5;
      t1 = env6;
      break;
    case 32:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t42 = env4;
      t40 = env5;
      t1 = env6;
      break;
    case 33:
      cameraMatrix = env0;
      uv3 = env1;
      element = env2;
      t2 = env3;
      t42 = env4;
      t40 = env5;
      t45 = env6;
      t1 = env7;
      break;
    case 34:
      cameraMatrix = env0;
      t42 = env1;
      t47 = env2;
      uv3 = env3;
      element = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 35:
      cameraMatrix = env0;
      t42 = env1;
      t47 = env2;
      t49 = env3;
      uv3 = env4;
      element = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 36:
      cameraMatrix = env0;
      t2 = env1;
      t51 = env2;
      uv3 = env3;
      t1 = env4;
      break;
    case 37:
      cameraMatrix = env0;
      t2 = env1;
      t53 = env2;
      t1 = env3;
      break;
    case 38:
      cameraMatrix = env0;
      t2 = env1;
      t55 = env2;
      t53 = env3;
      t1 = env4;
      break;
    case 39:
      cameraMatrix = env0;
      t55 = env1;
      t2 = env2;
      t53 = env3;
      t1 = env4;
      break;
    case 40:
      cameraMatrix = env0;
      t2 = env1;
      t55 = env2;
      t53 = env3;
      t58 = env4;
      t1 = env5;
      break;
    case 41:
      cameraMatrix = env0;
      t55 = env1;
      t60 = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 42:
      cameraMatrix = env0;
      t55 = env1;
      t60 = env2;
      t62 = env3;
      t2 = env4;
      t1 = env5;
      break;
    case 43:
      cameraMatrix = env0;
      t2 = env1;
      t64 = env2;
      t1 = env3;
      break;
    case 44:
      cameraMatrix = env0;
      t66 = env1;
      t2 = env2;
      t64 = env3;
      t1 = env4;
      break;
    case 45:
      cameraMatrix = env0;
      t66 = env1;
      t2 = env2;
      t64 = env3;
      t1 = env4;
      break;
    case 46:
      cameraMatrix = env0;
      t66 = env1;
      t64 = env2;
      t69 = env3;
      t2 = env4;
      t1 = env5;
      break;
    case 47:
      cameraMatrix = env0;
      t66 = env1;
      t2 = env2;
      t1 = env3;
      break;
    case 48:
      t66 = env0;
      t2 = env1;
      t72 = env2;
      t1 = env3;
      break;
    case 49:
      uv1 = env0;
      uv2 = env1;
      uv3 = env2;
      element = env3;
      material = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 50:
      t4 = env0;
      t5 = env1;
      t6 = env2;
      t7 = env3;
      t8 = env4;
      element = env5;
      material = env6;
      uv3 = env7;
      t9 = env8;
      uv2 = env9;
      uv1 = env10;
      t10 = env11;
      t1 = env12;
      break;
    case 51:
      t4 = env0;
      t5 = env1;
      t6 = env2;
      t7 = env3;
      t8 = env4;
      element = env5;
      material = env6;
      uv3 = env7;
      t9 = env8;
      uv2 = env9;
      t13 = env10;
      uv1 = env11;
      t12 = env12;
      t1 = env13;
      break;
    case 52:
      t4 = env0;
      t5 = env1;
      t6 = env2;
      t7 = env3;
      t8 = env4;
      element = env5;
      material = env6;
      uv3 = env7;
      t9 = env8;
      t16 = env9;
      uv2 = env10;
      t12 = env11;
      t15 = env12;
      t1 = env13;
      break;
    case 53:
      t4 = env0;
      t5 = env1;
      t6 = env2;
      t7 = env3;
      t8 = env4;
      element = env5;
      material = env6;
      uv3 = env7;
      t9 = env8;
      t19 = env9;
      uv2 = env10;
      t12 = env11;
      t15 = env12;
      t1 = env13;
      t18 = env14;
      break;
    case 54:
      t21 = env0;
      t4 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t8 = env5;
      element = env6;
      material = env7;
      uv3 = env8;
      t9 = env9;
      t22 = env10;
      t12 = env11;
      t15 = env12;
      t1 = env13;
      t18 = env14;
      break;
    case 55:
      t21 = env0;
      t4 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t8 = env5;
      element = env6;
      material = env7;
      uv3 = env8;
      t9 = env9;
      t24 = env10;
      t25 = env11;
      t12 = env12;
      t15 = env13;
      t1 = env14;
      t18 = env15;
      break;
    case 56:
      material = env0;
      t2 = env1;
      element = env2;
      t1 = env3;
      break;
    case 57:
      material = env0;
      element = env1;
      t2 = env2;
      t1 = env3;
      break;
    case 58:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      element = env3;
      t3 = env4;
      t4 = env5;
      t1 = env6;
      t7 = env7;
      break;
    case 59:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t4 = env3;
      element = env4;
      t3 = env5;
      t9 = env6;
      t1 = env7;
      break;
    case 60:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t3 = env4;
      t1 = env5;
      t11 = env6;
      break;
    case 61:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t1 = env3;
      t3 = env4;
      break;
    case 62:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t1 = env3;
      t3 = env4;
      t13 = env5;
      break;
    case 63:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t15 = env3;
      t3 = env4;
      break;
    case 64:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t17 = env3;
      t15 = env4;
      t3 = env5;
      break;
    case 65:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t19 = env3;
      t3 = env4;
      break;
    case 66:
      t21 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t3 = env4;
      t19 = env5;
      break;
    case 67:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t23 = env3;
      t3 = env4;
      break;
    case 68:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t3 = env3;
      t23 = env4;
      t25 = env5;
      break;
    case 69:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t27 = env3;
      t3 = env4;
      break;
    case 70:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t27 = env3;
      t3 = env4;
      t29 = env5;
      break;
    case 71:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t31 = env3;
      t3 = env4;
      break;
    case 72:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t33 = env3;
      t31 = env4;
      t3 = env5;
      break;
    case 73:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t35 = env3;
      t3 = env4;
      break;
    case 74:
      t37 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t3 = env4;
      t35 = env5;
      break;
    case 75:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t39 = env3;
      t3 = env4;
      break;
    case 76:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t3 = env3;
      t39 = env4;
      t41 = env5;
      break;
    case 77:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t3 = env3;
      break;
    case 78:
      t44 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t3 = env4;
      break;
    case 79:
      t46 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      break;
    case 80:
      t46 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t48 = env4;
      break;
    case 81:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t50 = env3;
      t51 = env4;
      break;
    case 82:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t51 = env3;
      t50 = env4;
      t53 = env5;
      break;
    case 83:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t55 = env3;
      t51 = env4;
      break;
    case 84:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t55 = env3;
      t51 = env4;
      t57 = env5;
      break;
    case 85:
      t2 = env0;
      t3 = env1;
      t5 = env2;
      material = env3;
      t1 = env4;
      break;
    case 86:
      t2 = env0;
      t7 = env1;
      t3 = env2;
      t1 = env3;
      t5 = env4;
      material = env5;
      break;
    case 87:
      t3 = env0;
      t5 = env1;
      t9 = env2;
      material = env3;
      t1 = env4;
      break;
    case 88:
      t3 = env0;
      material = env1;
      t5 = env2;
      t9 = env3;
      t1 = env4;
      t11 = env5;
      break;
    case 89:
      t3 = env0;
      t5 = env1;
      material = env2;
      t1 = env3;
      break;
    case 90:
      t3 = env0;
      t5 = env1;
      t14 = env2;
      material = env3;
      t1 = env4;
      break;
    case 91:
      t4 = env0;
      t1 = env1;
      t3 = env2;
      t2 = env3;
      break;
    case 92:
      t4 = env0;
      t1 = env1;
      t3 = env2;
      t6 = env3;
      t2 = env4;
      break;
    case 93:
      t4 = env0;
      t3 = env1;
      t8 = env2;
      t9 = env3;
      t2 = env4;
      break;
    case 94:
      t2 = env0;
      t3 = env1;
      t4 = env2;
      t8 = env3;
      t9 = env4;
      t11 = env5;
      break;
    case 95:
      t2 = env0;
      t4 = env1;
      t3 = env2;
      t9 = env3;
      t13 = env4;
      break;
    case 96:
      t3 = env0;
      t13 = env1;
      t4 = env2;
      t15 = env3;
      t9 = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._info;
      var t2 = t1.get$render();
      var t3 = t2.get$vertices();
    case 1:
      state = 0;
      t2.set$vertices($.add(t3, 3));
      t1 = t1.get$render();
      t2 = t1.get$faces();
    case 2:
      state = 0;
      t1.set$faces($.add(t2, 1));
      this.setOpacity$1(material.get$opacity());
      this.setBlending$1(material.get$blending());
      this._v1x = v1.get$positionScreen().get$x();
      this._v1y = v1.get$positionScreen().get$y();
      this._v2x = v2.get$positionScreen().get$x();
      this._v2y = v2.get$positionScreen().get$y();
      this._v3x = v3.get$positionScreen().get$x();
      this._v3y = v3.get$positionScreen().get$y();
      this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y);
    default:
      if (state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && typeof material === 'object' && material !== null && !!material.is$MeshBasicMaterial)
        switch (state) {
          case 0:
            t1 = material.map;
          default:
            if (state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && !(t1 == null))
              switch (state) {
                case 0:
                  t2 = t1.get$mapping();
                default:
                  if (state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && typeof t2 === 'object' && t2 !== null && !!t2.is$UVMapping)
                    switch (state) {
                      case 0:
                        t2 = element.get$uvs();
                      case 3:
                        state = 0;
                        this._uvs = $.index(t2, 0);
                        var t4 = this._v1x;
                        var t5 = this._v1y;
                        var t6 = this._v2x;
                        var t7 = this._v2y;
                        var t8 = this._v3x;
                        var t9 = this._v3y;
                        var t10 = this._uvs;
                      case 4:
                        state = 0;
                        var t12 = $.index(t10, uv1).get$u();
                        var t13 = this._uvs;
                      case 5:
                        state = 0;
                        var t15 = $.index(t13, uv1).get$v();
                        var t16 = this._uvs;
                      case 6:
                        state = 0;
                        var t18 = $.index(t16, uv2).get$u();
                        var t19 = this._uvs;
                      case 7:
                        state = 0;
                        var t21 = $.index(t19, uv2).get$v();
                        var t22 = this._uvs;
                      case 8:
                        state = 0;
                        var t24 = $.index(t22, uv3).get$u();
                        var t25 = this._uvs;
                      case 9:
                        state = 0;
                        this.patternPath$13(t4, t5, t6, t7, t8, t9, t12, t15, t18, t21, t24, $.index(t25, uv3).get$v(), t1);
                    }
              }
            else
              switch (state) {
                case 0:
                  t1 = material.envMap;
                default:
                  if (state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 0 && !(null == t1))
                    switch (state) {
                      case 0:
                        t2 = t1.get$mapping();
                      default:
                        if (state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 0 && typeof t2 === 'object' && t2 !== null && !!t2.is$SphericalReflectionMapping)
                          switch (state) {
                            case 0:
                              var cameraMatrix = this._camera.get$matrixWorldInverse();
                              t2 = this._vector3;
                              t3 = element.get$vertexNormalsWorld();
                            case 10:
                              state = 0;
                              t2.copy$1($.index(t3, uv1));
                              t5 = t2.get$x();
                            case 11:
                              state = 0;
                              t7 = cameraMatrix.get$n11();
                            case 12:
                              state = 0;
                              t7 = $.mul(t5, t7);
                              t5 = t2.get$y();
                            case 13:
                              state = 0;
                              t10 = cameraMatrix.get$n12();
                            case 14:
                              state = 0;
                              t7 = $.add(t7, $.mul(t5, t10));
                              t12 = t2.get$z();
                            case 15:
                              state = 0;
                              var t14 = cameraMatrix.get$n13();
                            case 16:
                              state = 0;
                              this._uv1x = $.add($.mul($.add(t7, $.mul(t12, t14)), 0.5), 0.5);
                              t16 = t2.get$x();
                            case 17:
                              state = 0;
                              t18 = cameraMatrix.get$n21();
                            case 18:
                              state = 0;
                              t18 = $.mul(t16, t18);
                              t16 = t2.get$y();
                            case 19:
                              state = 0;
                              t21 = cameraMatrix.get$n22();
                            case 20:
                              state = 0;
                              t18 = $.add(t18, $.mul(t16, t21));
                              var t23 = t2.get$z();
                            case 21:
                              state = 0;
                              t25 = cameraMatrix.get$n23();
                            case 22:
                              state = 0;
                              this._uv1y = $.add($.mul($.neg($.add(t18, $.mul(t23, t25))), 0.5), 0.5);
                              var t27 = element.get$vertexNormalsWorld();
                            case 23:
                              state = 0;
                              t2.copy$1($.index(t27, uv2));
                              var t29 = t2.get$x();
                            case 24:
                              state = 0;
                              var t31 = cameraMatrix.get$n11();
                            case 25:
                              state = 0;
                              t31 = $.mul(t29, t31);
                              t29 = t2.get$y();
                            case 26:
                              state = 0;
                              var t34 = cameraMatrix.get$n12();
                            case 27:
                              state = 0;
                              t31 = $.add(t31, $.mul(t29, t34));
                              var t36 = t2.get$z();
                            case 28:
                              state = 0;
                              var t38 = cameraMatrix.get$n13();
                            case 29:
                              state = 0;
                              this._uv2x = $.add($.mul($.add(t31, $.mul(t36, t38)), 0.5), 0.5);
                              var t40 = t2.get$x();
                            case 30:
                              state = 0;
                              var t42 = cameraMatrix.get$n21();
                            case 31:
                              state = 0;
                              t42 = $.mul(t40, t42);
                              t40 = t2.get$y();
                            case 32:
                              state = 0;
                              var t45 = cameraMatrix.get$n22();
                            case 33:
                              state = 0;
                              t42 = $.add(t42, $.mul(t40, t45));
                              var t47 = t2.get$z();
                            case 34:
                              state = 0;
                              var t49 = cameraMatrix.get$n23();
                            case 35:
                              state = 0;
                              this._uv2y = $.add($.mul($.neg($.add(t42, $.mul(t47, t49))), 0.5), 0.5);
                              var t51 = element.get$vertexNormalsWorld();
                            case 36:
                              state = 0;
                              t2.copy$1($.index(t51, uv3));
                              var t53 = t2.get$x();
                            case 37:
                              state = 0;
                              var t55 = cameraMatrix.get$n11();
                            case 38:
                              state = 0;
                              t55 = $.mul(t53, t55);
                              t53 = t2.get$y();
                            case 39:
                              state = 0;
                              var t58 = cameraMatrix.get$n12();
                            case 40:
                              state = 0;
                              t55 = $.add(t55, $.mul(t53, t58));
                              var t60 = t2.get$z();
                            case 41:
                              state = 0;
                              var t62 = cameraMatrix.get$n13();
                            case 42:
                              state = 0;
                              this._uv3x = $.add($.mul($.add(t55, $.mul(t60, t62)), 0.5), 0.5);
                              var t64 = t2.get$x();
                            case 43:
                              state = 0;
                              var t66 = cameraMatrix.get$n21();
                            case 44:
                              state = 0;
                              t66 = $.mul(t64, t66);
                              t64 = t2.get$y();
                            case 45:
                              state = 0;
                              var t69 = cameraMatrix.get$n22();
                            case 46:
                              state = 0;
                              t66 = $.add(t66, $.mul(t64, t69));
                              t2 = t2.get$z();
                            case 47:
                              state = 0;
                              var t72 = cameraMatrix.get$n23();
                            case 48:
                              state = 0;
                              this._uv3y = $.add($.mul($.neg($.add(t66, $.mul(t2, t72))), 0.5), 0.5);
                              this.patternPath$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._uv1x, this._uv1y, this._uv2x, this._uv2y, this._uv3x, this._uv3y, t1);
                          }
                    }
                  else {
                    t1 = material.wireframe === true;
                    t2 = material.color;
                    if (t1)
                      this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
                    else
                      this.fillPath$1(t2);
                  }
              }
        }
      else
        switch (state) {
          case 0:
          default:
            if (state === 90 || state === 89 || state === 88 || state === 87 || state === 86 || state === 85 || state === 84 || state === 83 || state === 82 || state === 81 || state === 80 || state === 79 || state === 78 || state === 77 || state === 76 || state === 75 || state === 74 || state === 73 || state === 72 || state === 71 || state === 70 || state === 69 || state === 68 || state === 67 || state === 66 || state === 65 || state === 64 || state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 0 && typeof material === 'object' && material !== null && !!material.is$MeshLambertMaterial)
              switch (state) {
                case 0:
                  t1 = material.map;
                default:
                  if (state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 0 && !(t1 == null) && material.wireframe !== true)
                    switch (state) {
                      case 0:
                        t2 = t1.get$mapping();
                      default:
                        if (state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 0 && typeof t2 === 'object' && t2 !== null && !!t2.is$UVMapping)
                          switch (state) {
                            case 0:
                              t2 = element.get$uvs();
                            case 49:
                              state = 0;
                              this._uvs = $.index(t2, 0);
                              t4 = this._v1x;
                              t5 = this._v1y;
                              t6 = this._v2x;
                              t7 = this._v2y;
                              t8 = this._v3x;
                              t9 = this._v3y;
                              t10 = this._uvs;
                            case 50:
                              state = 0;
                              t12 = $.index(t10, uv1).get$u();
                              t13 = this._uvs;
                            case 51:
                              state = 0;
                              t15 = $.index(t13, uv1).get$v();
                              t16 = this._uvs;
                            case 52:
                              state = 0;
                              t18 = $.index(t16, uv2).get$u();
                              t19 = this._uvs;
                            case 53:
                              state = 0;
                              t21 = $.index(t19, uv2).get$v();
                              t22 = this._uvs;
                            case 54:
                              state = 0;
                              t24 = $.index(t22, uv3).get$u();
                              t25 = this._uvs;
                            case 55:
                              state = 0;
                              this.patternPath$13(t4, t5, t6, t7, t8, t9, t12, t15, t18, t21, t24, $.index(t25, uv3).get$v(), t1);
                          }
                        this.setBlending$1(3);
                    }
                case 56:
                case 57:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                case 80:
                case 81:
                case 82:
                case 83:
                case 84:
                case 85:
                case 86:
                case 87:
                case 88:
                case 89:
                case 90:
                  if (state === 90 || state === 89 || state === 88 || state === 87 || state === 86 || state === 85 || state === 84 || state === 83 || state === 82 || state === 81 || state === 80 || state === 79 || state === 78 || state === 77 || state === 76 || state === 75 || state === 74 || state === 73 || state === 72 || state === 71 || state === 70 || state === 69 || state === 68 || state === 67 || state === 66 || state === 65 || state === 64 || state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 0 && this._enableLighting === true)
                    switch (state) {
                      case 0:
                        t1 = material.wireframe === true;
                      default:
                        if (state === 57 || state === 56 || state === 0 && !t1)
                          switch (state) {
                            case 0:
                              t2 = material.shading;
                            case 56:
                              state = 0;
                            case 57:
                              if (state === 57 || state === 0 && $.eqB(t2, 2))
                                switch (state) {
                                  case 0:
                                    t2 = $.get$length(element.get$vertexNormalsWorld());
                                  case 57:
                                    state = 0;
                                    t2 = $.eqB(t2, 3);
                                }
                              else
                                t2 = false;
                          }
                        else
                          t2 = false;
                        t3 = material.color;
                        t4 = this._ambientLight;
                      case 58:
                      case 59:
                      case 60:
                      case 61:
                      case 62:
                      case 63:
                      case 64:
                      case 65:
                      case 66:
                      case 67:
                      case 68:
                      case 69:
                      case 70:
                      case 71:
                      case 72:
                      case 73:
                      case 74:
                      case 75:
                      case 76:
                      case 77:
                      case 78:
                      case 79:
                      case 80:
                      case 81:
                      case 82:
                      case 83:
                      case 84:
                      case 85:
                      case 86:
                      case 87:
                      case 88:
                      case 89:
                      case 90:
                        if (state === 84 || state === 83 || state === 82 || state === 81 || state === 80 || state === 79 || state === 78 || state === 77 || state === 76 || state === 75 || state === 74 || state === 73 || state === 72 || state === 71 || state === 70 || state === 69 || state === 68 || state === 67 || state === 66 || state === 65 || state === 64 || state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 0 && t2)
                          switch (state) {
                            case 0:
                              t1 = t4.get$r();
                              t2 = this._color3;
                              t2.set$r(t1);
                              t5 = this._color2;
                              t5.set$r(t1);
                              t6 = this._color1;
                              t6.set$r(t1);
                              t1 = t4.get$g();
                              t2.set$g(t1);
                              t5.set$g(t1);
                              t6.set$g(t1);
                              t4 = t4.get$b();
                              t2.set$b(t4);
                              t5.set$b(t4);
                              t6.set$b(t4);
                              t4 = this._lights;
                              t1 = element.get$v1().get$positionWorld();
                              t7 = element.get$vertexNormalsWorld();
                            case 58:
                              state = 0;
                              this.calculateLight$4(t4, t1, $.index(t7, 0), t6);
                              t1 = this._lights;
                              t4 = element.get$v2().get$positionWorld();
                              t9 = element.get$vertexNormalsWorld();
                            case 59:
                              state = 0;
                              this.calculateLight$4(t1, t4, $.index(t9, 1), t5);
                              t4 = this._lights;
                              t1 = element.get$v3().get$positionWorld();
                              var t11 = element.get$vertexNormalsWorld();
                            case 60:
                              state = 0;
                              this.calculateLight$4(t4, t1, $.index(t11, 2), t2);
                              t1 = t3.get$r();
                            case 61:
                              state = 0;
                              t13 = t6.get$r();
                            case 62:
                              state = 0;
                              t6.set$r($.max(0, $.min($.mul(t1, t13), 1)));
                              t15 = t3.get$g();
                            case 63:
                              state = 0;
                              var t17 = t6.get$g();
                            case 64:
                              state = 0;
                              t6.set$g($.max(0, $.min($.mul(t15, t17), 1)));
                              t19 = t3.get$b();
                            case 65:
                              state = 0;
                              t21 = t6.get$b();
                            case 66:
                              state = 0;
                              t6.set$b($.max(0, $.min($.mul(t19, t21), 1)));
                              t23 = t3.get$r();
                            case 67:
                              state = 0;
                              t25 = t5.get$r();
                            case 68:
                              state = 0;
                              t5.set$r($.max(0, $.min($.mul(t23, t25), 1)));
                              t27 = t3.get$g();
                            case 69:
                              state = 0;
                              t29 = t5.get$g();
                            case 70:
                              state = 0;
                              t5.set$g($.max(0, $.min($.mul(t27, t29), 1)));
                              t31 = t3.get$b();
                            case 71:
                              state = 0;
                              var t33 = t5.get$b();
                            case 72:
                              state = 0;
                              t5.set$b($.max(0, $.min($.mul(t31, t33), 1)));
                              var t35 = t3.get$r();
                            case 73:
                              state = 0;
                              var t37 = t2.get$r();
                            case 74:
                              state = 0;
                              t2.set$r($.max(0, $.min($.mul(t35, t37), 1)));
                              var t39 = t3.get$g();
                            case 75:
                              state = 0;
                              var t41 = t2.get$g();
                            case 76:
                              state = 0;
                              t2.set$g($.max(0, $.min($.mul(t39, t41), 1)));
                              t3 = t3.get$b();
                            case 77:
                              state = 0;
                              var t44 = t2.get$b();
                            case 78:
                              state = 0;
                              t2.set$b($.max(0, $.min($.mul(t3, t44), 1)));
                              var t46 = t5.get$r();
                            case 79:
                              state = 0;
                              var t48 = t2.get$r();
                            case 80:
                              state = 0;
                              var t50 = $.mul($.add(t46, t48), 0.5);
                              t51 = this._color4;
                              t51.set$r(t50);
                              t50 = t5.get$g();
                            case 81:
                              state = 0;
                              t53 = t2.get$g();
                            case 82:
                              state = 0;
                              t51.set$g($.mul($.add(t50, t53), 0.5));
                              t55 = t5.get$b();
                            case 83:
                              state = 0;
                              var t57 = t2.get$b();
                            case 84:
                              state = 0;
                              t51.set$b($.mul($.add(t55, t57), 0.5));
                              this._image = this.getGradientTexture$4(t6, t5, t2, t51);
                              this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, 0, 0, 1, 0, 0, 1, this._image);
                          }
                        else
                          switch (state) {
                            case 0:
                              t2 = t4.get$r();
                              t5 = this._color;
                              t5.set$r(t2);
                              t5.set$g(t4.get$g());
                              t5.set$b(t4.get$b());
                              this.calculateLight$4(this._lights, element.get$centroidWorld(), element.get$normalWorld(), t5);
                              t2 = t3.get$r();
                            case 85:
                              state = 0;
                              t7 = t5.get$r();
                            case 86:
                              state = 0;
                              t5.set$r($.max(0, $.min($.mul(t2, t7), 1)));
                              t9 = t3.get$g();
                            case 87:
                              state = 0;
                              t11 = t5.get$g();
                            case 88:
                              state = 0;
                              t5.set$g($.max(0, $.min($.mul(t9, t11), 1)));
                              t3 = t3.get$b();
                            case 89:
                              state = 0;
                              t14 = t5.get$b();
                            case 90:
                              state = 0;
                              t5.set$b($.max(0, $.min($.mul(t3, t14), 1)));
                              if (t1)
                                this.strokePath$4(t5, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
                              else
                                this.fillPath$1(t5);
                          }
                    }
                  else {
                    t1 = material.wireframe === true;
                    t2 = material.color;
                    if (t1)
                      this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
                    else
                      this.fillPath$1(t2);
                  }
              }
            else
              switch (state) {
                case 0:
                default:
                  if (state === 96 || state === 95 || state === 94 || state === 93 || state === 92 || state === 91 || state === 0 && typeof material === 'object' && material !== null && !!material.is$MeshDepthMaterial)
                    switch (state) {
                      case 0:
                        this._near = this._camera.get$near();
                        this._far = this._camera.get$far();
                        t1 = this.smoothstep$3(v1.get$positionScreen().get$z(), this._near, this._far);
                        if (typeof t1 !== 'number')
                          throw $.iae(t1);
                        t1 = 1 - t1;
                        t2 = this._color1;
                        t2.set$b(t1);
                        t2.set$g(t1);
                        t2.set$r(t1);
                        t1 = this.smoothstep$3(v2.get$positionScreen().get$z(), this._near, this._far);
                        if (typeof t1 !== 'number')
                          throw $.iae(t1);
                        t1 = 1 - t1;
                        t3 = this._color2;
                        t3.set$b(t1);
                        t3.set$g(t1);
                        t3.set$r(t1);
                        t1 = this.smoothstep$3(v3.get$positionScreen().get$z(), this._near, this._far);
                        if (typeof t1 !== 'number')
                          throw $.iae(t1);
                        t1 = 1 - t1;
                        t4 = this._color3;
                        t4.set$b(t1);
                        t4.set$g(t1);
                        t4.set$r(t1);
                        t1 = t3.get$r();
                      case 91:
                        state = 0;
                        t6 = t4.get$r();
                      case 92:
                        state = 0;
                        t8 = $.mul($.add(t1, t6), 0.5);
                        t9 = this._color4;
                        t9.set$r(t8);
                        t8 = t3.get$g();
                      case 93:
                        state = 0;
                        t11 = t4.get$g();
                      case 94:
                        state = 0;
                        t9.set$g($.mul($.add(t8, t11), 0.5));
                        t13 = t3.get$b();
                      case 95:
                        state = 0;
                        t15 = t4.get$b();
                      case 96:
                        state = 0;
                        t9.set$b($.mul($.add(t13, t15), 0.5));
                        this._image = this.getGradientTexture$4(t2, t3, t4, t9);
                        this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, 0, 0, 1, 0, 0, 1, this._image);
                    }
                  else if (typeof material === 'object' && material !== null && !!material.is$MeshNormalMaterial) {
                    t1 = this.normalToComponent$1(element.get$normalWorld().get$x());
                    t2 = this._color;
                    t2.set$r(t1);
                    t2.set$g(this.normalToComponent$1(element.get$normalWorld().get$y()));
                    t2.set$b(this.normalToComponent$1(element.get$normalWorld().get$z()));
                    if (material.get$wireframe() === true)
                      this.strokePath$4(t2, material.get$wireframeLinewidth(), material.get$wireframeLinecap(), material.get$wireframeLinejoin());
                    else
                      this.fillPath$1(t2);
                  }
              }
        }
  }
},
 renderFace4$9: function(v1, v2, v3, v4, v5, v6, element, material, scene) {
  var t1 = this._info;
  var t2 = t1.render;
  var t3 = t2.get$vertices();
  if (typeof t3 !== 'number')
    return this.renderFace4$9$bailout(1, v1, v2, v3, v4, v5, v6, element, material, scene, t2, t3, t1);
  t2.set$vertices(t3 + 4);
  var t5 = t2.get$faces();
  if (typeof t5 !== 'number')
    return this.renderFace4$9$bailout(2, v1, v2, v3, v4, v5, v6, element, material, scene, t2, t5, 0);
  t2.set$faces(t5 + 1);
  this.setOpacity$1(material.get$opacity());
  this.setBlending$1(material.get$blending());
  if (typeof material === 'object' && material !== null && !!material.is$ITextureMapMaterial) {
    this.renderFace3$9(v1, v2, v4, 0, 1, 3, element, material, scene);
    this.renderFace3$9(v5, v3, v6, 1, 2, 3, element, material, scene);
    return;
  }
  this._v1x = v1.get$positionScreen().get$x();
  this._v1y = v1.get$positionScreen().get$y();
  this._v2x = v2.get$positionScreen().get$x();
  this._v2y = v2.get$positionScreen().get$y();
  this._v3x = v3.get$positionScreen().get$x();
  this._v3y = v3.get$positionScreen().get$y();
  this._v4x = v4.get$positionScreen().get$x();
  this._v4y = v4.get$positionScreen().get$y();
  this._v5x = v5.get$positionScreen().get$x();
  this._v5y = v5.get$positionScreen().get$y();
  this._v6x = v6.get$positionScreen().get$x();
  this._v6y = v6.get$positionScreen().get$y();
  if (typeof material === 'object' && material !== null && !!material.is$MeshBasicMaterial) {
    this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
    t1 = material.wireframe === true;
    t2 = material.color;
    if (t1)
      this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
    else
      this.fillPath$1(t2);
  } else if (typeof material === 'object' && material !== null && !!material.is$MeshLambertMaterial)
    if (this._enableLighting === true) {
      t1 = material.wireframe === true;
      if (!t1) {
        t2 = material.shading;
        if (typeof t2 !== 'number')
          return this.renderFace4$9$bailout(3, t2, material, t1, element, 0, 0, 0, 0, 0, 0, 0, 0);
        if (t2 === 2) {
          t2 = $.get$length(element.get$vertexNormalsWorld());
          if (typeof t2 !== 'number')
            return this.renderFace4$9$bailout(4, t2, material, t1, element, 0, 0, 0, 0, 0, 0, 0, 0);
          t2 = t2 === 4;
        } else
          t2 = false;
      } else
        t2 = false;
      t3 = this._ambientLight;
      var t4 = material.color;
      t5 = t3.r;
      if (t2) {
        t1 = this._color4;
        t1.r = t5;
        t2 = this._color3;
        t2.r = t5;
        var t6 = this._color2;
        t6.r = t5;
        var t7 = this._color1;
        t7.r = t5;
        t5 = t3.g;
        t1.g = t5;
        t2.g = t5;
        t6.g = t5;
        t7.g = t5;
        t3 = t3.b;
        t1.b = t3;
        t2.b = t3;
        t6.b = t3;
        t7.b = t3;
        t3 = this._lights;
        t5 = element.get$v1().get$positionWorld();
        var t8 = element.get$vertexNormalsWorld();
        if (typeof t8 !== 'string' && (typeof t8 !== 'object' || t8 === null || t8.constructor !== Array && !t8.is$JavaScriptIndexingBehavior()))
          return this.renderFace4$9$bailout(5, t5, t8, t4, element, t3, t1, t2, t6, t7, 0, 0, 0);
        if (0 >= t8.length)
          throw $.ioore(0);
        this.calculateLight$4(t3, t5, t8[0], t7);
        t5 = this._lights;
        t3 = element.get$v2().get$positionWorld();
        var t10 = element.get$vertexNormalsWorld();
        if (typeof t10 !== 'string' && (typeof t10 !== 'object' || t10 === null || t10.constructor !== Array && !t10.is$JavaScriptIndexingBehavior()))
          return this.renderFace4$9$bailout(6, t4, element, t3, t1, t2, t6, t7, t10, t5, 0, 0, 0);
        if (1 >= t10.length)
          throw $.ioore(1);
        this.calculateLight$4(t5, t3, t10[1], t6);
        t3 = this._lights;
        t5 = element.get$v4().get$positionWorld();
        var t12 = element.get$vertexNormalsWorld();
        if (typeof t12 !== 'string' && (typeof t12 !== 'object' || t12 === null || t12.constructor !== Array && !t12.is$JavaScriptIndexingBehavior()))
          return this.renderFace4$9$bailout(7, t5, t12, t4, element, t1, t2, t6, t7, t3, 0, 0, 0);
        if (3 >= t12.length)
          throw $.ioore(3);
        this.calculateLight$4(t3, t5, t12[3], t2);
        t5 = this._lights;
        t3 = element.get$v3().get$positionWorld();
        var t14 = element.get$vertexNormalsWorld();
        if (typeof t14 !== 'string' && (typeof t14 !== 'object' || t14 === null || t14.constructor !== Array && !t14.is$JavaScriptIndexingBehavior()))
          return this.renderFace4$9$bailout(8, t4, t1, t2, t6, t7, t5, t14, t3, 0, 0, 0, 0);
        if (2 >= t14.length)
          throw $.ioore(2);
        this.calculateLight$4(t5, t3, t14[2], t1);
        t3 = t4.get$r();
        if (typeof t3 !== 'number')
          return this.renderFace4$9$bailout(9, t3, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        var t16 = t7.r;
        if (typeof t16 !== 'number')
          return this.renderFace4$9$bailout(10, t3, t16, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0);
        t7.r = $.max(0, $.min(t3 * t16, 1));
        var t18 = t4.get$g();
        if (typeof t18 !== 'number')
          return this.renderFace4$9$bailout(11, t4, t1, t2, t6, t7, t18, 0, 0, 0, 0, 0, 0);
        var t20 = t7.g;
        if (typeof t20 !== 'number')
          return this.renderFace4$9$bailout(12, t4, t1, t2, t6, t7, t18, t20, 0, 0, 0, 0, 0);
        t7.g = $.max(0, $.min(t18 * t20, 1));
        var t22 = t4.get$b();
        if (typeof t22 !== 'number')
          return this.renderFace4$9$bailout(13, t4, t1, t2, t6, t7, t22, 0, 0, 0, 0, 0, 0);
        var t24 = t7.b;
        if (typeof t24 !== 'number')
          return this.renderFace4$9$bailout(14, t4, t1, t2, t6, t7, t22, t24, 0, 0, 0, 0, 0);
        t7.b = $.max(0, $.min(t22 * t24, 1));
        var t26 = t4.get$r();
        if (typeof t26 !== 'number')
          return this.renderFace4$9$bailout(15, t4, t26, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        var t28 = t6.r;
        if (typeof t28 !== 'number')
          return this.renderFace4$9$bailout(16, t4, t26, t28, t1, t2, t6, t7, 0, 0, 0, 0, 0);
        t6.r = $.max(0, $.min(t26 * t28, 1));
        var t30 = t4.get$g();
        if (typeof t30 !== 'number')
          return this.renderFace4$9$bailout(17, t30, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        var t32 = t6.g;
        if (typeof t32 !== 'number')
          return this.renderFace4$9$bailout(18, t30, t32, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0);
        t6.g = $.max(0, $.min(t30 * t32, 1));
        var t34 = t4.get$b();
        if (typeof t34 !== 'number')
          return this.renderFace4$9$bailout(19, t4, t1, t2, t6, t7, t34, 0, 0, 0, 0, 0, 0);
        var t36 = t6.b;
        if (typeof t36 !== 'number')
          return this.renderFace4$9$bailout(20, t4, t1, t2, t6, t7, t34, t36, 0, 0, 0, 0, 0);
        t6.b = $.max(0, $.min(t34 * t36, 1));
        var t38 = t4.get$r();
        if (typeof t38 !== 'number')
          return this.renderFace4$9$bailout(21, t4, t1, t2, t6, t7, t38, 0, 0, 0, 0, 0, 0);
        var t40 = t2.r;
        if (typeof t40 !== 'number')
          return this.renderFace4$9$bailout(22, t4, t1, t2, t6, t7, t38, t40, 0, 0, 0, 0, 0);
        t2.r = $.max(0, $.min(t38 * t40, 1));
        var t42 = t4.get$g();
        if (typeof t42 !== 'number')
          return this.renderFace4$9$bailout(23, t4, t42, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        var t44 = t2.g;
        if (typeof t44 !== 'number')
          return this.renderFace4$9$bailout(24, t4, t42, t44, t1, t2, t6, t7, 0, 0, 0, 0, 0);
        t2.g = $.max(0, $.min(t42 * t44, 1));
        var t46 = t4.get$b();
        if (typeof t46 !== 'number')
          return this.renderFace4$9$bailout(25, t46, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        var t48 = t2.b;
        if (typeof t48 !== 'number')
          return this.renderFace4$9$bailout(26, t46, t48, t4, t1, t2, t6, t7, 0, 0, 0, 0, 0);
        t2.b = $.max(0, $.min(t46 * t48, 1));
        var t50 = t4.get$r();
        if (typeof t50 !== 'number')
          return this.renderFace4$9$bailout(27, t4, t1, t2, t6, t7, t50, 0, 0, 0, 0, 0, 0);
        var t52 = t1.r;
        if (typeof t52 !== 'number')
          return this.renderFace4$9$bailout(28, t4, t1, t2, t6, t7, t50, t52, 0, 0, 0, 0, 0);
        t1.r = $.max(0, $.min(t50 * t52, 1));
        var t54 = t4.get$g();
        if (typeof t54 !== 'number')
          return this.renderFace4$9$bailout(29, t4, t1, t2, t6, t7, t54, 0, 0, 0, 0, 0, 0);
        var t56 = t1.g;
        if (typeof t56 !== 'number')
          return this.renderFace4$9$bailout(30, t4, t1, t2, t6, t7, t54, t56, 0, 0, 0, 0, 0);
        t1.g = $.max(0, $.min(t54 * t56, 1));
        t4 = t4.get$b();
        if (typeof t4 !== 'number')
          return this.renderFace4$9$bailout(31, t1, t2, t6, t7, t4, 0, 0, 0, 0, 0, 0, 0);
        var t59 = t1.b;
        if (typeof t59 !== 'number')
          return this.renderFace4$9$bailout(32, t4, t59, t1, t2, t6, t7, 0, 0, 0, 0, 0, 0);
        t1.b = $.max(0, $.min(t4 * t59, 1));
        this._image = this.getGradientTexture$4(t7, t6, t2, t1);
        this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y);
        this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y, 0, 0, 1, 0, 0, 1, this._image);
        this.drawTriangle$6(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y);
        this.clipImage$13(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y, 1, 0, 1, 1, 0, 1, this._image);
      } else {
        t2 = this._color;
        t2.r = t5;
        t2.g = t3.g;
        t2.b = t3.b;
        this.calculateLight$4(this._lights, element.get$centroidWorld(), element.get$normalWorld(), t2);
        t5 = t4.get$r();
        if (typeof t5 !== 'number')
          return this.renderFace4$9$bailout(33, material, t1, t4, t2, t5, 0, 0, 0, 0, 0, 0, 0);
        t7 = t2.r;
        if (typeof t7 !== 'number')
          return this.renderFace4$9$bailout(34, t1, t4, t2, t5, t7, material, 0, 0, 0, 0, 0, 0);
        t2.r = $.max(0, $.min(t5 * t7, 1));
        var t9 = t4.get$g();
        if (typeof t9 !== 'number')
          return this.renderFace4$9$bailout(35, material, t9, t1, t4, t2, 0, 0, 0, 0, 0, 0, 0);
        var t11 = t2.g;
        if (typeof t11 !== 'number')
          return this.renderFace4$9$bailout(36, t9, t1, t11, t4, t2, material, 0, 0, 0, 0, 0, 0);
        t2.g = $.max(0, $.min(t9 * t11, 1));
        t4 = t4.get$b();
        if (typeof t4 !== 'number')
          return this.renderFace4$9$bailout(37, material, t1, t2, t4, 0, 0, 0, 0, 0, 0, 0, 0);
        t14 = t2.b;
        if (typeof t14 !== 'number')
          return this.renderFace4$9$bailout(38, t14, material, t1, t2, t4, 0, 0, 0, 0, 0, 0, 0);
        t2.b = $.max(0, $.min(t4 * t14, 1));
        this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
        if (t1)
          this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
        else
          this.fillPath$1(t2);
      }
    } else {
      this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
      t1 = material.wireframe === true;
      t2 = material.color;
      if (t1)
        this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
      else
        this.fillPath$1(t2);
    }
  else if (typeof material === 'object' && material !== null && !!material.is$MeshNormalMaterial) {
    t1 = this.normalToComponent$1(element.get$normalWorld().get$x());
    t2 = this._color;
    t2.r = t1;
    t2.g = this.normalToComponent$1(element.get$normalWorld().get$y());
    t2.b = this.normalToComponent$1(element.get$normalWorld().get$z());
    this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
    if (material.get$wireframe() === true)
      this.strokePath$4(t2, material.get$wireframeLinewidth(), material.get$wireframeLinecap(), material.get$wireframeLinejoin());
    else
      this.fillPath$1(t2);
  } else if (typeof material === 'object' && material !== null && !!material.is$MeshDepthMaterial) {
    this._near = this._camera.get$near();
    this._far = this._camera.get$far();
    t1 = this.smoothstep$3(v1.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t2 = this._color1;
    t2.b = t1;
    t2.g = t1;
    t2.r = t1;
    t1 = this.smoothstep$3(v2.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t3 = this._color2;
    t3.b = t1;
    t3.g = t1;
    t3.r = t1;
    t1 = this.smoothstep$3(v4.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t4 = this._color3;
    t4.b = t1;
    t4.g = t1;
    t4.r = t1;
    t1 = this.smoothstep$3(v3.get$positionScreen().get$z(), this._near, this._far);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = 1 - t1;
    t5 = this._color4;
    t5.b = t1;
    t5.g = t1;
    t5.r = t1;
    this._image = this.getGradientTexture$4(t2, t3, t4, t5);
    this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y);
    this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y, 0, 0, 1, 0, 0, 1, this._image);
    this.drawTriangle$6(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y);
    this.clipImage$13(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y, 1, 0, 1, 1, 0, 1, this._image);
  }
},
 renderFace4$9$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      var v3 = env2;
      var v4 = env3;
      var v5 = env4;
      var v6 = env5;
      var element = env6;
      var material = env7;
      var scene = env8;
      t2 = env9;
      t3 = env10;
      t1 = env11;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      v3 = env2;
      v4 = env3;
      v5 = env4;
      v6 = env5;
      element = env6;
      material = env7;
      scene = env8;
      t1 = env9;
      t2 = env10;
      break;
    case 3:
      t2 = env0;
      material = env1;
      t1 = env2;
      element = env3;
      break;
    case 4:
      t2 = env0;
      material = env1;
      t1 = env2;
      element = env3;
      break;
    case 5:
      t1 = env0;
      t8 = env1;
      t4 = env2;
      element = env3;
      t3 = env4;
      t2 = env5;
      t5 = env6;
      t6 = env7;
      t7 = env8;
      break;
    case 6:
      t4 = env0;
      element = env1;
      t3 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      t10 = env7;
      t1 = env8;
      break;
    case 7:
      t1 = env0;
      t12 = env1;
      t4 = env2;
      element = env3;
      t2 = env4;
      t5 = env5;
      t6 = env6;
      t7 = env7;
      t3 = env8;
      break;
    case 8:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t1 = env5;
      t14 = env6;
      t3 = env7;
      break;
    case 9:
      t3 = env0;
      t4 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 10:
      t3 = env0;
      t16 = env1;
      t4 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      break;
    case 11:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t18 = env5;
      break;
    case 12:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t18 = env5;
      t20 = env6;
      break;
    case 13:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t22 = env5;
      break;
    case 14:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t22 = env5;
      t24 = env6;
      break;
    case 15:
      t4 = env0;
      t26 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 16:
      t4 = env0;
      t26 = env1;
      t28 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      break;
    case 17:
      t30 = env0;
      t4 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 18:
      t30 = env0;
      t32 = env1;
      t4 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      break;
    case 19:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t34 = env5;
      break;
    case 20:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t34 = env5;
      t36 = env6;
      break;
    case 21:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t38 = env5;
      break;
    case 22:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t38 = env5;
      t40 = env6;
      break;
    case 23:
      t4 = env0;
      t42 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 24:
      t4 = env0;
      t42 = env1;
      t44 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      break;
    case 25:
      t46 = env0;
      t4 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 26:
      t46 = env0;
      t48 = env1;
      t4 = env2;
      t2 = env3;
      t5 = env4;
      t6 = env5;
      t7 = env6;
      break;
    case 27:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t50 = env5;
      break;
    case 28:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t50 = env5;
      t52 = env6;
      break;
    case 29:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t54 = env5;
      break;
    case 30:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t6 = env3;
      t7 = env4;
      t54 = env5;
      t56 = env6;
      break;
    case 31:
      t2 = env0;
      t5 = env1;
      t6 = env2;
      t7 = env3;
      t4 = env4;
      break;
    case 32:
      t4 = env0;
      t59 = env1;
      t2 = env2;
      t5 = env3;
      t6 = env4;
      t7 = env5;
      break;
    case 33:
      material = env0;
      t1 = env1;
      t4 = env2;
      t5 = env3;
      t2 = env4;
      break;
    case 34:
      t1 = env0;
      t4 = env1;
      t5 = env2;
      t2 = env3;
      t7 = env4;
      material = env5;
      break;
    case 35:
      material = env0;
      t9 = env1;
      t1 = env2;
      t4 = env3;
      t5 = env4;
      break;
    case 36:
      t9 = env0;
      t1 = env1;
      t11 = env2;
      t4 = env3;
      t5 = env4;
      material = env5;
      break;
    case 37:
      material = env0;
      t1 = env1;
      t5 = env2;
      t4 = env3;
      break;
    case 38:
      t14 = env0;
      material = env1;
      t1 = env2;
      t5 = env3;
      t4 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._info;
      var t2 = t1.get$render();
      var t3 = t2.get$vertices();
    case 1:
      state = 0;
      t2.set$vertices($.add(t3, 4));
      t1 = t1.get$render();
      t2 = t1.get$faces();
    case 2:
      state = 0;
      t1.set$faces($.add(t2, 1));
      this.setOpacity$1(material.get$opacity());
      this.setBlending$1(material.get$blending());
      if (typeof material === 'object' && material !== null && !!material.is$ITextureMapMaterial) {
        this.renderFace3$9(v1, v2, v4, 0, 1, 3, element, material, scene);
        this.renderFace3$9(v5, v3, v6, 1, 2, 3, element, material, scene);
        return;
      }
      this._v1x = v1.get$positionScreen().get$x();
      this._v1y = v1.get$positionScreen().get$y();
      this._v2x = v2.get$positionScreen().get$x();
      this._v2y = v2.get$positionScreen().get$y();
      this._v3x = v3.get$positionScreen().get$x();
      this._v3y = v3.get$positionScreen().get$y();
      this._v4x = v4.get$positionScreen().get$x();
      this._v4y = v4.get$positionScreen().get$y();
      this._v5x = v5.get$positionScreen().get$x();
      this._v5y = v5.get$positionScreen().get$y();
      this._v6x = v6.get$positionScreen().get$x();
      this._v6y = v6.get$positionScreen().get$y();
    default:
      if (state === 0 && typeof material === 'object' && material !== null && !!material.is$MeshBasicMaterial) {
        this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
        t1 = material.wireframe === true;
        t2 = material.color;
        if (t1)
          this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
        else
          this.fillPath$1(t2);
      } else
        switch (state) {
          case 0:
          default:
            if (state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && typeof material === 'object' && material !== null && !!material.is$MeshLambertMaterial)
              switch (state) {
                case 0:
                default:
                  if (state === 38 || state === 37 || state === 36 || state === 35 || state === 34 || state === 33 || state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 4 || state === 3 || state === 0 && this._enableLighting === true)
                    switch (state) {
                      case 0:
                        t1 = material.wireframe === true;
                      default:
                        if (state === 4 || state === 3 || state === 0 && !t1)
                          switch (state) {
                            case 0:
                              t2 = material.shading;
                            case 3:
                              state = 0;
                            case 4:
                              if (state === 4 || state === 0 && $.eqB(t2, 2))
                                switch (state) {
                                  case 0:
                                    t2 = $.get$length(element.get$vertexNormalsWorld());
                                  case 4:
                                    state = 0;
                                    t2 = $.eqB(t2, 4);
                                }
                              else
                                t2 = false;
                          }
                        else
                          t2 = false;
                        t3 = this._ambientLight;
                        var t4 = material.color;
                      case 5:
                      case 6:
                      case 7:
                      case 8:
                      case 9:
                      case 10:
                      case 11:
                      case 12:
                      case 13:
                      case 14:
                      case 15:
                      case 16:
                      case 17:
                      case 18:
                      case 19:
                      case 20:
                      case 21:
                      case 22:
                      case 23:
                      case 24:
                      case 25:
                      case 26:
                      case 27:
                      case 28:
                      case 29:
                      case 30:
                      case 31:
                      case 32:
                      case 33:
                      case 34:
                      case 35:
                      case 36:
                      case 37:
                      case 38:
                        if (state === 32 || state === 31 || state === 30 || state === 29 || state === 28 || state === 27 || state === 26 || state === 25 || state === 24 || state === 23 || state === 22 || state === 21 || state === 20 || state === 19 || state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 5 || state === 0 && t2)
                          switch (state) {
                            case 0:
                              t1 = t3.get$r();
                              t2 = this._color4;
                              t2.set$r(t1);
                              var t5 = this._color3;
                              t5.set$r(t1);
                              var t6 = this._color2;
                              t6.set$r(t1);
                              var t7 = this._color1;
                              t7.set$r(t1);
                              t1 = t3.get$g();
                              t2.set$g(t1);
                              t5.set$g(t1);
                              t6.set$g(t1);
                              t7.set$g(t1);
                              t3 = t3.get$b();
                              t2.set$b(t3);
                              t5.set$b(t3);
                              t6.set$b(t3);
                              t7.set$b(t3);
                              t3 = this._lights;
                              t1 = element.get$v1().get$positionWorld();
                              var t8 = element.get$vertexNormalsWorld();
                            case 5:
                              state = 0;
                              this.calculateLight$4(t3, t1, $.index(t8, 0), t7);
                              t1 = this._lights;
                              t3 = element.get$v2().get$positionWorld();
                              var t10 = element.get$vertexNormalsWorld();
                            case 6:
                              state = 0;
                              this.calculateLight$4(t1, t3, $.index(t10, 1), t6);
                              t3 = this._lights;
                              t1 = element.get$v4().get$positionWorld();
                              var t12 = element.get$vertexNormalsWorld();
                            case 7:
                              state = 0;
                              this.calculateLight$4(t3, t1, $.index(t12, 3), t5);
                              t1 = this._lights;
                              t3 = element.get$v3().get$positionWorld();
                              var t14 = element.get$vertexNormalsWorld();
                            case 8:
                              state = 0;
                              this.calculateLight$4(t1, t3, $.index(t14, 2), t2);
                              t3 = t4.get$r();
                            case 9:
                              state = 0;
                              var t16 = t7.get$r();
                            case 10:
                              state = 0;
                              t7.set$r($.max(0, $.min($.mul(t3, t16), 1)));
                              var t18 = t4.get$g();
                            case 11:
                              state = 0;
                              var t20 = t7.get$g();
                            case 12:
                              state = 0;
                              t7.set$g($.max(0, $.min($.mul(t18, t20), 1)));
                              var t22 = t4.get$b();
                            case 13:
                              state = 0;
                              var t24 = t7.get$b();
                            case 14:
                              state = 0;
                              t7.set$b($.max(0, $.min($.mul(t22, t24), 1)));
                              var t26 = t4.get$r();
                            case 15:
                              state = 0;
                              var t28 = t6.get$r();
                            case 16:
                              state = 0;
                              t6.set$r($.max(0, $.min($.mul(t26, t28), 1)));
                              var t30 = t4.get$g();
                            case 17:
                              state = 0;
                              var t32 = t6.get$g();
                            case 18:
                              state = 0;
                              t6.set$g($.max(0, $.min($.mul(t30, t32), 1)));
                              var t34 = t4.get$b();
                            case 19:
                              state = 0;
                              var t36 = t6.get$b();
                            case 20:
                              state = 0;
                              t6.set$b($.max(0, $.min($.mul(t34, t36), 1)));
                              var t38 = t4.get$r();
                            case 21:
                              state = 0;
                              var t40 = t5.get$r();
                            case 22:
                              state = 0;
                              t5.set$r($.max(0, $.min($.mul(t38, t40), 1)));
                              var t42 = t4.get$g();
                            case 23:
                              state = 0;
                              var t44 = t5.get$g();
                            case 24:
                              state = 0;
                              t5.set$g($.max(0, $.min($.mul(t42, t44), 1)));
                              var t46 = t4.get$b();
                            case 25:
                              state = 0;
                              var t48 = t5.get$b();
                            case 26:
                              state = 0;
                              t5.set$b($.max(0, $.min($.mul(t46, t48), 1)));
                              var t50 = t4.get$r();
                            case 27:
                              state = 0;
                              var t52 = t2.get$r();
                            case 28:
                              state = 0;
                              t2.set$r($.max(0, $.min($.mul(t50, t52), 1)));
                              var t54 = t4.get$g();
                            case 29:
                              state = 0;
                              var t56 = t2.get$g();
                            case 30:
                              state = 0;
                              t2.set$g($.max(0, $.min($.mul(t54, t56), 1)));
                              t4 = t4.get$b();
                            case 31:
                              state = 0;
                              var t59 = t2.get$b();
                            case 32:
                              state = 0;
                              t2.set$b($.max(0, $.min($.mul(t4, t59), 1)));
                              this._image = this.getGradientTexture$4(t7, t6, t5, t2);
                              this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y);
                              this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y, 0, 0, 1, 0, 0, 1, this._image);
                              this.drawTriangle$6(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y);
                              this.clipImage$13(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y, 1, 0, 1, 1, 0, 1, this._image);
                          }
                        else
                          switch (state) {
                            case 0:
                              t2 = t3.get$r();
                              t5 = this._color;
                              t5.set$r(t2);
                              t5.set$g(t3.get$g());
                              t5.set$b(t3.get$b());
                              this.calculateLight$4(this._lights, element.get$centroidWorld(), element.get$normalWorld(), t5);
                              t2 = t4.get$r();
                            case 33:
                              state = 0;
                              t7 = t5.get$r();
                            case 34:
                              state = 0;
                              t5.set$r($.max(0, $.min($.mul(t2, t7), 1)));
                              var t9 = t4.get$g();
                            case 35:
                              state = 0;
                              var t11 = t5.get$g();
                            case 36:
                              state = 0;
                              t5.set$g($.max(0, $.min($.mul(t9, t11), 1)));
                              t4 = t4.get$b();
                            case 37:
                              state = 0;
                              t14 = t5.get$b();
                            case 38:
                              state = 0;
                              t5.set$b($.max(0, $.min($.mul(t4, t14), 1)));
                              this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
                              if (t1)
                                this.strokePath$4(t5, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
                              else
                                this.fillPath$1(t5);
                          }
                    }
                  else {
                    this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
                    t1 = material.wireframe === true;
                    t2 = material.color;
                    if (t1)
                      this.strokePath$4(t2, material.wireframeLinewidth, material.wireframeLinecap, material.wireframeLinejoin);
                    else
                      this.fillPath$1(t2);
                  }
              }
            else if (typeof material === 'object' && material !== null && !!material.is$MeshNormalMaterial) {
              t1 = this.normalToComponent$1(element.get$normalWorld().get$x());
              t2 = this._color;
              t2.set$r(t1);
              t2.set$g(this.normalToComponent$1(element.get$normalWorld().get$y()));
              t2.set$b(this.normalToComponent$1(element.get$normalWorld().get$z()));
              this.drawQuad$8(this._v1x, this._v1y, this._v2x, this._v2y, this._v3x, this._v3y, this._v4x, this._v4y);
              if (material.get$wireframe() === true)
                this.strokePath$4(t2, material.get$wireframeLinewidth(), material.get$wireframeLinecap(), material.get$wireframeLinejoin());
              else
                this.fillPath$1(t2);
            } else if (typeof material === 'object' && material !== null && !!material.is$MeshDepthMaterial) {
              this._near = this._camera.get$near();
              this._far = this._camera.get$far();
              t1 = this.smoothstep$3(v1.get$positionScreen().get$z(), this._near, this._far);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              t1 = 1 - t1;
              t2 = this._color1;
              t2.set$b(t1);
              t2.set$g(t1);
              t2.set$r(t1);
              t1 = this.smoothstep$3(v2.get$positionScreen().get$z(), this._near, this._far);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              t1 = 1 - t1;
              t3 = this._color2;
              t3.set$b(t1);
              t3.set$g(t1);
              t3.set$r(t1);
              t1 = this.smoothstep$3(v4.get$positionScreen().get$z(), this._near, this._far);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              t1 = 1 - t1;
              t4 = this._color3;
              t4.set$b(t1);
              t4.set$g(t1);
              t4.set$r(t1);
              t1 = this.smoothstep$3(v3.get$positionScreen().get$z(), this._near, this._far);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              t1 = 1 - t1;
              t5 = this._color4;
              t5.set$b(t1);
              t5.set$g(t1);
              t5.set$r(t1);
              this._image = this.getGradientTexture$4(t2, t3, t4, t5);
              this.drawTriangle$6(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y);
              this.clipImage$13(this._v1x, this._v1y, this._v2x, this._v2y, this._v4x, this._v4y, 0, 0, 1, 0, 0, 1, this._image);
              this.drawTriangle$6(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y);
              this.clipImage$13(this._v5x, this._v5y, this._v3x, this._v3y, this._v6x, this._v6y, 1, 0, 1, 1, 0, 1, this._image);
            }
        }
  }
},
 drawTriangle$6: function(x0, y0, x1, y1, x2, y2) {
  var t1 = this._context;
  t1.beginPath$0();
  t1.moveTo$2(x0, y0);
  t1.lineTo$2(x1, y1);
  t1.lineTo$2(x2, y2);
  t1.lineTo$2(x0, y0);
  t1.closePath$0();
},
 drawQuad$8: function(x0, y0, x1, y1, x2, y2, x3, y3) {
  var t1 = this._context;
  t1.beginPath$0();
  t1.moveTo$2(x0, y0);
  t1.lineTo$2(x1, y1);
  t1.lineTo$2(x2, y2);
  t1.lineTo$2(x3, y3);
  t1.lineTo$2(x0, y0);
  t1.closePath$0();
},
 strokePath$4: function(color, linewidth, linecap, linejoin) {
  this.setLineWidth$1(linewidth);
  this.setLineCap$1(linecap);
  this.setLineJoin$1(linejoin);
  this.setStrokeStyle$1(color.getContextStyle$0());
  this._context.stroke$0();
  this._bboxRect.inflate$1($.mul(linewidth, 2));
},
 fillPath$1: function(color) {
  this.setFillStyle$1(color.getContextStyle$0());
  this._context.fill$0();
},
 patternPath$13: function(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, texture) {
  if ($.eqB(texture.get$image().get$width(), 0))
    return;
  if (!$.eqB(texture.get$needsUpdate(), true)) {
    var t1 = this._patterns;
    var t2 = texture.get$id();
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    var t3 = t1[t2] == null;
    t1 = t3;
  } else
    t1 = true;
  if (t1) {
    var repeatX = $.eqB(texture.get$wrapS(), 0);
    var repeatY = $.eqB(texture.get$wrapT(), 0);
    t1 = this._patterns;
    t2 = texture.get$id();
    t3 = this._context;
    var t4 = texture.get$image();
    if (repeatX && repeatY)
      var t5 = 'repeat';
    else if (repeatX && !repeatY)
      t5 = 'repeat-x';
    else
      t5 = !repeatX && repeatY ? 'repeat-y' : 'no-repeat';
    t5 = t3.createPattern$2(t4, t5);
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    t1[t2] = t5;
    texture.set$needsUpdate(false);
  }
  t1 = this._patterns;
  t2 = texture.get$id();
  if (t2 !== (t2 | 0))
    throw $.iae(t2);
  if (t2 < 0 || t2 >= t1.length)
    throw $.ioore(t2);
  this.setFillStyle$1(t1[t2]);
  var offsetX = $.div(texture.get$offset().get$x(), texture.get$repeat().get$x());
  var offsetY = $.div(texture.get$offset().get$y(), texture.get$repeat().get$y());
  var width = $.mul(texture.get$image().get$width(), texture.get$repeat().get$x());
  var height = $.mul(texture.get$image().get$height(), texture.get$repeat().get$y());
  var u00 = $.mul($.add(u0, offsetX), width);
  var v00 = $.mul($.add(v0, offsetY), height);
  var u10 = $.mul($.add(u1, offsetX), width);
  var v10 = $.mul($.add(v1, offsetY), height);
  var u20 = $.mul($.add(u2, offsetX), width);
  var v20 = $.mul($.add(v2, offsetY), height);
  x1 = $.sub(x1, x0);
  y1 = $.sub(y1, y0);
  x2 = $.sub(x2, x0);
  y2 = $.sub(y2, y0);
  u10 = $.sub(u10, u00);
  v10 = $.sub(v10, v00);
  u20 = $.sub(u20, u00);
  v20 = $.sub(v20, v00);
  var det = $.sub($.mul(u10, v20), $.mul(u20, v10));
  if ($.eqB(det, 0)) {
    t1 = this._imagedatas;
    t2 = texture.get$id();
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    if (t1[t2] == null) {
      var canvas = $._ElementFactoryProvider_Element$tag('canvas');
      canvas.set$width(texture.get$image().get$width());
      canvas.set$height(texture.get$image().get$height());
      var context = canvas.getContext$1('2d');
      context.drawImage$3(texture.get$image(), 0, 0);
      t2 = texture.get$id();
      t3 = context.getImageData$4(0, 0, texture.get$image().get$width(), texture.get$image().get$height()).get$data();
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= t1.length)
        throw $.ioore(t2);
      t1[t2] = t3;
    }
    t2 = texture.get$id();
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    var data = t1[t2];
    var index = $.mul($.add($.floor(u00), $.mul($.floor(v00), texture.get$image().get$width())), 4);
    t2 = this._color;
    t2.setRGB$3($.div($.index(data, index), 255), $.div($.index(data, $.add(index, 1)), 255), $.div($.index(data, $.add(index, 2)), 255));
    this.fillPath$1(t2);
    return;
  }
  if (typeof det !== 'number')
    throw $.iae(det);
  var idet = 1 / det;
  var a = $.mul($.sub($.mul(v20, x1), $.mul(v10, x2)), idet);
  var b = $.mul($.sub($.mul(v20, y1), $.mul(v10, y2)), idet);
  var c = $.mul($.sub($.mul(u10, x2), $.mul(u20, x1)), idet);
  var d = $.mul($.sub($.mul(u10, y2), $.mul(u20, y1)), idet);
  var e = $.sub($.sub(x0, $.mul(a, u00)), $.mul(c, v00));
  var f = $.sub($.sub(y0, $.mul(b, u00)), $.mul(d, v00));
  t1 = this._context;
  t1.save$0();
  t1.transform$6(a, b, c, d, e, f);
  t1.fill$0();
  t1.restore$0();
},
 clipImage$13: function(x0, y0, x1, y1, x2, y2, u0, v0, u1, v1, u2, v2, image) {
  var width = $.sub(image.get$width(), 1);
  var height = $.sub(image.get$height(), 1);
  if (typeof width !== 'number')
    throw $.iae(width);
  u0 *= width;
  if (typeof height !== 'number')
    throw $.iae(height);
  v0 *= height;
  u1 *= width;
  v1 *= height;
  u2 *= width;
  v2 *= height;
  x1 = $.sub(x1, x0);
  y1 = $.sub(y1, y0);
  x2 = $.sub(x2, x0);
  y2 = $.sub(y2, y0);
  u1 -= u0;
  v1 -= v0;
  u2 -= u0;
  v2 -= v0;
  var idet = 1 / (u1 * v2 - u2 * v1);
  if (typeof x1 !== 'number')
    throw $.iae(x1);
  var t1 = v2 * x1;
  if (typeof x2 !== 'number')
    throw $.iae(x2);
  var a = (t1 - v1 * x2) * idet;
  if (typeof y1 !== 'number')
    throw $.iae(y1);
  var t2 = v2 * y1;
  if (typeof y2 !== 'number')
    throw $.iae(y2);
  var b = (t2 - v1 * y2) * idet;
  var c = (u1 * x2 - u2 * x1) * idet;
  var d = (u1 * y2 - u2 * y1) * idet;
  var e = $.sub($.sub(x0, a * u0), c * v0);
  var f = $.sub($.sub(y0, b * u0), d * v0);
  var t3 = this._context;
  t3.save$0();
  t3.transform$6(a, b, c, d, e, f);
  t3.clip$0();
  t3.drawImage$3(image, 0, 0);
  t3.restore$0();
},
 getGradientTexture$4: function(color1, color2, color3, color4) {
  var c1r = $.not($.not($.mul(color1.get$r(), 255)));
  var c1g = $.not($.not($.mul(color1.get$g(), 255)));
  var c1b = $.not($.not($.mul(color1.get$b(), 255)));
  var c2r = $.not($.not($.mul(color2.get$r(), 255)));
  var c2g = $.not($.not($.mul(color2.get$g(), 255)));
  var c2b = $.not($.not($.mul(color2.get$b(), 255)));
  var c3r = $.not($.not($.mul(color3.get$r(), 255)));
  var c3g = $.not($.not($.mul(color3.get$g(), 255)));
  var c3b = $.not($.not($.mul(color3.get$b(), 255)));
  var c4r = $.not($.not($.mul(color4.get$r(), 255)));
  var c4g = $.not($.not($.mul(color4.get$g(), 255)));
  var c4b = $.not($.not($.mul(color4.get$b(), 255)));
  var t1 = this._pixelMapData;
  if ($.ltB(c1r, 0))
    var t2 = 0;
  else
    t2 = $.gtB(c1r, 255) ? 255 : c1r;
  $.indexSet(t1, 0, t2);
  if ($.ltB(c1g, 0))
    t2 = 0;
  else
    t2 = $.gtB(c1g, 255) ? 255 : c1g;
  $.indexSet(t1, 1, t2);
  if ($.ltB(c1b, 0))
    t2 = 0;
  else
    t2 = $.gtB(c1b, 255) ? 255 : c1b;
  $.indexSet(t1, 2, t2);
  if ($.ltB(c2r, 0))
    t2 = 0;
  else
    t2 = $.gtB(c2r, 255) ? 255 : c2r;
  $.indexSet(t1, 4, t2);
  if ($.ltB(c2g, 0))
    t2 = 0;
  else
    t2 = $.gtB(c2g, 255) ? 255 : c2g;
  $.indexSet(t1, 5, t2);
  if ($.ltB(c2b, 0))
    t2 = 0;
  else
    t2 = $.gtB(c2b, 255) ? 255 : c2b;
  $.indexSet(t1, 6, t2);
  if ($.ltB(c3r, 0))
    t2 = 0;
  else
    t2 = $.gtB(c3r, 255) ? 255 : c3r;
  $.indexSet(t1, 8, t2);
  if ($.ltB(c3g, 0))
    t2 = 0;
  else
    t2 = $.gtB(c3g, 255) ? 255 : c3g;
  $.indexSet(t1, 9, t2);
  if ($.ltB(c3b, 0))
    t2 = 0;
  else
    t2 = $.gtB(c3b, 255) ? 255 : c3b;
  $.indexSet(t1, 10, t2);
  if ($.ltB(c4r, 0))
    t2 = 0;
  else
    t2 = $.gtB(c4r, 255) ? 255 : c4r;
  $.indexSet(t1, 12, t2);
  if ($.ltB(c4g, 0))
    t2 = 0;
  else
    t2 = $.gtB(c4g, 255) ? 255 : c4g;
  $.indexSet(t1, 13, t2);
  if ($.ltB(c4b, 0))
    t2 = 0;
  else
    t2 = $.gtB(c4b, 255) ? 255 : c4b;
  $.indexSet(t1, 14, t2);
  this._pixelMapContext.putImageData$3(this._pixelMapImage, 0, 0);
  this._gradientMapContext.drawImage$3(this._pixelMap, 0, 0);
  return this._gradientMap;
},
 smoothstep$3: function(value, min, max) {
  var x = $.div($.sub(value, min), $.sub(max, min));
  var t1 = $.mul(x, x);
  if (typeof x !== 'number')
    throw $.iae(x);
  return $.mul(t1, 3 - 2 * x);
},
 normalToComponent$1: function(normal) {
  var component = $.mul($.add(normal, 1), 0.5);
  if ($.ltB(component, 0))
    var t1 = 0;
  else
    t1 = $.gtB(component, 1) ? 1 : component;
  return t1;
},
 expand$2: function(v1, v2) {
  var t1 = v2.get$x();
  if (typeof t1 !== 'number')
    return this.expand$2$bailout(1, v1, v2, t1, 0, 0);
  var t3 = v1.get$x();
  if (typeof t3 !== 'number')
    return this.expand$2$bailout(2, v1, v2, t1, t3, 0);
  var x = t1 - t3;
  t3 = v2.get$y();
  if (typeof t3 !== 'number')
    return this.expand$2$bailout(3, v1, v2, t3, x, 0);
  var t5 = v1.get$y();
  if (typeof t5 !== 'number')
    return this.expand$2$bailout(4, v1, v2, t5, t3, x);
  var y = t3 - t5;
  var det = x * x + y * y;
  if (det === 0)
    return;
  var idet = 1 / $.sqrt(det);
  x *= idet;
  y *= idet;
  t1 = v2.get$x();
  if (typeof t1 !== 'number')
    return this.expand$2$bailout(5, v1, x, v2, y, t1);
  v2.set$x(t1 + x);
  t3 = v2.get$y();
  if (typeof t3 !== 'number')
    return this.expand$2$bailout(6, v1, x, v2, y, t3);
  v2.set$y(t3 + y);
  t5 = v1.get$x();
  if (typeof t5 !== 'number')
    return this.expand$2$bailout(7, v1, x, y, t5, 0);
  v1.set$x(t5 - x);
  var t7 = v1.get$y();
  if (typeof t7 !== 'number')
    return this.expand$2$bailout(8, v1, t7, y, 0, 0);
  v1.set$y(t7 - y);
},
 expand$2$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var v1 = env0;
      var v2 = env1;
      t1 = env2;
      break;
    case 2:
      v1 = env0;
      v2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 3:
      v1 = env0;
      v2 = env1;
      t3 = env2;
      x = env3;
      break;
    case 4:
      v1 = env0;
      v2 = env1;
      t5 = env2;
      t3 = env3;
      x = env4;
      break;
    case 5:
      v1 = env0;
      x = env1;
      v2 = env2;
      y = env3;
      t1 = env4;
      break;
    case 6:
      v1 = env0;
      x = env1;
      v2 = env2;
      y = env3;
      t3 = env4;
      break;
    case 7:
      v1 = env0;
      x = env1;
      y = env2;
      t5 = env3;
      break;
    case 8:
      v1 = env0;
      t7 = env1;
      y = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = v2.get$x();
    case 1:
      state = 0;
      var t3 = v1.get$x();
    case 2:
      state = 0;
      var x = $.sub(t1, t3);
      t3 = v2.get$y();
    case 3:
      state = 0;
      var t5 = v1.get$y();
    case 4:
      state = 0;
      var y = $.sub(t3, t5);
      var det = $.add($.mul(x, x), $.mul(y, y));
      if ($.eqB(det, 0))
        return;
      var idet = 1 / $.sqrt(det);
      x = $.mul(x, idet);
      y = $.mul(y, idet);
      t1 = v2.get$x();
    case 5:
      state = 0;
      v2.set$x($.add(t1, x));
      t3 = v2.get$y();
    case 6:
      state = 0;
      v2.set$y($.add(t3, y));
      t5 = v1.get$x();
    case 7:
      state = 0;
      v1.set$x($.sub(t5, x));
      var t7 = v1.get$y();
    case 8:
      state = 0;
      v1.set$y($.sub(t7, y));
  }
},
 setOpacity$1: function(value) {
  if (!$.eqB(this._contextGlobalAlpha, value)) {
    this._contextGlobalAlpha = value;
    this._context.set$globalAlpha(value);
  }
},
 setBlending$1: function(value) {
  if (!$.eqB(this._contextGlobalCompositeOperation, value)) {
    switch (value) {
      case 1:
        this._context.set$globalCompositeOperation('source-over');
        break;
      case 2:
        this._context.set$globalCompositeOperation('lighter');
        break;
      case 3:
        this._context.set$globalCompositeOperation('darker');
        break;
    }
    this._contextGlobalCompositeOperation = value;
  }
},
 setLineWidth$1: function(value) {
  if (!$.eqB(this._contextLineWidth, value)) {
    this._contextLineWidth = value;
    this._context.set$lineWidth(value);
  }
},
 setLineCap$1: function(value) {
  if (!$.eqB(this._contextLineCap, value)) {
    this._contextLineCap = value;
    this._context.set$lineCap(value);
  }
},
 setLineJoin$1: function(value) {
  if (!$.eqB(this._contextLineJoin, value)) {
    this._contextLineJoin = value;
    this._context.set$lineJoin(value);
  }
},
 setStrokeStyle$1: function(style) {
  if (!$.eqB(this._contextStrokeStyle, style)) {
    this._contextStrokeStyle = style;
    this._context.set$strokeStyle(style);
  }
},
 setFillStyle$1: function(style) {
  if (!$.eqB(this._contextFillStyle, style)) {
    this._contextFillStyle = style;
    var t1 = this._contextFillStyle;
    this._context.set$fillStyle(t1);
  }
},
 CanvasRenderer$1: function(parameters) {
  parameters = !(parameters == null) ? parameters : $.makeLiteralMap([]);
  this._projector = $.Projector$();
  this._canvas = !($.index(parameters, 'canvas') == null) ? $.index(parameters, 'canvas') : $._ElementFactoryProvider_Element$tag('canvas');
  var t1 = this._canvas;
  this._context = t1.getContext$1('2d');
  this.debug = !($.index(parameters, 'debug') == null) && $.index(parameters, 'debug');
  this._clearColor = $.Color$(0);
  this._clearOpacity = 0;
  this._contextGlobalAlpha = 1;
  this._contextGlobalCompositeOperation = 0;
  this._contextStrokeStyle = null;
  this._contextFillStyle = null;
  this._contextLineWidth = null;
  this._contextLineCap = null;
  this._contextLineJoin = null;
  this._v5 = $.RenderableVertex$();
  this._v6 = $.RenderableVertex$();
  this._color = $.Color$(null);
  this._color1 = $.Color$(null);
  this._color2 = $.Color$(null);
  this._color3 = $.Color$(null);
  this._color4 = $.Color$(null);
  this._patterns = [];
  this._imagedatas = [];
  this._clipRect = $.Rectangle$();
  this._clearRect = $.Rectangle$();
  this._bboxRect = $.Rectangle$();
  this._enableLighting = false;
  this._ambientLight = $.Color$(null);
  this._directionalLights = $.Color$(null);
  this._pointLights = $.Color$(null);
  this._vector3 = $.Vector3$(0, 0, 0);
  this._gradientMapQuality = 16;
  this._pixelMap = $._ElementFactoryProvider_Element$tag('canvas');
  var t2 = this._pixelMap;
  t2.set$height(2);
  t2.set$width(2);
  this._pixelMapContext = t2.getContext$1('2d');
  var t3 = this._pixelMapContext;
  t3.set$fillStyle('rgba(0,0,0,1)');
  t3.fillRect$4(0, 0, 2, 2);
  this._pixelMapImage = t3.getImageData$4(0, 0, 2, 2);
  this._pixelMapData = this._pixelMapImage.get$data();
  this._gradientMap = $._ElementFactoryProvider_Element$tag('canvas');
  var t4 = this._gradientMapQuality;
  var t5 = this._gradientMap;
  t5.set$height(t4);
  t5.set$width(t4);
  this._gradientMapContext = t5.getContext$1('2d');
  var t6 = this._gradientMapContext;
  t6.translate$2($.div($.neg(t4), 2), $.div($.neg(t4), 2));
  t6.scale$2(t4, t4);
  this._gradientMapQuality = $.sub(t4, 1);
  this.domElement = t1;
  this._autoClear = true;
  this._sortObjects = true;
  this._sortElements = true;
  this._info = $.CanvasRenderData$();
}
};

$$.CanvasRenderData = {"":
 ["render?"],
 super: "Object",
 render$2: function(arg0, arg1) { return this.render.call$2(arg0, arg1); },
 CanvasRenderData$0: function() {
  this.render = $.RenderInts$();
}
};

$$.RenderInts = {"":
 ["vertices=", "faces="],
 super: "Object",
 reset$0: function() {
  this.vertices = 0;
  this.faces = 0;
},
 RenderInts$0: function() {
  this.reset$0();
}
};

$$.Scene = {"":
 ["fog", "overrideMaterial", "objects=", "lights=", "__objectsAdded", "__objectsRemoved", "_name", "id", "parent", "children", "up", "position", "rotation", "scale", "eulerOrder", "_dynamic", "doubleSided", "flipSided", "rotationAutoUpdate", "renderDepth", "matrix", "matrixWorld", "matrixRotationWorld", "matrixAutoUpdate", "matrixWorldNeedsUpdate", "quaternion", "useQuaternion", "boundRadius", "boundRadiusScale", "visible", "castShadow", "receiveShadow", "frustumCulled", "_vector", "__data"],
 super: "Object3D",
 addObject$1: function(object) {
  if (typeof object === 'object' && object !== null && !!object.is$Light) {
    if ($.indexOf$1(this.lights, object) === -1)
      $.add$1(this.lights, object);
  } else if (!(typeof object === 'object' && object !== null && !!object.is$Camera || typeof object === 'object' && object !== null && !!object.is$Bone))
    if ($.indexOf$1(this.objects, object) === -1) {
      $.add$1(this.objects, object);
      this.__objectsAdded.push(object);
      var t1 = this.__objectsRemoved;
      var i = $.indexOf$1(t1, object);
      if (!(i === -1))
        $.removeRange(t1, i, 1);
    }
  var c = 0;
  while (true) {
    t1 = $.get$length(object.get$children());
    if (typeof t1 !== 'number')
      return this.addObject$1$bailout(1, object, c, t1);
    if (!(c < t1))
      break;
    t1 = object.get$children();
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.addObject$1$bailout(2, object, c, t1);
    if (c < 0 || c >= t1.length)
      throw $.ioore(c);
    this.addObject$1(t1[c]);
    ++c;
  }
},
 addObject$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var object = env0;
      c = env1;
      t1 = env2;
      break;
    case 2:
      object = env0;
      c = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      if (typeof object === 'object' && object !== null && !!object.is$Light) {
        if ($.indexOf$1(this.lights, object) === -1)
          $.add$1(this.lights, object);
      } else if (!(typeof object === 'object' && object !== null && !!object.is$Camera || typeof object === 'object' && object !== null && !!object.is$Bone))
        if ($.indexOf$1(this.objects, object) === -1) {
          $.add$1(this.objects, object);
          this.__objectsAdded.push(object);
          var t1 = this.__objectsRemoved;
          var i = $.indexOf$1(t1, object);
          if (!(i === -1))
            $.removeRange(t1, i, 1);
        }
      var c = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t1 = $.get$length(object.get$children());
            case 1:
              state = 0;
              if (!$.ltB(c, t1))
                break L0;
              t1 = object.get$children();
            case 2:
              state = 0;
              this.addObject$1($.index(t1, c));
              ++c;
          }
  }
},
 removeObject$1: function(object) {
  if (typeof object === 'object' && object !== null && !!object.is$Light) {
    var i = $.indexOf$1(this.lights, object);
    if (!(i === -1))
      $.removeRange(this.lights, i, 1);
  } else if (!(typeof object === 'object' && object !== null && !!object.is$Camera)) {
    i = $.indexOf$1(this.objects, object);
    if (!(i === -1)) {
      $.removeRange(this.objects, i, 1);
      this.__objectsRemoved.push(object);
      var t1 = this.__objectsAdded;
      var ai = $.indexOf$1(t1, object);
      if (!(ai === -1))
        $.removeRange(t1, ai, 1);
    }
  }
  var c = 0;
  while (true) {
    t1 = $.get$length(object.get$children());
    if (typeof t1 !== 'number')
      return this.removeObject$1$bailout(1, object, c, t1);
    if (!(c < t1))
      break;
    t1 = object.get$children();
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.removeObject$1$bailout(2, object, c, t1);
    if (c < 0 || c >= t1.length)
      throw $.ioore(c);
    this.removeObject$1(t1[c]);
    ++c;
  }
},
 removeObject$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var object = env0;
      c = env1;
      t1 = env2;
      break;
    case 2:
      object = env0;
      c = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      if (typeof object === 'object' && object !== null && !!object.is$Light) {
        var i = $.indexOf$1(this.lights, object);
        if (!(i === -1))
          $.removeRange(this.lights, i, 1);
      } else if (!(typeof object === 'object' && object !== null && !!object.is$Camera)) {
        i = $.indexOf$1(this.objects, object);
        if (!(i === -1)) {
          $.removeRange(this.objects, i, 1);
          this.__objectsRemoved.push(object);
          var t1 = this.__objectsAdded;
          var ai = $.indexOf$1(t1, object);
          if (!(ai === -1))
            $.removeRange(t1, ai, 1);
        }
      }
      var c = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t1 = $.get$length(object.get$children());
            case 1:
              state = 0;
              if (!$.ltB(c, t1))
                break L0;
              t1 = object.get$children();
            case 2:
              state = 0;
              this.removeObject$1($.index(t1, c));
              ++c;
          }
  }
},
 Scene$0: function() {
  this.fog = null;
  this.overrideMaterial = null;
  this.matrixAutoUpdate = false;
  this.objects = [];
  this.lights = [];
  this.__objectsAdded = [];
  this.__objectsRemoved = [];
},
 is$Scene: true
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000))
    return $.S(n);
  if ($.geB(absN, 100))
    return sign + '0' + $.S(absN);
  if ($.geB(absN, 10))
    return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.geB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 super: "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 super: "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["findSlot_8", "readSlot_7", "writeSlot_6"],
 super: "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC3);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC4);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_8.call$1(e);
    t1.copy_1 = this.readSlot_7.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_6.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_8.call$1(e);
    var copy = this.readSlot_7.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_6.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_6.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_7.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_6.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, elementCopy, e, length$, i, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_6.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_6.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, i, copy, e, length$, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC10);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      elementCopy = env1;
      e = env2;
      length$ = env3;
      i = env4;
      slot = env5;
      break;
    case 3:
      i = env0;
      copy = env1;
      e = env2;
      length$ = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC3);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC4);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_8.call$1(e);
        t1.copy_1 = this.readSlot_7.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_6.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_8.call$1(e);
            var copy = this.readSlot_7.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_6.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_6.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_7.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_6.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_6.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_6.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC10);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 super: "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_0);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.copies_2, i);
}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 super: "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_3, i, x);
}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["findSlot_6", "readSlot_5", "writeSlot_4"],
 super: "Closure",
 call$1: function(e) {
  if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
    return this.call$1$bailout(1, e, 0, 0);
  if (e instanceof Date)
    throw $.captureStackTrace($.CTC3);
  if (e instanceof RegExp)
    throw $.captureStackTrace($.CTC4);
  if ($._isJavaScriptSimpleObject(e)) {
    var slot = this.findSlot_6.call$1(e);
    var copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    copy = $.makeLiteralMap([]);
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(2, e, slot, copy);
    this.writeSlot_4.call$2(slot, copy);
    for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var t3 = this.call$1(e[t2]);
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= copy.length)
        throw $.ioore(t2);
      copy[t2] = t3;
    }
    return copy;
  }
  if (e instanceof Array) {
    slot = this.findSlot_6.call$1(e);
    copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    this.writeSlot_4.call$2(slot, e);
    var length$ = e.length;
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      e[i] = t1;
    }
    return e;
  }
  return e;
},
 call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      slot = env1;
      copy = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (e instanceof Date)
        throw $.captureStackTrace($.CTC3);
      if (e instanceof RegExp)
        throw $.captureStackTrace($.CTC4);
    case 2:
      if (state === 2 || state === 0 && $._isJavaScriptSimpleObject(e))
        switch (state) {
          case 0:
            var slot = this.findSlot_6.call$1(e);
            var copy = this.readSlot_5.call$1(slot);
            if (!(copy == null))
              return copy;
            copy = $.makeLiteralMap([]);
          case 2:
            state = 0;
            this.writeSlot_4.call$2(slot, copy);
            for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              $.indexSet(copy, t2, this.call$1(e[t2]));
            }
            return copy;
        }
      if (e instanceof Array) {
        slot = this.findSlot_6.call$1(e);
        copy = this.readSlot_5.call$1(slot);
        if (!(copy == null))
          return copy;
        this.writeSlot_4.call$2(slot, e);
        var length$ = $.get$length(e);
        for (var i = 0; $.ltB(i, length$); ++i)
          $.indexSet(e, i, this.call$1($.index(e, i)));
        return e;
      }
      return e;
  }
}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 super: "Closure",
 call$1: function(object) {
  if (object instanceof Date)
    return true;
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, object);
    for (var i = 0; t1 = object.length, i < t1; ++i) {
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      if (this.call$1(object[i]) === true)
        return true;
    }
  }
  return false;
  var t1;
},
 call$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      if (object instanceof Date)
        return true;
    case 1:
      if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, $.get$length(object)); ++i)
              if (this.call$1($.index(object, i)) === true)
                return true;
        }
      return false;
  }
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  $._TimerFactory__factory = $._timerFactory;
  return;
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_5.get$isComplete() !== true)
    this.completer_3.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_8.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = {};
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_4.get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_10, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._convertNativeToDart_AcceptStructuredClone = function(object) {
  var values = [];
  var copies = [];
  return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies, values), new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies), new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies)).call$1(object);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._isJavaScriptSimpleObject = function(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation($.Primitives_dateNow(), false);
  t1.DateImplementation$now$0();
  return t1;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.CanvasRenderData$ = function() {
  var t1 = new $.CanvasRenderData(null);
  t1.CanvasRenderData$0();
  return t1;
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return a;
      if (a < b)
        return b;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return a + b;
        if ($.isNaN(b) === true)
          return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true)
        return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.removeRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = receiver.length;
  if (start < 0 || start >= receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.Color$ = function(hex) {
  var t1 = new $.Color(null, null, null);
  t1.Color$1(hex);
  return t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$.sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, left, right, compare, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  if (typeof sixth !== 'number')
    throw $.iae(sixth);
  var index1 = left + sixth;
  var index5 = $.sub(right, sixth);
  if (typeof right !== 'number')
    throw $.iae(right);
  var index3 = $.tdiv(left + right, 2);
  var index2 = index3 - sixth;
  var index4 = index3 + sixth;
  if (index1 !== (index1 | 0))
    throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1)
    throw $.ioore(index1);
  var el1 = a[index1];
  if (index2 !== (index2 | 0))
    throw $.iae(index2);
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  var el2 = a[index2];
  if (index3 !== (index3 | 0))
    throw $.iae(index3);
  if (index3 < 0 || index3 >= t1)
    throw $.ioore(index3);
  var el3 = a[index3];
  if (index4 !== (index4 | 0))
    throw $.iae(index4);
  if (index4 < 0 || index4 >= t1)
    throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0))
    throw $.iae(index5);
  if (index5 < 0 || index5 >= t1)
    throw $.ioore(index5);
  var el5 = a[index5];
  if ($.gtB(compare.call$2(el1, el2), 0)) {
    var t0 = el1;
    el1 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el1, el3), 0)) {
    t0 = el3;
    el3 = el1;
    el1 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el2, el5), 0)) {
    t0 = el2;
    el2 = el5;
    el5 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if (index1 < 0 || index1 >= a.length)
    throw $.ioore(index1);
  a[index1] = el1;
  if (index3 < 0 || index3 >= a.length)
    throw $.ioore(index3);
  a[index3] = el3;
  if (index5 < 0 || index5 >= a.length)
    throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0))
    throw $.iae(left);
  t1 = a.length;
  if (left < 0 || left >= t1)
    throw $.ioore(left);
  var t2 = a[left];
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  a[index2] = t2;
  if (right !== (right | 0))
    throw $.iae(right);
  t2 = a.length;
  if (right < 0 || right >= t2)
    throw $.ioore(right);
  var t3 = a[right];
  if (index4 < 0 || index4 >= t2)
    throw $.ioore(index4);
  a[index4] = t3;
  var less = left + 1;
  var great = right - 1;
  var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
  if (pivots_are_equal)
    for (var k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      var ak = a[k];
      var comp = compare.call$2(ak, el2);
      if (typeof comp !== 'number')
        return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, a, less, k, compare, left, great, index1, index5, el2, pivots_are_equal, right, ak, comp, el4);
      if (comp === 0)
        continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else
        for (var less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          comp = compare.call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            var great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              break;
            }
          }
        }
    }
  else
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.ltB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.gtB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.gtB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
  t1 = less - 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t2 = a.length;
  if (t1 < 0 || t1 >= t2)
    throw $.ioore(t1);
  t3 = a[t1];
  if (left < 0 || left >= t2)
    throw $.ioore(left);
  a[left] = t3;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t3 = a.length;
  if (t1 < 0 || t1 >= t3)
    throw $.ioore(t1);
  var t4 = a[t1];
  if (right < 0 || right >= t3)
    throw $.ioore(right);
  a[right] = t4;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal)
    return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less !== (less | 0))
        throw $.iae(less);
      if (less < 0 || less >= a.length)
        throw $.ioore(less);
      if (!$.eqB(compare.call$2(a[less], el2), 0))
        break;
      ++less;
    }
    while (true) {
      if (great !== (great | 0))
        throw $.iae(great);
      if (great < 0 || great >= a.length)
        throw $.ioore(great);
      if (!$.eqB(compare.call$2(a[great], el4), 0))
        break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.eqB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.eqB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.eqB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else
    $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.RenderableObject$ = function() {
  return new $.RenderableObject(null, null);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if (startIndex < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(_start, str, pattern);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.Rectangle$ = function() {
  return new $.Rectangle(null, null, null, null, null, null, true);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.Frustum$ = function() {
  var t1 = new $.Frustum(null);
  t1.Frustum$0();
  return t1;
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  if (new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey) === true)
    throw $.captureStackTrace($.CTC15);
  return nativeKey;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.Vector3$ = function(x, y, z) {
  var t1 = new $.Vector3(null, null, null);
  t1.Vector3$3(x, y, z);
  return t1;
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._convertDartToNative_ImageData = function(imageData) {
  if (typeof imageData === 'object' && imageData !== null && imageData.is$_ImageDataImpl())
    return imageData;
  return {data: imageData.get$data(), height: imageData.get$height(), width: imageData.get$width()};
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$._TypedImageData$ = function(data, height, width) {
  return new $._TypedImageData(data, height, width);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  return name$;
};

$.DirectionalLight$ = function(hex, intensity, distance) {
  var t1 = new $.DirectionalLight(null, null, intensity, distance, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Light$1(hex);
  t1.DirectionalLight$3(hex, intensity, distance);
  return t1;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Primitives_getDay = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCDate() : $.Primitives_lazyAsJsDate(receiver).getDate();
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.RenderableLine$ = function() {
  var t1 = new $.RenderableLine(null, null, null, null);
  t1.RenderableLine$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListImplementation_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.Geometry$ = function() {
  var t1 = new $.Geometry(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.Geometry$0();
  return t1;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.RenderableFace3$ = function() {
  var t1 = new $.RenderableFace3(null, null, null, null, null, null, null, null, null, null, null);
  t1.RenderableFace3$0();
  return t1;
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMinutes() : $.Primitives_lazyAsJsDate(receiver).getMinutes();
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.Primitives_getMonth = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMonth() + 1 : $.Primitives_lazyAsJsDate(receiver).getMonth() + 1;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.atan2 = function(a, b) {
  return Math.atan2($.checkNum(a), $.checkNum(b));
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(false, null);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
return window;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.Mesh$ = function(geometry, material) {
  var t1 = new $.Mesh(geometry, material, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Mesh$2(geometry, material);
  return t1;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.Matrix4$createMatrices = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  var t1 = new $.Matrix4(null, null, n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  t1.Matrix4$createMatrices$16(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  return t1;
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(_list, 0);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0))
    receiver.date = new Date(receiver.millisecondsSinceEpoch);
  return receiver.date;
};

$.Face4$ = function(a, b, c, d, normal, color, materialIndex) {
  var t1 = new $.Face4(null, null, null, null, null, null, null, null, null, null, null);
  t1.Face4$7(a, b, c, d, normal, color, materialIndex);
  return t1;
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(isolate, fn, message);
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b))
    if ($.ltB(a, b))
      return -1;
    else if ($.gtB(a, b))
      return 1;
    else if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b)))
          return 0;
        if (aIsNegative === true)
          return -1;
        return 1;
      }
      return 0;
    } else if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true)
        return 0;
      return 1;
    } else
      return -1;
  else if (typeof a === 'string') {
    if (!(typeof b === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b)
      var t1 = 0;
    else
      t1 = a < b ? -1 : 1;
    return t1;
  } else
    return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$.Vector4$ = function(x, y, z, w) {
  var t1 = new $.Vector4(null, null, null, null);
  t1.Vector4$4(x, y, z, w);
  return t1;
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.Object3D$ = function() {
  var t1 = new $.Object3D(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  return t1;
};

$.Matrix3$ = function() {
  var t1 = new $.Matrix3(null);
  t1.Matrix3$0();
  return t1;
};

$.RenderableVertex$ = function() {
  var t1 = new $.RenderableVertex(null, null, true);
  t1.RenderableVertex$0();
  return t1;
};

$.CubeGeometry$ = function(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides) {
  var t1 = new $.CubeGeometry(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.Geometry$0();
  t1.CubeGeometry$8(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides);
  return t1;
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.get$dynamic = function(receiver) {
  return receiver;
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.RenderableFace4$ = function() {
  var t1 = new $.RenderableFace4(null, null, null, null, null, null, null, null, null, null, null, null);
  t1.RenderableFace4$0();
  return t1;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.RenderInts$ = function() {
  var t1 = new $.RenderInts(null, null);
  t1.RenderInts$0();
  return t1;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.Primitives_getYear = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCFullYear() : $.Primitives_lazyAsJsDate(receiver).getFullYear();
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Scene$ = function() {
  var t1 = new $.Scene(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Scene$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._Manager$ = function() {
  var t1 = new $._Manager(0, 0, 1, null, null, null, null, null, null, null, null, null);
  t1._Manager$0();
  return t1;
};

$.ListImplementation_List$from = function(other) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$._TypedArrayFactoryProvider__F32 = function(arg) {
return new Float32Array(arg);
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.Canvas_Camera_Orthographic$().run$0();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_workerId, _receivePortId, isolateId);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(true, null);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$.FutureImpl$ = function() {
  return new $.FutureImpl(false, null, null, null, false, [], [], []);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.CanvasRenderer$ = function(parameters) {
  var t1 = new $.CanvasRenderer(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 6.283185307179586, null, null, null, null, null, null, null, null, null);
  t1.CanvasRenderer$1(parameters);
  return t1;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.isInfinite = function(receiver) {
  return receiver == Infinity || receiver == -Infinity;
};

$._TypedArrayFactoryProvider_Float32Array$fromList = function(list) {
  return $._TypedArrayFactoryProvider__F32(list);
};

$.BoundingSphere$ = function(radius) {
  return new $.BoundingSphere(radius);
};

$.CubeGeomSides$ = function(px, nx, py, ny, pz, nz) {
  return new $.CubeGeomSides(px, nx, py, ny, pz, nz);
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.round$0();
  if (receiver < 0)
    return -Math.round(-receiver);
  else
    return Math.round(receiver);
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListImplementation_List(null);
  $.setRuntimeTypeInfo(result, {E: 'Match'});
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element, element.get$$$dom_children());
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t1, t2, t3).call$1(value);
  t4.call$0();
  return copy;
};

$.Vertex$ = function(position) {
  var t1 = new $.Vertex(position, null, null, null);
  t1.Vector3$3(0, 0, 0);
  t1.Vertex$1(position);
  return t1;
};

$.AmbientLight$ = function(hex) {
  var t1 = new $.AmbientLight(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Light$1(hex);
  return t1;
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds() : $.Primitives_lazyAsJsDate(receiver).getMilliseconds();
};

$.endsWith = function(receiver, other) {
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(0, list);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0))
        throw $.iae(i);
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t1 = src[i];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t1;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t2 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t2;
    }
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.Projector$ = function() {
  var t1 = new $.Projector(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.Projector$0();
  return t1;
};

$.asin = function(value) {
  return Math.asin($.checkNum(value));
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node, node.get$nodes());
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), array, 0);
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.Random_Random = function(seed) {
  return $.CTC21;
};

$.Vector2$ = function(x, y) {
  var t1 = new $.Vector2(null, null);
  t1.Vector2$2(x, y);
  return t1;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_ptr, _type);
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.Primitives_getSeconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCSeconds() : $.Primitives_lazyAsJsDate(receiver).getSeconds();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof right !== 'number')
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  for (var i = left + 1; i <= right; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    var el = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        var t1 = j - 1;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= a.length)
          throw $.ioore(t1);
        var t2 = $.gtB(compare.call$2(a[t1], el), 0);
        t1 = t2;
      } else
        t1 = false;
      if (!t1)
        break;
      var j0 = j - 1;
      if (j0 !== (j0 | 0))
        throw $.iae(j0);
      t1 = a.length;
      if (j0 < 0 || j0 >= t1)
        throw $.ioore(j0);
      t2 = a[j0];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      a[j] = t2;
      j = j0;
    }
    if (j !== (j | 0))
      throw $.iae(j);
    if (j < 0 || j >= a.length)
      throw $.ioore(j);
    a[j] = el;
  }
};

$._TypedArrayFactoryProvider_Float32Array = function(length$) {
  return $._TypedArrayFactoryProvider__F32(length$);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCHours() : $.Primitives_lazyAsJsDate(receiver).getHours();
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$._globalState = function() {
return $globalState;
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(t1, null);
  t1._ReceivePortImpl$0();
  return t1;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.LineBasicMaterial$ = function(parameters) {
  var t1 = new $.LineBasicMaterial(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.Material$1(parameters);
  t1.LineBasicMaterial$1(parameters);
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.Quaternion$ = function(x, y, z, w) {
  return new $.Quaternion(x, y, z, w);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$._HttpRequestEventsImpl$ = function(_ptr) {
  return new $._HttpRequestEventsImpl(_ptr);
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.Matrix4$ = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
  var t1 = new $.Matrix4(null, null, n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  t1.Matrix4$16(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  return t1;
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._convertNativeToDart_ImageData = function(nativeImageData) {
  if (typeof nativeImageData === 'object' && nativeImageData !== null && nativeImageData.is$ImageData())
    return nativeImageData;
  return $._TypedImageData$(nativeImageData.data, nativeImageData.height, nativeImageData.width);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.OrthographicCamera$ = function(left, right, top$, bottom, near, far) {
  var t1 = new $.OrthographicCamera(left, right, top$, bottom, null, null, null, near, far, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Camera$2(near, far);
  t1.OrthographicCamera$6(left, right, top$, bottom, near, far);
  return t1;
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.toInt$0();
  if ($.isNaN(receiver) === true)
    throw $.captureStackTrace($.FormatException$('NaN'));
  if ($.isInfinite(receiver) === true)
    throw $.captureStackTrace($.FormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return truncated == -0.0 ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: '_IsolateEvent'});
  return new $._EventLoop(t1);
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$.Canvas_Camera_Orthographic$ = function() {
  return new $.Canvas_Camera_Orthographic(null, null, null, null, null, null);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(key, value);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC24)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.print = function(obj) {
  $.Primitives_printString(obj);
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(millisecondsSinceEpoch, isUtc);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.RenderableParticle$ = function() {
  var t1 = new $.RenderableParticle(null, null, null, null, null, null);
  t1.RenderableParticle$0();
  return t1;
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.MeshLambertMaterial$ = function(parameters) {
  var t1 = new $.MeshLambertMaterial(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  t1.Material$1(parameters);
  t1.MeshLambertMaterial$1(parameters);
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return b;
      if (a < b)
        return a;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return (a + b) * a * b;
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
          return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b);
};

$.startsWith = function(receiver, other) {
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.Matrix4_makeOrtho = function(left, right, top$, bottom, near, far) {
  var m = $.Matrix4$(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  var w = $.sub(right, left);
  var h = $.sub(top$, bottom);
  var p = $.sub(far, near);
  var x = $.div($.add(right, left), w);
  var y = $.div($.add(top$, bottom), h);
  var z = $.div($.add(far, near), p);
  if (typeof w !== 'number')
    throw $.iae(w);
  m.n11 = 2 / w;
  m.n12 = 0;
  m.n13 = 0;
  m.n14 = $.neg(x);
  m.n21 = 0;
  if (typeof h !== 'number')
    throw $.iae(h);
  m.n22 = 2 / h;
  m.n23 = 0;
  m.n24 = $.neg(y);
  m.n31 = 0;
  m.n32 = 0;
  if (typeof p !== 'number')
    throw $.iae(p);
  m.n33 = -2 / p;
  m.n34 = $.neg(z);
  m.n41 = 0;
  m.n42 = 0;
  m.n43 = 0;
  m.n44 = 1;
  return m;
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.ProjectorRenderData$ = function() {
  var t1 = new $.ProjectorRenderData(null, null, null, null);
  t1.ProjectorRenderData$0();
  return t1;
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32))
    $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else
    $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.sin = function(value) {
  return Math.sin($.checkNum(value));
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.ListImplementation_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.sort = function(receiver, compare) {
  if (!$.isJsArray(receiver))
    return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver))
    return $.Arrays_indexOf(receiver, element, 0, receiver.length);
  else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$.not = function(a) {
  if (typeof a === "number")
    return (~a) >>> 0;
  return a.operator$not$0();
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.Line$ = function(geometry, material, ltype) {
  var t1 = new $.Line(null, null, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, false, null, null, null, null, false, false, false, false, null, null);
  t1.Object3D$0();
  t1.Line$3(geometry, material, ltype);
  return t1;
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.UV$ = function(u, v) {
  var t1 = new $.UV(null, null);
  t1.UV$2(u, v);
  return t1;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
return document;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else if ($.contains$1(message, ' is not a function') === true || $.contains$1(message, 'doesn\'t support property or method') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$._HttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._HttpRequestUploadEventsImpl(_ptr);
};

$.cos = function(value) {
  return Math.cos($.checkNum(value));
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      var left = env1;
      var right = env2;
      var compare = env3;
      break;
    case 2:
      a = env0;
      less = env1;
      k = env2;
      compare = env3;
      left = env4;
      great = env5;
      index1 = env6;
      index5 = env7;
      el2 = env8;
      pivots_are_equal = env9;
      right = env10;
      ak = env11;
      comp = env12;
      el4 = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      if (typeof sixth !== 'number')
        throw $.iae(sixth);
      var index1 = left + sixth;
      var index5 = $.sub(right, sixth);
      if (typeof right !== 'number')
        throw $.iae(right);
      var index3 = $.tdiv(left + right, 2);
      var index2 = index3 - sixth;
      var index4 = index3 + sixth;
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el2, el5), 0)) {
        t0 = el2;
        el2 = el5;
        el5 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = left + 1;
      var great = right - 1;
      var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
    case 2:
      if (state === 2 || state === 0 && pivots_are_equal)
        switch (state) {
          case 0:
            var k = less;
          case 2:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(k <= great))
                      break L0;
                  case 2:
                    c$0: {
                      switch (state) {
                        case 0:
                          var ak = $.index(a, k);
                          var comp = compare.call$2(ak, el2);
                        case 2:
                          state = 0;
                          if ($.eqB(comp, 0))
                            break c$0;
                          if ($.ltB(comp, 0)) {
                            if (!(k === less)) {
                              $.indexSet(a, k, $.index(a, less));
                              $.indexSet(a, less, ak);
                            }
                            ++less;
                          } else
                            for (var less0 = less + 1; true;) {
                              comp = compare.call$2($.index(a, great), el2);
                              if ($.gtB(comp, 0)) {
                                --great;
                                continue;
                              } else if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                      }
                    }
                    ++k;
                }
        }
      else
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.ltB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.gtB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.gtB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
      var t1 = less - 1;
      $.indexSet(a, left, $.index(a, t1));
      $.indexSet(a, t1, el2);
      $.indexSet(a, right, $.index(a, great + 1));
      $.indexSet(a, great + 1, el4);
      $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
      $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
      if (pivots_are_equal)
        return;
      if (less < index1 && $.gtB(great, index5)) {
        for (; $.eqB(compare.call$2($.index(a, less), el2), 0);)
          ++less;
        for (; $.eqB(compare.call$2($.index(a, great), el4), 0);)
          --great;
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.eqB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.eqB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.eqB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else
        $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListImplementation_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j)
      $.indexSet(dst, j, $.index(src, i));
  else
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, a, left, right, compare) {
  for (var i = left + 1; $.leB(i, right); ++i) {
    var el = $.index(a, i);
    var j = i;
    while (true) {
      if (!(j > left && $.gtB(compare.call$2($.index(a, j - 1), el), 0)))
        break;
      var j0 = j - 1;
      $.indexSet(a, j, $.index(a, j0));
      j = j0;
    }
    $.indexSet(a, j, el);
  }
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    accumulator.push($.index(a, i));
  return accumulator;
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC14 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('TODO(jacobr): should we impl?');
$.CTC24 = new Isolate.$isolateProperties.Object();
$.CTC17 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC20 = new Isolate.$isolateProperties.ExceptionImplementation('Incorrect number or type of arguments');
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC15 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC12 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC21 = new Isolate.$isolateProperties._Random();
$.CTC22 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeRange on immutable List.');
$.CTC18 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot sort immutable List.');
$.CTC2 = new Isolate.$isolateProperties._Default();
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.CTC11 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC13 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC1 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC16 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC23 = new Isolate.$isolateProperties.NotImplementedException(null);
$.Matrix4___m2 = null;
$._getTypeNameOf = null;
$.Matrix4___v1 = null;
$.Frustum___v1 = null;
$._cachedBrowserPrefix = null;
$._TimerFactory__factory = null;
$.Three_Object3DCount = 0;
$.Matrix4___m1 = null;
$._ReceivePortImpl__nextFreeId = 1;
$.Matrix4___v2 = null;
$.Matrix4___v3 = null;
$.Three_GeometryCount = 0;
$.Three_MaterialCount = 0;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$FileList: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$Element: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$Collection: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$ImageData: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$List: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$Map: function() { return false; },
 is$File: function() { return false; },
 is$Blob: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLAnchorElement', ["name?"], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLAppletElement', ["height=", "name?", "object=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["name?", "value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["name?", "value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('BarInfo', ["visible?"], {
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', ["color?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Blob', [], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["b="], {
 scale$3: function(scaleX, scaleY, scaleZ) {
  return this.scale(scaleX,scaleY,scaleZ);
},
 get$scale: function() { return new $.BoundClosure1(this, 'scale$3'); },
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 set$bottom: function(value) {
  this.setProperty$3('bottom', value, '');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$clip: function() {
  return this.getPropertyValue$1('clip');
},
 clip$0: function() { return this.get$clip().call$0(); },
 get$color: function() {
  return this.getPropertyValue$1('color');
},
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 set$left: function(value) {
  this.setProperty$3('left', value, '');
},
 get$opacity: function() {
  return this.getPropertyValue$1('opacity');
},
 get$position: function() {
  return this.getPropertyValue$1('position');
},
 set$position: function(value) {
  this.setProperty$3('position', value, '');
},
 get$resize: function() {
  return this.getPropertyValue$1('resize');
},
 set$right: function(value) {
  this.setProperty$3('right', value, '');
},
 set$textAlign: function(value) {
  this.setProperty$3('text-align', value, '');
},
 set$top: function(value) {
  this.setProperty$3('top', value, '');
},
 get$transform: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transform');
},
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.get$transform().call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$3('width', value, '');
}
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLCanvasElement', ["height=", "width="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!", "globalAlpha!", "globalCompositeOperation!", "lineCap!", "lineJoin!", "lineWidth!", "strokeStyle!", "textAlign!"], {
 beginPath$0: function() {
  return this.beginPath();
},
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
},
 clip$0: function() {
  return this.clip();
},
 closePath$0: function() {
  return this.closePath();
},
 createPattern$2: function(canvas_OR_image, repetitionType) {
  return this.createPattern(canvas_OR_image,repetitionType);
},
 drawImage$9: function(canvas_OR_image_OR_video, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y,sw_OR_width,height_OR_sh,dx,dy,dw,dh);
},
 drawImage$3: function(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y) {
  return this.drawImage(canvas_OR_image_OR_video,sx_OR_x,sy_OR_y);
},
 fill$0: function() {
  return this.fill();
},
 fillRect$4: function(x, y, width, height) {
  return this.fillRect(x,y,width,height);
},
 getImageData$4: function(sx, sy, sw, sh) {
  return $._convertNativeToDart_ImageData(this._getImageData_1$4(sx, sy, sw, sh));
},
 _getImageData_1$4: function(sx, sy, sw, sh) {
  return this.getImageData(sx,sy,sw,sh);
},
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
},
 putImageData$7: function(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  if ($.eqB($.CTC2, dirtyX) && $.eqB($.CTC2, dirtyY) && $.eqB($.CTC2, dirtyWidth) && $.eqB($.CTC2, dirtyHeight)) {
    this._putImageData_1$3($._convertDartToNative_ImageData(imagedata), dx, dy);
    return;
  }
  if (typeof dirtyX === 'number' || dirtyX == null)
    if (typeof dirtyY === 'number' || dirtyY == null)
      if (typeof dirtyWidth === 'number' || dirtyWidth == null)
        var t1 = typeof dirtyHeight === 'number' || dirtyHeight == null;
      else
        t1 = false;
    else
      t1 = false;
  else
    t1 = false;
  if (t1) {
    this._putImageData_2$7($._convertDartToNative_ImageData(imagedata), dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    return;
  }
  throw $.captureStackTrace($.CTC20);
},
 putImageData$3: function(imagedata,dx,dy) {
  return this.putImageData$7(imagedata,dx,dy,Isolate.$isolateProperties.CTC2,Isolate.$isolateProperties.CTC2,Isolate.$isolateProperties.CTC2,Isolate.$isolateProperties.CTC2)
},
 _putImageData_1$3: function(imagedata, dx, dy) {
  return this.putImageData(imagedata,dx,dy);
},
 _putImageData_2$7: function(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  return this.putImageData(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
},
 restore$0: function() {
  return this.restore();
},
 rotate$1: function(angle) {
  return this.rotate(angle);
},
 save$0: function() {
  return this.save();
},
 scale$2: function(sx, sy) {
  return this.scale(sx,sy);
},
 get$scale: function() { return new $.BoundClosure2(this, 'scale$2'); },
 setTransform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.setTransform(m11,m12,m21,m22,dx,dy);
},
 stroke$0: function() {
  return this.stroke();
},
 strokeRect$5: function(x, y, width, height, lineWidth) {
  return this.strokeRect(x,y,width,height,lineWidth);
},
 strokeRect$4: function(x,y,width,height) {
  return this.strokeRect(x,y,width,height);
},
 transform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.transform(m11,m12,m21,m22,dx,dy);
},
 translate$2: function(tx, ty) {
  return this.translate(tx,ty);
}
});

$.$defineNativeClass('CharacterData', ["data?", "length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('ClientRect', ["height?", "width?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('CompositionEvent', ["data?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.call$0(); }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('DOMPlugin', ["length?", "name?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('DOMSelection', [], {
 empty$0: function() {
  return this.empty();
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$elements: function() {
  if (this._lib_elements == null)
    this._lib_elements = $.FilteredElementList$(this);
  return this._lib_elements;
},
 set$elements: function(value) {
  var copy = $.ListImplementation_List$from(value);
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, copy);
},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListImplementation_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 get$translate: function() {
  return false;
},
 translate$2: function(arg0, arg1) { return this.get$translate().call$2(arg0, arg1); },
 get$id: function() {
  return '';
},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$parent: function() {
  return;
},
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["id?", "innerHTML!", "style?"], {
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 get$$$dom_children: function() {
return this.children;
},
 translate$2: function(arg0, arg1) { return this.translate.call$2(arg0, arg1); },
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
},
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
},
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('EntrySync', ["name?"], {
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
},
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', [], {
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["elements?", "name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriter', ["length?", "position?"], {
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
},
 length$0: function() { return this.length.call$0(); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriterSync', ["length?", "position?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('Float32Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["color?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?", "name?"], {
 length$0: function() { return this.length.call$0(); },
 reset$0: function() {
  return this.reset();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["height?", "name?", "width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLHRElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 length$0: function() { return this.get$length().call$0(); },
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 get$on: function() {
  return $._HttpRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function() {
  return $._HttpRequestUploadEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
}
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function() {
  return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());
},
 get$_lib_value: function() {
return this.value;
}
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 add$2: function(value, key) {
  if (!$.eqB($.CTC2, key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC2)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBRequest', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('IDBTransaction', [], {
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["data?", "height?", "width?"], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["height=", "name?", "width=", "x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["height=", "name?", "value=", "width="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLKeygenElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', [], {
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('MediaStreamTrack', [], {
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
},
 length$0: function() { return this.length.call$0(); },
 add$1: function(track) {
  return this.add(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["data?", "ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["x?", "y?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 set$text: function(value) {
this.textContent = value;
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function() {
  return $._NotificationEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["data?", "height=", "name?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebKitPoint', ["x=", "y="], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["data?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["position?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('SVGAElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', ["r?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["offset?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 get$id: function() {
return this.id;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('SVGEllipseElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["scale?", "height?", "width?", "x?", "y?"], {
 scale$1: function(arg0) { return this.scale.call$1(arg0); },
 scale$2: function(arg0, arg1) { return this.scale.call$2(arg0, arg1); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?", "z?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?", "z?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["x=", "y="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMatrix', ["b="], {
 rotate$1: function(angle) {
  return this.rotate(angle);
},
 scale$1: function(scaleFactor) {
  return this.scale(scaleFactor);
},
 get$scale: function() { return new $.BoundClosure0(this, 'scale$1'); },
 translate$2: function(x, y) {
  return this.translate(x,y);
}
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPatternElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["x=", "y="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', ["r?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["height=", "width=", "x=", "y="], {
});

$.$defineNativeClass('SVGRectElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', ["offset?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
 rotate$1: function(arg0) { return this.rotate.call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', ["height?", "width?", "x?", "y?"], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewSpec', [], {
 transform$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.transform.call$6(arg0, arg1, arg2, arg3, arg4, arg5); }
});

$.$defineNativeClass('Screen', ["height?", "width?"], {
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ScriptProfileNode', ["visible?"], {
 children$0: function() {
  return this.children();
},
 get$children: function() { return new $.BoundClosure(this, 'children$0'); }
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "name?", "value="], {
 length$0: function() { return this.length.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 length$0: function() { return this.get$length().call$0(); },
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["name?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextEvent', ["data?"], {
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCue', ["id?", "position=", "text!"], {
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
},
 length$0: function() { return this.length.call$0(); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 length$0: function() { return this.length.call$0(); }
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 length$0: function() { return this.length.call$0(); },
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC18);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC22);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
}
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', [], {
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMWindow', ["innerHeight?", "innerWidth?", "length?", "name?", "navigator?", "parent?"], {
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
},
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
},
 _ensureRequestAnimationFrame$0: function() {
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }

},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 length$0: function() { return this.length.call$0(); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 get$id: function() {
return this.id;
},
 postMessage$1: function(msg) {
return this.postMessage(msg);
}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 341 dynamic classes.
// 358 classes
// 30 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['MouseEvent', 'MouseEvent|WheelEvent|WheelEvent'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
