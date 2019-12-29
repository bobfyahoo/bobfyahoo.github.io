'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var pethelper = require('./PetHelper');

describe('github.io/', function () {

  var menu, button, location;

  beforeAll(function () {
    browser.get('index.html');
    browser.waitForAngularEnabled(true);
    browser.waitForAngular("waiting for angular").then(function(response){
      expect(response).toBeDefined();
      console.log('waiting for angular response=' + response);
    });
    browser.angularAppRoot('html');
    expect(browser.getCurrentUrl()).toBeDefined();
    menu = element(by.id('petmenu'));
    expect(menu).toBeDefined();
    menu.click();
    element(by.id('petmenuDogs')).click();
    button = element(by.id('findPetsButton'));
    expect(button).toBeDefined();
    location = element(by.name('location'));

    useMocks(true);        
  });

  function loadMocksSyncUnused() {
    var result = pethelper.loadMocksSync('92618').then((value) => console.log('promise from loadmock' + value));
    console.log('result from loadmock' + result);
  }
  
  function useMocks(isTesting) {
    var result = pethelper.useMocks(true).then((value) => console.log('use mocks promise=' + value));
    console.log('result from usemocks' + result);
    result.then(function(data){
      console.log('usemocks result data=' + data);
    });
  }
  

  afterEach(function () {
    var pets = element.all(by.repeater('pet in pets.value'));
    expect(pets).toBeDefined();
  });

  function loadPet(animal, path) {
    console.log(`loadPet: ${animal} ${path}`);
    menu.click();
    element(by.id('petmenu' + animal)).click();
    button.click();

    var selected = element(by.css('option[selected="selected"]'));
    expect(selected).toBeDefined();
    expect(selected.getText()).toEqual(animal);

    expect(browser.getCurrentUrl()).toContain(path + '#searchResults');
  }

  it('loads /pets/dog from menu', function () {
    loadPet('Dogs', 'dog');
  });

  it('loads /pets/cat from menu', function () {
    loadPet('Cats', 'cat');
  });

  it('loads /pets/bird from menu', function () {
    loadPet('Birds', 'bird');
  });

  it('loads /pets/rabbit from menu', function () {
    loadPet('Rabbits', 'rabbit');
  });

  it('loads /pets/pig from menu', function () {
    loadPet('Pigs', 'pig');
  });

  it('loads /pets/barnyard from menu', function () {
    loadPet('Farm', 'barnyard');
  });

  it('loads /pets/horse from menu', function () {
    loadPet('Horses', 'horse');
  });

  it('loads /pets/reptile from menu', function () {
    loadPet('Reptiles', 'reptile');
  });

  it('loads /pets/smallfurry from menu', function () {
    loadPet('Rodents', 'smallfurry');
  });

  /*
  it('should render dogs for 92618 on click', function () {
    var pets = element.all(by.repeater('pet in pets.value'));
    expect(pets).toBeDefined();
  });

  it('loads /pets/cat from menu', function () {
    var menu = element(by.id('petmenu'));
    expect(menu).toBeDefined();
    menu.click();
    element(by.id('petmenuCats')).click();
    var button = element(by.id('findPetsButton'));
    expect(button).toBeDefined();
    element(by.name('location')).sendKeys('92618');
    button.click();
  });

  it('should render dogs for 92618 on click', function () {
    var pets = element.all(by.repeater('pet in pets.value'));
    expect(pets).toBeDefined();
  });

  it('should render cats for 92618 on click', function () {
    var select = element(by.model('animal'));
    expect(select).toBeDefined();
    select.click();
    options = element.all(by.model('animal'));
    expect(options.count()).toEqual(10);
    options[1].click();
    // console.log("alloptions start");
    // allOptions.each(function(element, index) {
    //     //console.log(element.getText());
    // });
    // console.log("alloptions end");
    var pets = element.all(by.repeater('pet in pets.value'));
    expect(pets).toBeDefined();
  });

  it('should render birds for 92618 on click', function () {
    options[2].click();
    var pets = element.all(by.repeater('pet in pets.value'));
    expect(pets).toBeDefined();
  });

  it('should wait a minute', function () {
    var ms = 2 * 1000;
    browser.wait(browser.sleep(ms), ms + 1000, 'Server wait 2');
  });
*/
});

