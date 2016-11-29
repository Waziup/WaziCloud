'use strict'


export var SensorsService = {
  findAll: function(Store) {
    return Store.get('Sensors');
  },
  save: function(Store,sensors) {
    Store.set('Sensors', sensors);
  },
  update: function(Store, sensors) {
    Store.merge(' Sensors', sensors);
  }
};

export var ProductService = {
  findAll: function(Store) {
    return Store.get('Products');
  },
  save: function(Store,billers) {
    Store.set('Products', products);
  },
  update: function(Store, products) {
    Store.merge('Products', biller);
  }
};

export var BillerService = {
  findAll: function(Store) {
    return Store.get('Billers');
  },
  save: function(Store,billers) {
    Store.set('Billers', billers);
  },
  update: function(Store,billers) {
    Store.merge('Billers', billers);
  }
};
export var BillerTypeService = {
  findAll: function(Store) {
    return Store.get('BillerType');
  },
  save: function(Store,billerType) {
    Store.set('BillerType', billerType);
  },
  update: function(Store,billerType) {
    Store.merge('BillerType', billerType);
  }
};
