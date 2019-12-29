angular.module('ImageArray', [])
  .factory('imageArray', [function () {

    // each image will get an ImageItem object from createImageItem
    // when an image is clicked, the current value will be incremented and it will be a circular queue
    var createItem = function () { return { current: 0, count: 0, photos: [], pet: null, index: 0 }; };

    return function ImageArray() {
      this.images = {};

      this.init = function (pet, petIndex, photo) {
        if (!this.images[petIndex] || this.images[petIndex].pet.id != pet.id) {
          this.images[petIndex] = createItem();
        }
        this.images[petIndex].pet = pet;
        this.images[petIndex].count++;
        this.images[petIndex].photos.push(photo);
      };

      this.reset = function () {
        this.images = {};
      };

      this.current = function (petIndex) {
        // src attribute will call this before init finishes
        if (!this.images[petIndex] || !this.images[petIndex].photos) return {};

        var current = this.images[petIndex].current;
        return this.images[petIndex].photos[current];
      };

      this.prev = function (petIndex) {
        if (!this.images[petIndex]) return;

        var prev = this.images[petIndex].current - 1;
        var count = this.images[petIndex].count;
        this.images[petIndex].current = prev < 0 ? (count - 1) : prev;
      };

      this.next = function (petIndex) {
        if (!this.images[petIndex]) return;

        var next = this.images[petIndex].current + 1;
        var count = this.images[petIndex].count;
        this.images[petIndex].current = (next == count) ? 0 : next;
      };

      this.hasMultiple = function (petIndex) {
        if (!this.images[petIndex]) return false;
        return this.images[petIndex].count > 1;
      };

      this.pet = function (petIndex) {
        if (!this.images[petIndex]) return {};
        return this.images[petIndex].pet;
      };

    };

  }]);